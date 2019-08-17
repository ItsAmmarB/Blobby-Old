module.exports.run = async (bot, message, args) => {
    let newPrefix = args[0];
    if(!newPrefix) return help.helpMessage(message, "SetPrefix", "Changes the prefix of the guild", "<Desired Prefix>", "!", "?")
    if(newPrefix === guildDatabase[message.guild.id].guildSettings.prefix) return error.invalid(message, "newPrefix", "Prefix is already set to  " + newPrefix)
    guildDatabase[message.guild.id].guildSettings.prefix = newPrefix;
    fs.writeFile('./Database/guilds.json', JSON.stringify(guildDatabase), function(err) {if(err) return console.error(err);});

    success.prefixChange(message, newPrefix)
};


exports.information = {
  trigger: {
    name: "setprefix",
    aliases: "sp",
  },
  permission: {
    perm: "SetPrefix",
    group: "Settings"
  },
  help: {
    name: "SetPrefix",
    Description: "Changes the prefix of the guild",
    usage: "<Desired Prefix>",
    examples: ["?", ";"]
  }
}
