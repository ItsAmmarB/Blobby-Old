module.exports.run = async (bot, message, args) => {
    if(!args[0]) return help.helpMessage(message)
    if(!args.includes("-")) return error.invalid(message, "Lyrics", "You need to seperate the Author name and the Song name with '-'")
    let artist = args.join(" ").split("-").slice(0, 1)
    if(!artist) return error.invalid(message, "Lyrics", "You need to specifiy the Author name") 
    let song = args.join(" ").split("-").slice(1)
    if(!song) return error.invalid(message, "Lyrics", "You need to specifiy the Song name") 
    let API = `https://api.lyrics.ovh/v1/${artist}/${song}`
    try {
        request.get(API, function (err, response, body) {
            if(response.statusCode === 404) {
                return error.invalid(message, "Lyrics", "Lyrics cannot be found")
            }
            else {
                let embed = new Discord.RichEmbed()
                    .setAuthor(song + "'s lyrics")
                    .setTitle("By " + artist)
                    .setColor("#417af4")
                let embed2 = new Discord.RichEmbed()
                    .setColor("#417af4")
                let embed3 = new Discord.RichEmbed()
                    .setColor("#417af4")
                let embed4 = new Discord.RichEmbed()
                    .setColor("#417af4")
                let embed5 = new Discord.RichEmbed()
                    .setColor("#417af4")
            
                let lyrics = JSON.parse(body)
                if(lyrics.lyrics.length < 2000) {
                    embed.setDescription(lyrics.lyrics)
                    message.channel.send(embed)
                } else {
                    try {
                        let phrases = lyrics.lyrics.split("\n\n")
                        if(phrases.length > 100) {
                            let lr = phrases.slice(0, phrases.length / 5)
                            let lr2 = phrases.slice(phrases.length / 5, phrases.length / 5 * 2)
                            let lr3 = phrases.slice(phrases.length / 5 * 2, phrases.length / 5 * 3)
                            let lr4 = phrases.slice(phrases.length / 5 * 3, phrases.length / 5 * 4)
                            let lr5 = phrases.slice(phrases.length / 5 * 4, phrases.length)
                            embed.setDescription(lr.join("\n\n"))
                            embed2.setDescription(lr2.join("\n\n"))
                            embed3.setDescription(lr3.join("\n\n"))
                            embed4.setDescription(lr4.join("\n\n"))
                            embed5.setDescription(lr5.join("\n\n"))
                            message.channel.send(embed)
                            message.channel.send(embed2)
                            message.channel.send(embed3)
                            message.channel.send(embed4)
                            message.channel.send(embed5)

                        } else if(phrases.length > 80 && phrases.length < 100) {
                            let lr = phrases.slice(0, phrases.length / 4)
                            let lr2 = phrases.slice(phrases.length / 4, phrases.length / 4 * 2)
                            let lr3 = phrases.slice(phrases.length / 4 * 2, phrases.length / 4 * 3)
                            let lr4 = phrases.slice(phrases.length / 4 * 3, phrases.length)
                            embed.setDescription(lr.join("\n\n"))
                            embed2.setDescription(lr2.join("\n\n"))
                            embed3.setDescription(lr3.join("\n\n"))
                            embed4.setDescription(lr4.join("\n\n"))
                            message.channel.send(embed)
                            message.channel.send(embed2)
                            message.channel.send(embed3)
                            message.channel.send(embed4)

                        } else if(phrases.length > 60 && phrases.length < 80) {
                            let lr = phrases.slice(0, phrases.length / 3)
                            let lr2 = phrases.slice(phrases.length / 3, phrases.length / 3 * 2)
                            let lr3 = phrases.slice(phrases.length / 3 * 2, phrases.length)
                            embed.setDescription(lr.join("\n\n"))
                            embed2.setDescription(lr2.join("\n\n"))
                            embed3.setDescription(lr3.join("\n\n"))
                            message.channel.send(embed)
                            message.channel.send(embed2)
                            message.channel.send(embed3)

                        } else {
                            let lr = phrases.slice(0, phrases.length / 2)
                            let lr2 = phrases.slice(phrases.length / 2, phrases.length)
                            embed.setDescription(lr.join("\n\n"))
                            embed2.setDescription(lr.join("\n\n"))
                            message.channel.send(embed)
                            message.channel.send(embed2)

                        }
                    } catch (e) {
                        console.log(e)
                    }
                }
            }
        })
    } catch (e) {
        error.system(message, "Something went wrong!")
    }
  };
  

exports.information = {
    trigger: {
        name: "lyrics",
        aliases: "lr",
    },
    permission: {
        perm: "Lyrics",
        group: "Music"
    },
    help: {
        name: "Lyrics",
        description: "Shows the lyrics of the specified song",
        usage: "<Artist - Song>",
        examples: ["MAX - Lights Down Low", "Illenium - Let You Go"]
    }
}
  
  
  