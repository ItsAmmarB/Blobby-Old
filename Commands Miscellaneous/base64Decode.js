module.exports.run = async (bot, message, args) => {
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
        perm: "Base64Decode",
        group: "Member"
    },
    help: {
        name: "Decode",
        description: "Decodes Base64 string to normal string",
        usage: "<Base64 String>",
        examples: ["Hello World", "Hey, I'm Blobby"]
    }
  }
  