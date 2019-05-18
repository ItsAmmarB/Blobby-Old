module.exports.run = async (bot, message, args) => {
	
	request("https://random.dog/woof.json", {timeout: 5000}, function(err, res, body) {  
		let link = JSON.parse(body)
		console.log(link.url)
		if(link.url.includes(".mp4")){
			request("https://random.dog/woof.json", {timeout: 5000}, function(err, res, body) {  
				let link = JSON.parse(body)
				console.log(link.url)

				return message.channel.send(new Discord.RichEmbed()
					.setImage(li+nk.url)
					.setFooter("Powered by Google")
					.setColor("#417af4"))

			});
		} else {
			return message.channel.send(new Discord.RichEmbed()
			.setImage(link.url)
			.setFooter("Powered by Google")
			.setColor("#417af4"))
		}
	});
};


exports.information = {
	trigger: {
		name: "dog",
		aliases: "dg",
	},
	permission: {
	  perm: "Dog",
	  group: "Miscellaneous"
	},
	help: {
		name: "Dog",
		description: "Sends a dog picture",
		usage: "",
		examples: ["", ""]
	}
}



