module.exports.run = async (bot, message, args) => {
    guilds[message.guild.id].queue = [];
    guilds[message.guild.id].queueNames = [];
    guilds[message.guild.id].isPlaying = false;
    guilds[message.guild.id].dispatcher = null;
    guilds[message.guild.id].voiceChannel = null;
    guilds[message.guild.id].skipReq = 0;
    guilds[message.guild.id].skippers = [];
    guilds[message.guild.id].loop = 0;

    message.member.voiceChannel.leave()
    success.mStop(message, "Stopped")
    

}

exports.information = {
    trigger: {
        name: "stop",
        aliases: "stp",
    },
    permission: {
        perm: "Stop",
        group: "Member"
    },
    help: {
        name: "Stop",
        description: "Stops the playing audio, clears the queue and leaves channel",
        usage: " ",
        examples: [" ", " "]
    }
}