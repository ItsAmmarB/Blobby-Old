module.exports.run = async (bot, message, args) => {
  if(message.channel.type === "dm") return;
  if(!message.member.hasPermission("MANAGE_MESSAGES") && !Admins[message.author.id+"-"+message.guild.id]) return error.noPerms(message, "MANAGE_MESSAGES");
  let spacers = "　　　　";
  let rList = message.guild.roles.filter(role => role.id !== message.guild.id).map(role => `　　${message.guild.members.filter(member => member.roles.has(role.id)).size}` + `${spacers.slice(message.guild.members.filter(member => member.roles.has(role.id)).size.toString().length)}- 　　` + role.name.toString().slice())
  if(message.guild.roles.array().length - 1 < 2) {
    rNum = "Role"
  } else {
    rNum = "Roles"
  }
  message.channel.send(new Discord.RichEmbed()
    .setAuthor("All " + message.guild.name + "'s Roles", message.guild.iconURL)
    .setTitle(message.guild.roles.array().length - 1 + " " + rNum + " in total")
    .setDescription(`\`\`
     Members　　　Role Name
    ${rList.sort().toString().split(",").join("\n")}\`\``)
    .setColor("#417af4")
    )
  
}

exports.help = {
  name: "roles",
  aliases: "rls",
  hName: "Roles",
  Description: "Shows all roles within the guild ",
  usage: "　",
};