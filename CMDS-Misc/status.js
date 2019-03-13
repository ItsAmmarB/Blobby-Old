module.exports.run = async (bot, message, args) => {

  const status = {
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Disturb",
    offline: "Offline/Invisible"
  };

  if(message.channel.type === "dm") return;
  if(!message.member.hasPermission("ADMINISTRATOR") && !Admins[message.author.id+"-"+message.guild.id] && !Mods[message.author.id+"-"+message.guild.id]) return error.noPerms(message, "ADMINISTRATOR");
      let embed = new Discord.RichEmbed()
      .setAuthor(`${bot.user.tag}`, `${bot.user.displayAvatarURL}`)
      .addField("Username", bot.user.username, true)
      .addField("ID", `${bot.user.id}`, true)
      .addField("Status", status[bot.user.presence.status])
      .addField("Up Time", moment.utc(bot.uptime).format("HH:mm:ss"), true)
      .addField("Ping", bot.ping, true)
      .addField("Guilds", bot.guilds.size + " Guilds", true)
      .addField("Users", bot.users.size + " Users", true)
      .setThumbnail(bot.user.avatarURL)
      .setFooter(`${moment.utc(bot.user.createdAt).format("ddd, MMM Do YYYY, HH:mm:ss")}`)
      .setColor("#417af4")
      .setTimestamp();
    message.channel.send(embed);
   
}	

exports.help = {
  name: "status",
  aliases: "s",
  hName: "Status",
  Description: "Give a brief information  about the bot's status",
  usage: "　",
};



