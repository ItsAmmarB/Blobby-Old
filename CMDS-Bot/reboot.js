module.exports.run = async (bot, message, args) => {

  if(message.channel.type === "dm") return;
  if(!Dev[message.member.id] && !Own[message.member.id] && message.author.id !== "357842475328733186") return;
    reboot(message.channel);
};

exports.help = {
  name: "reboot",
  aliases: "rb",
  hName: "Reboot",
  Description: "Reboots the bot",
  usage: " \n**Note:** Command can only be use by the developers and owners!",
};

