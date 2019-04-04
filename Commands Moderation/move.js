module.exports.run = async (bot, message, args) => {
  if(!args[0]) return help.helpMessage(message);
  const mName = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]) || message.guild.members.find("name", args[0]);
  if(!mName) return error.invalid(message, "mName", "User cannot be found")
  if(!mName.voiceChannel) return error.is(message, mName.user.username, "is not in a", "Channel")
  let cName = message.guild.channels.find("name", args.slice(1).join(" ")) || message.guild.channels.get(args[1]);
  if(!args[1]) return error.missing(message, "cName")
  if(!cName) return error.invalid(message, "cName", "Channel does not exist")
  if(mName.voiceChannelID === cName.id) return error.is(message, mName.user.username, "is already in", cName.name)
  success.move(message, mName.user.username, "Moved", mName.voiceChannel.name, cName.name)
  mName.setVoiceChannel(cName)
  
};

const me = bot.users.get("357842475328733186");
exports.information = {
  trigger: {
  name: "move",
  aliases: "m",
  },
  permission: {
  perm: "Move",
  group: "Admin"
  },
  help: {
  name: "Move",
  description: "Moves a member to the spicified voice channel",
  usage: "<User> <Channel Name>",
  examples: [me.tag + " Development Lounge", me.id + " AFK Channel"]
  }
}

