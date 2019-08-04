module.exports.run = async (bot, message, args) => {
    if(!args[0]) return help.helpMessage(message)


    let suggest = args.join(" ");

    let embed = new Discord.RichEmbed()
        .setTitle(message.author.tag)
        .setThumbnail(message.author.avatarURL)
        .addField("⇢ User Information", `**Username** ${message.author.username}\n**User ID:** ${message.author.id}\n**Time:** ${message.createdAt}\n**Timestamp:** ${message.createdTimestamp}`)
        .addField("⇢ Suggestion Details", suggest)
        .setColor("#417af4")
    await bot.guilds.get("454795197901963264").channels.get("581267529830498354").send(embed)
    await message.channel.send(new Discord.RichEmbed()
        .setDescription("Suggestion has been submitted, Thank you for your time and effort to make Blobby better! :D")
        .setFooter("YOU ARE AWESOME!")
        .setColor("#417af4"))
}

exports.information = {
    trigger: {
        name: "suggest",
        aliases: "sgst",
    },
    permission: {
      perm: "Suggest",
      group: "Development"
    },
    help: {
        name: "Suggest",
        description: "Suggests your idea to the developers\n**Note:** Make sure to address the command name, command usage, command description, how it should work and why should we add it. :)",
        usage: "<Your Idea In Full Detail>",
        examples: ["Ban command, Ban <User>, Bans a member of a guild from it, It should ban the member from the server with or without a reason, i thinking it will be an amazing shortcut and i will be very helpful", "Avatar command, avatar (User), Gets the user's avatar, it should send the targeted user's avatar in a channel as a message attachment, It's helpful for the user who wants someone's avatar but they're shy to ask"]
    }
}
  