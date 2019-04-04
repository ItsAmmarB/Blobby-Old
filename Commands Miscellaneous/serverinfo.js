module.exports.run = async (bot, message, args) => {
  if(!message.guild.owner.nickname) {
    nick = "No nickname"
  } else {
    nick = message.guild.owner.nickname
  }
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
  if(message.guild.members.filter(member=> member.user.bot).size === 0){
    memb = message.guild.members.filter(member => !member.user.bot).size + " Humans"
  } else if(message.guild.members.filter(member=> member.user.bot).size > 0) {
    memb = message.guild.members.filter(member => !member.user.bot).size + " Humans and " + message.guild.members.filter(member=> member.user.bot).size + " Bots"
  }
  message.guild.fetchInvites().then(invites => {
    let inte = invites.filter(invite => invite.maxAge === 0 )
    if(inte.size > 0) {
      inv =  `[Permanent Invite](${inte.map(invite => invite.url).slice(0, 1)})`
    } else {
      inv = "No available invites"
    }
    let embed = new Discord.RichEmbed()
    .setDescription("Information about **" + message.guild.name + "** (ID:" + message.guild.id + ")")
    .addField("⇢ Owner Details", `Nickname: ${nick}\nUsername: ${message.guild.owner.user.username}\nID: ${message.guild.ownerID}\nStatus: ${status[message.guild.owner.user.presence.status]}`)
    .addField("⇢ Server Details", `Name: ${message.guild.name}\nID: ${message.guild.id}\nRegion: ${message.guild.region.toString().toUpperCase()}\nMembers: ${memb}\nRoles: ${message.guild.roles.size}\nChannels: ${message.guild.channels.size}\nEmojis: ${message.guild.emojis.size}\nInvite: ${inv}\nCreated At: ${moment.utc(message.guild.createdAt).format("ddd, MMM Do YYYY, HH:mm:ss")}`)
    .setColor("#417af4")
    .setThumbnail(message.guild.iconURL)
    .setTimestamp()

  
  message.channel.send(embed)
  })

  

   
}

exports.information = {
  trigger: {
    name: "serverinfo",
    aliases: "si",
  },
  permission: {
    perm: "serverInfo",
    group: "Admin"
  },
  help: {
    name: "ServerInfo",
    description: "Gives a brief information about the server",
    usage: "　",
    examples: ["", ""]
  }
}
