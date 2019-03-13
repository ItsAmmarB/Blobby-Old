const Discord = module.require("discord.js");
const fs = require('fs');
const eColor = "#d63431"


module.exports.noPerms = (message, perm) => {
	let embed = new Discord.RichEmbed()
		.setDescription(`Insufficient Permission!`)
		.setFooter(perm)
        .setColor(eColor)

message.channel.send(embed).then(m => m.delete(30000))
}

module.exports.system = (message, e) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Fatel Error")
		.setDescription(`\`\`${e}\`\``)
        .setColor(eColor)

    message.channel.send(embed).then(m => m.delete(30000))
}

module.exports.invalid = (message, arg1, why) => {
    let embed = new Discord.RichEmbed()
        .setDescription(`\`\`${arg1}\`\` argument is invalid!`)
        .setFooter(why)
        .setColor(eColor)
message.channel.send(embed).then(m => m.delete(30000))
}

module.exports.missing = (message, cmd) => {
    let embed = new Discord.RichEmbed()
        .setDescription(`\`\`${cmd}\`\` argument missing!`)
        .setColor(eColor)
message.channel.send(embed).then(m => m.delete(30000))
}

module.exports.unable = (message, cmd, msg, reason) => {
    let embed = new Discord.RichEmbed()
        .setDescription(`Unable to \`\`${cmd}\`\` ${msg}!`)
        .setFooter(reason)
        .setColor(eColor)
message.channel.send(embed).then(m => m.delete(30000))
}

module.exports.is = (message, user, msg, cmd) => {
    let embed = new Discord.RichEmbed()
        .setDescription(`\`\`${user}\`\` ${msg} \`\`${cmd}\`\`!`)
        .setColor(eColor)
message.channel.send(embed).then(m => m.delete(30000))
}

module.exports.fetal = (message, user) => {
    let embed = new Discord.RichEmbed()
        .setDescription("FATAL ERROR")
        .setFooter(user)
        .setColor(eColor)
message.channel.send(embed).then(m => m.delete(30000))
}

module.exports.alreadyVote = (message, mMore) => {
    let embed = new Discord.RichEmbed()
    .setDescription(`You have already vote to ``Skip`` current song , You need ``${mMore}`` to vote as well!`)
    .setColor(sColor)


message.channel.send(embed)
}

module.exports.loggingChannel = (message, args, loop) => {
    let embed = new Discord.RichEmbed()
    .setDescription("Logging channel has already been set to this channel!")
    .setColor(sColor)


message.channel.send(embed)
}

module.exports.ignoredgChannel = (message, args, loop) => {
    let embed = new Discord.RichEmbed()
    .setDescription("This channel has already been ignored!")
    .setColor(sColor)


message.channel.send(embed)
}

