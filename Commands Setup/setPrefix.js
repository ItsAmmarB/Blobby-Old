module.exports.run = async (bot, message, args) => {
  if(!permCheck(message)) return error.noPerms(message, cmdInfo.permission.group + "." + cmdInfo.permission.perm)
  let newPrefix = args[0];
  if(!newPrefix) return help.helpMessage(message, "SetPrefix", "Changes the prefix of the guild", "<Desired Prefix>", "!", "?")
  if(newPrefix === GuildsConfig[message.guild.id].Prefix) return error.invalid(message, "newPrefix", "Prefix is already set to  " + nPrefix)
  GuildsConfig[message.guild.id].Prefix = newPrefix;
  fs.writeFile("./GuildsConfig.json", JSON.stringify(GuildsConfig), err => {
    if(err) throw err;});
  success.prefixChange(message, "Prefix", newPrefix)
};


exports.information = {
  trigger: {
    name: "setprefix",
    aliases: "sp",
  },
  permission: {
    perm: "SetPrefix",
    group: "Owner"
  },
  help: {
    name: "SetPrefix",
    Description: "Changes the prefix of the guild",
    usage: "[Desired Prefix]",
    examples: ["?", ";"]
  }
}
