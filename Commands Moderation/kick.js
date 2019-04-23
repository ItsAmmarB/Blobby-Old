module.exports.run = async (bot, message, args) => {
  if(!args[0] || args[0].toUpperCase() === "HELP") return help.helpMessage(message)
  let mName = message.mentions.members.first() || message.guild.members.get(args[0]);
  modifierCheck(message, async (callback) => {
    if(!callback) {
      if(!mName) return error.invalid(message, "mName", "User does not exist")
      if(!mName.kickable) return error.unable(message, "Kick", mName.user.username, "User has ownership of this guild")
      if(mName.hasPermission("ADMINISTRATOR") && !mName.user.bot) return error.unable(message, "Kick", mName.user.username, "User has admin perms")
      let reason = args.slice(1).join(" ");
      if(!reason) reason = "No reason provided";
      if(reason !== "No reason provided") { 
        User.updateOne(
          {_id: mName.id, "guilds._id": message.guild.id},
          {
            $push: {
              "guilds.$.infractions":  {
              _id: "kick" + mongoose.Types.ObjectId(),
              type: "Kick",
              details:{
                timestamp: message.createdTimestamp,
                reason: reason,
                channelID: message.channel.id
              },
                moderator: message.member.id
              }
            } 
          },
          { strict: false },
          (err, res) => {
            console.log(res)
          }
        )
        User.save
        let embed = new Discord.RichEmbed()
        .setDescription(`You have been Kicked from \`\`${message.guild.name}\`\` by \`\`${message.member.displayName}\`\`  
          For \`\`${reason}\`\``)
        .setFooter(`Kicked At ${moment.utc(Date.now()).format("ddd, MMM Do YYYY, HH:mm:ss")}`)
        .setColor("#d63431");
      try{ 
        await mName.send(embed)
      } catch(err) {
        console.log(`[Error] Couldn\'t message ${mName.user.tag} of his kick in ${message.guild.name}!`)
      };
      success.userKickedWithRecord(message, mName, reason)
      mName.kick(reason)
      return;
      } else {
        let embed = new Discord.RichEmbed()
        .setDescription(`You have been Kicked from \`\`${message.guild.name}\`\` by \`\`${message.member.displayName}\`\`  
          For \`\`${reason}\`\``)
        .setFooter(`Kicked At ${moment.utc(Date.now()).format("ddd, MMM Do YYYY, HH:mm:ss")}`)
        .setColor("#d63431");
      try{ 
        await mName.send(embed)
      } catch(err) {
        console.log(`[Error] Couldn\'t message ${mName.user.tag} of his kick in ${message.guild.name}!`)
      };
      success.userKickedWithoutRecord(message, mName, reason)
      mName.kick(reason)
      return;
      }
      return;
    } else {
      if(!mName) return error.invalid(message, "mName", "User does not exist")
      if(!mName.kickable) return error.unable(message, "Kick", mName.user.username, "User has ownership of this guild")
      if(mName.hasPermission("ADMINISTRATOR") && !mName.user.bot) return error.unable(message, "Kick", mName.user.username, "User has admin perms")
      if(callback === "norecord"){
        let reason = args.slice(1).join(" ").split("--")[0];
        if(!reason) reason = "No reason provided";
        let embed = new Discord.RichEmbed()
          .setDescription(`You have been Kicked from \`\`${message.guild.name}\`\` by \`\`${message.member.displayName}\`\`  
            For \`\`${reason}\`\``)
          .setFooter(`Kicked At ${moment.utc(Date.now()).format("ddd, MMM Do YYYY, HH:mm:ss")}`)
          .setColor("#d63431");
        try{ 
          await mName.send(embed)
        } catch(err) {
          console.log(err)
          console.log(`[Error] Couldn\'t message ${mName.user.tag} of his kick in ${message.guild.name}!`)
        };
        success.userKickedWithoutRecord(message, mName, reason)
        mName.kick(reason)
      return;
      } else {
        error.error(message, "Error", "Unknown modifier requested!")
      }
    }
  })




  
  
};

const me = bot.users.get("357842475328733186");

exports.information = {
  trigger: {
    name: "kick",
    aliases: "k",
  },
  permission: {
    perm: "Kick",
    group: "Admin"
  },
  help: {
    name: "kick",
    description: "Kicks a member of the server",
    usage: "<User> (Reason)",
    examples: [me.tag, me.id + " You can't be here"]
  }
}