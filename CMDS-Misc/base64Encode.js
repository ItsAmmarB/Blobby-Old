module.exports.run = async (bot, message, args) => {
    if(message.channel.type === "dm") return;
    let code = args.join(" ");
    let embed = new Discord.RichEmbed()
        .setTitle("Base64 Encode")
        .setDescription(btoa(code))
        .setColor("#417af4")
    message.channel.send(embed)
}


exports.help = {
    name: "encode",
    aliases: "enc",
    hName: "Encode",
    Description: "Encodes normal string to Base64 string",
    usage: "[Normal String]",
  };