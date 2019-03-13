module.exports.handle = async (message) => {
  if(message.author.bot) return;

  await Guild.findOne({_id: message.guild.id, "guildInfo.guildID": message.guild.id}, (err, res) => {if(!res) {newGuild(message.guild)}}).then(guild => global.prefix = guild.guildSettings.prefix)
  if(!message.content.startsWith(prefix)) return;
  let messageArray = message.content.split(" ");
  let command = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);



  
  if(bot.norCommands.get(command.slice(prefix.length))) {
    global.cmdInfo = bot.norCommands.get(command.slice(prefix.length)).information;
    bot.norCommands.get(command.slice(prefix.length)).run(bot, message, args)
  }
  else if(bot.norAliases.get(command.slice(prefix.length))) {
    global.cmdInfo = bot.norAliases.get(command.slice(prefix.length)).information;
    bot.norAliases.get(command.slice(prefix.length)).run(bot, message, args)
  }
  else if(bot.devCommand.get(command.slice(prefix.length))) {
    global.cmdInfo = bot.devCommand.get(command.slice(prefix.length)).information;
    bot.devCommand.get(command.slice(prefix.length)).run(bot, message, args)
  }
  else if(bot.devAliases.get(command.slice(prefix.length))) {
    global.cmdInfo = bot.devAliases.get(command.slice(prefix.length)).information;
    bot.devAliases.get(command.slice(prefix.length)).run(bot, message, args)
  };
}

 