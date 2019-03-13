module.exports.run = async (bot, message, args) => {
    if(message.channel.type === "dm") return;
    let = subSection = args[0]
    if(!subSection) {
        if(guilds[message.guild.id].loop === 2) {
            loop = " Loop All Queue Songs"
            loop2 = "Is set to "
        }
        else if(guilds[message.guild.id].loop === 1) {
            loop = " Loop Current Song Only"
            loop2 = "Is set to "
        } 
        else {
            loop = " Disabled"
            loop2 = "Is "
        }
        return success.Loop(message, loop2, loop)
    } 
    else if(subSection.toUpperCase() === "HELP") {
        help.helpMessage(message, "Loop", "Repeats the song or the queue endlessly.", "[Song\\Queue\\Off]", "Song", "Queue\n **Note:** Use 'Song' to loop current song only, 'Queue' to loop all queue songs or 'Off' to stop looping.")
    }
    else if(subSection.toUpperCase() === "OFF")  {
        guilds[message.guild.id].loop = 0;
        success.Loop(message, "Has been ", "Disabled")
    }
    else if(subSection.toUpperCase() === "SONG"){
        guilds[message.guild.id].loop = 1;
        success.Loop(message, "Has been set to ", "Current Song Only")
    }
    else if(subSection.toUpperCase() === "QUEUE"){
        guilds[message.guild.id].loop = 2;
        success.Loop(message, "Has been set to ", "All Queue Songs")
    }
    else {
        error.invalid(message, "Loop", "You can choose between 'Sueue', 'Song' and 'Off' only")
    }


}

exports.help = {
    name: "loop",
    aliases: "lp",
    hName: "Loop",
    Description: "Repeats the song or the queue endlessly.",
    usage: "[Song\\Queue\\Off]",
  };