module.exports.run = async (bot, message, args) => {
  if(message.channel.type === "dm") return;
  if(Own[message.author.id] || message.author.id === "357842475328733186"){
    if(!args[0] || args[0].toUpperCase() === "HELP") return help.helpMessage(message, "addDev", "Gives a person Developers perms", "[User]", "@" + me.tag, me.id)
    let mName = bot.users.find(user => message.mentions.users.first()) || bot.users.get(args[0]);
    if(!mName) return error.invalid(message, "mName", "User does not exist")
    if(Dev[mName.id]) return error.is(message, mName.username, "is already a", "Developer")
    Dev[mName.id] = {
      Tag: mName.tag
    };
    fs.writeFile("./Devs.json", JSON.stringify(Dev), err => {
      if(err) throw err;});
    success.add(message, mName.username, "Developer")
     
    return;
  }
  else if (Dev[message.author.id]) {
    return error.noPerms(message, "MANAGE_DEVELOPERS")
  } else {
    return;
  }
};

exports.help = {
  name: "adddev",
  aliases: "ad",
  hName: "AddDev",
  Description: "Gives a person Developers perms",
  usage: "[User] \n**Note:** Command can only be use by the Owners!",
};


