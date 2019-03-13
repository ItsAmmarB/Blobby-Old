module.exports.run = async (bot, message, args) => {
    if(message.channel.type === "dm") return;
    if(guilds[message.guild.id].isPlaying) return error.invalid(message, "resume", "The stream is Active")
guilds[message.guild.id].isPlaying = true;
message.guild.voiceConnection.dispatcher.resume()
success.mStop(message, "Resumed")


}

exports.help = {
    name: "resume",
    aliases: "rs",
    hName: "Resume",
    Description: "Resumes the stream",
    usage: "　",
  };