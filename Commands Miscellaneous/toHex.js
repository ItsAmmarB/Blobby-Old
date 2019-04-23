module.exports.run = async (bot, message, args) => {
    let decNum = args.join(" ");
    if(!decNum) return help.helpMessage(message);

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


exports.information = {
    trigger: {
        name: "tohex",
        aliases: "th",
    },
    permission: {
      perm: "ToHex",
      group: "User"
    },
    help: {
        name: "ToHex",
        description: "Coverts a decimal number to hex number",
        usage: "[Decimal number]",
        examples: ["76561198259630538", "76561198151879943"]
    }
}