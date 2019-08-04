module.exports.run = async (bot, message, args) => {
  let url = "https://discordapi.com/permissions.html#" + args[0] || "https://discordapi.com/permissions.html#0"
  request(url, {timeout: 5000}, function (err, response, main) {
  console.log(err)
  console.log(response)
  console.log(main)
  })    
};

exports.information = {
  trigger: {
  name: "cal",
  aliases: "cal",
  },
  permission: {
  permLevel: "Junior Developer",
  },
  help: {
  name: "Execute",
  description: "Execute a code using eval function.",
  usage: "<Code>",
  examples: ["message.reply('Hi')","console.log(bot.user.username)"]
  }
}