module.exports.run = async (bot, message, args) => {
	
	request("http://aws.random.cat/meow", {timeout: 5000}, function(err, res, body) {  
		let link = JSON.parse(body)
	return message.channel.send(new Discord.RichEmbed()
		.setImage(link.file)
		.setFooter("Powered by Google")
		.setColor("#417af4"))

	});
	};


exports.information = {
	trigger: {
		name: "cat",
		aliases: "ct",
	},
	permission: {
	  perm: "Cat",
	  group: "Miscellaneous"
	},
	help: {
		name: "Cat",
		description: "Sends a Cat picture",
		usage: "",
		examples: ["", ""]
	}
}



