module.exports.run = async (bot, message, args) => {
  if(!args[0] || args[0].toUpperCase() === "HELP") return help.helpMessage(message)
  let mID = args[0];
  if(args[0].length < 18) return error.invalid(message, "uID", "User ID does not exist")
  await message.guild.fetchBans()
    .then(bans => {
      if(!bans.get(mID)) return error.is(message, mID, "is not", "Banned")
    } )
    if(err) console.error(err);
  message.guild.unban(mID)
    .then(user => success.success(message, user.username, "Unbanned"))
    

};

const me = bot.users.get("357842475328733186");
exports.information = {
  trigger: {
    name: "unban",
    aliases: "ub",
  },
  permission: {
    perm: "Unban",
    group: "Moderation"
  },
  help: {
    name: "Unban",
    description: "Unbans a member of the server",
    usage: "<Banned User>",
    examples: [me.tag, me.id]
  }
}


