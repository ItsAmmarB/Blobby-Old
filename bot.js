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
global.success = require('./Messages Utilities/Success.js')
global.error = require('./Messages Utilities/Error.js')
global.help = require('./Messages Utilities/Help.js')


//Tokens and API-Keys
bot.login(Config.Discord_API_Key);
global.steam = new SteamAPI(Config.Steam_API_Key);
global.ft = new Fortnite(Config.Fortnite_API_KEY)
global.youtube = new YouTube(Config.YouTube_API_Key)
global.defPrefix = "/";


//Database Schema's
global.User = require("./Database Models/User.js")
global.Guild = require("./Database Models/Guild.js")
global.Privilege = require("./Database Models/Privilege.js")


//Commands Collectors
bot.norCommands = new Discord.Collection();
bot.norAliases = new Discord.Collection();
bot.testCommands = new Discord.Collection();
bot.testAliases = new Discord.Collection();
bot.devCommands = new Discord.Collection();
bot.devAliases = new Discord.Collection();

//Function Import

//Database Functions
global.newGuild = require("./Functions/Database.js").newGuild;
global.newUser = require("./Functions/Database.js").newUser;
global.addGuild = require("./Functions/Database.js").addGuild;
global.newPrivilege = require("./Functions/Database.js").newPrivilege;
global.addPrivilege = require("./Functions/Database.js").addPrivilege;
global.delPrivilege = require("./Functions/Database.js").delPrivilege;
global.newFiveM = require("./Functions/Database.js").newFiveM;
global.delFiveM = require("./Functions/Database.js").delFiveM;

//Other Functions
global.ErrorHandler = require("./Functions/ErrorHandler.js");
global.modifierCheck = require("./Functions/Checkers.js").modifierCheck;
global.permCheck = require("./Functions/Checkers.js").permCheck;
global.permCheckDev = require("./Functions/Checkers.js").permCheckDev;
const CommandLoader = require("./Functions/CommandsLoader.js");
const CommandHandler = require("./Functions/CommandHandler.js");
global.skip_song = require("./Functions/YouTube.js").skip_song;
global.playMusic = require("./Functions/YouTube.js").playMusic;
global.add_to_queue = require("./Functions/YouTube.js").add_to_queue;
global.getID = require("./Functions/YouTube.js").getID;
global.search_video = require("./Functions/YouTube.js").search_video;
global.isYoutube = require("./Functions/YouTube.js").isYoutube;

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
  await CommandLoader.Setup("./Commands Setup");
  CommandLoader.Miscellaneous("./Commands Miscellaneous");
  CommandLoader.Moderation("./Commands Moderation");
  CommandLoader.Music("./Commands Music");
  CommandLoader.Development("./Commands Development");
  CommandLoader.Testing("./Commands Testing");
  bot.user.setPresence({ game: { name: 'blobbybot.com | Max F.' }, status: 'idle' })
  bot.user.setStatus('idle')

});


//Commands Handler
bot.on("message", async message =>  CommandHandler.handle(message));

//New Guild     //Register in database
bot.on("guildCreate", async guild => {newGuild(guild)});