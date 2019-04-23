module.exports.run = async (bot, message, args) => {
    if(message.member.voiceChannelID !== message.guild.members.get(bot.user.id).voiceChannelID) return error.invalid(message, "Skip", "You must in the channel with the bot to skip!")
    if (guilds[message.guild.id].skippers.indexOf(message.author.id) === -1 ) {
        guilds[message.guild.id].skippers.push(message.author.id);
        guilds[message.guild.id].skipReq++;
        if (guilds[message.guild.id].skipReq >= Math.ceil((guilds[message.guild.id].voiceChannel.members.size - 1) / 2) || message.member.hasPermission("ADMINISTRATOR") || permCheck(message)) {
            skip_song(message);
            success.mAction(message, "Skipped");
        } else {
            success.sVote(message, Math.ceil((guilds[message.guild.id].voiceChannel.members.size - 1) / 2) - guilds[message.guild.id].skipReq);
        }
    } else {
        error.alreadyVote(message, Math.ceil((guilds[message.guild.id].voiceChannel.members.size - 1) / 2) - guilds[message.guild.id].skipReq);
    }
        

}

exports.information = {
    trigger: {
        name: "skip",
        aliases: "skp",
    },
    permission: {
        perm: "Skip",
        group: "Member"
    },
    help: {
        name: "Skip",
        description: "Skip current playing audio",
        usage: " ",
        examples: [" ", " "]
    }
}