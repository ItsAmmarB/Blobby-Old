module.exports.run = async (bot, message, args) => {
  if(message.channel.type === "dm") return;
  if(!message.member.hasPermission("MANAGE_GUILD")) return error.noPerms(message, "MANAGE_GUILD");
  let nPrefix = args[0];
  if(!nPrefix) return help.helpMessage(message, "SetPrefix", "Changes the prefix of the guild", "[Desired Prefix]", "!", "?")
  if(nPrefix === GuildsConfig[message.guild.id].Prefix) return error.invalid(message, "nPrefix", "Prefix is already set to  " + nPrefix)
  GuildsConfig[message.guild.id].Prefix = nPrefix;
  fs.writeFile("./GuildsConfig.json", JSON.stringify(GuildsConfig), err => {
    if(err) throw err;});
  success.prefixChange(message, "Prefix", nPrefix)
  

};

exports.help = {
  name: "setprefix",
  aliases: "sp",
  hName: "SetPrefix",
  Description: "Changes the prefix of the guild",
  usage: "[Desired Prefix]",
};

