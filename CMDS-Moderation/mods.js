module.exports.run = async (bot, message, args) => {
  if(message.channel.type === "dm") return;
  let Mod = Object.values(Mods)
  if(Mod.toString().length < 3) return error.invalid(message, "Mods", "There are no Mods in this guild")
  let embed = new Discord.RichEmbed()
    .setAuthor(message.guild.name + "'s Mods", message.guild.iconURL)
    .setDescription(Mod.filter(user => user.GuildID === message.guild.id).map(user => "Name: " + `\`\`${user.Name}\`\`` + " ==  ID: " + `\`\`${user.ID}\`\``))
    .setFooter("Note: Those are the poeple who have Mod perms within this bot.")
    .setColor("#417af4")
    message.channel.send(embed)


};
exports.help = {
  name: "mods",
  aliases: "mds",
  hName: "Mods",
  Description: "Shows who have moderator perms within this bot",
  usage: " ",
}


