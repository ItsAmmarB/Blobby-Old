module.exports.run = async (bot, message, args) => {
  if(message.channel.type === "dm") return;
  if(!message.member.hasPermission("ADMINISTRATOR") && message.member.id !== message.guild.ownerID) return error.noPerms(message, "ADMINISTRATOR")
  if(!args[0] || args[0].toUpperCase() === "HELP") return help.helpMessage(message, "AddAdmin", "Gives a member the power of an administrator within the bot", "[User]", "@" + me.tag, me.id)
  let mName = message.mentions.members.first() || message.guild.members.get(args[0]);
  if(!mName) return error.invalid(message, "mName", "User does not exist")
  if(Admins[mName.id]) return error.is(message, mName.user.username, "is already", "Admin")
  if(mName.id === message.guild.ownerID) return error.invalid(message, "mName", "User has ownership of this guild")
  Admins[mName.id+"-"+message.guild.id] = {
    ID: mName.id,
    Name: mName.user.tag,
    GuildID: message.guild.id,
    GuildName: message.guild.name
  };
  fs.writeFile("./Admins.json", JSON.stringify(Admins), err => {
    if(err) throw err;});
  success.add(message, mName.user.username, "Admin")
   

};

exports.help = {
  name: "addadmin",
  aliases: "aa",
  hName: "AddAdmin",
  Description: "Gives a member the power of an administrator within the bot",
  usage: "[User]",
};


