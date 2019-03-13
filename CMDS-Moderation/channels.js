module.exports.run = async (bot, message, args) => {
  if(message.channel.type === "dm") return;
  if(!message.member.hasPermission("MANAGE_MESSAGES") && !Admins[message.author.id+"-"+message.guild.id] && Mods[message.author.id+"-"+message.guild.id]) return error.noPerms(message, "MANAGE_MESSAGES");
  if(message.guild.channels.filter(channel => channel.type !== "category").array().length < 2) {
    rNumVT = "Channel"
  } else {
    rNum = "Channels"
  }
  if(message.guild.channels.filter(channel => channel.type === "category").array().length < 2) {

  rNumC = "Categories"
  rNumC = "Category"
  message.channel.send(new Discord.RichEmbed()
    .setAuthor("All " + message.guild.name + "'s Channels", message.guild.iconURL)
    .addField("")
    .setColor("#417af4")
    )
  
  } 
}

exports.help = {
  name: "channels",
  aliases: "chnls",
  hName: "Channels",
  Description: "Show all the channels within the guild",
  usage: "　",
};        　
　
