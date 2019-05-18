module.exports.run = async (bot, message, args) => {
    if(guilds[message.guild.id].isPlaying) return error.invalid(message, "resume", "The stream is Active")
guilds[message.guild.id].isPlaying = true;
message.guild.voiceConnection.dispatcher.resume()
success.mStop(message, "Resumed")


}

  exports.information = {
      trigger: {
        name: "resume",
        aliases: "r",
      },
      permission: {
        perm: "Resume",
        group: "Music"
      },
      help: {
        name: "Resume",
        description: "Resumes the audio play",
        usage: " ",
        examples: [" ", " "]
      }
  }