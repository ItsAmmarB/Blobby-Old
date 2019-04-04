module.exports.run = async (bot, message, args) => {
    let cName = args[0]
        if(bot.norCommands.get(cName)) {
            let embed = new Discord.RichEmbed()
            .setDescription("brief information about the **" + bot.norCommands.get(cName).information.help.name + "** command(SC:" + bot.norCommands.get(cName).information.trigger.aliases + ")")
            .addField("⇢ Command information", "• Description: " + bot.norCommands.get(cName).information.help.description + "\n• Usage: " + bot.norCommands.get(cName).information.help.usage + "\n• Examples:\n　" + prefix + bot.norCommands.get(cName).information.help.name + " " + bot.norCommands.get(cName).information.help.examples[0] + "\n　" + prefix + bot.norCommands.get(cName).information.help.name + " " + bot.norCommands.get(cName).information.help.examples[1])
            .setColor("ffd623")
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