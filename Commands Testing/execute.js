module.exports.run = async (bot, message, args) => {
  eval(args.join(" "))    
};

exports.information = {
  trigger: {
  name: "test",
  aliases: "t",
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