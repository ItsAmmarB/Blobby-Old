global.Discord = module.require("discord.js");
global.fs = require("fs");
global.ms = require("pretty-ms")
global.bot = new Discord.Client();
global.ytdl = require("ytdl-core");
global.request = require("request");
global.getYoutubeID = require("get-youtube-id");
global.fetchVideoInfo = require("youtube-info")
global.YouTube = require('simple-youtube-api');
global.success = require('./utilities/uSuccess.js')
global.error = require('./utilities/uErrors.js')
global.help = require('./utilities/uHelp.js')
global.express = require('express')
global.moment = require ("moment")
global.Fortnite  = require("fortnite")
global.SteamAPI = require('steamapi');
global.converter = require('hex2dec');
global.atob = require('atob');
global.btoa = require('btoa');
global.Promise = require('bluebird');
global.nau = require('nau')
global.Canvas = require('canvas');
global.snekfetch = require('snekfetch');
global.Config = JSON.parse(fs.readFileSync('./Config.json', 'utf-8'));
bot.login(Config.Discord_API_Key);
global.steam = new SteamAPI(Config.Steam_API_Key);
global.ft = new Fortnite(Config.Fortnite_API_KEY)
global.youtube = new YouTube(Config.YouTube_API_Key)
global.guilds = {};

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.ConfigCommands = new Discord.Collection();

if(!bot.speaking) bot.guilds.filter(guild => bot.voiceChannel).filter(bot => !bot.speaking).forEach(guild => guild.members.get(bot.id).voiceChannel.leave());

//Commands Loader 
bot.on("ready", async () => {
          //Bot Configuration Commands
          await fs.readdir("./CMDS-Bot", (err, files) => {
  
            let jsFiles = files.filter(f => f.split(".").pop() === "js");
            if(jsFiles.length <= 0) {
              console.log("(`==> No Bot Configuration to load!");
              return;
            }
            console.log(`==> loading ${jsFiles.length} Bot Configuration!`)
      
            jsFiles.forEach((f, i) => {
              let props = require(`./CMDS-Bot/${f}`);
              console.log(`${i + 1}: ${f} loaded!  {Bot}`)
              bot.ConfigCommands.set(props.help.name, props);
            });
          });
      //Music Commands
      await fs.readdir("./CMDS-Music", (err, files) => {
  
        let jsFiles = files.filter(f => f.split(".").pop() === "js");
        if(jsFiles.length <= 0) {
          console.log("(`==> No Music commands to load!");
          return;
        }
        console.log(`==> loading ${jsFiles.length} Music commands!`)
  
        jsFiles.forEach((f, i) => {
          let props = require(`./CMDS-Music/${f}`);
          console.log(`${i + 1}: ${f} loaded!  {Music}`)
          bot.commands.set(props.help.name, props);
          bot.aliases.set(props.help.aliases, props);
        });
      });
  //Moderation Commands
  await fs.readdir("./CMDS-Moderation", (err, files) => {
    if(err) console.error(err);

    let jsFiles = files.filter(f => f.split(".").pop() === "js");
    if(jsFiles.length <= 0) {
      console.log("(`==> No Moderation commands to load!");
      return;
    }
    console.log(`==> loading ${jsFiles.length} Moderation commands!`)

    jsFiles.forEach((f, i) => {
      let props = require(`./CMDS-Moderation/${f}`);
      console.log(`${i + 1}: ${f} loaded!  {Moderation}`)
      bot.commands.set(props.help.name, props);
      bot.aliases.set(props.help.aliases, props);
    });
  });
  //Misc Commands
  await fs.readdir("./CMDS-Misc", (err, files) => {
    if(err) console.error(err);

    let jsFiles = files.filter(f => f.split(".").pop() === "js");
    if(jsFiles.length <= 0) {
      console.log("(`==> No Misc commands to load!");
      return;
    }
    console.log(`==> loading ${jsFiles.length} Misc commands!`)

    jsFiles.forEach((f, i) => {
      let props = require(`./CMDS-Misc/${f}`);
      console.log(`${i + 1}: ${f} loaded!  {Misc}`)
      bot.commands.set(props.help.name, props);
      bot.aliases.set(props.help.aliases, props);
    });
  });
  //Setup Commands
  await fs.readdir("./CMDS-Setup", (err, files) => {
    if(err) console.error(err);

    let jsFiles = files.filter(f => f.split(".").pop() === "js");
    if(jsFiles.length <= 0) {
      console.log("==> No Setup commands to load!");
      return;
    }
    console.log(`==> loading ${jsFiles.length} Setup commands!`)

    jsFiles.forEach((f, i) => {
      let props = require(`./CMDS-Setup/${f}`);
      console.log(`${i + 1}: ${f} loaded!  {Setup}`)
      bot.commands.set(props.help.name, props);
      bot.aliases.set(props.help.aliases, props);
    });
  });
  await bot.user.setActivity('.helpme | Testing Phrase', { type: 'PLAYING' });
  await console.log("I'm Ready")
});


process.on('unhandledRejection', error => console.log(error));

bot.on("error", error => error => console.log(error));


    //Functions
{
  global.skip_song = function skip_song(message) {
      guilds[message.guild.id].dispatcher.end();
  }
  
  global.playMusic = function playMusic(id, message, playlist = false) {
    guilds[message.guild.id].voiceChannel = message.member.voiceChannel;



    guilds[message.guild.id].voiceChannel.join().then(function(connection) {
      stream = ytdl("https://www.youtube.com/watch?v=" + id, {
          filter: 'audioonly'
      });
      guilds[message.guild.id].skispReq = 0;
      guilds[message.guild.id].skippers = [];
      let avatar = "https://xaqkww.am.files.1drv.com/y4mp6ACqMRPOSdfBsnFGz0O0JOsfl0zOS6CQdAAqEBr_UxFB_WFTYZdgpl2itKP5VRcTfs-v2z_l0g_5lVniYhVq_kWMHIqFqDlP_UmiwOLuTSQNa6mhtzSDB-aCZW1vpSBDjh2Gg51WiNhbZwyIH95C4HqhPU92X_R9AQaA660Fx7jedyqroqi0Xdhr3yt6z4rrlRFPrnmSlMXElGGjzOTSA?width=400&height=400&cropmode=none"
      fetchVideoInfo(id, function(err, videoInfo) {
        if (err => console.log(err));
        success.mPlay(message, avatar, videoInfo.title, videoInfo.url, videoInfo.thumbnailUrl, ms(videoInfo.duration * 1000, {verbose: true}), videoInfo.owner);
      });
      guilds[message.guild.id].dispatcher = connection.playStream(stream);
      message.guild.voiceConnection.dispatcher.setVolumeLogarithmic(guilds[message.guild.id].volume / 9)
      guilds[message.guild.id].dispatcher.on('end', function() {
        guilds[message.guild.id].skipReq = 0;
        guilds[message.guild.id].skippers = [];
        if(guilds[message.guild.id].loop === 2) {
          guilds[message.guild.id].queue.push(guilds[message.guild.id].queue[0]);
          guilds[message.guild.id].queueNames.push(guilds[message.guild.id].queueNames[0]);
          guilds[message.guild.id].queue.shift()
          guilds[message.guild.id].queueNames.shift()
          setTimeout(function() {
            playMusic(guilds[message.guild.id].queue[0], message);
          }, 500);
        } 
        else if(guilds[message.guild.id].loop === 1) {
          setTimeout(function() {
            playMusic(guilds[message.guild.id].queue[0], message);
          }, 500);
        }
        else if(guilds[message.guild.id].loop === 0) {
          guilds[message.guild.id].queue.shift()
          guilds[message.guild.id].queueNames.shift()
          
          if (guilds[message.guild.id].queue.length === 0) {
              guilds[message.guild.id].queue = [];
              guilds[message.guild.id].queueNames = [];
              guilds[message.guild.id].isPlaying = false;
              message.member.voiceChannel.leave()

          } else {
            setTimeout(function() {
                playMusic(guilds[message.guild.id].queue[0], message);
            }, 500);
          }
        }
      });
    });
  }   
  
  
  
  global.add_to_queue = function add_to_queue(strID, message) {
      if (isYoutube(strID)) {
          guilds[message.guild.id].queue.push(getYoutubeID(strID));
      } else {
          guilds[message.guild.id].queue.push(strID);
      }
  }
  
  global.getID = function getID(str, cb) {
      if (isYoutube(str)) {
          cb(getYoutubeID(str));
      } else {
          search_video(str, function(id) {
              cb(id);
          });
      }
  }

  global.search_video = function search_video(query, callback) {
      request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + Config.YouTube_API_Key, function(error, response, body) {
          var json = JSON.parse(body);
          if (!json.items[0]) callback("3_-a9nVZYjk");
          else {
              callback(json.items[0].id.videoId);
          }
      });
  }
  
  global.isYoutube = function isYoutube(str) {
      return str.toString().toLowerCase().indexOf("youtube.com") > -1;
  }


}
 
//Commands Handler
bot.on("message", async message => {

  let messageArray = message.content.split(" ");
  let command = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);

  if(message.author.bot) return;
  global.GuildsConfig = JSON.parse(fs.readFileSync("./GuildsConfig.json", "utf8"));
  if(!GuildsConfig[message.guild.id]) {
    GuildsConfig[message.guild.id] = {
      GuildName: message.guild.name,
      GuildID: message.guild.id,
      Prefix: Config.prefix,
      MusicDJ: false,
      MusicDJID: null,
      Logs:{
        all: 0,
        channeldelete: 0,
        channelcreate: 0,
        channelupdate: 0,
        memberrmeove: 0,
        memberban: 0,
        memberunban: 0,
        memberupdate: 0,
        memberadd: 0,
        messagedelete: 0,
        messagebulkdelete: 0,
        messageupdate: 0,
        rolecreate: 0,
        roledelete: 0,
        roleupdate: 0
      },
      loggingchannel: null,
      ignoredchannels: []
    }
    fs.writeFile("./GuildsConfig.json", JSON.stringify(GuildsConfig), err => {
      if(err) throw err;});
  }
    if (!guilds[message.guild.id]) {
    guilds[message.guild.id] = {
        queue: [],
        queueNames: [],
        isPlaying: false,
        dispatcher: null,
        voiceChannel: null,
        skipReq: 0,
        skippers: [],
        volume: 3,
        loop: 0
    };
  }

  global.prefix = GuildsConfig[message.guild.id].Prefix;
  global.Admins = JSON.parse(fs.readFileSync("./Admins.json", "utf8"));
  global.Mods = JSON.parse(fs.readFileSync("./Mods.json", "utf8"));
  global.me = bot.guilds.get("454795197901963264").members.get("357842475328733186").user;
  global.Dev = JSON.parse(fs.readFileSync("./Devs.json", "utf8"));
  global.Own = JSON.parse(fs.readFileSync("./Owners.json", "utf8"));

  
  if(!command.startsWith(prefix)) return;
  if(!message.guild) return message.reply("Cammands are only to be used in Guilds and Guilds only")

  global.commands = bot.commands
  global.ConCommands = bot.ConfigCommands
  global.LoggingChannel = bot.guilds.get("454795197901963264").channels.get("503603348684144641");
  let cmd = bot.commands.get(command.slice(prefix.length));
  let Alis = bot.aliases.get(command.slice(prefix.length));
  let ConCMD = bot.ConfigCommands.get(command.slice(prefix.length));

  if(ConCMD) ConCMD.run(bot, message, args);
  if(cmd) cmd.run(bot, message, args);
  if(Alis) Alis.run(bot, message, args);
  return;
});
