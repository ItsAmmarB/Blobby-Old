module.exports.run = async (bot, message, args) => {
  Guild.findOne({_id: message.guild.id}, (err, res) => {
    let newPrefix = args[0];
    if(!newPrefix) return help.helpMessage(message, "SetPrefix", "Changes the prefix of the guild", "<Desired Prefix>", "!", "?")
    if(newPrefix === res.guildSettings.prefix) return error.invalid(message, "newPrefix", "Prefix is already set to  " + newPrefix)
    Guild.updateOne({_id: message.guild.id}, {
      $set: {
        "guildSettings.prefix": newPrefix
      }
    }, (err, res) => {if(err) console.log(err)})
    Guild.save
    success.prefixChange(message, newPrefix)
  })
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
    usage: "<Desired Prefix>",
    examples: ["?", ";"]
  }
}
