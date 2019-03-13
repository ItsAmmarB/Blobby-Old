module.exports.run = async (bot, message, args) => {
    if(message.channel.type === "dm") return;
    let hexNum = args.join(" ");
    try {
        dec = converter.hexToDec(hexNum)
    } catch (err) {
        error.invalid(message, "Hex", "invalid decimal number provided")
    }
    let embed = new Discord.RichEmbed()
        .setTitle("Hex To Decimal")
        .setDescription(dec)
        .setColor("#417af4")
    message.channel.send(embed)
}


exports.help = {
    name: "todec",
    aliases: "tc",
    hName: "To Dec",
    Description: "Coverts a Hex number to Decimal number",
    usage: "[Hex number]",
  };