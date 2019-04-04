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

  if(bot.norCommands.get(command.slice(prefix.length))) {                              //Normal Commands == Full Command
    global.cmdInfo = bot.norCommands.get(command.slice(prefix.length)).information;
    permCheck(message, async (callback) => {
      if(!callback || callback === false) return error.noPerms(message, cmdInfo.permission.perm.toString())
      bot.norCommands.get(command.slice(prefix.length)).run(bot, message, args)
    })
  }
  else if(bot.norAliases.get(command.slice(prefix.length))) {                         //Normal Commands == Aliases
    global.cmdInfo = bot.norAliases.get(command.slice(prefix.length)).information;
    permCheck(message, async (callback) => {
      if(!callback || callback === false) return error.noPerms(message, cmdInfo.permission.perm.toString())
      bot.norAliases.get(command.slice(prefix.length)).run(bot, message, args)
    })
  }
  else if(bot.testCommands.get(command.slice(prefix.length))) {                     //Testing Commands ==  == Full Command
    global.cmdInfo = bot.testCommands.get(command.slice(prefix.length)).information;
    permCheckTest(message, async (callback) => {
      if(!callback || callback === false) return error.noPerms(message, cmdInfo.permission.perm.toString())
      bot.testCommands.get(command.slice(prefix.length)).run(bot, message, args)
    })
  } else if(bot.testAliases.get(command.slice(prefix.length))) {                      //Testing Commands == Aliases
    global.cmdInfo = bot.testAliases.get(command.slice(prefix.length)).information;
    permCheckTest(message, async (callback) => {
      if(!callback || callback === false) return error.noPerms(message, cmdInfo.permission.perm.toString())
      bot.testAliases.get(command.slice(prefix.length)).run(bot, message, args)
    })
  }
  else if(bot.devCommands.get(command.slice(prefix.length))) {                        //Development Commands ==  == Full Command
    global.cmdInfo = bot.devCommands.get(command.slice(prefix.length)).information;
    permCheckDev(message, async (callback) => {
      if(!callback || callback === false) return error.noPerms(message, cmdInfo.permission.permLevel)
      bot.devCommands.get(command.slice(prefix.length)).run(bot, message, args)
    })
  }
  else if(bot.devAliases.get(command.slice(prefix.length))) {                         //Development Commands == Aliases
    global.cmdInfo = bot.devAliases.get(command.slice(prefix.length)).information;
    permCheckDev(message, async (callback) => {
      if(!callback ||  callback === false) return error.noPerms(message, cmdInfo.permission.permLevel)
      bot.devAliases.get(command.slice(prefix.length)).run(bot, message, args)
    })
  };
}

 