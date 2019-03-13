const Discord = module.require("discord.js");
const fs = require('fs');
const sColor = "#417af4"


module.exports.success = (message, member, cmd) => {
	let embed = new Discord.RichEmbed()
        .setDescription(`\`\`${member}\`\` has been \`\`${cmd}\`\`! `)
        .setColor(sColor)


message.channel.send(embed)
}

module.exports.cRole = (message, arg1) => {
	let embed = new Discord.RichEmbed()
        .setDescription(`\`\`${arg1}\`\` Role has been created!`)
        .setColor(sColor)


message.channel.send(embed)
}

module.exports.rRole = (message, arg1) => {
	let embed = new Discord.RichEmbed()
        .setDescription(`\`\`${arg1}\`\` Role has been removed!`)
        .setColor(sColor)


message.channel.send(embed)
}

module.exports.role = (message, gRole, fromTo, tRole) => {
	let embed = new Discord.RichEmbed()
        .setDescription(`\`\`${gRole}\`\` Role ${fromTo} \`\`${tRole}\`\`!`)
        .setColor(sColor)


message.channel.send(embed)
}

module.exports.userAction = (message, mName, cmd, reason) => {
	let embed = new Discord.RichEmbed()
        .setDescription(`\`\`${mName}\`\` has been \`\`${cmd}\`\`!`)
        .setFooter(reason)
        .setColor(sColor)


message.channel.send(embed)
}

module.exports.prefixChange = (message, cmd, Prefix) => {
	let embed = new Discord.RichEmbed()
        .setDescription(`\`\`${cmd}\`\` has been set to\`\`${Prefix}\`\`! `)
        .setColor(sColor)


message.channel.send(embed)
}

module.exports.clean = (message, cmd) => {
	let embed = new Discord.RichEmbed()
        .setDescription(`Cleaned \`\`${cmd}\`\`! `)
        .setColor(sColor)


message.channel.send(embed).then(m => m.delete(5000))
}

module.exports.move = (message, user, cmd, from, to) => {
	let embed = new Discord.RichEmbed()
        .setDescription(`\`\`${user}\`\` has been \`\`${cmd}\`\`! `)
        .setFooter("From " + from + " To " + to )
        .setColor(sColor)


message.channel.send(embed)
}

module.exports.add = (message, member, cmd) => {
	let embed = new Discord.RichEmbed()
        .setDescription(`\`\`${member}\`\` has been given \`\`${cmd}\`\` permissions! `)
        .setColor(sColor)


message.channel.send(embed)
}

module.exports.del = (message, member, cmd) => {
	let embed = new Discord.RichEmbed()
        .setDescription(`\`\`${cmd}\`\` permissions has been taken from \`\`${member}\`\`! `)
        .setColor(sColor)


message.channel.send(embed)
}

module.exports.nickname = (message, member, nName) => {
	let embed = new Discord.RichEmbed()
        .setDescription(`\`\`${member}\`\`'s nickname has been set to \`\`${nName}\`\`! `)
        .setColor(sColor)


message.channel.send(embed)
}

module.exports.botName = (message, nName) => {
	let embed = new Discord.RichEmbed()
        .setDescription(`Bot's nickname has been set to \`\`${nName}\`\`! `)
        .setColor(sColor)


message.channel.send(embed)
}

module.exports.vckick = (message, mName, cmd, reason) => {
	let embed = new Discord.RichEmbed()
        .setDescription(`\`\`${mName}\`\` has been \`\`${cmd}\`\` from the channel!`)
        .setColor(sColor)


message.channel.send(embed)
}

module.exports.channelAction = (message, cName, cmd, ) => {
	let embed = new Discord.RichEmbed()
        .setDescription(`The \`\`${cName}\`\` channel has been \`\`${cmd}\`\`!`)
        .setColor(sColor)


message.channel.send(embed)
}

module.exports.channelActionD = (message, cName, cmd, details) => {
	let embed = new Discord.RichEmbed()
        .setDescription(`The \`\`${cName}\`\` channel has been \`\`${cmd}\`\`!`)
        .setFooter(details)
        .setColor(sColor)


message.channel.send(embed)
}

module.exports.mPlay = (message, bIcon, sName, sURL, sPic, sDur, owner) => {
        let embed = new Discord.RichEmbed()
        .setAuthor("Now playing:", bIcon, sURL)
        .setDescription(`\`\`${sName}\`\`
        \*\*\*Uploaded By:\*\*\* ${owner}`)
        .setThumbnail(sPic)
        .setFooter("Duration: " + sDur)
        .setColor(sColor)


message.channel.send(embed)
}

module.exports.mQueue = (message, bIcon, sName, sURL, sPic, sDur, owner) => {
        let embed = new Discord.RichEmbed()
        .setAuthor("Adding to queue:", bIcon, sURL)
        .setDescription(`\`\`${sName}\`\`
        \*\*\*Uploaded By:\*\*\* ${owner}`)
        .setThumbnail(sPic)
        .setFooter("Duration " + sDur)
        .setColor(sColor)


message.channel.send(embed)
}

module.exports.mAction = (message, cmd) => {
        let embed = new Discord.RichEmbed()
        .setDescription(`Song has been \`\`${cmd}\`\``)
        .setColor(sColor)


message.channel.send(embed)
}

module.exports.sVote = (message, mMore) => {
        let embed = new Discord.RichEmbed()
        .setDescription(`You have voted to \`\`Skip\`\` current song, You need \`\`${mMore}\`\` to vote as well!`)
        .setColor(sColor)


message.channel.send(embed)
}

module.exports.mStop = (message, cmd) => {
        let embed = new Discord.RichEmbed()
        .setDescription(`Music stream has been \`\`${cmd}\`\``)
        .setColor(sColor)


message.channel.send(embed)
}

module.exports.vChange = (message, vAmount) => {
        let embed = new Discord.RichEmbed()
        .setDescription(`Steaming volume has been set to: \`\`${vAmount}\`\``)
        .setColor(sColor)


message.channel.send(embed)
}

module.exports.qClear = (message, Part, msg) => {
        let embed = new Discord.RichEmbed()
        .setDescription(Part + msg)
        .setColor(sColor)


message.channel.send(embed)
}

module.exports.reloaded = (message, CMD) => {
        let embed = new Discord.RichEmbed()
        .setDescription(`\`\`${CMD}.js\`\`` + " has been ``Reloaded``")
        .setColor(sColor)


message.channel.send(embed)
}


module.exports.ftnLinked = (message, Username) => {
        let embed = new Discord.RichEmbed()
        .setDescription("The Epic account ``" + Username + "`` Has been ``Linked``!")
        .setColor(sColor)


message.channel.send(embed)
}

module.exports.ftnUnlinked = (message, Username) => {
        let embed = new Discord.RichEmbed()
        .setDescription("The Epic account ``" + Username + "`` Has been ``Unlinked``!")
        .setColor(sColor)


message.channel.send(embed)
}

module.exports.fmSet = (message, IP, guildName) => {
        let embed = new Discord.RichEmbed()
        .setDescription("The server with the IP of ``" + IP + "`` Has been set as " + guildName + "'s FiveM server!")
        .setColor(sColor)


message.channel.send(embed)
}

module.exports.fmOnline = (message, guildName, IP, Players, Resources) => {
        let embed = new Discord.RichEmbed()
        .setAuthor(guildName + "'s FiveM Server Status", "http://thatziv.ddns.net/assets/fivem.png")
        .setDescription(`***Server Status:*** Online
        ***Server IP:*** ${IP}
        ***Players:*** ${Players}
        ***Resources:*** ${Resources}`)
        .setColor(sColor)


message.channel.send(embed)
}

module.exports.Loop = (message, args, loop) => {
        let embed = new Discord.RichEmbed()
        .setDescription("``Loop`` " + args + `\`\`${loop}\`\``)
        .setColor(sColor)


message.channel.send(embed)
}

module.exports.loggingChannel = (message, args, loop) => {
        let embed = new Discord.RichEmbed()
        .setDescription("Logging channel has been set!")
        .setColor(sColor)


message.channel.send(embed)
}

module.exports.ignoredgChannel = (message, args, loop) => {
        let embed = new Discord.RichEmbed()
        .setDescription("This channel will be ignore from now on!")
        .setColor(sColor)
    
    
    message.channel.send(embed)
}

module.exports.logEnabledDisabled = (message, Log, Status) => {
        let embed = new Discord.RichEmbed()
        .setDescription("``" + Log + "`` Has been ``" + Status + "``!")
        .setColor(sColor)
    
    
    message.channel.send(embed)
}

module.exports.XPBoost = (message, bAmount, mName) => {
        let embed = new Discord.RichEmbed()
        .setDescription("``" + mName.user.username + "`` Has been boosted with``" + bAmount + "`` XP!")
        .setColor(sColor)
    
    
    message.channel.send(embed)
}

module.exports.YTPlaylist = (message, playlist, avatar) => {
        let embed = new Discord.RichEmbed()
        .setAuthor("Playlist added to the queue", avatar, playlist.url)
        .setDescription("**Playlist Name: **" + playlist.title + "\n**Playlist Length: **" + playlist.videos.length + "\n**Uploaded By: **" + `[${playlist.channel.title}](${playlist.channel.url})` )
        .setThumbnail(playlist.thumbnail)
        .setColor(sColor)
    
    
    message.channel.send(embed)
}
