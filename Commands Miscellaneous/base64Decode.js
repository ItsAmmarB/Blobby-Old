module.exports.run = async (bot, message, args) => {
    if(!permCheck(message)) return error.noPerms(message, cmdInfo.permission.group + "." + cmdInfo.permission.perm)
    let code = args.join(" ");
    if(!code) return help.helpMessage(message);
    let embed = new Discord.RichEmbed()
        .setTitle("Base64 Encode")
        .setDescription(atob(code))
        .setColor("#417af4")
    message.channel.send(embed)
}


exports.information = {
    trigger: {
        name: "decode",
        aliases: "dec",
    },
    permission: {
        perm: "base64Decode",
        group: "Member"
    },
    help: {
        name: "Decode",
        description: "Decodes Base64 string to normal string",
        usage: "[Base64 String]",
        examples: ["Hello World", "Hey, I'm Blobby"]
    }
  }
  