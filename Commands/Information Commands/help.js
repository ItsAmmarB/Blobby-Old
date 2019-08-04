module.exports.run = async (bot, message, args) => {
    let cName = args[0]
    if(!args[0]){
        let embed = new Discord.RichEmbed()
            .setAuthor(bot.user.username, bot.user.avatarURL)
            .setDescription(`Hello there, I'm ${bot.user.username}, a multi-purpose discord bot, I'm here to serve everyone and fullfil all their need.\nMy current prefix in '\`\`${message.guild.name}\`\`' is '\`\`${prefix}\`\`'.\nAnd here are all my current available commands:`)
            .addField("MODERATION", bot.moderationCommands.map(command => `\`\` ${prefix}${command.information.trigger.name}\`\``), true)
            .addField("MUSIC", bot.musicCommands.map(command => `\`\` ${prefix}${command.information.trigger.name}\`\``), true)
            .addField("SETTINGS", bot.settingsCommands.map(command => `\`\` ${prefix}${command.information.trigger.name}\`\``), true)
            .addField("MISCELLANEOUS", bot.miscellaneousCommands.filter(command => `\`\` ${prefix}${command.information.trigger.name}\`\`` !== "Help").map(command => `\`\` ${prefix}${command.information.trigger.name}\`\``), true)
            .addField("UTILITY", bot.utilityCommands.map(command => `\`\` ${prefix}${command.information.trigger.name}\`\``), true)
            .addField("GAMES", bot.gamesCommands.map(command => `\`\` ${prefix}${command.information.trigger.name}\`\``), true)
            .addField("INFORMATION", bot.informationCommands.map(command => `\`\` ${prefix}${command.information.trigger.name}\`\``), true)
            .setColor("#417af4")
        message.channel.send(new Discord.RichEmbed()
        .setDescription("Check your Direct Messages, Help message has been delivered!")
        .setColor("#417af4")
        )
       return message.author.send(embed)
    }    
    else if(bot.allCommands.get(cName)) {
        let embed = new Discord.RichEmbed()
        .setDescription("brief information about the **" + bot.allCommands.get(cName).information.help.name + "** command(SC:" + bot.allCommands.get(cName).information.trigger.aliases + ")")
        .addField("⇢ Command information", "• Description: " + bot.allCommands.get(cName).information.help.description + "\n• Usage: " + bot.allCommands.get(cName).information.help.usage + "\n• Examples:\n　" + prefix + bot.allCommands.get(cName).information.help.name + " " + bot.allCommands.get(cName).information.help.examples[0] + "\n　" + prefix + bot.allCommands.get(cName).information.help.name + " " + bot.allCommands.get(cName).information.help.examples[1])
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
      perm: "Help",
      group: "Information"
    },
    help: {
        name: "Help",
        description: "Guides you through the commands",
        usage: "<Command>",
        examples: ["Ban", "Fortnite"]
    }
  }