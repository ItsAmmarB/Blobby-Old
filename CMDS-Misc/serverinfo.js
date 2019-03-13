module.exports.run = async (bot, message, args) => {
  if(message.channel.type === "dm") return;
  if(!message.member.hasPermission("MANAGE_MESSAGES") && !Admins[message.author.id+"-"+message.guild.id] && !Mods[message.author.id+"-"+message.guild.id]) return error.noPerms(message, "MANAGE_MESSAGES");

  let embed = new Discord.RichEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL)
    .addField("Server Name", message.guild.name, true)
    .addField("Server ID", message.guild.id, true)
    .addField("Server Owner", message.guild.members.get(message.guild.ownerID).user.username, true)
    .addField("Server Owner ID", message.guild.ownerID, true)
    .addField("Roles", message.guild.roles.size)
    .addField("Members", message.guild.members.size, true)
    .addField("Humans", message.guild.members.filter(member => !member.user.bot).size, true)
    .addField("Bots", message.guild.members.filter(member => member.user.bot).size, true)
    .addField("Channels", message.guild.channels.size, true)
    .addField("Text Channels", message.guild.channels.filter(channel => channel.type === "text").size, true)
    .addField("Voice Channel", message.guild.channels.filter(channel => channel.type === "voice").size, true)
    .setColor("#417af4")
    .setThumbnail(message.guild.iconURL)
    .setTimestamp()

  
  message.channel.send(embed)

   
}

exports.help = {
  name: "serverinfo",
  aliases: "si",
  hName: "ServerInfo",
  Description: "Gives a brief information about the server",
  usage: "　",
};
