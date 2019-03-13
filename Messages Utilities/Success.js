const Discord = module.require("discord.js");
const fs = require('fs');
const sColor = "#417af4"


module.exports.permsActions = (message, action, target, permission) => {
	let embed = new Discord.RichEmbed()
        .setDescription(`${target} ${action} the ${permission} permission! `)
        .setColor(sColor)


message.channel.send(embed)
}




//===================================================Channel Actions

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


//===================================================Bot Config //Devs only

module.exports.reloaded = (message, CMD) => {
        let embed = new Discord.RichEmbed()
        .setDescription(`\`\`${CMD}.js\`\`` + " has been ``Reloaded``")
        .setColor(sColor)


message.channel.send(embed)
}


//===================================================Play (Audio Stream)

module.exports.Loop = (message, args, loop) => {
        let embed = new Discord.RichEmbed()
        .setDescription("``Loop`` " + args + `\`\`${loop}\`\``)
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


//===================================================FiveM 

module.exports.fmSet = (message, IP, guildName) => {
        let embed = new Discord.RichEmbed()
        .setDescription("The server with the IP of ``" + IP + "`` Has been set as " + guildName + "'s FiveM server!")
        .setColor(sColor)


message.channel.send(embed)
}

module.exports.fmSet = (message, guildName) => {
        let embed = new Discord.RichEmbed()
        .setDescription(guildName + "'s FiveM server has been reset!")
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


//===================================================Fortnite

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


//===================================================Mute, Unmute

module.exports.mute = (message, member, duration) => {
        let embed = new Discord.RichEmbed()
        .setDescription(`\`\`${member}\`\`` + " has been ``Muted`` for ``" + duration + "``!")
        .setColor(sColor)


message.channel.send(embed)
}

module.exports.unmute = (message, member) => {
        let embed = new Discord.RichEmbed()
        .setDescription(`\`\`${member}\`\`` + " has been ``Unmuted``!")
        .setColor(sColor)


message.channel.send(embed)
}


//===================================================Mute, Unmute

module.exports.userBannedWithRecord = (message, mName, reason) => {
        let embed = new Discord.RichEmbed()
        .setDescription(`\`\`${mName}\`\`` + " has been banned for ``" + reason + "``")
        .setFooter("This action has been recorded and logged to database")
        .setColor(sColor)


message.channel.send(embed)
}

module.exports.userBannedWithoutRecord = (message, mName, reason) => {
        let embed = new Discord.RichEmbed()
        .setDescription(`\`\`${mName}\`\`` + " has been banned for ``" + reason + "``")
        .setColor(sColor)


message.channel.send(embed)
}
