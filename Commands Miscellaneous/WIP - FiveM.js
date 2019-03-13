module.exports.run = async (bot, message, args) => {
    const color = "#417af4";
    let subSection = args[0];   
    const servers = JSON.parse(fs.readFileSync("./servers.json", "utf-8"));

    if(args[1] && args[1].length > 8 && args[1].includes(":")) {
        if(!subSection){
            return help.FiveM(message)    
        } 
        else if (subSection.toUpperCase() === "SET" || subSection.toUpperCase() === "SET"){
            var ss = args.slice(1).join(" ");
            if (!message.member.hasPermission("MANAGE_GUILD")) return error.noPerms(message, "MANAGE_SERVER");
            if (!ss || ss === " " || ss == "" || ss === null) return help.helpMessage(message, "FiveM Set", "Sets the IP of the server as the guild's FiveM Server \n**Note:** Use '0' as a IP to reset the default IP adress of the server!", "<IP:PORT>", "136.432.66.34:32331", "FiveMServer.net:port");
            if(args[1].length === 1 && args[1] === "0") {
                delete servers[message.guild.id]
                fs.writeFile('./servers.json', JSON.stringify(servers), (err) => console.log(err));
                success.fmReset(message, ss, message.guild.name);
                return;
            }
            if (!message.content.includes(":")) return error.invalid(message, "serverIP", "You need to include the port as well in this form <IP:PORT>");
              servers[message.guild.id] =  {
                  guild: message.guild.id,
                  ip: ss
              };
            fs.writeFile('./servers.json', JSON.stringify(servers), (err) => console.log(err));
            success.fmSet(message, message.guild.name);
            return;
        }
        else if (subSection.toUpperCase() === "STATUS" || subSection.toUpperCase() === "S"){
            var util = require("../bot.js");
            
                arg = `${args[1]}`   
                api = `http://${arg}/players.json` 
                api2 = `http://${arg}/info.json`
            try {
    
            request(api2, {timeout: 2000}, function (err, response, main) {
                request(api, {timeout: 2000}, function (err, response, body) {
                    try{
                        var start = JSON.parse(body)
                        var start2 = JSON.parse(main)
                        if (err) {
                            let embed = new Discord.RichEmbed()
                                .setAuthor(message.guild.name + "'s FiveM Server", "http://thatziv.ddns.net/assets/fivem.png")
                                .setDescription(`***Server Status:*** Offline
                                ***Server IP:*** ${arg}`)
                                .setColor(color)
                            return message.channel.send(embed)
                        } else {
                            if(start.length === 1){
                                pl = " Player"
                            } else {
                                pl = " Players"
                            }
                            if(start2.resources.length === 1) {
                                rl = " Resource"
                            } else {
                                rl = " Resources"
                            }
                            return success.fmOnline(message, message.guild.name, arg, start.length + pl, start2.resources.length + rl)
                        }
                    } catch(err) {
                        error.invalid(message, "Server", "Server cannnot be reached")
                    }
                });
            });
    
          } catch (err) {
            return 
          } 
    
        }
        else if (subSection.toUpperCase() === "PLAYERS" || subSection.toUpperCase() === "P"){
        var util = require("../bot.js");
        
            arg = `${args[1]}`   
            api = `http://${arg}/players.json` 
            api2 = `http://${arg}/info.json`
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
                    .setAuthor(message.guild.name + "'s FiveM Server Players", `http://thatziv.ddns.net/assets/fivem.png`)
                    .setDescription(`**${e}** out of **${start2.vars.sv_maxClients}** Players.\n\n` + sortedplayers.map(sp => "**ID. " + sp.id + "**: " + sp.name).join("\n"))
                    .addField("Join Server", "<fivem://connect/" + arg + "/>")
                    .setFooter(`Server IP: ${arg}`)
                    message.channel.send({embed: embed});
                } catch (err) {
                    
                    error.invalid(message, "Server", "Server cannnot be reached")
                }
            
    
                })
          
            })
        
        } catch (err) {
            
        }
        }
        else if (subSection.toUpperCase() === "FIND" || subSection.toUpperCase() === "F"){
            var util = require("../bot.js");
            
            if (!message.member.hasPermission("ADMINISTRATOR") && Admins[message.author.id].guildID !== message.guild.id) return error.noPerms(message, "ADMINISTRATOR");
                arg = `${args[1]}`   
                api = `http://${arg}/players.json` 
                person = args.slice(2).join(" ")
            if (!person) return help.helpMessage(message, "FiveM Find", "Finds a player by his In-Game name", "[Player name]", "Max F.", "Alfred F.")
            try {
                    request(api, {timeout: 2000}, function (err, response, body) {
    
                        if (err) {
                            error.invalid(message, "Server", "Server cannot be reached")
                        }
                        else {
                            try {
                            var start = JSON.parse(body)
                            } catch (err) {

                                error.invalid(message, "Server", "Server cannot be reached")
                            }
                            try{    
                                let result = start.find( found => found.name === `${person}`);
                                let ids = JSON.stringify(result.identifiers).split("\"")
                                let steamHex = ids.slice(1, 2).join(" ").split(":").slice(1);
                                let converter = require('hex2dec');
                                var embed = new Discord.RichEmbed()
                                .setColor(color)
                                .setAuthor(message.guild.name + "'s FiveM Server", `http://thatziv.ddns.net/assets/fivem.png`)
                                .addField("Username:", `[${result.name}](https://steamcommunity.com/profiles/${converter.hexToDec(steamHex.toString())})`, true)
                                .addField("Server ID:", result.id, true)
                                .addField("Ping:", result.ping, true)
                                .addField("Identifiers", `SteamID64: \`\`${converter.hexToDec(steamHex.toString())}\`\`\nSteamIDhex: \`\`${ids.slice(1, 2).join(" ").split(":").slice(1).toString().toUpperCase()}\`\`\n Game License: \`\`${ids.slice(3, 4).join(" ").split(":").slice(1)}\`\``)
                                .setFooter(`Server IP: ${args[1]}`)
                                message.channel.send({embed: embed})
                            } catch(err){
                                error.invalid(message, "Player", "Player cannot be found")
                            }
                        }
                    })
            } catch (err) {
                
            }
    
        }
        else if (subSection.toUpperCase() === "ID"){
            var util = require("../bot.js");
            
            if (!message.member.hasPermission("ADMINISTRATOR") && Admins[message.author.id].guildID !== message.guild.id) return error.noPerms(message, "ADMINISTRATOR");
                arg = `${args[1]}`   
                api = `http://${arg}/players.json` 
                person = parseInt(args.slice(2))
            if (!person) return help.helpMessage(message, "FiveM ID", "Finds a player by his In-Game ID", "<IP:PORT> <Player ID>", "149.56.241.128:30123 14", "122")
                request(api, {timeout: 2000}, function (err, response, body) {
                        try {
                            var start = JSON.parse(body)
                            } catch (err) {
                                error.invalid(message, "Server", "Server cannot be reached")
                            }     
                        try {                           
                        let result = start.find(found => found.id === person);
                        let ids = JSON.stringify(result.identifiers).split("\"")
                        let steamHex = ids.slice(1, 2).join(" ").split(":").slice(1);
                        let converter = require('hex2dec');
                        var embed = new Discord.RichEmbed()
                        .setColor(color)
                        .setAuthor(message.guild.name + "'s FiveM Server", `http://thatziv.ddns.net/assets/fivem.png`)
                        .addField("Username:", `[${result.name}](https://steamcommunity.com/profiles/${converter.hexToDec(steamHex.toString())})`, true)
                        .addField("Server ID:", result.id, true)
                        .addField("Ping:", result.ping, true)
                        .addField("Identifiers", `SteamID64: \`\`${converter.hexToDec(steamHex.toString())}\`\`\nSteamIDhex: \`\`${ids.slice(1, 2).join(" ").split(":").slice(1).toString().toUpperCase()}\`\`\n Game License: \`\`${ids.slice(3, 4).join(" ").split(":").slice(1)}\`\``)
                        .setFooter(`Server IP: ${arg}`)
                        message.channel.send({embed: embed})     
                        } catch (err) {
                            console.log(err)
                            error.invalid(message, "Player", "Player cannot be found")
                        }
                })
        }
        else return help.FiveM(message, "FiveM", "Links your FiveM to extract some info", "Set", "Sets the IP of the server as the guild's FiveM Server", "136.432.66.34:32331", "Find", "Finds a player by his In-Game name", "Max F.", "Info", "Extracts the information of the server", " ","Status", "Graps the status of the server", " ",  "Players", "Extracts the players mapped by thier ID", " ", "ID", "Finds a player by his In-Game ID", "1")
        return;
    } else if(servers[message.guild.id]) {
        if(!subSection){
            return help.FiveM(message, "FiveM", "Links your FiveM server to extract some info\n**Note:** you can skip the ip address if you already set a default server using " + prefix + "fm set <IP:PORT>", "Set", "Sets the IP of the server as the guild's FiveM Server", "136.432.66.34:32331", "Find", "Finds a player by his In-Game name", "149.56.241.128:30123 Max F.","Status", "Graps the status of the server", "149.56.241.128:30123",  "Players", "Extracts the players mapped by thier ID", "149.56.241.128:30123", "ID", "Finds a player by his In-Game ID", "149.56.241.128:30123 12")    
        } 
        else if (subSection.toUpperCase() === "SET" || subSection.toUpperCase() === "SET"){
            
            var ss = args.slice(1).join(" ");
            if (!message.member.hasPermission("MANAGE_GUILD")) return error.noPerms(message, "MANAGE_SERVER");
            if (!ss || ss === " " || ss == "" || ss === null) return help.helpMessage(message, "FiveM Set", "Sets the IP of the server as the guild's FiveM Server \n**Note:** Use '0' as a IP to reset the default IP adress of the server!", "<IP:PORT>", "136.432.66.34:32331", "FiveMServer.net:port");
            if(args[1].length === 1 && args[1] === "0") {
                delete servers[message.guild.id]
                fs.writeFile('./servers.json', JSON.stringify(servers), (err) => console.log(err));
                success.fmReset(message, ss, message.guild.name);
                return;
            }
            if (!message.content.includes(":")) return error.invalid(message, "serverIP", "You need to include the port as well in this form <IP:PORT>");
              servers[message.guild.id] =  {
                  guild: message.guild.id,
                  ip: ss
              };
            fs.writeFile('./servers.json', JSON.stringify(servers), (err) => console.log(err));
            success.fmSet(message, message.guild.name);
            return;
        }
        else if (subSection.toUpperCase() === "STATUS" || subSection.toUpperCase() === "S"){
            var util = require("../bot.js");
            
                arg = `${servers[message.guild.id].ip}`   
                api = `http://${arg}/players.json` 
                api2 = `http://${arg}/info.json`
            try {
    
            request(api2, {timeout: 2000}, function (err, response, main) {
                request(api, {timeout: 2000}, function (err, response, body) {
                    try{
                        var start = JSON.parse(body)
                        var start2 = JSON.parse(main)
                        if (err) {
                            let embed = new Discord.RichEmbed()
                                .setAuthor(message.guild.name + "'s FiveM Server", "http://thatziv.ddns.net/assets/fivem.png")
                                .setDescription(`***Server Status:*** Offline
                                ***Server IP:*** ${arg}`)
                                .setColor(color)
                            return message.channel.send(embed)
                        } else {
                            if(start.length === 1){
                                pl = " Player"
                            } else {
                                pl = " Players"
                            }
                            if(start2.resources.length === 1) {
                                rl = " Resource"
                            } else {
                                rl = " Resources"
                            }
                            return success.fmOnline(message, message.guild.name, arg, start.length + pl, start2.resources.length + rl)
                        }
                    } catch(err) {
                        error.invalid(message, "Server", "Server cannnot be reached")
                    }
                });
            });
    
          } catch (err) {
            return 
          } 
    
        }
        else if (subSection.toUpperCase() === "PLAYERS" || subSection.toUpperCase() === "P"){
        var util = require("../bot.js");
        
            arg = `${servers[message.guild.id].ip}`   
            api = `http://${arg}/players.json` 
            api2 = `http://${arg}/info.json`
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
                    .setAuthor(message.guild.name + "'s FiveM Server Players", `http://thatziv.ddns.net/assets/fivem.png`)
                    .setDescription(`**${e}** out of **${start2.vars.sv_maxClients}** Players.\n\n` + sortedplayers.map(sp => "**ID. " + sp.id + "**: " + sp.name).join("\n"))
                    .addField("Join Server", "<fivem://connect/" + arg + "/>")
                    .setFooter(`Server IP: ${arg}`)
                    message.channel.send({embed: embed});
                } catch (err) {
                    
                    error.invalid(message, "Server", "Server cannnot be reached")
                }
            
    
                })
          
            })
        
        } catch (err) {
            
        }
        }
        else if (subSection.toUpperCase() === "FIND" || subSection.toUpperCase() === "F"){
            var util = require("../bot.js");
            
            if (!message.member.hasPermission("ADMINISTRATOR") && Admins[message.author.id].guildID !== message.guild.id) return error.noPerms(message, "ADMINISTRATOR");
                arg = `${servers[message.guild.id].ip}`   
                api = `http://${arg}/players.json` 
                person = args.slice(1).join(" ")
            if (!person) return help.helpMessage(message, "FiveM Find", "Finds a player by his In-Game name", "[Player name]", "Max F.", "Alfred F.")
            try {
                    request(api, {timeout: 2000}, function (err, response, body) {
    
                        if (err) {
                            error.invalid(message, "Server", "Server cannot be reached")
                        }
                        else {
                            try {
                            var start = JSON.parse(body)
                            } catch (err) {
                                error.invalid(message, "Server", "Server cannot be reached")
                            }
                            try{    
                                let result = start.find( found => found.name === `${person}`);
                                let ids = JSON.stringify(result.identifiers).split("\"")
                                let steamHex = ids.slice(1, 2).join(" ").split(":").slice(1);
                                let converter = require('hex2dec');
                                var embed = new Discord.RichEmbed()
                                .setColor(color)
                                .setAuthor(message.guild.name + "'s FiveM Server", `http://thatziv.ddns.net/assets/fivem.png`)
                                .addField("Username:", `[${result.name}](https://steamcommunity.com/profiles/${converter.hexToDec(steamHex.toString())})`, true)
                                .addField("Server ID:", result.id, true)
                                .addField("Ping:", result.ping, true)
                                .addField("Identifiers", `SteamID64: \`\`${converter.hexToDec(steamHex.toString())}\`\`\nSteamIDhex: \`\`${ids.slice(1, 2).join(" ").split(":").slice(1).toString().toUpperCase()}\`\`\n Game License: \`\`${ids.slice(3, 4).join(" ").split(":").slice(1)}\`\``)
                                .setFooter(`Server IP: ${servers[message.guild.id].ip}`)
                                message.channel.send({embed: embed})
                            } catch(err){
                                error.invalid(message, "Player", "Player cannot be found")
                            }
                        }
                    })
            } catch (err) {
                
            }
    
        }
        else if (subSection.toUpperCase() === "ID"){
            var util = require("../bot.js");
            
            if (!message.member.hasPermission("ADMINISTRATOR") && Admins[message.author.id].guildID !== message.guild.id) return error.noPerms(message, "ADMINISTRATOR");
                arg = `${servers[message.guild.id].ip}`   
                api = `http://${arg}/players.json` 
                person = parseInt(args.slice(1))
            if (!person) return help.helpMessage(message, "FiveM ID", "Finds a player by his In-Game ID", "<IP:PORT> <Player ID>", "149.56.241.128:30123 14", "122")
                request(api, {timeout: 2000}, function (err, response, body) {
            
                        try {
                            var start = JSON.parse(body)
                            } catch (err) {
                                error.invalid(message, "Server", "Server cannot be reached")
                            }     
                        try {                           
                        let result = start.find( found => found.id === person);
                        
                        let ids = JSON.stringify(result.identifiers).split("\"")
                        let steamHex = ids.slice(1, 2).join(" ").split(":").slice(1);
                        let converter = require('hex2dec');
                        var embed = new Discord.RichEmbed()
                        .setColor(color)
                        .setAuthor(message.guild.name + "'s FiveM Server", `http://thatziv.ddns.net/assets/fivem.png`)
                        .addField("Username:", `[${result.name}](https://steamcommunity.com/profiles/${converter.hexToDec(steamHex.toString())})`, true)
                        .addField("Server ID:", result.id, true)
                        .addField("Ping:", result.ping, true)
                        .addField("Identifiers", `SteamID64: \`\`${converter.hexToDec(steamHex.toString())}\`\`\nSteamIDhex: \`\`${ids.slice(1, 2).join(" ").split(":").slice(1).toString().toUpperCase()}\`\`\n Game License: \`\`${ids.slice(3, 4).join(" ").split(":").slice(1)}\`\``)
                        .setFooter(`Server IP: ${arg}`)
                        message.channel.send({embed: embed})     
                        } catch (err) {
                            error.invalid(message, "Player", "Player cannot be found")
                        }
                })
        }
        else return help.FiveM(message, "FiveM", "Links your FiveM to extract some info", "Set", "Sets the IP of the server as the guild's FiveM Server", "136.432.66.34:32331", "Find", "Finds a player by his In-Game name", "Max F.", "Info", "Extracts the information of the server", " ","Status", "Graps the status of the server", " ",  "Players", "Extracts the players mapped by thier ID", " ", "ID", "Finds a player by his In-Game ID", "1")
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


