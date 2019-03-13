module.exports.run = async (bot, message, args) => {
  if(message.channel.type === "dm") return;
  if(!message.member.hasPermission("ADMINISTRATOR") && !Admins[message.author.id+"-"+message.guild.id]) return error.noPerms(message, "ADMINISTRATOR")
  if(!args[0] || args[0].toUpperCase() === "HELP") return help.helpMessage(message, "AddMod", "Gives a member the power of the Moderator within the bot", "[User]", "@" + me.tag, me.id)
  let mName = message.mentions.members.first() || message.guild.members.get(args[0]);
  if(!mName) return error.invalid(message, "mName", "User does not exist")
  if(Mods[mName.id]) return error.is(message, mName.user.username, "is already", "Mod")
  if(mName.id === message.guild.ownerID) return error.invalid(message, "mName", "User has ownership of this guild")
  Mods[mName.id+"-"+message.guild.id] = {
    ID: mName.id,
    Name: mName.user.tag,
    GuildID: message.guild.id,
    GuildName: message.guild.name
  };
  fs.writeFile("./Mods.json", JSON.stringify(Mods), err => {
    if(err) throw err;});
  success.add(message, mName.user.username, "Mod")
   

};

exports.help = {
  name: "addmod",
  aliases: "am",
  hName: "AddMod",
  Description: "Gives a member the power of an Moderator within the bot",
  usage: "[User]",
};


