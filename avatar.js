module.exports.run = async (bot, message, args) => {
  if(message.channel.type === "dm") return;
  const member = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!args[0]) return help.helpMessage(message, "Avatar", "Show an avatar that belongs to someone with a link", "[User]", "@" + me.tag, me.id);
  if(!member) return error.invalid(message, "User", "User annot be found")
  let embed = new Discord.RichEmbed()
    .setTitle(member.user.tag)
    .addField("Profile Picture Link", `[Click Here](${member.user.avatarURL})`)
    .setImage(member.user.avatarURL)
    .setColor("#417af4");
    message.channel.send(embed)
     
  };

exports.help = {
  name: "avatar",
  aliases: "ava",
  hName: "Avatar",
  Description: "Show an avatar that belongs to someone with a link",
  usage: "[User]",

};


