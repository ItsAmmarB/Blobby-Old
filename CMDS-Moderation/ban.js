module.exports.run = async (bot, message, args) => {
  if(message.channel.type === "dm") return;
  if(!message.member.hasPermission("BAN_MEMBERS") && !Admins[message.author.id+"-"+message.guild.id]) return error.noPerms(message, "BAN_MEMBERS")
  if(!args[0] || args[0].toUpperCase() === "HELP") return help.helpMessage(message, "Ban", "Bans a member of the server", "[User] (Reason)", "@" + me.tag + " Troll ", me.id + " Too cool to be here")
  let mName = message.mentions.members.first() || message.guild.members.get(args[0]);
  if(!mName | args[0].length === "18") {
    let reason = args.slice(1).join(" ");
    message.guild.ban(args[0], reason)
      .then(user => {
        if(!user.username) {
          uName = user
        } else if(user.username) {
          uName = user.username
        }
        success.userAction(message, uName, "Banned", reason)
      })
    return;
  }
  if(!mName.bannable) return error.unable(message, "Ban", mName.user.username, "User has ownership of this guild")
  if(mName.hasPermission("ADMINISTRATOR")) return error.unable(message, "Ban", mName.user.username, "User has admin perms")
  if(mName.id === "357842475328733186") return error.unable(message, "Ban", "I can't ban my own dad!")
  let reason = args.slice(1).join(" ");
  if(!reason) reason = "No reason provided";
  let embed = new Discord.RichEmbed()
    .setDescription(`You have been Banned from \`\`${message.guild.name}\`\` by \`\`${message.author.tag}\`\`  
      For \`\`${reason}\`\``)
    .setFooter(`Banned At ${moment.utc(Date.now()).format("ddd, MMM Do YYYY, HH:mm:ss")}`)
    .setColor("#d63431");
  try{ 
    await mName.send(embed)
  } catch(err) {
    console.log(err)
    console.log(`[Error] Couldn\'t message ${mName.user.tag} of his ban in ${message.guild.name}!`)
  };
  success.userAction(message, mName.user.username, "Banned", reason)
  mName.ban(reason)
   
};

exports.help = {
  name: "ban",
  aliases: "b",
  hName: "Ban",
  Description: "Bans a member of the server",
  usage: "[User] (Reason)",

};


