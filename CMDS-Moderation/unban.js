module.exports.run = async (bot, message, args) => {
  if(message.channel.type === "dm") return;
  if(!message.member.hasPermission("BAN_MEMBERS") && !Admins[message.author.id+"-"+message.guild.id]) return error.noPerms(message, "BAN_MEMBERS")
  if(!args[0] || args[0].toUpperCase() === "HELP") return help.helpMessage(message, "Unban", "Unbans a member of the server", "[User]", "@" + me.tag + " Troll ", me.id + " Too cool to be here")
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

exports.help = {
  name: "unban",
  aliases: "ub",
  hName: "SetNick",
  Description: "Unbans a member of the server",
  usage: "[User]",
};


