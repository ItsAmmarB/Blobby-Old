module.exports.run = async (bot, message, args) => {
  if(!permCheck(message)) return error.noPerms(message, cmdInfo.permission.group + "." + cmdInfo.permission.perm)
  if(!args[0] || args[0].toUpperCase() === "HELP") return help.helpMessage(message)
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

const me = bot.users.get("357842475328733186");

exports.information = {
  trigger: {
  name: "kick",
  aliases: "k",
  },
  permission: {
  perm: "Kick",
  group: "Admin"
  },
  help: {
  name: "kick",
  description: "Kicks a member of the server",
  usage: "<User> (Reason)",
  examples: [me.tag, me.id + " You can't be here"]
  }
}