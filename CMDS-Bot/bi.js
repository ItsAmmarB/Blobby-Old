module.exports.run = async (bot, message, args) => {
    if(!Own[message.member.id]) return;
  
  let ld = bot.guilds.get("454795197901963264").roles.find(role => role.name === "Lead Developer").members.map(member =>  `\`\`- ${member.displayName}\`\``).join("\n") || "None";
  let sd = bot.guilds.get("454795197901963264").roles.find(role => role.name === "Senior Developer").members.map(member =>   `- \`\`${member.displayName}\`\``).join("\n") || "None";
  let ad = bot.guilds.get("454795197901963264").roles.find(role => role.name === "Advanced Developer").members.map(member =>   `- \`\`${member.displayName}\`\``).join("\n") || "None";
  let d = bot.guilds.get("454795197901963264").roles.find(role => role.name === "Developer").members.map(member =>   `- \`\`${member.displayName}\`\``).join("\n") || "None";
  let jd = bot.guilds.get("454795197901963264").roles.find(role => role.name === "Junior Developer").members.map(member =>   `- \`\`${member.displayName}\`\``).join("\n") || "None";
  let lt = bot.guilds.get("454795197901963264").roles.find(role => role.name === "Lead Tester").members.map(member =>   `- \`\`${member.displayName}\`\``).join("\n") || "None";
  let st = bot.guilds.get("454795197901963264").roles.find(role => role.name === "Senior Tester").members.map(member =>   `- \`\`${member.displayName}\`\``).join("\n") || "None";
  let at = bot.guilds.get("454795197901963264").roles.find(role => role.name === "Advanced Tester").members.map(member =>   `- \`\`${member.displayName}\`\``).join("\n") || "None";
  let t = bot.guilds.get("454795197901963264").roles.find(role => role.name === "Tester").members.map(member =>   `- \`\`${member.displayName}\`\``).join("\n") || "None";
  let jt = bot.guilds.get("454795197901963264").roles.find(role => role.name === "Junior Tester").members.map(member =>   `- \`\`${member.displayName}\`\``).join("\n") || "None";
  
  
    try {
      bot.guilds.get("454795197901963264").channels.get("512025584327458818").fetchMessages()
      .then(messages => messages.forEach(message => message.delete()))
  await bot.guilds.get("454795197901963264").channels.get("512025584327458818").send(`Hello there,
  
  I'm Blobby, and Thanks for joining, So, this is my Discord server,
here you'll be able to see all my updates, realtime errors and warnings which happen at my local console,
and you are more than welcome to stay and hang out here.
  
Let me walk you through the rules really quick..
  
__**Don't**__ disrepect anyone unless all parties are fine with it.
__**Don't**__ exploit any of my bugs, instead you can let me know there: \<\#512027985935728640\>.
__**Don't**__ Self-advertise anywhere but in \<\#512028330200006686\>.
__**Don't**__ ask for any role, you won't get it.
__**Don't**__ spam, i will be able to detect it soon, and you will regret it.
__**Don't**__ be recist, I DO NOT tolerate any recisim.
__**Don't**__ argue with and member of \`\`Proj. Development Team\`\` or \`\`Proj. Testing Team\`\`.
__**Don't**__ post any NSFW as I DO NOT tolerate any in my Discord server.
__**Don't**__ mass tag, i will be able to detect that, and I'll mute you.
__**Don't**__ make any obnoxious noises. 
__**Don't**__ not ask for my code, you won't get it.
__**Keep**__ swearing to a minimum 
__**Keep**__ your nice and good.
  
Okay, so now that you know all the rules, let me show you the roles.
  
***Blobby***`)
  .then(bot.guilds.get("454795197901963264").channels.get("512025584327458818").send(`\`\`- ME :)\`\`
***Proj. Lead***
\`\`- ${bot.guilds.get("454795197901963264").members.get("357842475328733186").displayName}\`\`
***Proj. Co-Lead***
\`\`- ${bot.guilds.get("454795197901963264").members.get("173082448958062592").displayName}\`\`
***Proj. Developement Team***
__Lead Developer__
${ld}
__Senior Developer__
${sd}
__Advanced Developer__
${ad}
__Developer__
${d}
__Junior Developer__
${jd}
***Proj. Testing Team***
__Lead Tester__
${lt}
__Senior Tester__
${st}
__Advanced Tester__
${at}
__Tester__
${t}
__Junior Tester__
${jt}
    
Alrighty, now that you've read through it, if you want to become a tester for any given reason or without one,
just type \`\`/join Testing Team\`\` or something like it, And you're going to be one in no time, 
you can advance in ranks and maybe become a Developer, You just need to prove yourself.
Here is a permanent invite link if you want to invite someone: https://discord.gg/TxVSN7x

  
and now, You're all set to get in and hang out, hope you enjoy.
  
Looking forward to talk to you in the nearest feature,
  
Blobby B.`))
  } catch(error) {
  bot.guilds.get("454795197901963264").channels.get("512022571558895626").send(error)
  return;
  }
  message.delete().catch(O_o=>{});

};

exports.help = {
  name: "bi",
  aliases: "Classified",
  hName: "Classified",
  Description: "Classified",
  usage: "Classified",
}


