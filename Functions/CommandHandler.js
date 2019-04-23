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


  //Normal Commands == Full Command
  if(bot.norCommands.get(command.slice(prefix.length))) {
    global.cmdInfo = bot.norCommands.get(command.slice(prefix.length)).information;
    let reqPerm = cmdInfo.permission.perm;
    permCheck(message, reqPerm, async (callback) => {
      if(!callback || callback === false) return error.noPerms(message, cmdInfo.permission.group+ "."+reqPerm.toString())
      if(message.content.split(" ").length > 1 && cmdInfo.sections.find(sec => sec.name === message.content.split(" ")[1].split("")[0].toUpperCase()+message.content.split(" ")[1].split("").slice(1).join("").toLowerCase())) {
        subReqPerm = cmdInfo.sections.find(sec => sec.name === message.content.split(" ")[1].split("")[0].toUpperCase()+message.content.split(" ")[1].split("").slice(1).join("").toLowerCase()).permission.perm;
        subcmd = cmdInfo.sections.find(sec => sec.shortcut === message.content.split(" ")[1].toLowerCase());
      } else if(message.content.split(" ").length > 1 && cmdInfo.sections.find(sec => sec.shortcut === message.content.split(" ")[1].toLowerCase())) {
        subReqPerm = cmdInfo.sections.find(sec => sec.shortcut === message.content.split(" ")[1].toLowerCase()).permission.perm;
        subcmd = cmdInfo.sections.find(sec => sec.shortcut === message.content.split(" ")[1].toLowerCase());
      } else {
         return bot.norCommands.get(command.slice(prefix.length)).run(bot, message, args)
      }
      permCheck(message, subReqPerm, async (callback) => {
        if(!callback || callback === false) return error.noPerms(message, subcmd.permission.group +"."+subReqPerm.toString())
        bot.norCommands.get(command.slice(prefix.length)).run(bot, message, args)
      })
    })
  }


  //Normal Commands == Aliases
  else if(bot.norAliases.get(command.slice(prefix.length))) {
    global.cmdInfo = bot.norAliases.get(command.slice(prefix.length)).information;
    let reqPerm = cmdInfo.permission.perm;
    permCheck(message, reqPerm, async (callback) => {
      if(!callback || callback === false) return error.noPerms(message, cmdInfo.permission.group+ "."+reqPerm.toString())
      if(message.content.split(" ").length > 1 && cmdInfo.sections.find(sec => sec.name === message.content.split(" ")[1].split("")[0].toUpperCase()+message.content.split(" ")[1].split("").slice(1).join("").toLowerCase())) {
        subReqPerm = cmdInfo.sections.find(sec => sec.name === message.content.split(" ")[1].split("")[0].toUpperCase()+message.content.split(" ")[1].split("").slice(1).join("").toLowerCase()).permission.perm;
        subcmd = cmdInfo.sections.find(sec => sec.shortcut === message.content.split(" ")[1].toLowerCase());

      } else if(message.content.split(" ").length > 1 && cmdInfo.sections.find(sec => sec.shortcut === message.content.split(" ")[1].toLowerCase())) {
        subReqPerm = cmdInfo.sections.find(sec => sec.shortcut === message.content.split(" ")[1].toLowerCase()).permission.perm;
        subcmd = cmdInfo.sections.find(sec => sec.shortcut === message.content.split(" ")[1].toLowerCase());

      } else {
         return bot.norAliases.get(command.slice(prefix.length)).run(bot, message, args)
      }
      permCheck(message, subReqPerm, async (callback) => {
        if(!callback || callback === false) return error.noPerms(message, subcmd.permission.group +"."+subReqPerm.toString())
        bot.norAliases.get(command.slice(prefix.length)).run(bot, message, args)
      })
    })
  }


 //Testing Commands == Full Command
  else if(bot.testCommands.get(command.slice(prefix.length))) {
    global.cmdInfo = bot.testCommands.get(command.slice(prefix.length)).information;
    permCheckTest(message, async (callback) => {
      if(!callback || callback === false) return error.noPerms(message, cmdInfo.permission.perm.toString())
      bot.testCommands.get(command.slice(prefix.length)).run(bot, message, args)
    })


  //Testing Commands == Aliases
  } else if(bot.testAliases.get(command.slice(prefix.length))) {
    global.cmdInfo = bot.testAliases.get(command.slice(prefix.length)).information;
    permCheckTest(message, async (callback) => {
      if(!callback || callback === false) return error.noPerms(message, cmdInfo.permission.perm.toString())
      bot.testAliases.get(command.slice(prefix.length)).run(bot, message, args)
    })
  }


  //Development Commands == Full Command
  else if(bot.devCommands.get(command.slice(prefix.length))) {
    global.cmdInfo = bot.devCommands.get(command.slice(prefix.length)).information;
    permCheckDev(message, async (callback) => {
      if(!callback || callback === false) return error.noPerms(message, cmdInfo.permission.permLevel)
      bot.devCommands.get(command.slice(prefix.length)).run(bot, message, args)
    })
  }


  //Development Commands == Aliases
  else if(bot.devAliases.get(command.slice(prefix.length))) {
    global.cmdInfo = bot.devAliases.get(command.slice(prefix.length)).information;
    permCheckDev(message, async (callback) => {
      if(!callback ||  callback === false) return error.noPerms(message, cmdInfo.permission.permLevel)
      bot.devAliases.get(command.slice(prefix.length)).run(bot, message, args)
    })
  };
}

 