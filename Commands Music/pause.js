module.exports.run = async (bot, message, args) => {
    if(!guilds[message.guild.id].isPlaying) return error.invalid(message, "Pause", "There is no active stream in this guild")
guilds[message.guild.id].isPlaying = false;
message.guild.voiceConnection.dispatcher.pause()
success.mStop(message, "Paused")


}

  exports.information = {
      trigger: {
      name: "pause",
      aliases: "ps",
      },
      permission: {
      perm: "Pause",
      group: "Member"
      },
      help: {
      name: "Pause",
      description: "Pause the current playing audio",
      usage: " ",
      examples: [" ", " "]
      }
  }