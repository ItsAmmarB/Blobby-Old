module.exports.run = async (bot, message, args) => {
  if(!args[0]) return help.helpMessage(message)


  let suggest = args.join(" ");

  let embed = new Discord.RichEmbed()
      .setTitle(message.author.tag)
      .setThumbnail(message.author.avatarURL)
      .addField("⇢ User Information", `**Username** ${message.author.username}\n**User ID:** ${message.author.id}\n**Time:** ${message.createdAt}\n**Timestamp:** ${message.createdTimestamp}`)
      .addField("⇢ Report Details", suggest)
      .setColor("#d63431")
  await bot.guilds.get("454795197901963264").channels.get("512027985935728640").send(embed)
  await message.channel.send(new Discord.RichEmbed()
      .setDescription("Report has been submitted, Thank you for your time and effort to make Blobby better! :D")
      .setFooter("YOU ARE AWESOME!")
      .setColor("#417af4"))
}

  exports.information = {
    trigger: {
      name: "report",
      aliases: "rpt",
    },
    permission: {
      perm: "Report",
      group: "Development"
    },
    help: {
      name: "Report",
      description: "Sends a report notification with your detail attached to the developers",
      usage: "<Report Details>",
      examples: ["Ban Command isn't working, it says that the user has been banned but he didn't get banned", "play command isn't working, when i use the command the song is placed in queue but the bot isn't playing anything"]
    }
  }

