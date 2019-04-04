module.exports.run = async (bot, message, args) => {
    let subsection = args[0];
    if(!subsection) {
        if(guilds[message.guild.id].queueNames.length === 0) return message.channel.send(new Discord.RichEmbed()
        .setDescription("Queue is empty!")
        .setColor("#417af4"))


        
        if(!guilds[message.guild.id].queue[1]){
            embed = new Discord.RichEmbed()
                .setAuthor("Now Playing", "https://xaqkww.am.files.1drv.com/y4mp6ACqMRPOSdfBsnFGz0O0JOsfl0zOS6CQdAAqEBr_UxFB_WFTYZdgpl2itKP5VRcTfs-v2z_l0g_5lVniYhVq_kWMHIqFqDlP_UmiwOLuTSQNa6mhtzSDB-aCZW1vpSBDjh2Gg51WiNhbZwyIH95C4HqhPU92X_R9AQaA660Fx7jedyqroqi0Xdhr3yt6z4rrlRFPrnmSlMXElGGjzOTSA?width=400&height=400&cropmode=none")
                .setDescription(guilds[message.guild.id].queueNames[0])
                .setColor("#417af4")

                if(guilds[message.guild.id].loop === 1){
                    embed.setFooter("Looping current song only")
                } else if(guilds[message.guild.id].loop === 2){
                   embed.setFooter("Looping all songs")
                }
        } else {
            embed = new Discord.RichEmbed()
                .setAuthor("Now Playing", "https://xaqkww.am.files.1drv.com/y4mp6ACqMRPOSdfBsnFGz0O0JOsfl0zOS6CQdAAqEBr_UxFB_WFTYZdgpl2itKP5VRcTfs-v2z_l0g_5lVniYhVq_kWMHIqFqDlP_UmiwOLuTSQNa6mhtzSDB-aCZW1vpSBDjh2Gg51WiNhbZwyIH95C4HqhPU92X_R9AQaA660Fx7jedyqroqi0Xdhr3yt6z4rrlRFPrnmSlMXElGGjzOTSA?width=400&height=400&cropmode=none")
                .setDescription(guilds[message.guild.id].queueNames[0])
                .setColor("#417af4")
            if(guilds[message.guild.id].queue.length > 16) {
                embed.addField(`̷̧̟̭̺͕̜̦̔̏̊̍ͧ͊́̚̕͞`,"**Queue List:**　_(First 15)_\n"+ `${guilds[message.guild.id].queueNames.map(queue => `- ${queue}`).slice(1, 16).join("\n")}`)
            } else {
                embed.addField(`̷̧̟̭̺͕̜̦̔̏̊̍ͧ͊́̚̕͞`,"**Queue List:**　_(First 15)_\n"+ `${guilds[message.guild.id].queueNames.map(queue => `- ${queue}`).slice(1).join("\n")}`)
            }
            if(guilds[message.guild.id].loop === 1){
                embed.setFooter("Queue Length: " + guilds[message.guild.id].queueNames.length + "　|　Looping current song only")
            } else if(guilds[message.guild.id].loop === 2){
               embed.setFooter("Queue Length: " + guilds[message.guild.id].queueNames.length + "　|　Looping all songs")
            } else {
                embed.setFooter("Queue Length: " + guilds[message.guild.id].queueNames.length)
            }
        }




        message.channel.send(embed)
        return;
    } 
    else if(subsection.toString().toUpperCase() === "CLEAR" || subsection.toString().toUpperCase() === "C") {
        guilds[message.guild.id].queue = [guilds[message.guild.id].queue[0]];
        guilds[message.guild.id].queueNames = [guilds[message.guild.id].queueNames[0]];
        guilds[message.guild.id].skippers = [];

        success.qClear(message, "All ", "Queue list has been cleared!")
        return;
    }
    else if(subsection.toString().toUpperCase() === "HELP") {
        guilds[message.guild.id].queue = [guilds[message.guild.id].queue[0]];
        guilds[message.guild.id].queueNames = [guilds[message.guild.id].queueNames[0]];
        guilds[message.guild.id].skippers = [];

        help.helpMessage(message, "Queue", "Shows the current queue, and clears it as well", "[SubCommand]", " ", " clear")
        return;
    }
}

exports.information = {
    trigger: {
    name: "queue",
    aliases: "q",
    },
    permission: {
    perm: "queue",
    group: "Member"
    },
    help: {
    name: "Queue",
    description: "Show the currect queue and clears it",
    usage: "(Clear)",
    examples: [ " ", " Clear"]
    }
}