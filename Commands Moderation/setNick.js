module.exports.run = async (bot, message, args) => {
  if(!permCheck(message)) return error.noPerms(message, cmdInfo.permission.group + "." + cmdInfo.permission.perm)
  let mName = message.mentions.members.first() || message.guild.members.get(args[0]);
  if(!mName) return error.invalid(message, "mName", "User does not exist")
  let nName = args.slice(1).join(" ");
  if(!nName) return help.helpMessage(message);
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

const me = bot.users.get("357842475328733186");
exports.information = {
  trigger: {
  name: "setnick",
  aliases: "snk",
  },
  permission: {
  perm: "SetNick",
  group: ""
  },
  help: {
  name: "SetNick",
  description: "Sets someone's name to something else",
  usage: "<User> <New Name>",
  examples: [me.tag + " maximus", me.id + " maxxy Waxxy"]
  }
}


