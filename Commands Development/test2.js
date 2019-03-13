bot.on('guildMemberAdd', member => {
  let channel = member.guild.channels.find(channel => channel.name === "general")
      if(!channel) return;
  channel.send('Welcome to Lake County Role Play ' + member)
})

bot.on('guildMemberRemove', member => {
  let channel = member.guild.channels.find(channel => channel.name === "general")
      if(!channel) return;
  channel.send('It\'s sad to see you leave ' + member )
})
