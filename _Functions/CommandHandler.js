module.exports.handle = async (message) => {
  if(message.author.bot) return;

  await Guild.findOne({_id: message.guild.id, "guildInfo.guildID": message.guild.id}, (err, res) => {if(!res) {newGuild(message.guild)}}).then(guild => global.prefix = guild.guildSettings.prefix)
  if(!message.content.startsWith(prefix)) return;
  let messageArray = message.content.split(" ");
  let command = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);

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
  //Full Command Caller
  if(bot.settingsCommands.get(command.slice(prefix.length))) {
    var commandEvent = bot.settingsCommands.get(command.slice(prefix.length));
  } else if(bot.moderationCommands.get(command.slice(prefix.length))) {
    var commandEvent = bot.moderationCommands.get(command.slice(prefix.length));
  } else if(bot.musicCommands.get(command.slice(prefix.length))) {
    var commandEvent = bot.musicCommands.get(command.slice(prefix.length));
  } else if(bot.miscellaneousCommands.get(command.slice(prefix.length))) {
    var commandEvent = bot.miscellaneousCommands.get(command.slice(prefix.length));
  } else if(bot.utilityCommands.get(command.slice(prefix.length))) {
    var commandEvent = bot.utilityCommands.get(command.slice(prefix.length));
  } else if(bot.informationCommands.get(command.slice(prefix.length))) {
    var commandEvent = bot.informationCommands.get(command.slice(prefix.length));
  } 
  
  //Short Command Caller
  else if(bot.setupAliases.get(command.slice(prefix.length))) {
    var commandEvent = bot.setupAliases.get(command.slice(prefix.length));
  } else if(bot.informationAliases.get(command.slice(prefix.length))) {
    var commandEvent = bot.informationAliases.get(command.slice(prefix.length));
  } else if(bot.moderationAliases.get(command.slice(prefix.length))) {
    var commandEvent = bot.moderationAliases.get(command.slice(prefix.length));
  } else if(bot.musicAliases.get(command.slice(prefix.length))) {
    var commandEvent = bot.musicAliases.get(command.slice(prefix.length));
  } else if(bot.miscellaneousAliases.get(command.slice(prefix.length))) {
    var commandEvent = bot.miscellaneousAliases.get(command.slice(prefix.length));
  } else if(bot.utilityAliases.get(command.slice(prefix.length))) {
    var commandEvent = bot.utilityAliases.get(command.slice(prefix.length));
  } else {
    return;
  }


  // Full Command
  if(commandEvent) {
    global.cmdInfo = commandEvent.information;
    global.lastMessage = message;
    let reqPerm = cmdInfo.permission.perm;
    permCheck(message, reqPerm, async (callback) => {
      if(!callback || callback === false) return error.noPerms(message, cmdInfo.permission.group+ "."+reqPerm.toString())
      if(message.content.split(" ").length > 1 && cmdInfo["section"] && cmdInfo.sections.find(sec => sec.name === message.content.split(" ")[1].split("")[0].toUpperCase()+message.content.split(" ")[1].split("").slice(1).join("").toLowerCase())) {
        subReqPerm = cmdInfo.sections.find(sec => sec.name === message.content.split(" ")[1].split("")[0].toUpperCase()+message.content.split(" ")[1].split("").slice(1).join("").toLowerCase()).permission.perm;
        subcmd = cmdInfo.sections.find(sec => sec.shortcut === message.content.split(" ")[1].toLowerCase());
      } else if(message.content.split(" ").length > 1 && cmdInfo["section"] && cmdInfo.sections.find(sec => sec.shortcut === message.content.split(" ")[1].toLowerCase())) {
        subReqPerm = cmdInfo.sections.find(sec => sec.shortcut === message.content.split(" ")[1].toLowerCase()).permission.perm;
        subcmd = cmdInfo.sections.find(sec => sec.shortcut === message.content.split(" ")[1].toLowerCase());
      } else {
         return commandEvent.run(bot, message, args)
      }
      permCheck(message, subReqPerm, async (callback) => {
        if(!callback || callback === false) return error.noPerms(message, subcmd.permission.group +"."+subReqPerm.toString())
        return commandEvent.run(bot, message, args)
      })
    })
    return;
  }



  // Short Command
  if(commandEvent) {
    global.cmdInfo = commandEvent.information;
    global.lastMessage = message;
    let reqPerm = cmdInfo.permission.perm;
    permCheck(message, reqPerm, async (callback) => {
      if(!callback || callback === false) return error.noPerms(message, cmdInfo.permission.group+ "."+reqPerm.toString())
      if(message.content.split(" ").length > 1 && cmdInfo["sections"] && cmdInfo.sections.find(sec => sec.name === message.content.split(" ")[1].split("")[0].toUpperCase()+message.content.split(" ")[1].split("").slice(1).join("").toLowerCase())) {
        subReqPerm = cmdInfo.sections.find(sec => sec.name === message.content.split(" ")[1].split("")[0].toUpperCase()+message.content.split(" ")[1].split("").slice(1).join("").toLowerCase()).permission.perm;
        subcmd = cmdInfo.sections.find(sec => sec.shortcut === message.content.split(" ")[1].toLowerCase());

      } else if(message.content.split(" ").length > 1 && cmdInfo["sections"] && cmdInfo.sections.find(sec => sec.shortcut === message.content.split(" ")[1].toLowerCase())) {
        subReqPerm = cmdInfo.sections.find(sec => sec.shortcut === message.content.split(" ")[1].toLowerCase()).permission.perm;
        subcmd = cmdInfo.sections.find(sec => sec.shortcut === message.content.split(" ")[1].toLowerCase());

      } else {
        return commandEvent.run(bot, message, args)
      }
      permCheck(message, subReqPerm, async (callback) => {
        if(!callback || callback === false) return error.noPerms(message, subcmd.permission.group +"."+subReqPerm.toString())
        return commandEvent.run(bot, message, args)
      })
    })
    return;
  }

    //Testing Commands == Full Command
   if(bot.testCommands.get(command.slice(prefix.length))) {
    global.cmdInfo = bot.testCommands.get(command.slice(prefix.length)).information;
    global.lastMessage = message;
    permCheckTest(message, async (callback) => {
      if(!callback || callback === false) return error.noPerms(message, cmdInfo.permission.perm.toString())
      return bot.testCommands.get(command.slice(prefix.length)).run(bot, message, args)
    })
    return;
  }

    //Testing Commands == Aliases
   if(bot.testAliases.get(command.slice(prefix.length))) {
    global.cmdInfo = bot.testAliases.get(command.slice(prefix.length)).information;
    global.lastMessage = message;
    permCheckTest(message, async (callback) => {
      if(!callback || callback === false) return error.noPerms(message, cmdInfo.permission.perm.toString())
      return bot.testAliases.get(command.slice(prefix.length)).run(bot, message, args)
    })
  }


  //Development Commands == Full Command
   if(bot.devCommands.get(command.slice(prefix.length))) {
    global.cmdInfo = bot.devCommands.get(command.slice(prefix.length)).information;
    global.lastMessage = message;
    permCheckDev(message, async (callback) => {
      if(!callback || callback === false) return error.noPerms(message, cmdInfo.permission.permLevel)
      return bot.devCommands.get(command.slice(prefix.length)).run(bot, message, args)
    })
    return;
  }


  //Development Commands == Aliases
   if(bot.devAliases.get(command.slice(prefix.length))) {
    global.cmdInfo = bot.devAliases.get(command.slice(prefix.length)).information;
    global.lastMessage = message;
    permCheckDev(message, async (callback) => {
      if(!callback ||  callback === false) return error.noPerms(message, cmdInfo.permission.permLevel)
      return bot.devAliases.get(command.slice(prefix.length)).run(bot, message, args)
    })
    return;
  };
}

 