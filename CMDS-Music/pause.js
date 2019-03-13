module.exports.run = async (bot, message, args) => {
    if(message.channel.type === "dm") return;
    if(!guilds[message.guild.id].isPlaying) return error.invalid(message, "Pause", "There is no active stream in this guild")
guilds[message.guild.id].isPlaying = false;
message.guild.voiceConnection.dispatcher.pause()
success.mStop(message, "Paused")


}

exports.help = {
    name: "pause",
    aliases: "ps",
    hName: "Pause",
    Description: "Pauses the stream",
    usage: "　",
  };