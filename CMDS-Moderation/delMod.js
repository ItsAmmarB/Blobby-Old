module.exports.run = async (bot, message, args) => {
  if(message.channel.type === "dm") return;
  if(!message.member.hasPermission("ADMINISTRATOR") && !Admins[message.author.id+"-"+message.guild.id] && message.member.id !== message.guild.ownerID) return error.noPerms(message, "ADMINISTRATOR")
  if(!args[0] || args[0].toUpperCase() === "HELP") return help.helpMessage(message, "DelMod", "Takes the power of the moderator from a member", "[User]", "@" + me.tag, me.id)
  let mName = message.mentions.members.first() || message.guild.members.get(args[0]);
  if(!mName) return error.invalid(message, "mName", "User does not exist")
  if(!Mods[mName.id+"-"+message.guild.id]) return error.is(message, mName.user.username, "is not an", "Mod")
  if(mName.id === message.guild.ownerID) return error.invalid(message, "mName", "User has ownership of this guild")
  delete Mods[mName.id+"-"+message.guild.id];
  fs.writeFile("./Mods.json", JSON.stringify(Mods), err => {
    if(err) throw err;});
  success.del(message, mName.user.username, "Mod")
  

};
exports.help = {
  name: "delmod",
  aliases: "dm",
  hName: "DelMod",
  Description: "Takes the power of the moderator from a member within the bot",
  usage: "[User]",
}


