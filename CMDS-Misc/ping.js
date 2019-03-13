module.exports.run = async (bot, message, args) => {
  message.channel.send(new Discord.RichEmbed()
	.setAuthor("Ping")
	.setDescription("Current Ping is: " + bot.ping 
	+ "\nChance of DownTime: %13.839")
	.setColor("#417af4")
	)
  }

  exports.help = {
    name: "ping",
    aliases: "png",
    hName: "Ping",
    Description: "Show Latency, Chance of downtime and current Uplink connection",
    usage: "　",
  };



