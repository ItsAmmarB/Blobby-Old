module.exports.run = async (bot, message, args) => {
  if(message.channel.type === "dm") return;
  if(!message.member.hasPermission("MANAGE_NICKNAMES") && !Admins[message.author.id+"-"+message.guild.id] && !Mods[message.author.id+"-"+message.guild.id]) return error.noPerms(message, "MANAGE_NICKNAMES");
  let nName = args.join(" ");
  let mName = message.guild.members.get("455946985090842626");
  if(!nName) return help.helpMessage(message, "SetName", "Sets Bot's name to you desired name", "[Desired Name]", "Moderation Bot", "Blobbbbbbby");
  if(nName === bot.user.nickname) return error.invalid(message, "nName", "Bot's name is the same")
  mName.setNickname(nName)
  success.botName(message, nName)
};

exports.help = {
  name: "setname",
  aliases: "snm",
  hName: "SetName",
  Description: "Sets Bot's name to you desired name",
  usage: "[Desired Name]",
};


