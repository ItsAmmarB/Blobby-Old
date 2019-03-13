module.exports.run = async (bot, message, args) => {
  if(!Dev[message.member.id] && !Own[message.member.id] && message.author.id !== "357842475328733186") return;
    try{
      if(message.channel.type === "dm") return;
      if(!args[0]) return help.helpMessage(message, "Execute", "This command executes whatever code you type it after the ``/Execute``", "[Your Code Here]", "message.channel.send(\"Hi There\")", "message.channel.send(message.guild.member.size)")
      if(message.content.includes("token") || message.content.includes("Token")) return message.reply("NO!")
      if(message.content.includes("kick") || message.content.includes("Kick")) return message.reply("NO!")
      if(message.content.includes("ban") || message.content.includes("Ban")) return message.reply("NO!")
      if(message.content.includes("setVoiceChannel") || message.content.includes("setvoicechannel")) return message.reply("NO!")
      if(message.content.includes("token") || message.content.includes("Token")) return message.reply("NO!")
        eval(args.join(" "))
   } 
   catch (err) {
      message.channel.send(new Discord.RichEmbed()
      .setTitle("Error")
      .setDescription(`\`\`${err}\`\``)
      .setColor("#d63431"))
    } 
};

exports.help = {
  name: "execute",
  aliases: "exct",
  hName: "Execute",
  Description: "This command executes whatever code you type after the ``/Execute``",
  usage: "[Your Code Here]",
};


