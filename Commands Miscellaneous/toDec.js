module.exports.run = async (bot, message, args) => {
    if(!permCheck(message)) return error.noPerms(message, cmdInfo.permission.group + "." + cmdInfo.permission.perm)

    let hexNum = args.join(" ");
    if(!hexNum) return help.helpMessage(message);
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

exports.information = {
    trigger: {
        name: "todec",
        aliases: "tc",
    },
    permission: {
      perm: "toDex",
      group: "Member"
    },
    help: {
        name: "To Dec",
        description: "Coverts a Hex number to Decimal number",
        usage: "<Hex number>",
        examples: ["110000111D7F1CA", "11000010B6BCD07"]
    }
}
  