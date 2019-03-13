module.exports.run = async (bot, message, args) => {
    if(message.channel.type === "dm") return;

if(!guilds[message.guild.id]) return error.invalid(message, "Volume", "There is no active stream in this guild")
if(!args[0]) return message.channel.send(new Discord.RichEmbed()
    .setTitle("Volume")
    .setDescription(`Current Volume is set to: ${guilds[message.guild.id].volume}`)
    .setColor("#417af4")
    )
if(args[0] < 1 || args[0] > 10) return error.invalid(message, "Volume", "Volume input must be a Number betweet 1 and 10")
if(isNaN(args[0]) )return error.invalid(message, "vAmount", "Volume input must be a Number betweet 1 and 10")
guilds[message.guild.id].volume = args[0];
message.guild.voiceConnection.dispatcher.setVolumeLogarithmic(args[0] / 9)
success.vChange(message, args[0])


}

exports.help = {
    name: "volume",
    aliases: "v",
    hName: "Volume",
    Description: "Changes the volume of the stream",
    usage: "[Amount 1-10]",
  };