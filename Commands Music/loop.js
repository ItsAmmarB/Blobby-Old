module.exports.run = async (bot, message, args) => {
  if(!permCheck(message)) return error.noPerms(message, cmdInfo.permission.group + "." + cmdInfo.permission.perm)  
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
    else if(subSection.toUpperCase() === "HELP" || subSection.toUpperCase() === "H") {
        help.helpMessage(message, "Loop", "Repeats the song or the queue endlessly.", "[Song\\Queue\\Off]", "Song", "Queue\n **Note:** Use 'Song' to loop current song only, 'Queue' to loop all queue songs or 'Off' to stop looping.")
    }
    else if(subSection.toUpperCase() === "OFF" || subSection.toUpperCase() === "O")  {
        guilds[message.guild.id].loop = 0;
        success.Loop(message, "Has been ", "Disabled")
    }
    else if(subSection.toUpperCase() === "SONG" || subSection.toUpperCase() === "S"){
        guilds[message.guild.id].loop = 1;
        success.Loop(message, "Has been set to ", "Current Song Only")
    }
    else if(subSection.toUpperCase() === "ALL" || subSection.toUpperCase() === "A"){
        guilds[message.guild.id].loop = 2;
        success.Loop(message, "Has been set to ", "All Queue Songs")
    }
    else {
        error.invalid(message, "Loop", "You can choose between 'All', 'Song' and 'Off' only")
    }


}

exports.information = {
    trigger: {
    name: "loop",
    aliases: "lp",
    },
    permission: {
    perm: "Play",
    group: "Member"
    },
    help: {
    name: "Loop",
    description: "Repeats the song or the queue endlessly.\n• Note: off = Loop off, Song = Loop current song only, all = Loop all queue songs",
    usage: "<Switch>",
    examples: ["off", "all"]
    }
}