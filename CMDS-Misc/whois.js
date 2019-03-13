module.exports.run = async (bot, message, args) => {

  const status = {
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Disturb",
    offline: "Offline/Invisible"
  };

  if(message.channel.type === "dm") return;
  if(!message.member.hasPermission("MANAGE_MESSAGES") && !Admins[message.author.id+"-"+message.guild.id] && !Mods[message.author.id+"-"+message.guild.id]) return error.noPerms(message, "MANAGE_MESSAGES");
  const member = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!args[0]) return help.helpMessage(bot, message, "Userinfo", "Gives a brief information about a user ", "[User]", "@" + me.tag, me.id)
  if(!member) return error.invalid(message, "User", "User cannot be found")
      let embed = new Discord.RichEmbed()
      .setAuthor(`${member.user.tag}`, `${member.user.displayAvatarURL}`)
      .addField("Username", member.user.username, true)
      .addField("ID", `${member.id}`, true)
      .addField("Status", `${status[member.presence.status]}`, true)
      .addField("Playing", `${member.user.presence.game ? `${member.user.presence.game.name}` : "not playing anything."}`, true)
      .setThumbnail(member.user.avatarURL)
      .addField("joined At", `${moment.utc(member.user.joinedAt).format("ddd, MMM Do YYYY, HH:mm:ss")}`, true)
      .addField("Created At", `${moment.utc(member.user.createdAt).format("ddd, MMM Do YYYY, HH:mm:ss")}`, true)
      .addField("Roles", `${member.roles.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "No Roles"}`)
      .setColor("#417af4")
      .setTimestamp();
    message.channel.send(embed);
   
}	

exports.help = {
  name: "whois",
  aliases: "wi",
  hName: "whois",
  Description: "Gives a brief information about a user ",
  usage: "[User]",
};



