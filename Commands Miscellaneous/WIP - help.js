module.exports.run = async (bot, message, args) => {
    if(!permCheck(message)) return error.noPerms(message, cmdInfo.permission.group + "." + cmdInfo.permission.perm)
    let sName = args[0]
        if(bot.commands.get(sName)) {
            let embed = new Discord.RichEmbed()
                .setAuthor("Help Command")
                .setTitle("Command: " + bot.commands.get(sName).help.hName)
                .setDescription(`***Description:*** ${bot.commands.get(sName).help.Description}
                ***Usage:*** ${prefix}${bot.commands.get(sName).help.name} ${bot.commands.get(sName).help.usage}
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


exports.information = {
    trigger: {
        name: "help",
        aliases: "help",
    },
    permission: {
      perm: "help",
      group: "Member"
    },
    help: {
        name: "Help",
        description: "Guides you through the commands",
        usage: "<Command>",
        examples: ["Ban", "Fortnite"]
    }
  }