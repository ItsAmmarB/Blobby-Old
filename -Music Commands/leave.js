module.exports.run = async (bot, message, args) => {
  if(!permCheck(message)) return error.noPerms(message, cmdInfo.permission.group + "." + cmdInfo.permission.perm)
    guilds[message.guild.id].queue = [];
    guilds[message.guild.id].queueNames = [];
    guilds[message.guild.id].isPlaying = false;
    guilds[message.guild.id].dispatcher = null;
    guilds[message.guild.id].voiceChannel = null;
    guilds[message.guild.id].skipReq = 0;
    guilds[message.guild.id].skippers = [];
    guilds[message.guild.id].loop = 0;

    const temp_channel = await message.guild.createChannel(bot.user.id, 'voice', [
        { id: message.guild.id,
          deny: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK'], }
      ]);
      await message.guild.members.get(bot.user.id).setVoiceChannel(temp_channel);
      await temp_channel.delete();
      

}

exports.information = {
  trigger: {
  name: "leave",
  aliases: "l",
  },
  permission: {
  perm: "Leave",
  group: "Music"
  },
  help: {
  name: "Leave",
  description: "Makes the bot stop streaming and leave the channel",
  usage: " ",
  examples: [" ", " "]
  }
}