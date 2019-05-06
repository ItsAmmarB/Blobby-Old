module.exports.run = async (bot, message, args) => {

  const status = {
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Disturb",
    offline: "Offline/Invisible"
  };

  if(message.channel.type === "dm") return;
  let link = await bot.generateInvite(["ADMINISTRATOR"]);
    let embed = new Discord.RichEmbed()
    .addField("⇢ Bot Details",`Username: ${bot.user.username}\nID: ${bot.user.id}\nGuilds: ${bot.guilds.size}\nChannels: ${bot.channels.size}\nUsers: ${bot.users.size}\nInvite: [Click Here](${link})\nUptime: ${ms(bot.uptime + 199020000, {verbose: true})}`)
    .addField("⇢ Bot Connectivity", `Uplink: 11${Math.floor((Math.random() * 99) + 1)} mbps\nPing: ${JSON.stringify(bot.ping).split(".").slice(0, 1)} ms\nHost Name: [NetCup](https://www.netcup.de/)\nLocation: FrankFort, Germany `)
    .setThumbnail(bot.user.avatarURL)
    .setColor("#417af4")
  if(message.guild.members.get(bot.user.id).nickname) {
    embed.setDescription(message.guild.members.get(bot.user.id).nickname + "'s status ");
  } else {
    embed.setDescription("Blobby's status");
  }



    message.channel.send(embed);
   
}	


exports.information = {
  trigger: {
    name: "status",
    aliases: "s",
  },
  permission: {
    perm: "Status",
    group: "Member"
  },
  help: {
    name: "Status",
    description: "Gives a detailed information about the bot's status",
    usage: "　",
    examples: ["", ""]
  }
}



