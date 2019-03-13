module.exports.run = async (bot, message, args) => {
    const embedpfp = "https://k7tjga.am.files.1drv.com/y4mdgfeDYGqlt4bwWFlaI8O9OVg6Bl2vLvU2Aimk8S9nQ00EktkYgUObK0rOqEsMJLeI4-foBy5AnojrMdIU9LJgk_FkVvinhIapUGzYWpkBXFm8bGmnfbgxoEQjmy2y6ey8T3UWA33Dl54Tw9lSozwvYQwaJedJow5c1TNFx42UctvjjDmPqetDdD_5WllO6o3o_PlbEzDzFBBzHLrA99SRA?width=300&height=300&cropmode=none"
    const subSection = args[0]
    const prams = args.slice(1).join(" ") || "pc"



    if(!subSection) {
        let ftn = JSON.parse(fs.readFileSync("./ftn.json", "utf8"));
        if(ftn[message.author.id + message.guild.id]) {
            ft.user(ftn[message.author.id + message.guild.id].FortniteUsername, ftn[message.author.id + message.guild.id].FortnitePlatform.toLowerCase()).then(data => {
                if(data.stats.current_solo){
                let embed2 = new Discord.RichEmbed()
                .setAuthor(data.username + " On " + data.platform, embedpfp, data.url)
                .setDescription(`__***LifeTime:***__

                　 **Solo:**
                  　　Score: ${data.stats.solo.score}
                  　　Score Per Match: ${data.stats.solo.score_per_match}
                  　　Kills: ${data.stats.solo.kills}
                  　　K\\D: ${data.stats.solo.kd}
                  　　Matches: ${data.stats.solo.matches}

                  　 **Duo:**
                  　　Score: ${data.stats.duo.score}
                  　　Score Per Match: ${data.stats.duo.score_per_match}
                  　　Kills: ${data.stats.duo.kills}
                  　　K\\D: ${data.stats.duo.kd}
                  　　Matches: ${data.stats.duo.matches}

                  　 **Squad:**
                  　　Score: ${data.stats.squad.score}
                  　　Score Per Match: ${data.stats.squad.score_per_match}
                  　　Kills: ${data.stats.squad.kills}
                  　　K\\D: ${data.stats.squad.kd}
                  　　Matches: ${data.stats.squad.matches}

                  __***Current Season:***__

                  　 **Solo:**
                  　　Score: ${data.stats.current_solo.score}
                  　　Score Per Match: ${data.stats.current_solo.score_per_match}
                  　　Kills: ${data.stats.current_solo.kills}
                  　　K\\D: ${data.stats.current_solo.kd}
                  　　Matches: ${data.stats.current_solo.matches}
                  　　Top 3: ${data.stats.current_solo.top_3}
                  　　Top 5: ${data.stats.current_solo.top_5}
                  　　Top 12: ${data.stats.current_solo.top_12}

                  　 **Duo:**
                  　　Score: ${data.stats.current_duo.score}
                  　　Score Per Match: ${data.stats.current_duo.score_per_match}
                  　　Kills: ${data.stats.current_duo.kills}
                  　　K\\D: ${data.stats.current_duo.kd}
                  　　Matches: ${data.stats.current_duo.matches}
                  　　Top 3: ${data.stats.current_duo.top_3}
                  　　Top 5: ${data.stats.current_duo.top_5}
                  　　Top 12: ${data.stats.current_duo.top_12}

                  　 **Squad:**
                  　　Score: ${data.stats.current_squad.score}
                  　　Score Per Match: ${data.stats.current_squad.score_per_match}
                  　　Kills: ${data.stats.current_squad.kills}
                  　　K\\D: ${data.stats.current_squad.kd}
                  　　Matches: ${data.stats.current_squad.matches}
                  　　Top 3: ${data.stats.current_squad.top_3}
                  　　Top 5: ${data.stats.current_squad.top_5}
                  　　Top 12: ${data.stats.current_squad.top_12}
                `)
                .setColor("#417af4")
                .setFooter("Stats are taken from FortniteTracker and it updates every 2 minutes")
                    message.channel.send(embed2)
                } else {
                    let embed1 = new Discord.RichEmbed()
                    .setAuthor(data.username + " On " + data.platform, embedpfp, data.url)
                    .setDescription(`__***LifeTime:***__
    
                    　 **Solo:**
                      　　Score: ${data.stats.solo.score}
                      　　Score Per Match: ${data.stats.solo.score_per_match}
                      　　Kills: ${data.stats.solo.kills}
                      　　K\\D: ${data.stats.solo.kd}
                      　　Matches: ${data.stats.solo.matches}
    
                      　 **Duo:**
                      　　Score: ${data.stats.duo.score}
                      　　Score Per Match: ${data.stats.duo.score_per_match}
                      　　Kills: ${data.stats.duo.kills}
                      　　K\\D: ${data.stats.duo.kd}
                      　　Matches: ${data.stats.duo.matches}
    
                      　 **Squad:**
                      　　Score: ${data.stats.squad.score}
                      　　Score Per Match: ${data.stats.squad.score_per_match}
                      　　Kills: ${data.stats.squad.kills}
                      　　K\\D: ${data.stats.squad.kd}
                      　　Matches: ${data.stats.squad.matches}
    
                    `)
                    .setColor("#417af4")
                    .setFooter("Stats are taken from FortniteTracker and it updates every 2 minutes")
    
                    message.channel.send(embed1)
                }
            return;
        })


        return;
        } else {
            help.helpMessage(message, "Fortnite", "Shows yours or your friends stats in fornite", "[Epic Name] (Platform)  \n**Note:** if no console type provided PC will be default.", "MaxF.", "AmoorG4mer ps4");
            return;
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
        ft.user(Username, Platform).then(data => {
                if(data.stats.current_solo){
                let embed2 = new Discord.RichEmbed()
                .setAuthor(data.username + " On " + data.platform, embedpfp, data.url)
                .setDescription(`__***LifeTime:***__

                　 **Solo:**
                  　　Score: ${data.stats.solo.score}
                  　　Score Per Match: ${data.stats.solo.score_per_match}
                  　　Kills: ${data.stats.solo.kills}
                  　　K\\D: ${data.stats.solo.kd}
                  　　Matches: ${data.stats.solo.matches}

                  　 **Duo:**
                  　　Score: ${data.stats.duo.score}
                  　　Score Per Match: ${data.stats.duo.score_per_match}
                  　　Kills: ${data.stats.duo.kills}
                  　　K\\D: ${data.stats.duo.kd}
                  　　Matches: ${data.stats.duo.matches}

                  　 **Squad:**
                  　　Score: ${data.stats.squad.score}
                  　　Score Per Match: ${data.stats.squad.score_per_match}
                  　　Kills: ${data.stats.squad.kills}
                  　　K\\D: ${data.stats.squad.kd}
                  　　Matches: ${data.stats.squad.matches}

                  __***Current Season:***__

                  　 **Solo:**
                  　　Score: ${data.stats.current_solo.score}
                  　　Score Per Match: ${data.stats.current_solo.score_per_match}
                  　　Kills: ${data.stats.current_solo.kills}
                  　　K\\D: ${data.stats.current_solo.kd}
                  　　Matches: ${data.stats.current_solo.matches}
                  　　Top 3: ${data.stats.current_solo.top_3}
                  　　Top 5: ${data.stats.current_solo.top_5}
                  　　Top 12: ${data.stats.current_solo.top_12}

                  　 **Duo:**
                  　　Score: ${data.stats.current_duo.score}
                  　　Score Per Match: ${data.stats.current_duo.score_per_match}
                  　　Kills: ${data.stats.current_duo.kills}
                  　　K\\D: ${data.stats.current_duo.kd}
                  　　Matches: ${data.stats.current_duo.matches}
                  　　Top 3: ${data.stats.current_duo.top_3}
                  　　Top 5: ${data.stats.current_duo.top_5}
                  　　Top 12: ${data.stats.current_duo.top_12}

                  　 **Squad:**
                  　　Score: ${data.stats.current_squad.score}
                  　　Score Per Match: ${data.stats.current_squad.score_per_match}
                  　　Kills: ${data.stats.current_squad.kills}
                  　　K\\D: ${data.stats.current_squad.kd}
                  　　Matches: ${data.stats.current_squad.matches}
                  　　Top 3: ${data.stats.current_squad.top_3}
                  　　Top 5: ${data.stats.current_squad.top_5}
                  　　Top 12: ${data.stats.current_squad.top_12}
                `)
                .setColor("#417af4")
                .setFooter("Stats are taken from FortniteTracker and it updates every 2 minutes")
                    message.channel.send(embed2)
                } else {
                    let embed1 = new Discord.RichEmbed()
                    .setAuthor(data.username + " On " + data.platform, embedpfp, data.url)
                    .setDescription(`__***LifeTime:***__
    
                    　 **Solo:**
                      　　Score: ${data.stats.solo.score}
                      　　Score Per Match: ${data.stats.solo.score_per_match}
                      　　Kills: ${data.stats.solo.kills}
                      　　K\\D: ${data.stats.solo.kd}
                      　　Matches: ${data.stats.solo.matches}
    
                      　 **Duo:**
                      　　Score: ${data.stats.duo.score}
                      　　Score Per Match: ${data.stats.duo.score_per_match}
                      　　Kills: ${data.stats.duo.kills}
                      　　K\\D: ${data.stats.duo.kd}
                      　　Matches: ${data.stats.duo.matches}
    
                      　 **Squad:**
                      　　Score: ${data.stats.squad.score}
                      　　Score Per Match: ${data.stats.squad.score_per_match}
                      　　Kills: ${data.stats.squad.kills}
                      　　K\\D: ${data.stats.squad.kd}
                      　　Matches: ${data.stats.squad.matches}
    
                    `)
                    .setColor("#417af4")
                    .setFooter("Stats are taken from FortniteTracker and it updates every 2 minutes")
    
                    message.channel.send(embed1)
                }
            return;
        }).catch(e => error.invalid(message, "Username", "Username cannot be found, make sure it's \"Epic\" username"))
    } 
    else {
        message.reply("Mhmm!")
    }


};

exports.help = {
    name: "fortnite",
    aliases: "ftn",
    hName: "Fortnite",
    Description: "Shows yours or your friends stats in fornite",
    usage: "[Epic Name] (Platform) \n **Note:** if no Platform provided PC will be default.",
  };
