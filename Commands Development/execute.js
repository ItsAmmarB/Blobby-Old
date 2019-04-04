module.exports.run = async (bot, message, args) => {
  try{
  eval(args.join(" ")) 
    } catch(err) {
      error.error(message, "Error", err)
    }
};

exports.information = {
  trigger: {
  name: "execute",
  aliases: "exec",
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