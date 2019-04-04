module.exports.run = async (bot, message, args) => {
  const status = {
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Disturb",
    offline: "Offline/Invisible"
  };

  const presence = {
    "0": "Playing ",
    "1": "Steaming ",
    "2": "Listening To ",
    "3": "Watching "
  }

  if(args[0] && args[0].toUpperCase() === "HELP") return help.helpMessage(message)
  const member = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]) || message.member;
  if(!member) return error.invalid(message, "User", "User cannot be found")
  let position = JSON.stringify(Object.values(message.guild.members.map(member => ({ name: member.user.username, id: member.user.id, joinedAt: member.joinedTimestamp}))).sort((first, second) => (first.joinedAt < second.joinedAt) ? -1 : (first.joinedAt > second.joinedAt) ? 1 : 0 )).split(member.id).slice(0, 1).join("").split("\"id\"").length - 1
  if(member.roles.size - 1 === 0){
    roles = "No roles"
  } else if(member.roles.size - 1 < 20){
    roles = member.roles.array().slice(1)
  } else {
    roles = "Too much roles"
  }

  if(!member.nickname) {
    nick = "No nickname"
  } else {
    nick = member.nickname
  }
  if(member.user.bot){
    bot = "Yes"
  } else {
    bot = "No"
  }
  if(member.user.presence.game){
    pres = presence[member.user.presence.game.type] + " " + member.user.presence.game.name;
  } else {
    pres = "None"
  }
      let embed = new Discord.RichEmbed()
      .setDescription("Who is **" + member.user.username + "** (ID:" + member.id + ")")
      .addField("⇢ Member Details", `Nickname: ${nick}\nID: ${member.id}\nPosition ${position}\nJoined At: ${moment.utc(member.joinedAt).format("M/D/YYYY HH:mm:ss")}\nRoles: ${roles}`)
      .addField("⇢ User Details", `Username: ${member.user.username}\nID: ${member.id}\nStatus ${status[member.user.presence.status]}\nBot: ${bot}\nActivity: ${pres} \nCreated At: ${moment.utc(member.user.createdAt).format("M/D/YYYY HH:mm:ss")}`)
      .setThumbnail(member.user.avatarURL)
      .setColor("#417af4")
    message.channel.send(embed);
   
}	

const me = bot.users.get("357842475328733186");
exports.information = {
  trigger: {
    name: "whois",
    aliases: "wi",
  },
  permission: {
    perm: "whoIs",
    group: "Admin"
  },
  help: {
    name: "whois",
    description: "Gives a brief information about a user ",
    usage: "<User>",
    examples: [me.tag, me.id]
  }
}



