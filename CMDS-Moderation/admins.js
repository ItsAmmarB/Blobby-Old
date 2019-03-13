module.exports.run = async (bot, message, args) => {
  if(message.channel.type === "dm") return;
  let Admin = Object.values(Admins)
  if(message.guild.members.filter(member =>  member.hasPermission("ADMINISTRATOR")).size < 1 && Mod.toString().length < 3) return error.invalid(message, "Admins", "There are no Admins in this guild")
  let embed = new Discord.RichEmbed()
    .setAuthor(message.guild.name + "'s Admins", message.guild.iconURL)
    .setDescription(message.guild.members.filter(member => member.hasPermission("ADMINISTRATOR")).filter(member => !member.user.bot).map(member => "Name: " + `\`\`${member.user.tag}\`\`` + " ==  ID: " + `\`\`${member.id}\`\`` + " [Server Perm]").join("\n") + "\n" + Admin.filter(user => user.GuildID === message.guild.id).map(user => "Name: " + `\`\`${user.Name}\`\`` + " ==  ID: " + `\`\`${user.ID}\`\`` + " [Bot Perm]"))
    .setFooter("Note: Those are the poeple who have admin perms.")
    .setColor("#417af4")
    message.channel.send(embed)
     
};
exports.help = {
  name: "admins",
  aliases: "adms",
  hName: "Admins",
  Description: "Shows who have administrator perms",
  usage: " ",
}