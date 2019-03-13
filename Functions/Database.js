module.exports.newGuild = async (guild) => {
  let position =  JSON.stringify(Object.values(bot.guilds.map(guild => ({id: guild.id, joinedAt: guild.joinedTimestamp}))).sort((first, second) => (first.joinedAt < second.joinedAt) ? -1 : (first.joinedAt > second.joinedAt) ? 1 : 0 )).split(guild.id).slice(0, 1).join("").split("\"id\"").length - 1
    const newGuild = new Guild({
      _id: guild.id,
      guildInfo: {
          guildID: guild.id,
          position: position,
          guildCreatedAtTimestamp: guild.createdTimestamp,

      },
      guildSettings: {
          prefix: defPrefix,
          djRole: false,
          logsSystem: false,
          xpSystem: false,
          cashSystem: false,
          automodSysten: false,
          permissionsMap:{
              users: false,
              roles: false,
          }
      }
    },{ strict: false })
    newGuild.save()
    guild.members.forEach(member => {
      User.findOne({_id: member.id, "userInfo.userID": member.id}, (err, user) =>{
        if(err) throw err
        if(!user){
          newUser(member)
        } else {
          addGuild(member)
        }
      })
    })
}


module.exports.newUser = async (member) => {
  let position = JSON.stringify(Object.values(member.guild.members.map(member => ({ name: member.user.username, id: member.user.id, joinedAt: member.joinedTimestamp}))).sort((first, second) => (first.joinedAt < second.joinedAt) ? -1 : (first.joinedAt > second.joinedAt) ? 1 : 0 )).split(member.id).slice(0, 1).join("").split("\"id\"").length - 1

  const newUser = new User({
    _id: member.id,
    userInfo: {
        userID: member.id,
        createdAtTimestamp: member.user.createdTimestamp
    },
    guilds:[{
      _id: member.guild.id,
      guildID: member.guild.id,
      position: position,
      currency:{
          xp: 0,
          cash: 0,
      },
    }]
  },{ strict: false })
  newUser.save()
}


module.exports.addGuild = async (member) => {
  let position = JSON.stringify(Object.values(member.guild.members.map(member => ({ name: member.user.username, id: member.user.id, joinedAt: member.joinedTimestamp}))).sort((first, second) => (first.joinedAt < second.joinedAt) ? -1 : (first.joinedAt > second.joinedAt) ? 1 : 0 )).split(member.id).slice(0, 1).join("").split("\"id\"").length - 1
  User.findOneAndUpdate({_id: member.id, "userInfo.userID": member.id},{
    $push : {
      "guilds": {
        _id: member.guild.id,
        guildID: member.guild.id,
        position: position,
        currency:{
            xp: 0,
            cash: 0,
        },
      }
    }
  },(err, res) =>{
    if(err) console.log(err)
  }, { strict: false })
  User.save
  return;
}