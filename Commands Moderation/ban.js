module.exports.run = async function run(bot, message, args) {
  if(message.channel.type === "dm") return;
  if(!args[0] || args[0].toUpperCase() === "HELP") return help.helpMessage(message)
  modifierCheck(message, async (callback) => {
    if(!callback) {
      let mName = message.mentions.members.first() || message.guild.members.get(args[0]);
      if(!mName) {
        if(isNaN(args[0])) {
          return error.invalid(message, "Member", "Member cannot be found")
        } else {
          let reason = args.slice(1).join(" ");
          message.guild.ban(args[0], reason)
            .then(user => {
              if(!user.username) {
                uName = user
              } else if(user.username) {
                uName = user.username
              }
              success.userBannedWithoutRecord(message, uName, reason)
            })
          return;
        }
      }
      if(!mName.bannable) return error.unable(message, "Ban", mName.user.username, "User has ownership of this guild")
      if(mName.hasPermission("ADMINISTRATOR")) return error.unable(message, "Ban", mName.displayName, "User has admin perms")
      let reason = args.slice(1).join(" ")
      console.log(reason)
      if(!reason) reason = "No reason provided";
      if(reason !== "No reason provided") {
        let embed = new Discord.RichEmbed()
        .setDescription(`You have been Banned from \`\`${message.guild.name}\`\` by \`\`${message.member.displayName}\`\` For \`\`${reason}\`\``)
        .setFooter(`Banned At ${moment.utc(Date.now()).format("ddd, MMM Do YYYY, HH:mm:ss")}`)
        .setColor("#d63431");
      try{ 
        await mName.send(embed)
      } catch(err) {
        console.log(`[Error] Couldn\'t message ${mName.user.tag} of his ban in ${message.guild.name}!`)
      };
      User.updateOne(
        {_id: mName.id, "guilds._id": message.guild.id},
        {
          $push: {
            "guilds.$.infractions":  {
            _id: "ban" + mongoose.Types.ObjectId(),
            type: "Ban",
            details:{
              timestamp: message.createdTimestamp,
              reason: reason,
              channelID: message.channel.id
            },
              moderator: message.member.id
            }
          } 
        },
        { strict: false }
      )
      User.save
      success.userBannedWithRecord(message, mName.displayName, reason)
      mName.ban(reason);
      } else {
        let embed = new Discord.RichEmbed()
        .setDescription(`You have been Banned from \`\`${message.guild.name}\`\` by \`\`${message.member.displayName}\`\` For \`\`${reason}\`\``)
        .setFooter(`Banned At ${moment.utc(Date.now()).format("ddd, MMM Do YYYY, HH:mm:ss")}`)
        .setColor("#d63431");
      try{ 
        await mName.send(embed)
      } catch(err) {
        console.log(`[Error] Couldn\'t message ${mName.user.tag} of his ban in ${message.guild.name}!`)
      };
      success.userBannedWithoutRecord(message, mName.displayName, reason)
      mName.ban(reason);
      }
     
      return;
    } else {
      let mName = message.mentions.members.first() || message.guild.members.get(args[0]);
      if(!mName) {
        if(isNaN(args[0])) {
          return error.invalid(message, "Member", "Member cannot be found")
        } else {
          let reason = args.slice(1).join(" ");
          message.guild.ban(args[0], reason)
            .then(user => {
              if(!user.username) {
                uName = user
              } else if(user.username) {
                uName = user.username
              }
              success.userBannedWithoutRecord(message, uName, reason)
            })
          return;
        }
      }
      if(!mName.bannable) return error.unable(message, "Ban", mName.user.username, "User has ownership of this guild")
      if(mName.hasPermission("ADMINISTRATOR")) return error.unable(message, "Ban", mName.user.username, "User has admin perms")
      if(mName.id === "357842475328733186") return error.unable(message, "Ban", "I can't ban my ban developers!")
      if(callback === "norecord"){
        let reason = args.slice(1).join(" ").split("--")[0]
        if(!reason) reason = "No reason provided!"
        console.log(reason)
        let embed = new Discord.RichEmbed()
        .setDescription(`You have been Banned from \`\`${message.guild.name}\`\` by \`\`${message.member.displayName}\`\` For \`\`${reason}\`\``)
        .setFooter(`Banned At ${moment.utc(Date.now()).format("ddd, MMM Do YYYY, HH:mm:ss")}`)
        .setColor("#d63431");
      try{ 
        await mName.send(embed)
      } catch(err) {
        console.log(`[Error] Couldn\'t message ${mName.user.tag} of his ban in ${message.guild.name}!`)
      };

      success.userBannedWithoutRecord(message, mName.displayName, reason)
      mName.ban(reason);
      return;
      } else {
        error.error(message, "Error", "Unknown modifier requested!")
      }
    }
  })



}

const me = bot.users.get("357842475328733186");
exports.information = {
  trigger: {
    name: "ban",
    aliases: "b",
  },
  permission: {
    perm: "Ban",
    group: "Admin"
  },
  help: {
    name: "Ban",
    description: "Bans a member of the server",
    usage: "<User> (Reason)",
    examples: [me.tag, me.id + " way too cool to be here"]
  }
}