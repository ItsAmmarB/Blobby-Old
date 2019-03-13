module.exports.run = async (bot, message, args) => {
  if(message.channel.type === "dm") return;
  if(!message.member.hasPermission("ADMINISTRATOR") && message.member.id !== message.guild.ownerID) return error.noPerms(message, "ADMINISTRATOR")
  if(!args[0] || args[0].toUpperCase() === "HELP") return help.helpMessage(message, "DelMod", "Takes the power of the administrator from a member within the bot", "[User]", "@" + me.tag, me.id)
  let mName = message.mentions.members.first() || message.guild.members.get(args[0]);
  if(!mName) return error.invalid(message, "mName", "User does not exist")
  if(!Admins[mName.id+"-"+message.guild.id]) return error.is(message, mName.user.username, "is not an", "Admin")
  if(mName.id === message.guild.ownerID) return error.invalid(message, "mName", "User has ownership of this guild")
  delete Admins[mName.id+"-"+message.guild.id];
  fs.writeFile("./Admins.json", JSON.stringify(Admins), err => {
    if(err) throw err;});
  success.del(message, mName.user.username, "Admin")
  

};

exports.help = {
  name: "deladmin",
  aliases: "da",
  hName: "DelAdmin",
  Description: "Takes the power of the administrator from a member within the bot",
  usage: "[User]",
}


