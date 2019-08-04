module.exports.run = async (bot, message, args) => {

    let XP = JSON.parse(fs.readFileSync("./XP.json", "utf8"));

	let SortedUsers = Object.keys(XP).map(key => ({ key: key, value: XP[key] })).filter(key => key.value.GuildID === message.guild.id).sort((first, second) => (first.value.XP > second.value.XP) ? -1 : (first.value.XP < second.value.XP) ? 1 : 0 );

	let embed = new Discord.RichEmbed()
		.setAuthor(message.guild.name + "'s Leaderboard", message.guild.iconURL)
		.setTimestamp()
		.setColor("#417af4")
	
	for(i = 0; i < SortedUsers.length; i++) {
		embed.addField([i + 1] + " - " + SortedUsers[i].value.Tag, "**XP: **``" + SortedUsers[i].value.XP + "``  **-  Level: **``" + SortedUsers[i].value.Level + "``")
		if(i > 25) {
			embed.setTitle("Top 25")
			message.channel.send(embed)
		}
	}

	message.channel.send(embed)
}


exports.information = {
	trigger: {
		name: "leaderboard",
		aliases: "lb",
	},
	permission: {
	  perm: "Leaderboard",
	  group: "Information"
	},
	help: {
		name: "Leaderboard",
		Description: "Shows the leaderboard",
		usage: " ",
		examples: ["", ""]
	}
}

