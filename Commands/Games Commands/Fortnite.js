module.exports.run = async (bot, message, args) => {
    if(message.author.id !== "357842475328733186") return error.invalid(message, cmdInfo.permission.perm, "Command is under development, access for developers and testers only")
    const embedpfp = "https://k7tjga.am.files.1drv.com/y4mdgfeDYGqlt4bwWFlaI8O9OVg6Bl2vLvU2Aimk8S9nQ00EktkYgUObK0rOqEsMJLeI4-foBy5AnojrMdIU9LJgk_FkVvinhIapUGzYWpkBXFm8bGmnfbgxoEQjmy2y6ey8T3UWA33Dl54Tw9lSozwvYQwaJedJow5c1TNFx42UctvjjDmPqetDdD_5WllO6o3o_PlbEzDzFBBzHLrA99SRA?width=300&height=300&cropmode=none"
    const subSection = args[0]
    const prams = args.slice(1).join(" ") || "pc";



    if(!subSection) {
        let ftn = JSON.parse(fs.readFileSync("./ftn.json", "utf8"));
        if(ftn[message.author.id + message.guild.id]) {
            ft.user(ftn[message.author.id + message.guild.id].FortniteUsername, ftn[message.author.id + message.guild.id].FortnitePlatform.toLowerCase()).then(player => {
                    if(player.stats.current_solo){
                    let embed2 = new Discord.RichEmbed()
                    .setAuthor(player.username + " On " + player.platform, embedpfp, player.url)
                    .setDescription(player.username + "'s Lifetime and Seasonal progress")
                    .addField("⇢ Summary", `Wins: ${JSON.parse(JSON.stringify(player.stats.lifetime[8])).Wins}\nScore: ${JSON.parse(JSON.stringify(player.stats.lifetime[6])).Score}\nKills: ${JSON.parse(JSON.stringify(player.stats.lifetime[10])).Kills}\nMatches: ${Object.values(JSON.parse(JSON.stringify(player.stats.lifetime[7])))}\nK/D: ${Object.values(JSON.parse(JSON.stringify(player.stats.lifetime[11])))}`)
                    .addField("⇢ Season 7 progress", `**Solo**\n　Wins: ${player.stats.current_solo.wins}\n　Score: ${player.stats.current_solo.score}\n　Kills: ${player.stats.current_solo.kills}\n　Matches: ${player.stats.current_solo.matches}\n　K/D: ${player.stats.current_solo.kd}\n**Duo**\n　Wins: ${player.stats.current_duo.wins}\n　Score: ${player.stats.current_duo.score}\n　Kills: ${player.stats.current_duo.kills}\n　Matches: ${player.stats.current_duo.matches}\n　K/D: ${player.stats.current_duo.kd}\n**Squad**\n　Wins: ${player.stats.current_squad.wins}\n　Score: ${player.stats.current_squad.score}\n　Kills: ${player.stats.current_squad.kills}\n　Matches: ${player.stats.current_squad.matches}\n　K/D: ${player.stats.current_squad.kd}`)
                    .addField("⇢ Lifetime progress", `**Solo**\n　Wins: ${player.stats.solo.wins}\n　Score: ${player.stats.solo.score}\n　Kills: ${player.stats.solo.kills}\n　Matches: ${player.stats.solo.matches}\n　K/D: ${player.stats.solo.kd}\n**Duo**\n　Wins: ${player.stats.duo.wins}\n　Score: ${player.stats.duo.score}\n　Kills: ${player.stats.duo.kills}\n　Matches: ${player.stats.duo.matches}\n　K/D: ${player.stats.duo.kd}\n**Squad**\n　Wins: ${player.stats.squad.wins}\n　Score: ${player.stats.squad.score}\n　Kills: ${player.stats.squad.kills}\n　Matches: ${player.stats.squad.matches}\n　K/D: ${player.stats.squad.kd}`)
                    .setColor("#417af4")
                    .setFooter("Stats are taken from FortniteTracker and it updates every 3 minutes")
                        message.channel.send(embed2)
                    } else {
                        let embed1 = new Discord.RichEmbed()
                        .setAuthor(player.username + " On " + player.platform, embedpfp, player.url)
                        .setDescription(player.username + "'s Lifetime progress")
                        .addField("⇢ Lifetime progress", `**Solo**\n　Wins: ${player.stats.solo.wins}\n　Score: ${player.stats.solo.score}\n　Kills: ${player.stats.solo.kills}\n　Matches: ${player.stats.solo.matches}\n　K/D: ${player.stats.solo.kd}\n**Duo**\n　Wins: ${player.stats.duo.wins}\n　Score: ${player.stats.duo.score}\n　Kills: ${player.stats.duo.kills}\n　Matches: ${player.stats.duo.matches}\n　K/D: ${player.stats.duo.kd}\n**Squad**\n　Wins: ${player.stats.squad.wins}\n　Score: ${player.stats.squad.score}\n　Kills: ${player.stats.squad.kills}\n　Matches: ${player.stats.squad.matches}\n　K/D: ${player.stats.squad.kd}`)
                        .setColor("#417af4")
                        .setFooter("Stats are taken from FortniteTracker and it updates every 3 minutes")
        
                        message.channel.send(embed1)
                    }
                return;
            }).catch(e => error.invalid(message))
            return;
        } else {
            help.helpMessage(message, "Fortnite", "Show your or frinds fortnite battle royal stats", "[username] (Platform)", "Max F. pc", "Ninja")
        }
    }
    else if(subSection.toUpperCase() === "LINK") {
        let Username = args[1];
        let Platform = args[2] || "pc";
        ft.user(Username, Platform).then(data => {
            let ftn = JSON.parse(fs.readFileSync("./ftn.json", "utf8"));
            if(ftn[message.author.id + message.guild.id]) return error.invalid(message, "FTN Link", "You already have an account linked")
            ftn[message.author.id + message.guild.id] = {
                Name: message.author.tag,
                ID: message.author.id,
                FortniteUsername: data.username,
                FortnitePlatform: data.platform,
                FortniteID: data.id
            }
            fs.writeFile("./ftn.json", JSON.stringify(ftn), err => {
                if(err) throw err;});
            success.ftnLinked(message, data.username)
        return;
    }).catch(e => error.invalid(message, "Username", "Username cannot be found, make sure it's \"Epic\" username"))

    } 
    else if(subSection.toUpperCase() === "UNLINK") {
        let ftn = JSON.parse(fs.readFileSync("./ftn.json", "utf8"));
        if(ftn[message.author.id + message.guild.id]) {
                success.ftnUnlinked(message, ftn[message.author.id + message.guild.id].FortniteUsername)
                delete ftn[message.author.id];
                fs.writeFile("./ftn.json", JSON.stringify(ftn), err => {
                    if(err) throw err;});
            return;
        } else return error.invalid(message, "FTN Unlink", "You have no account linked")
    }
    else if (ft.user(subSection, prams)) {
        let Username = args[0];
        let Platform = args[1] || "pc";
        ft.user(Username, Platform).then(player => {
            if(player.stats.current_solo){
                let embed2 = new Discord.RichEmbed()
                .setAuthor(player.username + " On " + player.platform, embedpfp, player.url)
                .setDescription(player.username + "'s Lifetime and Seasonal progress")
                .addField("⇢ Summary", `Wins: ${JSON.parse(JSON.stringify(player.stats.lifetime[8])).Wins}\nScore: ${JSON.parse(JSON.stringify(player.stats.lifetime[6])).Score}\nKills: ${JSON.parse(JSON.stringify(player.stats.lifetime[10])).Kills}\nMatches: ${Object.values(JSON.parse(JSON.stringify(player.stats.lifetime[7])))}\nK/D: ${Object.values(JSON.parse(JSON.stringify(player.stats.lifetime[11])))}`)
                .addField("⇢ Season 7 progress", `**Solo**\n　Wins: ${player.stats.current_solo.wins}\n　Score: ${player.stats.current_solo.score}\n　Kills: ${player.stats.current_solo.kills}\n　Matches: ${player.stats.current_solo.matches}\n　K/D: ${player.stats.current_solo.kd}\n**Duo**\n　Wins: ${player.stats.current_duo.wins}\n　Score: ${player.stats.current_duo.score}\n　Kills: ${player.stats.current_duo.kills}\n　Matches: ${player.stats.current_duo.matches}\n　K/D: ${player.stats.current_duo.kd}\n**Squad**\n　Wins: ${player.stats.current_squad.wins}\n　Score: ${player.stats.current_squad.score}\n　Kills: ${player.stats.current_squad.kills}\n　Matches: ${player.stats.current_squad.matches}\n　K/D: ${player.stats.current_squad.kd}`)
                .addField("⇢ Lifetime progress", `**Solo**\n　Wins: ${player.stats.solo.wins}\n　Score: ${player.stats.solo.score}\n　Kills: ${player.stats.solo.kills}\n　Matches: ${player.stats.solo.matches}\n　K/D: ${player.stats.solo.kd}\n**Duo**\n　Wins: ${player.stats.duo.wins}\n　Score: ${player.stats.duo.score}\n　Kills: ${player.stats.duo.kills}\n　Matches: ${player.stats.duo.matches}\n　K/D: ${player.stats.duo.kd}\n**Squad**\n　Wins: ${player.stats.squad.wins}\n　Score: ${player.stats.squad.score}\n　Kills: ${player.stats.squad.kills}\n　Matches: ${player.stats.squad.matches}\n　K/D: ${player.stats.squad.kd}`)
                .setColor("#417af4")
                .setFooter("Stats are taken from FortniteTracker and it updates every 3 minutes")
                    message.channel.send(embed2)
                } else {
                    let embed1 = new Discord.RichEmbed()
                    .setAuthor(player.username + " On " + player.platform, embedpfp, player.url)
                    .setDescription(player.username + "'s Lifetime progress")
                    .addField("⇢ Lifetime progress", `**Solo**\n　Wins: ${player.stats.solo.wins}\n　Score: ${player.stats.solo.score}\n　Kills: ${player.stats.solo.kills}\n　Matches: ${player.stats.solo.matches}\n　K/D: ${player.stats.solo.kd}\n**Duo**\n　Wins: ${player.stats.duo.wins}\n　Score: ${player.stats.duo.score}\n　Kills: ${player.stats.duo.kills}\n　Matches: ${player.stats.duo.matches}\n　K/D: ${player.stats.duo.kd}\n**Squad**\n　Wins: ${player.stats.squad.wins}\n　Score: ${player.stats.squad.score}\n　Kills: ${player.stats.squad.kills}\n　Matches: ${player.stats.squad.matches}\n　K/D: ${player.stats.squad.kd}`)
                    .setColor("#417af4")
                    .setFooter("Stats are taken from FortniteTracker and it updates every 3 minutes")
    
                    message.channel.send(embed1)
                }
            return;
        }).catch(e => error.invalid(message, "Username", "Username cannot be found, make sure it's \"Epic\" username"))
    } 
    else {
        message.reply("Mhmm!")
    }


};


exports.information = {
    trigger: {
        name: "fortnite",
        aliases: "ftn",
    },
    permission: {
        perm: "Fortnite",
        group: "Games"
    },
    help: {
        name: "Fortnite",
        description: "Shows yours or your friends stats in fornite.",
        usage: "<Epic Name> (Platform) \n **Note:** if no Platform provided PC will be default.",
        examples: ["MaxF.", "Link Alfredf"]
    },
    sections: [
        {
            permission: {
                perm: "Fortnite.Link",
                group: "Games"
            },
            name: "Link",
            shortcut: "l",
            description: "Links your epic account to your discord user.",
            usage: "<Epic Account>",
            examples: ["MaxF.", "Alfredf"]
        },
        {
            permission: {
                perm: "Fortnite.Unlink",
                group: "Games"
            },
            name: "Unlink",
            shortcut: "u",
            description: "Unlinks your epic account from your discord user.",
            usage: "",
            examples: ["", ""]
        },
        {
            permission: {
                perm: "Fortnite.Shop",
                group: "Games"
            },
            name: "Shop",
            shortcut: "s",
            description: "Show currect Item Shop items with prices or discription, price, rarity and price of spicific item.",
            usage: "<Item Number>",
            examples: ["1", "6"]
        },
        {
            permission: {
                perm: "Fortnite.WeeklyChallenges",
                group: "Games"
            },
            name: "WeeklyChallanges",
            shortcut: "wc",
            description: "Show the weeks's challanges for the current season. /n**Note:** If no week specified current week will be shows",
            usage: "(Week Number)",
            examples: ["3", "10"]
        }
    ]
}
