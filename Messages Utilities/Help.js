const Discord = module.require("discord.js");
const fs = require('fs');
const hColor = "#ffd623";

module.exports.helpMessage = (message) => {

    let embed = new Discord.RichEmbed()
        .setDescription("brief information about the **" + cmdInfo.help.name + "** command(SC:" + cmdInfo.trigger.aliases + ")")
        .addField("⇢ Command information", "• Description: " + cmdInfo.help.description + "\n• Usage: " + cmdInfo.help.usage + "\n• Examples:\n　　" + prefix + cmdInfo.help.name + " " + cmdInfo.help.examples[0] + "\n　　" + prefix + cmdInfo.help.name + " " + cmdInfo.help.examples[1])
        .setColor(hColor)

        if(cmdInfo["sections"]) {
                let subSections = Object.keys(cmdInfo.sections).map(name => ({ name: cmdInfo.sections[name].name, details: cmdInfo.sections[name] })).map(section => "**• " + section.name + "**\n　• Description: " + section.details.description + "\n　• Usage: " + section.details.usage + "\n　• Examples: \n" + "　　" + prefix + cmdInfo.help.name + " " + section.name + " " + section.details.examples[0] + "\n" + "　　" + prefix + cmdInfo.help.name + " " + section.name + " " + section.details.examples[1] + "\n")
                embed.addField("⇢ Command Sections", subSections)
        }

message.channel.send(embed);
}
