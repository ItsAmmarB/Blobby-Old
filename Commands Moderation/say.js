module.exports.run = async (bot, message, args) => {
  if(!permCheck(message)) return error.noPerms(message, cmdInfo.permission.group + "." + cmdInfo.permission.perm)
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
    group: "Admin"
    },
    help: {
    name: "Say",
    description: "Makes the bot say something instead of you",
    usage: "<Message>",
    examples: ["Hello World", "Welcome to my server!"]
    }
  }



