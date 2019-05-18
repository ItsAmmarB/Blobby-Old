//Messages
const MessageColor = "#fbc21b"
module.exports.messageDelete = (message) => {
    if(message.author.bot) return;
    let embed = new Discord.RichEmbed()
        .setColor(MessageColor)
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(`**Message sent by ${message.author} deleted in ${message.channel}\n Message Content: **\`\`${message.content}\`\``)
        .setFooter(`AUTHOR ID: ${message.author.id} | MESSAGE ID: ${message.id}`)
        .setTimestamp()
    message.channel.send(embed) //==> needs Logs command first to set the logging channel!
}
module.exports.messageUpdate = (oldMessage, newMessage) => {
    if(oldMessage.author.bot) return;
    let embed = new Discord.RichEmbed()
        .setColor(MessageColor)
        .setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL)
        .setDescription(`**Message sent by ${oldMessage.author} edited in ${oldMessage.channel}  \n  [jump to message](${newMessage.url})\n**`)
        .addField("⇢ Old Message", `\`\`${oldMessage}\`\``)
        .addField("⇢ New Message", `\`\`${newMessage}\`\``)
        .setFooter(`AUTHOR ID: ${oldMessage.author.id} | MESSAGE ID: ${oldMessage.id}`)
        .setTimestamp()
    oldMessage.channel.send(embed) //==> needs Logs command first to set the logging channel!
}
module.exports.messageReactionAdd = (messageReaction, user) => {
    if(user.bot) return;
    let embed = new Discord.RichEmbed()
        .setColor(MessageColor)
        .setAuthor(user.tag, user.avatarURL)
        .setDescription(`**Message sent by ${messageReaction.message.author} reacted by ${user} in ${messageReaction.message.channel}\n  [jump to message](${messageReaction.message.url})\n Reaction: **${messageReaction.emoji}`)
        .setFooter(`AUTHOR ID: ${user.id} | MESSAGE ID: ${messageReaction.message.id}`)
        .setTimestamp()
        messageReaction.message.channel.send(embed) //==> needs Logs command first to set the logging channel!
}
module.exports.messageReactionRemove = (messageReaction, user) => {
    if(user.bot) return;
    let embed = new Discord.RichEmbed()
        .setColor(MessageColor)
        .setAuthor(user.tag, user.avatarURL)
        .setDescription(`**Reaction by ${user} deleted in ${messageReaction.message.channel}\n  [jump to message](${messageReaction.message.url})\n Reaction: **${messageReaction.emoji}`)
        .setFooter(`AUTHOR ID: ${user.id} | MESSAGE ID: ${messageReaction.message.id}`)
        .setTimestamp()
        messageReaction.message.channel.send(embed) //==> needs Logs command first to set the logging channel!
}
module.exports.messageReactionRemoveAll = message => {
    if(message.author.bot) return;
    let embed = new Discord.RichEmbed()
        .setColor(MessageColor)
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(`**Message sent by ${message.author} cleared from reactions in ${message.channel}\n  [jump to message](${message.url})**`)
        .setFooter(`AUTHOR ID: ${message.author.id} | MESSAGE ID: ${message.id}`)
        .setTimestamp()
    message.channel.send(embed) //==> needs Logs command first to set the logging channel!
}

//Channels
module.exports.channelCreate = (message) => {

}
module.exports.channelDelete = (message) => {
    message.guild.fetchAuditLogs()
        .then(audit => {
           let targetedAudit = audit.entries.filter (entery => entery.action ==="CHANNEL_DELETE" ).first();
           console.log(targetedAudit)
        })
}
module.exports.channelPinsUpdate = (message) => {

}
module.exports.channelUpdate = (message) => {

}
//Bans
module.exports.guildBanAdd = (message) => {

}
module.exports.guildBanRemove = (message) => {

}
//Members
module.exports.guildMemberAdd = (message) => {

}
module.exports.guildMemberUpdate = (message) => {

}
module.exports.guildMemberRemove = (message) => {

}
//Kicks
module.exports.guildMemberRemove = (message) => {

}
//Roles
module.exports.roleCreate = (message) => {

}
module.exports.roleDelete = (message) => {

}
module.exports.roleUpdate = (message) => {

}