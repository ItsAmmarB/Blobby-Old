module.exports.run = async (bot, message, args) => {
    if(message.channel.type === "dm") return;
    let code = args.join(" ");
    let embed = new Discord.RichEmbed()
        .setTitle("Base64 Encode")
        .setDescription(atob(code))
        .setColor("#417af4")
    message.channel.send(embed)
}


exports.help = {
    name: "decode",
    aliases: "dec",
    hName: "Decode",
    Description: "Decodes Base64 string to normal string",
    usage: "[Base64 String]",
  };