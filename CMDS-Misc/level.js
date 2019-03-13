

module.exports.run = async (bot, message, args) => {
    const XP = JSON.parse(fs.readFileSync("./XP.json", "utf8"));
    mName = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    let leveledUp = new Discord.RichEmbed()
      .setColor("#417af4")
    if(!args[0]) {
        leveledUp.setAuthor(message.author.username + "'s Level", message.author.avatarURL)
        leveledUp.setDescription("Current Level is: ``" + XP[message.member.id+"-"+message.guild.id].Level + "`` \n Current XP: ``" + XP[message.member.id+"-"+message.guild.id].XP +"`` \nNeeded XP to reach the next level: ``" + (XP[message.member.id+"-"+message.guild.id].reqXP - XP[message.member.id+"-"+message.guild.id].XP) + "``")
        message.channel.send(leveledUp)
        return;
    }  else if(args[0].toUpperCase() === "HELP") {
        help.helpMessage(message, "Help", "Shows yours or your friend's current level in the server", "[User]", "  ", me.id)
        return;
    } else if(args[0].toUpperCase() === "BOOST") {
        if(!message.member.hasPermission("ADMINISTRATOR") && !Admins[message.author.id+"-"+message.guild.id]) return error.noPerms(message, "ADMINISTRATOR")
        mName = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[1]);
        if(!mName) return error.invalid(message, "mName", "Member can not be found")
        let bAmount = args[2];
        if(!bAmount) return error.invalid(message, "Boost", "No boost amount is specified")
        if(isNaN(bAmount)) return error.invalid(message, "Boost", "Boost amount can only be numerical")
        if(bAmount === 0 || bAmount < 1) return error.invalid(message, "Boost", "Boost amount can not be less than 1")
        if(!XP[mName.id+"-"+message.guild.id]) {
            XP[mName.id+"-"+message.guild.id] = {
                Name: mName.user.username,
                Tag: mName.user.tag,
                ID: mName.id,
                GuildName: message.guild.name,
                GuildID: message.guild.id,
                Level: 0,
                XP: 0,
                reqXP: 200
            }
          };
        XP[mName.id+"-"+message.guild.id].XP =  XP[mName.id+"-"+message.guild.id].XP + parseInt(bAmount);
        fs.writeFile("./XP.json", JSON.stringify(XP), err => {
            if(err) throw err })
        success.XPBoost(message, bAmount, mName)
        return;
    } else if (mName) {
        if(!XP[mName.id+"-"+message.guild.id]) {
            XP[mName.id+"-"+message.guild.id] = {
                Name: mName.user.username,
                Tag: mName.user.tag,
                ID: mName.id,
                GuildName: message.guild.name,
                GuildID: message.guild.id,
                Level: 0,
                XP: 0,
                reqXP: 200
            }
          };
        await leveledUp.setAuthor(mName.user.username + "'s Level", mName.user.avatarURL)
        await leveledUp.setDescription("Current Level is: ``" + XP[mName.id+"-"+message.guild.id].Level + "`` \n Current XP: ``" + XP[mName.id+"-"+message.guild.id].XP +"`` \nNeeded XP to reach the next level: ``" +( XP[mName.id+"-"+message.guild.id].reqXP - XP[mName.id+"-"+message.guild.id].XP) + "``")
        fs.writeFile("./XP.json", JSON.stringify(XP), err => {
            if(err) throw err });
        await message.channel.send(leveledUp)
        return;
    } else {
        return error.invalid(message, "mName", "User cannot be found")
    }

};
  
  exports.help = {
    name: "level",
    aliases: "lvl",
    hName: "Level",
    Description: "Shows yours or your friend's current level in the server",
    usage: "[User]",
  
  };
  
  
  