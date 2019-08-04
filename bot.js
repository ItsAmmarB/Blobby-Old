//Bot Modules
global.Discord = module.require('discord.js');
global.fs = require('fs');
global.ms = require('pretty-ms')
global.bot = new Discord.Client();
global.DBL = require('dblapi.js')
global.ytdl = require('ytdl-core');
global.request = require('request');
global.getYoutubeID = require('get-youtube-id');
global.fetchVideoInfo = require('youtube-info')
global.YouTube = require('simple-youtube-api');
global.express = require('express')
global.moment = require ('moment')
global.Fortnite  = require('fortnite')
global.SteamAPI = require('steamapi');
global.converter = require('hex2dec');
global.atob = require('atob');
global.btoa = require('btoa');
global.nau = require('nau')
global.mongoose = require('mongoose');
const directory = '/Users/Administrator/Desktop/Blobby'



//Mongoose Database Connection Establisher
mongoose.connect('mongodb://localhost:27017/Blobby', { useNewUrlParser: true, useFindAndModify: false });


//Utilties
global.Config = JSON.parse(fs.readFileSync(directory + '/Config.json', 'utf-8'));
global.success = require(directory + '/Utils/Messages/Success.js')
global.error = require(directory + '/Utils/Messages/Error.js')
global.help = require(directory + '/Utils/Messages/Help.js')



//Tokens and API-Keys
bot.login(Config.Discord_API_Key);
global.dbl = new DBL(Config.Discord_Bots_List_API, bot)
global.steam = new SteamAPI(Config.Steam_API_Key);
global.ft = new Fortnite(Config.Fortnite_API_KEY)
global.youtube = new YouTube(Config.YouTube_API_Key)
global.defPrefix = '/';


//Database Schema's
global.User = require(directory + '/Database Models/User.js')
global.Guild = require(directory + '/Database Models/Guild.js')
global.Privilege = require(directory + '/Database Models/Privilege.js')


//Commands Collectors
bot.allCommands = new Discord.Collection();

bot.settingsCommands  = new Discord.Collection();
bot.settingsAliases  = new Discord.Collection();
bot.moderationCommands  = new Discord.Collection();
bot.moderationAliases  = new Discord.Collection();
bot.utilityCommands  = new Discord.Collection();
bot.utilityAliases  = new Discord.Collection();
bot.musicCommands  = new Discord.Collection();
bot.musicAliases  = new Discord.Collection();
bot.miscellaneousCommands  = new Discord.Collection();
bot.miscellaneousAliases  = new Discord.Collection();
bot.gamesCommands  = new Discord.Collection();
bot.gamesAliases  = new Discord.Collection();
bot.informationCommands  = new Discord.Collection();
bot.informationAliases  = new Discord.Collection();
bot.developmentCommands  = new Discord.Collection();
bot.developmentAliases  = new Discord.Collection();

bot.testCommands = new Discord.Collection();
bot.testAliases = new Discord.Collection();
bot.devCommands = new Discord.Collection();
bot.devAliases = new Discord.Collection();


//Function Import

//Database Functions
global.newGuild = require(directory + '/Utils/Functions/Database.js').newGuild;
global.newUser = require(directory + '/Utils/Functions/Database.js').newUser;
global.addGuild = require(directory + '/Utils/Functions/Database.js').addGuild;
global.newPrivilege = require(directory + '/Utils/Functions/Database.js').newPrivilege;
global.addPrivilege = require(directory + '/Utils/Functions/Database.js').addPrivilege;
global.delPrivilege = require(directory + '/Utils/Functions/Database.js').delPrivilege;
global.newFiveM = require(directory + '/Utils/Functions/Database.js').newFiveM;
global.delFiveM = require(directory + '/Utils/Functions/Database.js').delFiveM;

//Other Functions
const CommandLoader = require(directory + '/Utils/Functions/CommandsLoader.js');
const CommandHandler = require(directory + '/Utils/Functions/CommandHandler.js');
global.LogsHandler = require(directory + '/Utils/Functions/LogsHandler.js');
global.ErrorHandler = require(directory + '/Utils/Functions/ErrorHandler.js');
global.modifierCheck = require(directory + '/Utils/Functions/Checkers.js').modifierCheck;
global.permCheck = require(directory + '/Utils/Functions/Checkers.js').permCheck;
global.permCheckDev = require(directory + '/Utils/Functions/Checkers.js').permCheckDev;
global.skip_song = require(directory + '/Utils/Functions/YouTube.js').skip_song;
global.playMusic = require(directory + '/Utils/Functions/YouTube.js').playMusic;
global.add_to_queue = require(directory + '/Utils/Functions/YouTube.js').add_to_queue;
global.getID = require(directory + '/Utils/Functions/YouTube.js').getID;
global.search_video = require(directory + '/Utils/Functions/YouTube.js').search_video;
global.isYoutube = require(directory + '/Utils/Functions/YouTube.js').isYoutube;

//Error Handler
ErrorHandler.processErrorA();
ErrorHandler.processErrorB();
ErrorHandler.processException();
ErrorHandler.processWarning();
ErrorHandler.botError();
ErrorHandler.botWarning();

//Music Object
global.guilds = {};

dbl.on('posted', () => {
  console.log('Server count posted!');
})
 
dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})

 
//Commands Loader 
bot.on('ready', async () => {
  await CommandLoader.Settings(directory + '/Commands/Settings Commands');
  await CommandLoader.Miscellaneous(directory + '/Commands/Miscellaneous Commands');
  await CommandLoader.Moderation(directory + '/Commands/Moderation Commands');
  await CommandLoader.Utility(directory + '/Commands/Utility Commands');
  await CommandLoader.Music(directory + '/Commands/Music Commands');
  await CommandLoader.Games(directory + '/Commands/Games Commands');
  await CommandLoader.Information(directory + '/Commands/Information Commands');
  await CommandLoader.Development(directory + '/Commands/Development Commands');

  await CommandLoader.Developers(directory + '/Commands/Developers Commands');
  await CommandLoader.Testers(directory + '/Commands/Testers Commands');
  
  
  setInterval(() => {
    dbl.postStats(bot.guilds.size);
}, 1800000);

bot.user.setPresence({ game: { name: 'with '+ bot.guilds.size + ' guilds!' }, status: 'idle' })
setInterval(() => {
  if(!bot.user.presence.game.toString().includes('users')){
    let totalMembersCount = [];
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    bot.guilds.forEach(guild=> totalMembersCount.push(guild.members.size))
    bot.user.setPresence({ game: { name: 'with '+ totalMembersCount.reduce(reducer) + ' users!' }, status: 'idle' })
  } else {
    bot.user.setPresence({ game: { name: 'with '+ bot.guilds.size + ' guilds!' }, status: 'idle' })
  }
}, 60000);
});


//Commands Handler
bot.on('message', async message =>  CommandHandler.handle(message));

//New Guild     //Register in database
bot.on('guildCreate', async guild => {newGuild(guild)});



// Logging System
    // Messages
// bot.on('messageDelete', async message => {  //messageDelete
//   LogsHandler.messageDelete(message)
// })
// bot.on('messageUpdate', async (newMessage, oldMessage) => {  //messageUpdate
//   LogsHandler.messageUpdate(newMessage, oldMessage)
// })
// bot.on('messageReactionAdd', async (messageReaction, user) => {  //messageReactionAdd
//   LogsHandler.messageReactionAdd(messageReaction, user)
// })
// bot.on('messageReactionRemove', async (messageReaction, user) => {  //messageReactionRemove
//   LogsHandler.messageReactionRemove(messageReaction, user)
// })
// bot.on('messageReactionRemoveAll', async message => {  //messageReactionRemoveAll
//   LogsHandler.messageReactionRemoveAll(message)
// })
//     //Channels
// bot.on('channelCreate', async channel => {  //channelCreate
//   LogsHandler.channelCreate(channel)
// })
// bot.on('channelDelete', async channel => {  //channelDelete
//   LogsHandler.channelDelete(channel)
// })
// bot.on('channelPinsUpdate', async (channel, time) => {  //channelPinsUpdate
//   LogsHandler.channelPinsUpdate(channel, time)
// })
// bot.on('channelUpdate', async (oldChannel, newChannel) => {  //channelUpdate
//   LogsHandler.channelUpdate(oldChannel, newChannel)
// })
//     //Bans
// bot.on('guildBanAdd', async (guild, user) => {  //guildBanAdd
//   LogsHandler.guildBanAdd(guild, user)
// })
// bot.on('guildBanRemove', async (guild, user) => {  //guildBanRemove
//   LogsHandler.guildBanRemove(guild, user)
// })
//     //Members
// bot.on('guildMemberAdd', async member => {  //guildMemberAdd
//   LogsHandler.guildMemberAdd(member)
// })
// bot.on('guildMemberUpdate', async (oldMember, newMember) => {  //guildMemberUpdate
//   LogsHandler.guildMemberUpdate(oldMember, newMember)
// })
// bot.on('guildMemberRemove', async member => {  //guildMemberRemove (Leave)
//   LogsHandler.guildMemberRemove(member)
// })
//     //Roles
// bot.on('roleCreate', async role => {  //roleCreate
//   LogsHandler.roleCreate(role)
// })
// bot.on('roleDelete', async role => {  //roleDelete
//   LogsHandler.roleDelete(role)
// })
// bot.on('roleUpdate', async (oldRole, newRole) => {  //roleUpdate
//   LogsHandler.roleUpdate(oldRole, newRole)
// })