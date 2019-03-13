module.exports.run = async (bot, message, args) => {
  if(message.channel.type === "dm") return;
  if(!message.member.hasPermission("KICK_MEMBERS") && !Admins[message.author.id+"-"+message.guild.id] && !Mods[message.author.id+"-"+message.guild.id]) return error.noPerms(message, "KICK_MEMBERS")
  if(!args[0] || args[0].toUpperCase() === "HELP") return help.helpMessage(message, "Kick", "Kicks a member of the server", "[User] (Reason)", "@" + me.tag + " Troll ", me.id + " Too cool to be here")
  let mName = message.mentions.members.first() || message.guild.members.get(args[0]);
  if(!mName) return error.invalid(message, "mName", "User does not exist")
  if(!mName.kickable) return error.unable(message, "Kick", mName.user.username, "User has ownership of this guild")
  if(mName.hasPermission("ADMINISTRATOR") && !mName.user.bot) return error.unable(message, "Kick", mName.user.username, "User has admin perms")
  let reason = args.slice(1).join(" ");
  if(!reason) reason = "No reason provided";
  let embed = new Discord.RichEmbed()
    .setDescription(`You have been Kicked from \`\`${message.guild.name}\`\` by \`\`${message.author.tag}\`\`  
      For \`\`${reason}\`\``)
    .setFooter(`Kicked At ${moment.utc(Date.now()).format("ddd, MMM Do YYYY, HH:mm:ss")}`)
    .setColor("#d63431");
  try{ 
    await mName.send(embed)
  } catch(err) {
    console.log(err)
    console.log(`[Error] Couldn\'t message ${mName.user.tag} of his kick in ${message.guild.name}!`)
  };
  success.userAction(message, mName.user.username, "Kicked", reason)
  mName.kick(reason)
  
};

exports.help = {
  name: "kick",
  aliases: "k",
  hName: "Kick",
  Description: "Kicks a member of the server",
  usage: "[User] (Reason)",
};


