module.exports.run = async (bot, message, args) => {
  message.channel.send(new Discord.RichEmbed()
	.setAuthor("Ping")
	.setDescription("Current Ping is: " + JSON.stringify(bot.ping).split(".").slice(0, 1) + " ms")
	.setColor("#417af4")
	)
  }


  exports.information = {
    trigger: {
      name: "ping",
      aliases: "ping",
    },
    permission: {
      perm: "ping",
      group: "User"
    },
    help: {
      name: "Ping",
      description: "Show Latency, Chance of downtime and current Uplink connection",
      usage: "　",
      examples: ["", ""]
    }
  }



