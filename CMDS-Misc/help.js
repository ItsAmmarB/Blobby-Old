module.exports.run = async (bot, message, args) => {
    let sName = args[0]
        if(!sName) {
            let embed = new Discord.RichEmbed()
                .setTitle("Available Commands")
                .setAuthor("Help Command")
                .setDescription(`${commands.map(command => "**" + prefix + command.help.name + "**\n Shortcut: " + command.help.aliases + "\n").join("\n")}`)
                .setFooter(`Use ${prefix}help [command] for more information`)
                .setColor("#f46a24")
            message.channel.send(embed)  
           if (Dev[message.author.id] || Own[message.author.id]) { 
                let embed1 = new Discord.RichEmbed()
                    .setTitle("Developement Commands") 
                    .setDescription(`
                    ${ConCommands.map(command => "**" + prefix + command.help.name + "**\n Shortcut: " + command.help.aliases + "\n").join("\n")}
                    `)
                    .setColor("#f46a24")
                message.author.send(embed1)
            }
        } else if(commands.get(sName)) {
            let embed = new Discord.RichEmbed()
                .setAuthor("Help Command")
                .setTitle("Command: " + commands.get(sName).help.hName)
                .setDescription(`***Description:*** ${commands.get(sName).help.Description}
                ***Usage:*** ${prefix}${commands.get(sName).help.name} ${commands.get(sName).help.usage}
                `)
                .setColor("#f46a24");
            message.channel.send(embed)
            
        } else if (ConCommands.get(sName) && Dev[message.author.id] || ConCommands.get(sName) && Own[message.author.id]){
            let embed = new Discord.RichEmbed()
                .setAuthor("Developer Help Command")
                .setTitle("Command: " + ConCommands.get(sName).help.hName)
                .setDescription(`***Description:*** ${ConCommands.get(sName).help.Description}
                ***Usage:*** ${prefix}${ConCommands.get(sName).help.name} ${ConCommands.get(sName).help.usage}
                `)
                .setColor("#f46a24");
            message.channel.send(embed)
        }
        else {
            error.invalid(message, "cName", "Command cannot be found")
        }
}

module.exports.help = {
    name: "help",
    hName: "Help",
    Description: "Guides you through the commands",
    usage: " "
}