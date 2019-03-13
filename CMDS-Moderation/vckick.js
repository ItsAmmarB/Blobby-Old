module.exports.run = async (bot, message, args) => {
  if(message.channel.type === "dm") return;
  if(!message.member.hasPermission("MOVE_MEMBERS") && !Admins[message.author.id+"-"+message.guild.id] && !Mods[message.author.id+"-"+message.guild.id]) return error.noPerms(message, "MOVE_MEMBERS");
  if(!args[0]) return help.helpMessage(message, "VCKick", "Kicks a member from a voice channel", "[User]", "@" + me.tag + " Troll ", me.id + " Too cool to be here")
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

exports.help = {
  name: "vckick",
  aliases: "vk",
  hName: "VCKick",
  Description: "Kicks a member from a voice channel",
  usage: "[User]",
};


