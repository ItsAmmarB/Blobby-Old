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


//Utilties
global.Config = JSON.parse(fs.readFileSync('./Config.json', 'utf-8'));
global.success = require('./Utils/Messages/Success.js')
global.error = require('./Utils/Messages/Error.js')
global.help = require('./Utils/Messages/Help.js')


//Tokens and API-Keys
bot.login(Config.Discord_API_Key);
global.dbl = new DBL(Config.Discord_Bots_List_API, bot)
global.steam = new SteamAPI(Config.Steam_API_Key);
global.ft = new Fortnite(Config.Fortnite_API_KEY)
global.youtube = new YouTube(Config.YouTube_API_Key)
global.prefix = '/';


//Database
global.guildDatabase = require('./Database/guilds.json');
global.userDatabase = require('./Database/users.json');
global.privilegeDatabase = require('./Database/privileges.json');


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
global.newGuild = require('./Utils/Functions/Database.js').newGuild;
global.newUser = require('./Utils/Functions/Database.js').newUser;
global.addGuild = require('./Utils/Functions/Database.js').addGuild;
global.newPrivilege = require('./Utils/Functions/Database.js').newPrivilege;
global.addPrivilege = require('./Utils/Functions/Database.js').addPrivilege;
global.delPrivilege = require('./Utils/Functions/Database.js').delPrivilege;
global.newFiveM = require('./Utils/Functions/Database.js').newFiveM;
global.delFiveM = require('./Utils/Functions/Database.js').delFiveM;

//Other Functions
const CommandLoader = require('./Utils/Functions/CommandsLoader.js');
const CommandHandler = require('./Utils/Functions/CommandHandler.js');
global.LogsHandler = require('./Utils/Functions/LogsHandler.js');
global.ErrorHandler = require('./Utils/Functions/ErrorHandler.js');
global.modifierCheck = require('./Utils/Functions/Checkers.js').modifierCheck;
global.permCheck = require('./Utils/Functions/Checkers.js').permCheck;
global.permCheckDev = require('./Utils/Functions/Checkers.js').permCheckDev;
global.skip_song = require('./Utils/Functions/YouTube.js').skip_song;
global.playMusic = require('./Utils/Functions/YouTube.js').playMusic;
global.add_to_queue = require('./Utils/Functions/YouTube.js').add_to_queue;
global.getID = require('./Utils/Functions/YouTube.js').getID;
global.search_video = require('./Utils/Functions/YouTube.js').search_video;
global.isYoutube = require('./Utils/Functions/YouTube.js').isYoutube;

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
  bot.user.setStatus('dnd')
  bot.user.setActivity('myself getting recoded!', { type: 'WATCHING'})
  
  await CommandLoader.Settings('./Commands/Settings Commands');
  await CommandLoader.Miscellaneous('./Commands/Miscellaneous Commands');
  await CommandLoader.Moderation('./Commands/Moderation Commands');
  await CommandLoader.Utility('./Commands/Utility Commands');
  await CommandLoader.Music('./Commands/Music Commands');
  await CommandLoader.Games('./Commands/Games Commands');
  await CommandLoader.Information('./Commands/Information Commands');
  await CommandLoader.Development('./Commands/Development Commands');

  await CommandLoader.Developers('./Commands/Developers Commands');
  await CommandLoader.Testers('./Commands/Testers Commands');
  
  
  setInterval(() => {
    dbl.postStats(bot.guilds.size);
}, 1800000);


// setInterval(() => {
//   if(!bot.user.presence.game.toString().includes('users')){
//     let totalMembersCount = [];
//     const reducer = (accumulator, currentValue) => accumulator + currentValue
//     bot.guilds.forEach(guild=> totalMembersCount.push(guild.memberCount))
//     bot.user.setPresence({ game: { name: 'with '+ totalMembersCount.reduce(reducer) + ' users!' }, status: 'idle' })
//   } else {
//     bot.user.setPresence({ game: { name: 'with '+ bot.guilds.size + ' guilds!' }, status: 'idle' })
//   }
// }, 60000);
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