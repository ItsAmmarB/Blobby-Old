module.exports.run = async (bot, message, args) => {
  if(message.channel.type === "dm") return;
  if(message.author.id === "357842475328733186"){
  if(!args[0] || args[0].toUpperCase() === "HELP") return help.helpMessage(message, "DelOwn", "Takes the power of Owner from a Co-Owner", "[User]", "@" + me.tag, me.id)
  let mName = bot.users.find(user => message.mentions.users.first()) || bot.users.get(args[0]);
  if(!mName) return error.invalid(message, "mName", "User does not exist")
  if(!Own[mName.id]) return error.is(message, mName.username, "is not a", "Co-Owner")
  delete Own[mName.id];
  fs.writeFile("./Owners.json", JSON.stringify(Own), err => {
    if(err) throw err;});
  success.del(message, mName.username, "Owner")
   
    return;
  } else if(Own[message.author.id]) {
    return error.noPerms(message, "MANAGE_CO-OWNERS")
  } else {
    return;
  }
};

exports.help = {
  name: "delown",
  aliases: "do",
  hName: "DelOwn",
  Description: "Takes the power of Owner from a Co-Owner",
  usage: "[User] \n**Note:** Command can only be use by the Owners!",

}