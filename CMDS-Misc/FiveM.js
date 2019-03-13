module.exports.run = async (bot, message, args) => {
    const color = "#417af4";
    let subSection = args[0];

    if(!subSection){
        return help.FiveM(message, "FiveM", "Links your FiveM to extract some info", "Set", "Sets the IP of the server as the guild's FiveM Server", "136.432.66.34:32331", "Find", "Finds a player by his In-Game name", "Max F.", "Info", "Extracts the information of the server", " ","Status", "Graps the status of the server", " ",  "Players", "Extracts the players mapped by thier ID", " ", "ID", "Finds a player by his In-Game ID", "1", " ", " ", " ")    
    } 
    else if (subSection.toUpperCase() === "SET" || subSection.toUpperCase() === "SET"){
        let servers = JSON.parse(fs.readFileSync("./servers.json", "utf-8"));
        var ss = args.slice(1).join(" ");
        if (!message.member.hasPermission("MANAGE_GUILD")) return error.noPerms(message, "MANAGE_SERVER");
        if (!ss || ss === " " || ss == "" || ss === null) return help.helpMessage(message, "FiveM Set", "Sets the IP of the server as the guild's FiveM Server", "[SERVER IP:PORT]", "136.432.66.34:32331", "FiveMServer.net:port");
        if (!message.content.includes(":")) return error.invalid(message, "serverIP", "You need to include the port as well in this form [IP:PORT]");
          servers[message.guild.id] =  {
              guild: message.guild.id,
              ip: ss
          };
        fs.writeFile('./servers.json', JSON.stringify(servers), (err) => console.log(err));
        success.fmSet(message, ss, message.guild.name);
        return;
    }
    else if (subSection.toUpperCase() === "STATUS" || subSection.toUpperCase() === "S"){
        var util = require("../bot.js");
        let servers = JSON.parse(fs.readFileSync("./servers.json", "utf-8"));
    if (!servers[message.guild.id]) return error.invalid(message, "Server", "There are no servers linked!")
        try {
        var arg = `${servers[message.guild.id].ip}`   
        let api1 = `http://${arg}/players.json` 
        let api2 = `http://${arg}/info.json`
        request(api2, function (error, response, main) {
            request(api1, function (error, response, body) {
                try{
                    var start = JSON.parse(body)
                    var start2 = JSON.parse(main)
                    if (error) {
                        let embed = new Discord.RichEmbed()
                            .setAuthor(message.guild.name + "'s FiveM Server", "http://thatziv.ddns.net/assets/fivem.png")
                            .setDescription(`***Server Status:*** Offline
                            ***Server IP:*** ${servers[message.guild.id].ip}`)
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
                        return success.fmOnline(message, message.guild.name, servers[message.guild.id].ip, start.length + pl, start2.resources.length + rl)
                    }
                } catch(err) {
                    error.invalid(message, "Server", "Server cannnot be reached")
                }
            });
        });

      } catch (err) {
        return console.log(err)
      } 

    }
    else if (subSection.toUpperCase() === "PLAYERS" || subSection.toUpperCase() === "P"){
    var util = require("../bot.js");
    let servers = JSON.parse(fs.readFileSync("./servers.json", "utf-8"));
      if (!servers[message.guild.id]) return error.invalid(message, "Server", "There are no servers linked!")  
      try {
      var arg = `${servers[message.guild.id].ip}`
      let api = `http://${arg}/players.json`
      let api2 = `http://${arg}/info.json`
      request(api2, function (err, response, main) {
        request(api, function (err, response, body) {
            try {
                var start = JSON.parse(body)
                var start2 = JSON.parse(main)
        
                if (start == null || start == []) {
                    var e = 0
                } else {
                    var e = start.length;
                }

                var embed = new Discord.RichEmbed()
                .setColor(color)
                .setAuthor(message.guild.name + "'s FiveM Server Players", `http://thatziv.ddns.net/assets/fivem.png`)
                .setDescription(`**${e}** out of **${start2.vars.sv_maxClients}** Players.\n\n` + start.map(element => '**' + element.name + "**\n ID: ``" + element.id + "``   Ping: ``" + element.ping + "``").join("\n\n"))
                .setFooter(`Server IP: ${servers[message.guild.id].ip}`)
                message.channel.send({embed: embed});
            } catch (err) {
                console.log(err)
                error.invalid(message, "Server", "Server cannnot be reached")
            }
        

            })
      
        })
    
    } catch (err) {
        console.log(err)
    }
    }
    else if (subSection.toUpperCase() === "FIND" || subSection.toUpperCase() === "F"){
        var util = require("../bot.js");
        let servers = JSON.parse(fs.readFileSync("./servers.json", "utf-8"));
        var person = args.slice(1).join(" ")
        if (!message.member.hasPermission("ADMINISTRATOR") && Admins[message.author.id].guildID !== message.guild.id) return error.noPerms(message, "ADMINISTRATOR");
        if (!person) return help.helpMessage(message, "FiveM Find", "Finds a player by his In-Game name", "[Player name]", "Max F.", "Alfred F.")
        if (!servers[message.guild.id]) return error.invalid(message, "Server", "There are no servers linked!") 
        try {
            var arg = `${servers[message.guild.id].ip}`    
            let api = `http://${arg}/players.json`
            let api2 = `http://${arg}/info.json`
            request(api2, function (err, response, main) {
                request(api, function (err, response, body) {

                    if (err) {
                        console.log(err);
                        error.invalid(message, "Server", "Server cannot be reached")
                    }
                    else {
                        try {
                        var start = JSON.parse(body)
                        var start2 = JSON.parse(main)
                        } catch (err) {
                            console.log(err);
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
                            .addField("Identifiers", `SteamID64: \`\`${converter.hexToDec(steamHex.toString())}\`\`\nSteamIDhex: \`\`${ids.slice(1, 2).join(" ").split(":").slice(1).toString().toUpperCase()}\`\`\n Steam License: \`\`${ids.slice(3, 4).join(" ").split(":").slice(1)}\`\``)
                            .setFooter(`Server IP: ${servers[message.guild.id].ip}`)
                            message.channel.send({embed: embed})
                        } catch(err){
                            console.log(err)
                            error.invalid(message, "Player", "Player cannot be found")
                        }
                    }
                })
            })
        } catch (err) {
            console.log(err)
        }

    }
    else if (subSection.toUpperCase() === "ID"){
        var util = require("../bot.js");
        let servers = JSON.parse(fs.readFileSync("./servers.json", "utf-8"));
        var person = parseInt(args.slice(1).join(" "))
        if (!message.member.hasPermission("ADMINISTRATOR") && Admins[message.author.id].guildID !== message.guild.id) return error.noPerms(message, "ADMINISTRATOR");
        if (!person) return help.helpMessage(message, "FiveM Find", "Finds a player by his In-Game ID", "[Players ID]", "13", "1")
        if (!servers[message.guild.id]) return error.invalid(message, "Server", "There are no servers linked!") 
        var arg = `${servers[message.guild.id].ip}`    
        let api = `http://${arg}/players.json`
        let api2 = `http://${arg}/info.json`
        request(api2, function (err, response, main) {
            request(api, function (err, response, body) {
        
                if (err) {
                    console.log(err);
                    error.invalid(message, "Server", "Server cannot be reached")
                } 
                else {
                    try {
                        var start = JSON.parse(body)
                        var start2 = JSON.parse(main)
                        } catch (err) {
                            console.log(err);
                            error.invalid(message, "Server", "Server cannot be reached")
                        }     
                    try {
                    let result = start.find( found => found.id == `${person}`);
                    let ids = JSON.stringify(result.identifiers).split("\"")
                    let steamHex = ids.slice(1, 2).join(" ").split(":").slice(1);
                    let converter = require('hex2dec');
                    var embed = new Discord.RichEmbed()
                    .setColor(color)
                    .setAuthor(message.guild.name + "'s FiveM Server", `http://thatziv.ddns.net/assets/fivem.png`)
                    .addField("Username:", `${result.name}`, true)
                    .addField("Server ID:", result.id, true)
                    .addField("Ping:", result.ping, true)
                    .addField("Identifiers", `SteamID64: \`\`${converter.hexToDec(steamHex.toString())}\`\`\nSteamIDhex: \`\`${ids.slice(1, 2).join(" ").split(":").slice(1).toString().toUpperCase()}\`\`\n Steam License: \`\`${ids.slice(3, 4).join(" ").split(":").slice(1)}\`\``)
                    .setFooter(`Server IP: ${servers[message.guild.id].ip}`)
                    message.channel.send({embed: embed})     
                    } catch (err) {
                        console.log(err)
                        error.invalid(message, "Player", "Player cannot be found")
                    }
                }
            })
    
        })
    }
    else if (subSection.toUpperCase() === "INFO" || subSection.toUpperCase() === "I"){
        let servers = JSON.parse(fs.readFileSync("./servers.json", "utf-8"));
        if (!message.member.hasPermission("ADMINISTRATOR") && Admins[message.author.id].guildID !== message.guild.id) return error.noPerms(message, "ADMINISTRATOR");
        if (!servers[message.guild.id]) return error.invalid(message, "Server", "There are no servers linked!") 
        try {
        var arg = `${servers[message.guild.id].ip}`    
        let api = `http://${arg}/players.json`
        let api2 = `http://${arg}/info.json`
        request(api2, function (errr, response, main) {
            request(api, function (err, response, body) {
                if (err) {
                    console.log(err);
                    error.invalid(message, "Server", "Server cannnot be reached")
                }
                else {
                    try {
                    var start = JSON.parse(body)
                    var start2 = JSON.parse(main)
                    } catch (err) {
                        error.invalid(message, "Server", "Server cannnot be reached")
                    }
                    if (start === null || start === []) {
                        var e = 0
                    } else {
                        var e = start.length
                    }
                    if (!start2.vars.tags) {var tags = 'None'} else {var tags = start2.vars.tags}
                    var resourcee = start2.resources
                    if (resourcee.length > 850) {
                        var resourc = `There are too many...\n(Passed Discord Char Limit)`
                    } else {
                        var resourc = resourcee.map(resource=> "- " + resource).join("\n");
                    }
                    var embed = new Discord.RichEmbed()
                    .setColor(color)
                    .setAuthor(message.guild.name + "'s FiveM Server Information", `http://thatziv.ddns.net/assets/fivem.png`)
                    .addField("Total Players", `${e}/${start2.vars.sv_maxClients}`, true)
                    .addField("Script Hook", `${start2.vars.sv_scriptHookAllowed}`, true)
                    .addField("Server Version", `${start2.version}`, true)
                    .addField("Tags", `${tags}`)
                    .addField("Server", `${start2.server}`)
                    .addField("OneSync", `${start2.vars.onesync_enabled}`)
                    .addField("Resources", "```"+resourc+"```")
                    .setFooter(`Server IP: ${servers[message.guild.id].ip}`)
                
                    message.channel.send({embed: embed});
                }
            }) 
        })
        } catch (err) {
            console.log(err)
            error.invalid(message, "Server", "Server cannnot be reached")
        }
    }
    else return help.FiveM(message, "FiveM", "Links your FiveM to extract some info", "Set", "Sets the IP of the server as the guild's FiveM Server", "136.432.66.34:32331", "Find", "Finds a player by his In-Game name", "Max F.", "Info", "Extracts the information of the server", " ","Status", "Graps the status of the server", " ",  "Players", "Extracts the players mapped by thier ID", " ", "ID", "Finds a player by his In-Game ID", "1")

};

exports.help = {
    name: "fivem",
    aliases: "fm",
    hName: "FiveM",
    Description: "Links your FiveM server to log it and extract some info",
    usage: "set [SERVER IP WITH PORT]",
  };


