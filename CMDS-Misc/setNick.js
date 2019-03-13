module.exports.run = async (bot, message, args) => {
  if(message.channel.type === "dm") return;
  if(!message.member.hasPermission("MANAGE_NICKNAMES") && !Admins[message.author.id+"-"+message.guild.id] && !Mods[message.author.id+"-"+message.guild.id]) return error.noPerms(message, "MANAGE_NICKNAMES");
  let mName = message.mentions.members.first() || message.guild.members.get(args[0]);
  if(!mName) return error.invalid(message, "mName", "User does not exist")
  let nName = args.slice(1).join(" ");
  if(!nName) return help.helpMessage(message, "SetName", "Sets someone's name to something else", "[Desired Name]", "@" + me.tag + "Maximus", me.id + "Maximillion");
  if(!nName) return error.missing(message, "nName");
  if(nName === mName.nickname) return error.invalid(message, "nName", "Nickname is the same")
  try {
  mName.setNickname(nName)
  } catch(err) {
    if(err) return error.unable(message, "SetNick", mName.user.username, e.toString());
    error.unable(message, "SetNick", mName.user.username, err.toString())
  }
  success.nickname(message, mName.user.username, nName)
};

exports.help = {
  name: "setnick",
  aliases: "snik",
  hName: "SetNick",
  Description: "Sets someone's name to something else",
  usage: "[User] [Desired Name]",
};


