module.exports.run = async (bot, message, args) => {
    if(message.channel.type === "dm") return;
    if(message.member.voiceChannelID !== message.guild.members.get(bot.user.id).voiceChannelID) return error.invalid(message, "Stop", "You must in the channel with the bot to stop it!")
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

exports.help = {
    name: "stop",
    aliases: "stp",
    hName: "Stop",
    Description: "Stops the steam and clear the queue then leave the channel",
    usage: "　",
  };