const Discord = module.require("discord.js");
const fs = require('fs');
const hColor = "#f46a24";

module.exports.helpMessage = (message, cmd, description, usage, example1, example2) => {

    let embed = new Discord.RichEmbed()
        .setTitle(`Command: ${cmd}`)
		.setDescription(`\*\*Description:\*\* ${description}.\n\*\*Usage:\*\* ${prefix}${cmd.toLowerCase()} ${usage}\n\*\*Examples:\*\*\n  ${prefix}${cmd.toLowerCase()} ${example1}\n${prefix}${cmd.toLowerCase()} ${example2}  `)
		.setFooter(`Helping ${message.author.username}`)
        .setColor(hColor)
        .setTimestamp()

message.channel.send(embed);
}

module.exports.role = (message, cmd, description, subcmd1, cmddes1, cmdex1, subcmd2, cmddes2, cmdex2, subcmd3, cmddes3, cmdex3, subcmd4, cmddes4, cmdex4, subcmd5, cmddes5, cmdex5, subcmd6, cmddes6, cmdex6, subcmd7, cmddes7) => {

	let embed = new Discord.RichEmbed()
        .setTitle(`Command: ${cmd}`)
        .setDescription(`\*\*Description:\*\* 
        ${description}.
        
        \*\*Sections:\*\*\ 
        　\*\*${subcmd1}:\*\*
        　　 ${cmddes1}
        　　 ${prefix}${cmd.toLowerCase()} ${subcmd1.toLowerCase()} ${cmdex1.toLowerCase()}
        　\*\*${subcmd2}:\*\*
        　　  ${cmddes2}
        　　  ${prefix}${cmd.toLowerCase()} ${subcmd2.toLowerCase()} ${cmdex2.toLowerCase()}
        　\*\*${subcmd3}:\*\*
        　　 ${cmddes3}
        　　  ${prefix}${cmd.toLowerCase()} ${subcmd3.toLowerCase()} ${cmdex3.toLowerCase()}
        　\*\*${subcmd4}:\*\*
        　　  ${cmddes4}
        　　  ${prefix}${cmd.toLowerCase()} ${subcmd4.toLowerCase()} ${cmdex4.toLowerCase()}
        　\*\*${subcmd5}:\*\*
        　　  ${cmddes5}
        　　 ${prefix}${cmd.toLowerCase()} ${subcmd5.toLowerCase()} ${cmdex5.toLowerCase()}
        　\*\*${subcmd6}:\*\*
        　　  ${cmddes6}
        　　  ${prefix}${cmd.toLowerCase()} ${subcmd6.toLowerCase()} ${cmdex6.toLowerCase()}
        　\*\*${subcmd7}:\*\*
        　　  ${cmddes7}
        　　  ${prefix}${cmd.toLowerCase()} ${subcmd6.toLowerCase()}`)
		.setFooter(`Helping ${message.author.username}`)
        .setColor(hColor)
        .setTimestamp()

message.channel.send(embed);
}

module.exports.FiveM = (message, cmd, description, subcmd1, cmddes1, cmdex1, subcmd2, cmddes2, cmdex2, subcmd3, cmddes3, cmdex3, subcmd4, cmddes4, cmdex4, subcmd5, cmddes5, cmdex5, subcmd6, cmddes6, cmdex6,) => {

	let embed = new Discord.RichEmbed()
        .setTitle(`Command: ${cmd}`)
        .setDescription(`\*\*Description:\*\* 
        ${description}.
        
        \*\*Sections:\*\*\ 
        　\*\*${subcmd1}:\*\*
        　　 ${cmddes1}
        　　 ${prefix}${cmd.toLowerCase()} ${subcmd1.toLowerCase()} ${cmdex1.toLowerCase()}
        　\*\*${subcmd2}:\*\*
        　　  ${cmddes2}
        　　  ${prefix}${cmd.toLowerCase()} ${subcmd2.toLowerCase()} ${cmdex2.toLowerCase()}
        　\*\*${subcmd3}:\*\*
        　　 ${cmddes3}
        　　  ${prefix}${cmd.toLowerCase()} ${subcmd3.toLowerCase()} ${cmdex3.toLowerCase()}
        　\*\*${subcmd4}:\*\*
        　　  ${cmddes4}
        　　  ${prefix}${cmd.toLowerCase()} ${subcmd4.toLowerCase()} ${cmdex4.toLowerCase()}
        　\*\*${subcmd5}:\*\*
        　　  ${cmddes5}
        　　 ${prefix}${cmd.toLowerCase()} ${subcmd5.toLowerCase()} ${cmdex5.toLowerCase()}
        　\*\*${subcmd6}:\*\*
        　　  ${cmddes6}
        　　  ${prefix}${cmd.toLowerCase()} ${subcmd6.toLowerCase()} ${cmdex6.toLowerCase()}`)
		.setFooter(`Helping ${message.author.username}`)
        .setColor(hColor)
        .setTimestamp()

message.channel.send(embed);
}

module.exports.channel = (message, cmd, description, subcmd1, cmddes1, cmdex1, subcmd2, cmddes2, cmdex2, subcmd3, cmddes3, cmdex3, subcmd4, cmddes4, cmdex4, subcmd5, cmddes5, cmdex5, subcmd6, cmddes6, cmdex6, subcmd7, cmddes7) => {

	let embed = new Discord.RichEmbed()
        .setTitle(`Command: ${cmd}`)
        .setDescription(`\*\*Description:\*\* 
        ${description}.
        
        \*\*Sections:\*\*\ 
        　\*\*${subcmd1}:\*\*
        　　 ${cmddes1}
        　　 ${prefix}${cmd.toLowerCase()} ${subcmd1.toLowerCase()} ${cmdex1.toLowerCase()}
        　\*\*${subcmd2}:\*\*
        　　  ${cmddes2}
        　　  ${prefix}${cmd.toLowerCase()} ${subcmd2.toLowerCase()} ${cmdex2.toLowerCase()}
        　\*\*${subcmd3}:\*\*
        　　 ${cmddes3}
        　　  ${prefix}${cmd.toLowerCase()} ${subcmd3.toLowerCase()} ${cmdex3.toLowerCase()}
        　\*\*${subcmd4}:\*\*
        　　  ${cmddes4}
        　　  ${prefix}${cmd.toLowerCase()} ${subcmd4.toLowerCase()} ${cmdex4.toLowerCase()}`)
		.setFooter(`Helping ${message.author.username}`)
        .setColor(hColor)
        .setTimestamp()

message.channel.send(embed);
}
