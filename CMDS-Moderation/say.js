module.exports.run = async (bot, message, args) => {
  if(message.channel.type === "dm") return;
  if(!message.member.hasPermission("MANAGE_MESSAGES") && !Admins[message.author.id+"-"+message.guild.id]) return error.noPerms(message, "MANAGE_MESSAGES");
  const sayMessage = args.join(" ");
  
  message.channel.send(sayMessage)
  message.delete().catch(O_o=>{});

  }

  exports.help = {
    name: "say",
    aliases: "sy",
    hName: "Say",
    Description: "Makes the bot say something instead of you",
    usage: "[Message]",
  };



