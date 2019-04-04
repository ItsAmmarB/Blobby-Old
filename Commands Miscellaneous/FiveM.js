module.exports.run = async (bot, message, args) => {
    const color = "#417af4";
    let subSection = args[0];   
    const servers = Guild.findOne({_id: message.guild.id})

    if(!subSection) {
        return console.log("No Sub-Section");
    } 
    else if(subSection.toUpperCase() === "ADD" || subSection.toUpperCase() === "A") {
        servers.then(result => {
            let sIP = args[1];
            if(!sIP) return help.helpMessage(message)
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
            if(!sName) return error.missing(message, "serverName")
            if(!result.guildSettings.fiveMServers.find(server => server.serverName.toLowerCase() === sName.toLowerCase())) return error.invalid(message, "serverName", "Server name cannot be reconized")
            delFiveM(message, sName)
            success.delFiveM(message, sName)
        })
    }
    else if(subSection.toUpperCase() === "PLAYERS" || subSection.toUpperCase() === "P") {
        servers.then(result => {
            var sIP = args.slice(1).join(" ");
            if(result.guildSettings.fiveMServers.find(server => server.serverName === sIP)) {
                var sIP = result.guildSettings.fiveMServers.find(server => server.serverName === sIP).serverIP;
            } else {
                var sIP = args[1];
            }
             arg = `${sIP}`
             api = `http://${sIP}/players.json` 
            api2 = `http://${sIP}/info.json`
            try {
                request(api2, {timeout: 2000}, function (err, response, main) {
                    request(api, {timeout: 2000}, function (err, response, body) {
                        try {
                            var start = JSON.parse(body)
                            var start2 = JSON.parse(main)
                    
                            if (start == null || start == []) {
                                var e = 0
                            } else {
                                var e = start.length;
                            }
                            let sortedplayers = JSON.parse(body).map(key => ({ id: key.id, name: key.name })).sort((first, second) => (first.id < second.id) ? -1 : (first.id > second.id) ? 1 : 0 );
                            var embed = new Discord.RichEmbed()
                            .setColor(color)
                            .setDescription("FiveM Server Players (IP: "+ arg+")")
                            .addField(`**⇢  ${e}** out of **${start2.vars.sv_maxClients}** Players.`, `\n` + sortedplayers.map(sp => "**ID. " + sp.id + "**: " + sp.name).join("\n"))
                            .addField("**⇢** Join Server", "<fivem://connect/" + arg + "/>")
                            .setThumbnail("http://thatziv.ddns.net/assets/fivem.png")
                            message.channel.send({embed: embed});
                        } catch (err) {
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
      perm: "fivem",
      group: "Mod"
    },
    help: {
        hName: "FiveM",
        Description: "Links your FiveM server to log it and extract some info",
        usage: "set [SERVER IP WITH PORT]",
    }
  }


