module.exports.run = async (bot, message, args) => {
    const color = "#417af4";
    let subSection = args[0];   
    const servers = Guild.findOne({_id: message.guild.id})

    if(!subSection) {
        return help.helpMessage(message)
    } 
    else if(subSection.toUpperCase() === "ADD" || subSection.toUpperCase() === "A") {
        servers.then(result => {
            let sIP = args[1];
            if(!sIP) return help.sectionHelpMessage(message)
            if(sIP.length < 6) return error.invalid(message, "serverIP", "You need to provide a valid server IP")
            if(!sIP.includes(":")) return error.invalid(message, "serverIP", "You need to provide the IP with the Port <IP:PORT>")
            let sName = args.slice(2).join(" ")
            if(!sName) return error.missing(message, "serverName")
            if(result.guildSettings.fiveMServers.find(server => server.serverName.toLowerCase() === sName.toLowerCase())) return error.invalid(message, "serverName", "Server name is already used in this guild")
            newFiveM(message, sName, sIP)
            success.addFiveM(message, sName, sIP)
        })
    }
    else if(subSection.toUpperCase() === "DELETE" || subSection.toUpperCase() === "D") {
        servers.then(result => {        
             let sName = args.slice(1).join(" ")
            if(!sName) return help.sectionHelpMessage(message)
            if(!result.guildSettings.fiveMServers.find(server => server.serverName.toLowerCase() === sName.toLowerCase())) return error.invalid(message, "serverName", "Server name cannot be reconized")
            delFiveM(message, sName)
            success.delFiveM(message, sName)
        })
    }
    else if(subSection.toUpperCase() === "PLAYERS" || subSection.toUpperCase() === "P") {
        servers.then(result => {
            var sIP = args.slice(1).join(" ");
            if(!sIP) return help.sectionHelpMessage(message)
            if(result.guildSettings.fiveMServers.find(server => server.serverName === sIP)) {
                var sIP = result.guildSettings.fiveMServers.find(server => server.serverName === sIP).serverIP;
            } else {
                var sIP = args[1];
            }
             arg = `${sIP}`
             api = `http://${sIP}/players.json` 
            api2 = `http://${sIP}/info.json`
            try {
                request(api2, {timeout: 5000}, function (err, response, main) {
                    request(api, {timeout: 5000}, function (err, response, body) {
                        try {
                            var start = JSON.parse(body)
                            var start2 = JSON.parse(main)
                    
                            if (start == null || start == [] || start.length < 1) {
                                var e = 0
                            } else {
                                var e = start.length;
                            }
                            let sortedplayers = JSON.parse(body).map(key => ({ id: key.id, name: key.name })).sort((first, second) => (first.id < second.id) ? -1 : (first.id > second.id) ? 1 : 0 );
                            if(sortedplayers.length < 1) {
                                var players = "No players found!"
                            } else {
                                var players = sortedplayers.map(sp => "**ID." + sp.id + "**: " + sp.name).join("\n")
                            }
                            var embed = new Discord.RichEmbed()
                            .setColor(color)
                            .setAuthor("FiveM Server Players (IP: "+ arg+")")
                            .setTitle(`**⇢  ${e}** out of **${start2.vars.sv_maxClients}** Players.`)
                            .setDescription(playuers)
                            .addField("**⇢** Join Server", "<fivem://connect/" + arg + "/>")
                            .setThumbnail("http://thatziv.ddns.net/assets/fivem.png")
                            message.channel.send({embed: embed});
                        } catch (err) {
                            console.log(err)
                            error.invalid(message, "Server", "Server cannnot be reached")
                        }
                        })
                    })
            } catch (err) {
            }
        })
    }
}

exports.information = {
    trigger: {
        name: "fivem",
        aliases: "fm",
    },
    permission: {
        perm: "FiveM",
        group: "Games"
    },
    help: {
        name: "FiveM",
        description: "Links your FiveM server to log it and extract some info.",
        usage: "<SubSection>",
        examples: ["set 127.0.0.1:30330 server1", "players server1"]
    },
    sections: [
        {
            permission: {
                perm: "FiveM.Add",
                auth: "Admin",
                group: "Games"
            },
            name: "Add",
            shortcut: "a",
            description: "Adds the FiveM server to the Discord's database for easy access.",
            usage: "<IP:Port> <Server Name>",
            examples: ["Main Server.", "S1"]
        },
        {
            permission: {
                perm: "FiveM.Delete",
                auth: "Admin",
                group: "Games"
            },
           name: "Delete",
            shortcut: "d",
            description: "Removes the FiveM server from the Discord's database.",
            usage: "<Server Name>",
            examples: ["Server 1", "Main Server"]
        },
        {
            permission: {
                perm: "FiveM.Players",
                group: "Games"
            },
           name: "Players",
            shortcut: "p",
            description: "Shows the player in the specified server ranked by their ID.",
            usage: "<Server Name // IP:Port>",
            examples: ["Main Server", "172.0.0.1:30330"]
        }
    ]
}


