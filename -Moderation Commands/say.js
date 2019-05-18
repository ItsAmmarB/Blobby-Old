module.exports.run = async (bot, message, args) => {
  const sayMessage = args.join(" ");
  
  message.channel.send(sayMessage)
  message.delete().catch(O_o=>{});

}

  exports.information = {
    trigger: {
        name: "say",
        aliases: "sy",
    },
    permission: {
        perm: "Say",
        group: "Moderation"
    },
    help: {
        name: "Say",
        description: "Makes the bot say something instead of you",
        usage: "<Message>",
        examples: ["Hello World", "Welcome to my server!"]
    }
  }



