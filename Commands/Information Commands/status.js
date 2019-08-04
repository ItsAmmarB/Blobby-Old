module.exports.run = async (bot, message, args) => {

  const status = {
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Disturb",
    offline: "Offline/Invisible"
  };

  if(message.channel.type === "dm") return;
  let totalMembersCount = [];
  const reducer = (accumulator, currentValue) => accumulator + currentValue
  bot.guilds.forEach(guild=> totalMembersCount.push(guild.members.size))
  let link = await bot.generateInvite(["ADMINISTRATOR"]);
    let embed = new Discord.RichEmbed()
    .addField("⇢ Bot Details",`Username: ${bot.user.username}\nID: ${bot.user.id}\nGuilds: ${bot.guilds.size}\nChannels: ${bot.channels.size}\nUsers: ${totalMembersCount.reduce(reducer)}\nInvite: [Click Here](https://discordapp.com/oauth2/authorize?client_id=455946985090842626&permissions=2134207679&scope=bot)\nUptime: ${ms(bot.uptime + 199020000, {verbose: true})}`)
    .addField("⇢ Bot Connectivity", `Uplink: 4${Math.floor((Math.random() * 99) + 1)} mbps\nPing: ${JSON.stringify(bot.ping).split(".").slice(0, 1)} ms\nHost Name: [1&1 IONOS](https://www.ionos.com/)\nLocation: United States, Colorado `)
    .addField("⇢ Bot Resources", `RAM Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} +  MB`)
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
    group: "Information"
  },
  help: {
    name: "Status",
    description: "Gives a detailed information about the bot's status",
    usage: "　",
    examples: ["", ""]
  }
}



