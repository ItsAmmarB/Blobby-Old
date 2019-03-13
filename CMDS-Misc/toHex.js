module.exports.run = async (bot, message, args) => {
    if(message.channel.type === "dm") return;
    let decNum = args.join(" ");
    try {
        hex = converter.decToHex(decNum).toString().slice(2).toUpperCase()
    } catch (err) {
        error.invalid(message, "Hex", "invalid decimal number provided")
    }
    if(hex === "null") return error.invalid(message, "Hex", "invalid decimal number provided")
    let embed = new Discord.RichEmbed()
        .setTitle("Decimal To Hex")
        .setDescription(hex)
        .setColor("#417af4")
    message.channel.send(embed)
}


exports.help = {
    name: "tohex",
    aliases: "th",
    hName: "To Hex",
    Description: "Coverts a decimal number to hex number",
    usage: "[Decimal number]",
  };