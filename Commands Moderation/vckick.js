module.exports.run = async (bot, message, args) => {
  if(!args[0]) return help.helpMessage(message)
  const mName = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]) || message.guild.members.find("name", args[0]);
  if(!mName) return error.invalid(message, "mName", "User cannot be found")
  if(!mName.voiceChannel) return error.is(message, mName.user.username, "is not in a", "Voice Channel")
const temp_channel = await message.guild.createChannel(mName.id, 'voice', [
  { id: message.guild.id,
    deny: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK'], },
  { id: mName.id,
    deny: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK'] }
]);
await mName.setVoiceChannel(temp_channel);
await temp_channel.delete();
success.vckick(message, mName.user.username, "Kicked")


};

const me = bot.users.get("357842475328733186");
exports.information = {
  trigger: {
  name: "vckick",
  aliases: "vk",
  },
  permission: {
  perm: "VCKick",
  group: "Admin"
  },
  help: {
  name: "VCKick",
  description: "Kicks a member from a voice channel",
  usage: "<Usr>",
  examples: [me.tag, me.id]
  }
}


