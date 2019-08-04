const Discord = module.require("discord.js");
const fs = require('fs');
const hColor = "#fbc21b";

module.exports.helpMessage = (message) => {

    let embed = new Discord.RichEmbed()
        .setDescription("brief information about the **" + cmdInfo.help.name + "** command(shortcut: " + cmdInfo.trigger.aliases + ")")
        .addField("⇢ Command information", "• Description: " + cmdInfo.help.description + "\n• Examples:\n　" + prefix + cmdInfo.help.name + " " + cmdInfo.help.examples[0] + "\n　" + prefix + cmdInfo.help.name + " " + cmdInfo.help.examples[1] + "\n⠀")
        .setColor(hColor)
        if(cmdInfo["sections"]) {
                let subSections = Object.keys(cmdInfo.sections).map(name => ({ name: cmdInfo.sections[name].name, details: cmdInfo.sections[name] })).map(section => "**• " + section.name + "**\n　• Description: " + section.details.description)
                embed.addField("⇢ Command Sections", subSections.join("\n")+ "\n⠀")
        }
        embed.addField("⇢ Usage", "⠀"+ prefix + cmdInfo.help.name + " " + cmdInfo.help.usage, true)
        embed.addField("⇢ Permission Node", " "+cmdInfo.permission.group +"." +cmdInfo.permission.perm, true)

message.channel.send(embed);
}

module.exports.sectionHelpMessage = (message) => {
        let section;
        if(cmdInfo.sections.find(sec => sec.name.toLowerCase() === message.content.split(" ")[1].toLowerCase())){
                section = cmdInfo.sections.find(sec => sec.name.toLowerCase() === message.content.split(" ")[1].toLowerCase())
        } else {
                section = cmdInfo.sections.find(sec => sec.shortcut.toLowerCase() === message.content.split(" ")[1].toLowerCase())
        }
        let embed = new Discord.RichEmbed()
            .setDescription("brief information about the **" + cmdInfo.help.name+"."+section.name + "** command(shortcut:" + cmdInfo.trigger.aliases +" "+ section.shortcut+ ")")
            .addField("⇢ Command Section information", "• Description: " + section.description + "\n• Examples:\n　" + prefix + cmdInfo.help.name + " " + section.name + " " + cmdInfo.help.examples[0] + "\n　" + prefix + cmdInfo.help.name + " " + section.name + " " + cmdInfo.help.examples[1])
            .addField("⇢ Usage", "⠀"+ prefix + cmdInfo.help.name +" " + section.name + " " + section.usage, true)
            .addField("⇢ Permission Node", "⠀"+section.permission.group +"." +section.permission.perm, true)
            .setColor(hColor)
    
    
    message.channel.send(embed);
    }

