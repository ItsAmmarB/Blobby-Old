module.exports.run = async (bot, message, args) => {
 let sections = args[0];

 if(!sections) {
    return help.helpMessage(message);
  } else if(sections.toLowerCase() === "fetchguilds" || sections.toLowerCase() === "fg") {
    let guildsCollection = {};
    await bot.guilds.forEach(guild => guildsCollection[guild.id]={guildName: guild.name,guildID:guild.id,guildOwner:guild.owner.user.username})
    let guilds = Object.keys(guildsCollection).map(key => ({key: key, value:guildsCollection[key]}))
    // console.log(guilds)
    let embed = new Discord.RichEmbed()
    .setDescription("Guilds collection has been created!")
    .addField("Guild Name", guilds.map(col => col.value.guildName), true)
    .addField("Guild ID", guilds.map(col => col.value.guildID), true)
    .setFooter("Requested by " + message.member.displayName)
    .setTimestamp()
    .setColor("#417af4")
    message.channel.send(embed)
    return;
  } else if(sections.toLowerCase() === "fetchusers" || sections.toLowerCase() === "fu") {
    let usersCollection = {};
    await bot.users.forEach(user => usersCollection[user.id]={userName: user.username,userID:user.id})
    let users = Object.keys(usersCollection).map(key => ({key: key, value:usersCollection[key]}))
    // console.log(guilds)
    let embed = new Discord.RichEmbed()
    .setDescription("Users collection has been created!")
    .addField("Guild Name", users.map(col => col.value.userName), true)
    .addField("Guild ID", users.map(col => col.value.userID), true)
    .setFooter("Requested by " + message.member.displayName)
    .setTimestamp()
    .setColor("#417af4")
    message.channel.send(embed)
    return;
  } else if(sections.toLowerCase() === "getguild" || sections.toLowerCase() === "gg") {
    let guildID = args[1];
    if(!guildID) return help.sectionHelpMessage(message)
    if(isNaN(guildID)) return error.invalid(message, "guildID", "Guild id is made of numbers only")
    if(!bot.guilds.get(guildID)) return error.invalid(message, "Guild", "Guild cannot be found in the database")
    let tGuild = bot.guilds.get(guildID);
    let embed = new Discord.RichEmbed()
      .setDescription("Guild has been found under the ID of: " + tGuild.id)
      .setThumbnail(tGuild.iconURL)
      .addField("⇢ Guild Details", `Guild Name: ${tGuild.name}\nGuild ID: ${tGuild.id}\nGuild Members: ${tGuild.members.size}\nGuild Roles: ${tGuild.roles.size}\nGuild Channels: ${tGuild.channels.size}\nGuild Region: ${tGuild.region}\nGuild Created At: ${tGuild.createdAt}\nVerified?: ${tGuild.verified ? "Yes" : "No"}`)
      .addField("⇢ Guild Owner Detail", `Owner Username: ${tGuild.owner.user.username}\nOwner Discriminator: ${tGuild.owner.user.discriminator}\nOwner ID: ${tGuild.owner.user.id}\nOwner Created At: ${tGuild.owner.user.createdAt}\nBot? ${tGuild.owner.user.bot ? "Yes" : "No"}\nVerified? ${tGuild.owner.user.verified ? "Yes" : "No"}`)
      .setFooter("Requested by " + message.member.displayName)
      .setTimestamp()
      .setColor("#417af4")
    message.channel.send(embed)
    return;
  } else if(sections.toLowerCase() === "getuser" || sections.toLowerCase() === "gu") {
    let userID = args[1];
    if(!userID) return help.sectionHelpMessage(message)
    if(isNaN(userID)) return error.invalid(message, "userID", "User id is made of numbers only")
    if(!bot.users.get(userID)) return error.invalid(message, "User", "User cannot be found in the database")
    let tUser = bot.users.get(userID);
    let embed = new Discord.RichEmbed()
      .setDescription("User has been found under the ID of: " + tUser.id)
      .setThumbnail(tUser.avatarURL)
      .addField("⇢ User Details", `Username: ${tUser.username}\nUser ID: ${tUser.id}\nGuild Created At: ${tUser.createdAt}\nVerified?: ${tUser.verified ? "Yes" : "No"}`)
      .addField("⇢ User Mutual Guilds", bot.guilds.filter(guild => guild.members.get(tUser.id)).map(guild => guild.name))
      .setFooter("Requested by " + message.member.displayName)
      .setTimestamp()
      .setColor("#417af4")
    message.channel.send(embed)
    return;
  } 
};

exports.information = {
  trigger: {
  name: "bot",
  aliases: "bot",
  },
  permission: {
    perm: "Bot",
    group: "Developer",
    permLevel: "Advanced Developer",
  },
  help: {
  name: "Bot",
  description: "Fetches information from the bot.",
  usage: "<section>",
  examples: ["fetchGuilds","fetchUsers"]
  },
  sections:[
    {
    permission: {
    perm: 'Bot.fetchGuilds',
    group: 'Developer'
    },
    name: 'fetchGuilds',
    shortcut: 'fg',
    description: 'Fetches all bot\'s guilds',
    usage:' ',
    examples: [' ', ' ']
    },
    {
    permission: {
    perm: 'Bot.fetchUsers',
    group: 'Developer'
    },
    name: 'fetchUsers',
    shortcut: 'fu',
    description: 'Fetches all bot\'s users.',
    usage:' ',
    examples: [' ', ' ']
    },
    {
    permission: {
    perm: 'Bot.getGuild',
    group: 'Developer'
    },
    name: 'getGuild',
    shortcut: 'gg',
    description: 'Gets a guild of the bot\'s guilds collection',
    usage:'<Guild ID>',
    examples: ['454795197901963264', '523625746866896914']
    },
    {
    permission: {
    perm: 'Bot.getUser',
    group: 'Developer'
    },
    name: 'getUser',
    shortcut: 'gu',
    description: 'Gets a user from the bot\'s users collection',
    usage:'<User ID>',
    examples: ['357842475328733186', '455946985090842626']
    },
  ]
}