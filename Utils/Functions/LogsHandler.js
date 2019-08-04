const GoodColor = "#417af4"
const NeutralColor = "#fbc21b"
const BadColor = "#d63431"

const loggingChannel = "582049161151643678"

//Messages
module.exports.messageDelete = (message) => {
    if(message.author.bot) return;
    let embed = new Discord.RichEmbed()
        .setColor(BadColor)
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(`**Message sent by ${message.author} deleted in ${message.channel}\n Message Content: **\`\`${message.content}\`\``)
        .setFooter(`AUTHOR ID: ${message.author.id} | MESSAGE ID: ${message.id}`)
        .setTimestamp()
    return message.guild.channels.get(loggingChannel).send(embed) //==> needs Logs command first to set the logging channel!
}
module.exports.messageUpdate = (oldMessage, newMessage) => {
    if(oldMessage.author.bot) return;
    if(oldMessage.content.toUpperCase() === newMessage.content.toUpperCase()) return;
    let embed = new Discord.RichEmbed()
        .setColor(NeutralColor)
        .setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL)
        .setDescription(`**Message sent by ${oldMessage.author} edited in ${oldMessage.channel}  \n  [jump to message](${newMessage.url})\n**`)
        .addField("⇢ Old Message", `\`\`${oldMessage}\`\``)
        .addField("⇢ New Message", `\`\`${newMessage}\`\``)
        .setFooter(`AUTHOR ID: ${oldMessage.author.id} | MESSAGE ID: ${oldMessage.id}`)
        .setTimestamp()
    return oldMessage.guild.channels.get(loggingChannel).send(embed) //==> needs Logs command first to set the logging channel!
}
module.exports.messageReactionAdd = (messageReaction, user) => {
    if(user.bot) return;
    let embed = new Discord.RichEmbed()
        .setColor(GoodColor)
        .setAuthor(user.tag, user.avatarURL)
        .setDescription(`**Message sent by ${messageReaction.message.author} reacted by ${user} in ${messageReaction.message.channel}\n  [jump to message](${messageReaction.message.url})\n Reaction: **${messageReaction.emoji}`)
        .setFooter(`AUTHOR ID: ${user.id} | MESSAGE ID: ${messageReaction.message.id}`)
        .setTimestamp()
    return messageReaction.message.guild.channels.get(loggingChannel).send(embed) //==> needs Logs command first to set the logging channel!
}
module.exports.messageReactionRemove = (messageReaction, user) => {
    if(user.bot) return;
    let embed = new Discord.RichEmbed()
        .setColor(BadColor)
        .setAuthor(user.tag, user.avatarURL)
        .setDescription(`**Reaction by ${user} deleted in ${messageReaction.message.channel}\n  [jump to message](${messageReaction.message.url})\n Reaction: **${messageReaction.emoji}`)
        .setFooter(`AUTHOR ID: ${user.id} | MESSAGE ID: ${messageReaction.message.id}`)
        .setTimestamp()
    return  messageReaction.message.guild.channels.get(loggingChannel).send(embed) //==> needs Logs command first to set the logging channel!
}
module.exports.messageReactionRemoveAll = message => {
    if(message.author.bot) return;
    let embed = new Discord.RichEmbed()
        .setColor(BadColor)
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(`**Message sent by ${message.author} cleared from reactions in ${message.channel}\n  [jump to message](${message.url})**`)
        .setFooter(`AUTHOR ID: ${message.author.id} | MESSAGE ID: ${message.id}`)
        .setTimestamp()
    return message.guild.channels.get(loggingChannel).send(embed) //==> needs Logs command first to set the logging channel!
}

//Channels
module.exports.channelCreate = async (channel) => {
    let Audit = await channel.guild.fetchAuditLogs({type:"CHANNEL_CREATE"})
    let audit = Audit.entries.first()
    let embed = new Discord.RichEmbed()
        .setColor(GoodColor)
        .setAuthor(audit.executor.username +"#"+ audit.executor.discriminator, channel.guild.members.get(audit.executor.id).user.avatarURL)
        .setDescription(`**A **\`\`#${channel.name}**\`\` ${channel.type} channel has been created by ${channel.guild.members.get(audit.executor.id)} **`)
        .setFooter(`EXECUTOR ID: ${audit.executor.id} | CHANNEL ID: ${channel.id}`)
        .setTimestamp()
    return channel.guild.channels.get(loggingChannel).send(embed) //==> needs Logs command first to set the logging channel!
}
module.exports.channelDelete = async (channel) => {
    let Audit = await channel.guild.fetchAuditLogs({type:"CHANNEL_CREATE"})
    let audit = Audit.entries.first()
    let embed = new Discord.RichEmbed()
        .setColor(BadColor)
        .setAuthor(audit.executor.username +"#"+ audit.executor.discriminator, channel.guild.members.get(audit.executor.id).user.avatarURL)
        .setDescription(`**A **\`\`#${channel.name}\`\`** ${channel.type} channel has been deleted by ${channel.guild.members.get(audit.executor.id)} **`)
        .setFooter(`EXECUTOR ID: ${audit.executor.id} | CHANNEL ID: ${channel.id}`)
        .setTimestamp()
    return channel.guild.channels.get(loggingChannel).send(embed) //==> needs Logs command first to set the logging channel!
}

module.exports.channelPinsUpdate = async (channel, time) => {
    let embed = new Discord.RichEmbed()
        .setColor(NeutralColor)
        .setDescription(`**Pinned messages has been updated in ${channel}**`)
        .setFooter(`CHANNEL ID: ${channel.id}`)
        .setTimestamp()
    return channel.guild.channels.get(loggingChannel).send(embed) //==> needs Logs command first to set the logging channel!
}

module.exports.channelUpdate = async (oldChannel, newChannel) => {
    let timeTriggered = nau();
    let embed = new Discord.RichEmbed()
    let Audit = await oldChannel.guild.fetchAuditLogs({type:"CHANNEL_UPDATE"})
    let Audit1 = await oldChannel.guild.fetchAuditLogs({type:"CHANNEL_OVERWRITE_UPDATE"})
    let Audit2 = await oldChannel.guild.fetchAuditLogs({type:"CHANNEL_OVERWRITE_CREATE"})
    let Audit3 = await oldChannel.guild.fetchAuditLogs({type:"CHANNEL_OVERWRITE_DELETE"})
    if(Audit.entries.first().createdTimestamp+250 > timeTriggered){
        let audit = Audit.entries.first()
        let changes = Audit.entries.first().changes;
        embed.setAuthor(audit.executor.username +"#"+ audit.executor.discriminator, newChannel.guild.members.get(audit.executor.id).user.avatarURL)
        embed.setDescription(`**${oldChannel.guild.members.get(audit.executor.id)} has updated  the ${oldChannel.type} \`\`${oldChannel.name}\`\`! **`)
        embed.setFooter(`EXECUTOR ID: ${audit.executor.id} | CHANNEL ID: ${oldChannel.id}`)
        embed.setColor(NeutralColor)
        changes.forEach(change => embed.addField("⇢ "+change.key.toString().split("_").join(" "), `**Was:** ${change.old}\n**Now:** ${change.new}`,true))
        return oldChannel.guild.channels.get(loggingChannel).send(embed) //==> needs Logs command first to set the logging channel!
    }
    else if(Audit1.entries.first().createdTimestamp+250 > timeTriggered){
        let audit = Audit1.entries.first()
        embed.setAuthor(audit.executor.username +"#"+ audit.executor.discriminator, newChannel.guild.members.get(audit.executor.id).user.avatarURL)
        if(!audit.extra.user){
            embed.setDescription(`**${oldChannel.guild.members.get(audit.executor.id)} has updated a permission overwrite in the ${oldChannel.type} \`\`${oldChannel.name}\`\` channel for ${oldChannel.guild.roles.get(audit.extra.id)}! **`)
        } else {
            embed.setDescription(`**${oldChannel.guild.members.get(audit.executor.id)} has updated a permission overwrite in the  ${oldChannel.type} \`\`${oldChannel.name}\`\` channel for ${oldChannel.guild.members.get(audit.extra.user.id)}! **`)
        }        
        embed.setFooter(`EXECUTOR ID: ${audit.executor.id} | CHANNEL ID: ${oldChannel.id}`)
        embed.setColor(NeutralColor)
        return oldChannel.guild.channels.get(loggingChannel).send(embed) //==> needs Logs command first to set the logging channel!
    } else if(Audit2.entries.first().createdTimestamp+250 > timeTriggered){
        let audit = Audit2.entries.first()
        embed.setAuthor(audit.executor.username +"#"+ audit.executor.discriminator, newChannel.guild.members.get(audit.executor.id).user.avatarURL)
        if(!audit.extra.user){
            embed.setDescription(`**${oldChannel.guild.members.get(audit.executor.id)} has created a permission overwrite in the ${oldChannel.type} \`\`${oldChannel.name}\`\` channel for ${oldChannel.guild.roles.get(audit.extra.id)}! **`)
        } else {
            embed.setDescription(`**${oldChannel.guild.members.get(audit.executor.id)} has created a permission overwrite in the ${oldChannel.type} \`\`${oldChannel.name}\`\` channel for ${oldChannel.guild.members.get(audit.extra.user.id)}! **`)
        }
        embed.setFooter(`EXECUTOR ID: ${audit.executor.id} | CHANNEL ID: ${oldChannel.id}`)
        embed.setColor(GoodColor)
        return oldChannel.guild.channels.get(loggingChannel).send(embed) //==> needs Logs command first to set the logging channel!
    } else if(Audit3.entries.first().createdTimestamp+250 > timeTriggered){
        let audit = Audit3.entries.first()
        embed.setAuthor(audit.executor.username +"#"+ audit.executor.discriminator, newChannel.guild.members.get(audit.executor.id).user.avatarURL)
        if(!audit.extra.user){
            embed.setDescription(`**${oldChannel.guild.members.get(audit.executor.id)} has removed a permission overwrite in the ${oldChannel.type} \`\`${oldChannel.name}\`\` channel for ${oldChannel.guild.roles.get(oldChannel.guild.roles.get(audit.extra.id))}! **`)
        } else {
            embed.setDescription(`**${oldChannel.guild.members.get(audit.executor.id)} has removed a permission overwrite in the ${oldChannel.type} \`\`${oldChannel.name}\`\` channel for ${oldChannel.guild.members.get(audit.extra.user.id)}! **`)
        }
        embed.setFooter(`EXECUTOR ID: ${audit.executor.id} | CHANNEL ID: ${oldChannel.id}`)
        embed.setColor(BadColor)
        return oldChannel.guild.channels.get(loggingChannel).send(embed) //==> needs Logs command first to set the logging channel!
    } else {
        return;
    }
}

//Bans
module.exports.guildBanAdd = async (guild, user) => {
    let Audit = await guild.fetchAuditLogs({type:"MEMBER_BAN_ADD"})
    if(Audit.entries.first().target.id !== user.id) return;
    let audit = Audit.entries.first();
    let embed = new Discord.RichEmbed()
        .setColor(BadColor)
        .setAuthor(user.tag, user.avatarURL)
        .setDescription(`**${user} has been banned by ${guild.members.get(audit.executor.id)}**`)
        .setFooter(`MOD ID: ${audit.executor.id} | USER ID: ${user.id}`)
        .setTimestamp()
    return guild.channels.get(loggingChannel).send(embed) //==> needs Logs command first to set the logging channel!
}
module.exports.guildBanRemove = async (guild, user) => {
    let Audit = await guild.fetchAuditLogs({type:"MEMBER_BAN_REMOVE"})
    if(Audit.entries.first().target.id !== user.id) return;
    let audit = Audit.entries.first();
    let embed = new Discord.RichEmbed()
        .setColor(GoodColor)
        .setAuthor(user.tag, user.avatarURL)
        .setDescription(`**${user} has been unbanned by ${guild.members.get(audit.executor.id)}**`)
        .setFooter(`MOD ID: ${audit.executor.id} | USER ID: ${user.id}`)
        .setTimestamp()
    return guild.channels.get(loggingChannel).send(embed) //==> needs Logs command first to set the logging channel!
}
//Members
module.exports.guildMemberAdd = async (member) => {
    let embed = new Discord.RichEmbed()
        .setColor(GoodColor)
        .setAuthor(member.user.tag, member.user.avatarURL)
        .setDescription(`**${member} just joined the server!**`)
        .setFooter(`MEMBER ID: ${member.user.id}`)
        .setTimestamp()
    return member.guild.channels.get(loggingChannel).send(embed) //==> needs Logs command first to set the logging channel!
}
module.exports.guildMemberUpdate = (oldMember, newMember) => {

}
module.exports.guildMemberRemove = async (member) => {
    let Audit = await member.guild.fetchAuditLogs({type:"MEMBER_KICK"})
    if(Audit.entries.first().createdTimestamp+500>nau()) {
    let audit = Audit.entries.first();
    let embed = new Discord.RichEmbed()
        .setColor(BadColor)
        .setAuthor(member.user.tag, member.user.avatarURL)
        .setDescription(`**${member} has been kicked by ${member.guild.members.get(audit.executor.id)}**`)
        .setFooter(`MOD ID: ${audit.executor.id} | USER ID: ${member.user.id}`)
        .setTimestamp()
    return member.guild.channels.get(loggingChannel).send(embed) //==> needs Logs command first to set the logging channel!
    } else {
    let embed = new Discord.RichEmbed()
        .setColor(BadColor)
        .setAuthor(member.user.tag, member.user.avatarURL)
        .setDescription(`**${member} just left the server!**`)
        .setFooter(`MEMBER ID: ${member.user.id}`)
        .setTimestamp()
    return member.guild.channels.get(loggingChannel).send(embed) //==> needs Logs command first to set the logging channel!
    }
}

//Roles
module.exports.roleCreate = async (role) => {
    let Audit = await role.guild.fetchAuditLogs({type:"ROLE_CREATE"})
    if(Audit.entries.first().target.id !== role.id) return;
    let audit = Audit.entries.first();
    let embed = new Discord.RichEmbed()
        .setColor(GoodColor)
        .setAuthor(role.guild.members.get(audit.executor.id).user.tag, role.guild.members.get(audit.executor.id).user.avatarURL)
        .setDescription(`**${role.guild.members.get(audit.executor.id)} has been created the ${role} role**`)
        .setFooter(`MOD ID: ${audit.executor.id} | ROLE ID: ${role.id}`)
        .setTimestamp()
    return role.guild.channels.get(loggingChannel).send(embed) //==> needs Logs command first to set the logging channel!
}
module.exports.roleDelete = async (role) => {
    let Audit = await role.guild.fetchAuditLogs({type:"ROLE_DELETE"})
    let audit = Audit.entries.first();
    let embed = new Discord.RichEmbed()
        .setColor(BadColor)
        .setAuthor(role.guild.members.get(audit.executor.id).user.tag, role.guild.members.get(audit.executor.id).user.avatarURL)
        .setDescription(`**${role.guild.members.get(audit.executor.id)} has been deleted the \`\`${role.name}\`\` role**`)
        .setFooter(`MOD ID: ${audit.executor.id} | ROLE ID: ${role.id}`)
        .setTimestamp()
    return role.guild.channels.get(loggingChannel).send(embed) //==> needs Logs command first to set the logging channel!
}
module.exports.roleUpdate = async (oldrole, newRole) => {
    let Audit = await oldrole.guild.fetchAuditLogs({type:"ROLE_UPDATE"})
    let audit = Audit.entries.first()
    let changes = Audit.entries.first().changes;
    let embed = new Discord.RichEmbed()
        .setAuthor(oldrole.guild.members.get(audit.executor.id).user.tag, oldrole.guild.members.get(audit.executor.id).user.avatarURL)
        .setDescription(`**${oldrole.guild.members.get(audit.executor.id)} has updated the ${oldrole} role!**`)
        .setFooter(`EXECUTOR ID: ${audit.executor.id} | CHANNEL ID: ${oldrole.id}`)
        .setColor(NeutralColor)
    changes.forEach(change =>{
        if(change.key === "color"){
            if(change.old < 1) {
                changee = "#default"
            } else {
                changee = "#"+converter.decToHex(change.old.toString()).toString().slice(2).toUpperCase()
            }
            if(change.new < 1) {
                changee2 = "#default"
            } else {
                changee2 = "#"+converter.decToHex(change.new.toString()).toString().slice(2).toUpperCase()
            }
            embed.addField("⇢ color", `**Was:** ${changee}\n**Now:** ${changee2}`,true)
        } else {
            embed.addField("⇢ "+change.key.toString().split("_").join(" "), `**Was:** ${change.old}\n**Now:** ${change.new}`,true)
        }
    })
    return oldrole.guild.channels.get(loggingChannel).send(embed) //==> needs Logs command first to set the logging channel!
}