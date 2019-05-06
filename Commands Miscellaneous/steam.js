module.exports.run = async (bot, message, args) => {
	let steamURL = args[0];

	if(!steamURL) return help.helpMessage(message);

	if(!steamURL.includes("https://steamcommunity.com/id/") && !steamURL.includes("https://steamcommunity.com/profiles/")) return error.invalid(message, "Steam Profile URL")


	let stm = JSON.parse(fs.readFileSync("./Steam64.json", "utf8"));

	if(!stm[steamURL]) {

		let steamid = steam.resolve(steamURL)
		await steamid.then(id => {
		    let hex = converter.decToHex(id).slice(2)

			stm[steamURL] = {
			    SteamHex_ID: hex.toUpperCase(),
			    Steam64_ID: id,
			};

			fs.writeFile("./Steam64.json", JSON.stringify(stm), err => {
		    if(err) throw err;});

		});
	};

	 


		if(stm[steamURL]) {
		message.channel.send(new Discord.RichEmbed()
			.addField("Steam Profile Link", `[Click Here](${steamURL})`)
			.addField("Steam64 ID", stm[steamURL].Steam64_ID, true)
			.addField("SteamHex ID", stm[steamURL].SteamHex_ID, true)
			.setColor("#417af4")
			.setFooter(`Requested by ${message.author.username}`)
			.setTimestamp()
			);
		};

	 
	
	};


exports.information = {
	trigger: {
		name: "steam",
		aliases: "stm",
	},
	permission: {
	  perm: "Steam",
	  group: "Member"
	},
	help: {
		name: "Steam",
		description: "Converts any steam proflie URL into steam hex ID",
		usage: "[Steam Profile URL]",
		examples: ["https://steamcommunity.com/id/xTornadoZz/", "https://steamcommunity.com/id/chucklesmcdonald/"]
	}
}



