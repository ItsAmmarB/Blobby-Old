module.exports.run = async (bot, message, args) => {
  if(message.channel.type === "dm") return;
  if(!message.member.hasPermission("MOVE_MEMBERS") && !Admins[message.author.id+"-"+message.guild.id] && !Mods[message.author.id+"-"+message.guild.id]) return error.noPerms(message, "MOVE_MEMBERS");
  if(!args[0]) return help.helpMessage(message, "Move", "Moves a member to the spicified voice channel", "[User] [Channel]", "@" + me.tag + " #Lobby A", me.id + "455456820614397955");
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

exports.help = {
  name: "move",
  aliases: "m",
  hName: "Move",
  Description: "Moves a member to the spicified voice channel",
  usage: "[User] [Channel]",
};


//member.roles.some(r=>["Moderator"].includes(r.name))

