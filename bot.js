//Bot Modules
global.Discord = module.require("discord.js");
global.fs = require("fs");
global.ms = require("pretty-ms")
global.bot = new Discord.Client();
global.ytdl = require("ytdl-core");
global.request = require("request");
global.getYoutubeID = require("get-youtube-id");
global.fetchVideoInfo = require("youtube-info")
global.YouTube = require('simple-youtube-api');
global.express = require('express')
global.moment = require ("moment")
global.Fortnite  = require("fortnite")
global.SteamAPI = require('steamapi');
global.converter = require('hex2dec');
global.atob = require('atob');
global.btoa = require('btoa');
global.Promise = require('bluebird');
global.nau = require('nau')
global.snekfetch = require('snekfetch');
global.mongoose = require('mongoose');


//Mongoose Database Connection Establisher
mongoose.connect("mongodb://localhost:27017/Blobby", { useNewUrlParser: true });


//Utilties
global.Config = JSON.parse(fs.readFileSync('./Config.json', 'utf-8'));
global.success = require('./_Messages Utilities/Success.js')
global.error = require('./_Messages Utilities/Error.js')
global.help = require('./_Messages Utilities/Help.js')


//Tokens and API-Keys
bot.login(Config.Discord_API_Key);
global.steam = new SteamAPI(Config.Steam_API_Key);
global.ft = new Fortnite(Config.Fortnite_API_KEY)
global.youtube = new YouTube(Config.YouTube_API_Key)
global.defPrefix = "/";


//Database Schema's
global.User = require("./_Database Models/User.js")
global.Guild = require("./_Database Models/Guild.js")
global.Privilege = require("./_Database Models/Privilege.js")


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

bot.testCommands = new Discord.Collection();
bot.testAliases = new Discord.Collection();
bot.devCommands = new Discord.Collection();
bot.devAliases = new Discord.Collection();


//Function Import

//Database Functions
global.newGuild = require("./_Functions/Database.js").newGuild;
global.newUser = require("./_Functions/Database.js").newUser;
global.addGuild = require("./_Functions/Database.js").addGuild;
global.newPrivilege = require("./_Functions/Database.js").newPrivilege;
global.addPrivilege = require("./_Functions/Database.js").addPrivilege;
global.delPrivilege = require("./_Functions/Database.js").delPrivilege;
global.newFiveM = require("./_Functions/Database.js").newFiveM;
global.delFiveM = require("./_Functions/Database.js").delFiveM;

//Other Functions
const CommandLoader = require("./_Functions/CommandsLoader.js");
const CommandHandler = require("./_Functions/CommandHandler.js");
global.LogsHandler = require("./_Functions/LogsHandler.js");
global.ErrorHandler = require("./_Functions/ErrorHandler.js");
global.modifierCheck = require("./_Functions/Checkers.js").modifierCheck;
global.permCheck = require("./_Functions/Checkers.js").permCheck;
global.permCheckDev = require("./_Functions/Checkers.js").permCheckDev;
global.skip_song = require("./_Functions/YouTube.js").skip_song;
global.playMusic = require("./_Functions/YouTube.js").playMusic;
global.add_to_queue = require("./_Functions/YouTube.js").add_to_queue;
global.getID = require("./_Functions/YouTube.js").getID;
global.search_video = require("./_Functions/YouTube.js").search_video;
global.isYoutube = require("./_Functions/YouTube.js").isYoutube;

//Error Handler
ErrorHandler.processErrorA();
ErrorHandler.processErrorB();
ErrorHandler.processException();
ErrorHandler.processWarning();
ErrorHandler.botError();
ErrorHandler.botWarning();

//Music Object
global.guilds = {};

 
//Commands Loader 
bot.on("ready", async () => {
  await CommandLoader.Settings("./-Settings Commands");
  await CommandLoader.Miscellaneous("./-Miscellaneous Commands");
  await CommandLoader.Moderation("./-Moderation Commands");
  await CommandLoader.Utility("./-Utility Commands");
  await CommandLoader.Music("./-Music Commands");
  await CommandLoader.Games("./-Games Commands");
  await CommandLoader.Information("./-Information Commands");

  await CommandLoader.Development("./-Development Commands");
  await CommandLoader.Testing("./-Testing Commands");
  
  

  bot.user.setPresence({ game: { name: 'blobbybot.com | Max F.' }, status: 'idle' })
  bot.user.setStatus('idle')

});


//Commands Handler
bot.on("message", async message =>  CommandHandler.handle(message));

//New Guild     //Register in database
bot.on("guildCreate", async guild => {newGuild(guild)});

//Logging System
    //Messages
// bot.on("messageDelete", async message => {  //messageDelete
//   LogsHandler.messageDelete(message)
// })
// bot.on("messageUpdate", async (newMessage, oldMessage) => {  //messageUpdate
//   LogsHandler.messageUpdate(newMessage, oldMessage)
// })
// bot.on("messageReactionAdd", async (messageReaction, user) => {  //messageReactionAdd
//   LogsHandler.messageReactionAdd(messageReaction, user)
// })
// bot.on("messageReactionRemove", async (messageReaction, user) => {  //messageReactionRemove
//   LogsHandler.messageReactionRemove(messageReaction, user)
// })
// bot.on("messageReactionRemoveAll", async message => {  //messageReactionRemoveAll
//   LogsHandler.messageReactionRemoveAll(message)
// })
//     //Channels
// bot.on("channelCreate", async message => {  //channelCreate
//   LogsHandler.channelCreate(message)
// })
// bot.on("channelDelete", async message => {  //channelDelete
//   LogsHandler.channelDelete(message)
// })
// bot.on("channelPinsUpdate", async message => {  //channelPinsUpdate
//   LogsHandler.channelPinsUpdate(message)
// })
// bot.on("channelUpdate", async message => {  //channelUpdate
//   LogsHandler.channelUpdate(message)
// })
//     //Bans
// bot.on("guildBanAdd", async message => {  //guildBanAdd
//   LogsHandler.guildBanAdd(message)
// })
// bot.on("guildBanRemove", async message => {  //guildBanRemove
//   LogsHandler.guildBanRemove(message)
// })
//     //Members
// bot.on("guildMemberAdd", async message => {  //guildMemberAdd
//   LogsHandler.guildMemberAdd(message)
// })
// bot.on("guildMemberUpdate", async message => {  //guildMemberUpdate
//   LogsHandler.guildMemberUpdate(message)
// })
// bot.on("guildMemberRemove", async message => {  //guildMemberRemove (Leave)
//   LogsHandler.guildMemberRemove(message)
// })
//     //kicks
// bot.on("guildMemberRemove", async message => {  //guildMemberRemove
//   LogsHandler.changuildMemberRemovenelPinsUpdate(message)
// })
//     //Roles
// bot.on("roleCreate", async message => {  //roleCreate
//   LogsHandler.roleCreate(message)
// })
// bot.on("roleDelete", async message => {  //roleDelete
//   LogsHandler.roleDelete(message)
// })
// bot.on("channelUroleUpdatepdate", async message => {  //roleUpdate
//   LogsHandler.roleUpdate(message)
// })