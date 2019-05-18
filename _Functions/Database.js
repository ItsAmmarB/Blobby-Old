module.exports.newGuild = async (guild) => {
  let position =  JSON.stringify(Object.values(bot.guilds.map(guild => ({id: guild.id, joinedAt: guild.joinedTimestamp}))).sort((first, second) => (first.joinedAt < second.joinedAt) ? -1 : (first.joinedAt > second.joinedAt) ? 1 : 0 )).split(guild.id).slice(0, 1).join("").split("\"id\"").length - 1
  let globalPermissions = bot.allCommands.filter(command => command.information.permission.group === "Member").map(command => command.information.permission.perm)
  globalPermissions.push("FiveM.Player", "FiveM.Status", "Fortnite.Link", "Fortnite.Unlink")  
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
              users: [],
              roles: [{
                roleID: guild.id,
                permissions:globalPermissions
              }]
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


module.exports.newPrivilege = async (message, member, priv) => {
  const privileges = {
    record:{privilegeID: "90REC"+member.id, rank: "Record", permissions: ["infractions.record"]},
    tester:{privilegeID: "100TEST"+member.id, rank: "Tester", permissions: ["Tester"]},
    juniordeveloper:{privilegeID: "110DEV"+member.id, rank: "Developer", permissions: ["Tester", "Junior Developer"]},
    advanceddeveloper:{privilegeID: "111DEV"+member.id, rank: "Developer", permissions: ["Tester", "Junior Developer", "Advanced Developer"]},
    seniordeveloper:{privilegeID: "112DEV"+member.id, rank: "Developer", permissions: ["Tester", "Junior Developer", "Advanced Developer", "Senior Developer"]},
    owner:{privilegeID: "OWN"+member.id, rank: "Owner", permissions: ["Tester", "Junior Developer", "Advanced Developer", "Senior Developer", "Owner"]},
  }
  const newPriv = new Privilege({
    _id: member.id,
    userInfo: {
        userID: member.id,
        createdAtTimestamp: member.createdTimestamp
    },
    privileges:[{
        _id: privileges[priv].privilegeID,
        rank: privileges[priv].rank,
        permissions: privileges[priv].permissions,
        timestamp: nau(),
        grantedByID: message.author.id
    }]
  });
  newPriv.save()
}


module.exports.delPrivilege = async (message, member, priv) => {
  const privileges = {
    record:{perivilegeID: "90REC"+member.id, rank: "Record", permissions: ["infractions.record"]},
    tester:{perivilegeID: "100TEST"+member.id, rank: "Tester", permissions: [bot.testCommand.map(cmd => cmd.information.permission.perm)]},
    developer:{perivilegeID: "110DEV"+member.id, rank: "Developer", permissions: [bot.norCommands.map(cmd => cmd.information.permission.perm) +","+ bot.devCommands.map(cmd => cmd.information.permission.perm) +","+bot.testCommands.map(cmd => cmd.information.permission.perm) ]},
    owner:{perivilegeID: "OWN"+member.id, rank: "Owner", permissions: [bot.norCommands.map(cmd => cmd.information.permission.perm) +","+ bot.devCommands.map(cmd => cmd.information.permission.perm) +","+bot.testCommands.map(cmd => cmd.information.permission.perm) ]},
  }
  Privilege.updateOne({_id: member.id}, {
    $pull: {
      privileges: {
        _id: privileges[priv].privilegeID,
      }
    }
  }, (err, res) => {if (err) console.log(err)})
  Privilege.save
}


module.exports.addPrivilege = async (message, member, priv) => {
  const privileges = {
    record:{perivilegeID: "90REC"+member.id, rank: "Record", permissions: ["infractions.record"]},
    tester:{perivilegeID: "100TEST"+member.id, rank: "Tester", permissions: [bot.testCommand.map(cmd => cmd.information.permission.perm)]},
    developer:{perivilegeID: "110DEV"+member.id, rank: "Developer", permissions: [bot.norCommands.map(cmd => cmd.information.permission.perm) +","+ bot.devCommands.map(cmd => cmd.information.permission.perm) +","+bot.testCommands.map(cmd => cmd.information.permission.perm) ]},
    owner:{perivilegeID: "OWN"+member.id, rank: "Owner", permissions: [bot.norCommands.map(cmd => cmd.information.permission.perm) +","+ bot.devCommands.map(cmd => cmd.information.permission.perm) +","+bot.testCommands.map(cmd => cmd.information.permission.perm) ]},
  }
  Privilege.updateOne({_id: member.id}, {
    $push: {
      privileges: {
        _id: privileges[priv].privilegeID,
        rank: privileges[priv].rank,
        permissions: privileges[priv].permissions,
        timestamp: nau(),
        grantedByID: message.author.id
      }
    }
  }, (err, res) => {if (err) console.log(err)})
  Privilege.save
}


module.exports.newFiveM = async (message, serverName, serverIP) => {
  Guild.updateOne({_id: message.guild.id}, {
    $push:{
      "guildSettings.fiveMServers":{
        serverName: serverName,
        serverIP: serverIP
      }
    }
  }, (err, res) => {if (err) console.log(err)})
  Guild.save
}


module.exports.delFiveM = async (message, serverName) => {
  Guild.updateOne({_id: message.guild.id}, {
    $pull:{
      "guildSettings.fiveMServers":{
        serverName: serverName
      }
    }
  }, (err, res) => {if (err) console.log(err)})
  Guild.save
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
}