module.exports.run = async (bot, message, args) => {
	
	request("http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=false", {timeout: 5000}, function(err, res, body) {  
	return message.channel.send(new Discord.RichEmbed()
		.setImage(body.split("\"")[1])
		.setFooter("Powered by shibe.online")
		.setColor("#417af4"))

	});
	};


exports.information = {
	trigger: {
		name: "doge",
		aliases: "dge",
	},
	permission: {
	  perm: "Doge",
	  group: "Miscellaneous"
	},
	help: {
		name: "Doge",
		description: "Sends a doge picture",
		usage: "",
		examples: ["", ""]
	}
}



