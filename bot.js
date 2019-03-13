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
global.Canvas = require('canvas');
global.snekfetch = require('snekfetch');
global.mongoose = require('mongoose');


//Mongoose Database Connection Establisher
let url = "mongodb://localhost:27017/Co-Blobby";
mongoose.connect(url, { useNewUrlParser: true });


//Files Utilties
global.Config = JSON.parse(fs.readFileSync('./Config.json', 'utf-8'));
global.success = require('./Messages Utilities/Success.js')
global.error = require('./Messages Utilities/Error.js')
global.help = require('./Messages Utilities/Help.js')


//Tokens and API-Keys
bot.login(Config.Discord_API_Key);
global.steam = new SteamAPI(Config.Steam_API_Key);
global.ft = new Fortnite(Config.Fortnite_API_KEY)
global.youtube = new YouTube(Config.YouTube_API_Key)
global.defPrefix = "/"


//Database Schema's
global.User = require("./Database Models/User.js")
global.Guild = require("./Database Models/Guild.js")


//Commands Collectors
bot.norCommands = new Discord.Collection();
bot.norAliases = new Discord.Collection();
bot.devCommand = new Discord.Collection();
bot.devAliases = new Discord.Collection();


//Process Error Handler
process.on('unhandledRejection', err => {if(err) console.log(err)});


//Bot Error Handler
bot.on("error", err => {if(err) console.log(err)});


//Music Object
global.guilds = {};


//Function Import
global.newGuild = require("./Functions/Database.js").newGuild;
global.newUser = require("./Functions/Database.js").newUser;
global.addGuild = require("./Functions/Database.js").addGuild;
global.modifierCheck = require("./Functions/Checkers.js").modifierCheck;
global.permCheck = require("./Functions/Checkers.js").permCheck;
const CommandLoader = require("./Functions/CommandsLoader.js");
const CommandHandler = require("./Functions/CommandHandler.js");


//Commands Loader 
bot.on("ready", async () => {
  await CommandLoader.Setup("./Commands Setup");
  CommandLoader.Miscellaneous("./Commands Miscellaneous");
  CommandLoader.Moderation("./Commands Moderation");
  CommandLoader.Music("./Commands Music");
  CommandLoader.Development("./Commands Development");
});


//Commands Handler
bot.on("message", async message =>  CommandHandler.handle(message));
