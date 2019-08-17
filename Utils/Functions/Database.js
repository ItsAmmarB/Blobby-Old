module.exports.newGuild = async (guild) => {
  let position =  await JSON.stringify(Object.values(bot.guilds.map(guild => ({id: guild.id, joinedAt: guild.joinedTimestamp}))).sort((first, second) => (first.joinedAt < second.joinedAt) ? -1 : (first.joinedAt > second.joinedAt) ? 1 : 0 )).split(guild.id).slice(0, 1).join("").split("\"id\"").length - 1
  let globalPermissions = [];
  await bot.allCommands.map(command => command.information.permission.perm).forEach(perm => globalPermissions.push(perm));
  await bot.allCommands.filter(command => command.information["sections"]).forEach(command => command.information.sections.filter(section => !section.permission["auth"]).forEach(section => globalPermissions.push(section.permission.perm)));
  const newGuild = {
      _id: guild.id,
      guildInfo: {
          guildID: guild.id,
          position: position,
          guildCreatedAtTimestamp: guild.createdTimestamp,

      },
      guildSettings: {
          prefix: prefix,
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
          },
          fivemServer:{}
        }
    };
    guildDatabase[guild.id] = newGuild;
    guild.members.forEach(async member => await newUser(member));
    fs.writeFile('./Database/guilds.json', JSON.stringify(guildDatabase), function(err) {if(err) return console.error(err);});
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
  const _priv = privileges[priv].rank
  const newPriv = {
    _id: member.id,
    userInfo: {
        userID: member.id,
        createdAtTimestamp: member.createdTimestamp
    },
    privileges:{
      _priv: {
        _id: privileges[priv].privilegeID,
        rank: privileges[priv].rank,
        permissions: privileges[priv].permissions,
        timestamp: nau(),
        grantedByID: message.author.id
      }
    }
  };
  privilegeDatabase[member.id] = newPriv;
  fs.writeFile('./Database/privileges.json', JSON.stringify(guildDprivilegeDatabaseatabase), function(err) {if(err) return console.error(err);});

}


module.exports.delPrivilege = async (message, member, priv) => {
  const _priv = privileges[priv].rank
  delete privilegeDatabase[member.id].privileges[_priv];
  fs.writeFile('./Database/privileges.json', JSON.stringify(guildDprivilegeDatabaseatabase), function(err) {if(err) return console.error(err);});
}


module.exports.addPrivilege = async (message, member, priv) => {
  const privileges = {
    record:{privilegeID: "90REC"+member.id, rank: "Record", permissions: ["infractions.record"]},
    tester:{privilegeID: "100TEST"+member.id, rank: "Tester", permissions: [bot.testCommand.map(cmd => cmd.information.permission.perm)]},
    developer:{privilegeID: "110DEV"+member.id, rank: "Developer", permissions: [bot.norCommands.map(cmd => cmd.information.permission.perm) +","+ bot.devCommands.map(cmd => cmd.information.permission.perm) +","+bot.testCommands.map(cmd => cmd.information.permission.perm) ]},
    owner:{privilegeID: "OWN"+member.id, rank: "Owner", permissions: [bot.norCommands.map(cmd => cmd.information.permission.perm) +","+ bot.devCommands.map(cmd => cmd.information.permission.perm) +","+bot.testCommands.map(cmd => cmd.information.permission.perm) ]},
  }
  const _priv = privileges[priv].rank
  const privilege = {
    _id: privileges[priv].privilegeID,
    rank: privileges[priv].rank,
    permissions: privileges[priv].permissions,
    timestamp: nau(),
    grantedByID: message.author.id
  };
  privilegeDatabase[member.id].privileges[_priv] = privilege;
  fs.writeFile('./Database/privileges.json', JSON.stringify(privilegeDatabase), function(err) {if(err) return console.error(err);});
}


module.exports.newFiveM = async (message, serverName, serverIP) => {
  guildDatabase[message.guild.id].guildSetting.fivemServers[serverName] = { name: serverName, ip:serverIP};
  fs.writeFile('./Database/guilds.json', JSON.stringify(guildDatabase), function(err) {if(err) return console.error(err);});
}


module.exports.delFiveM = async (message, serverName) => {
 delete guildDatabase[message.guild.id].guildSetting.fivemServers[serverName];
 fs.writeFile('./Database/guilds.json', JSON.stringify(guildDatabase), function(err) {if(err) return console.error(err);});
}


module.exports.newUser = async (member) => {
  let position = JSON.stringify(Object.values(member.guild.members.map(member => ({ name: member.user.username, id: member.user.id, joinedAt: member.joinedTimestamp}))).sort((first, second) => (first.joinedAt < second.joinedAt) ? -1 : (first.joinedAt > second.joinedAt) ? 1 : 0 )).split(member.id).slice(0, 1).join("").split("\"id\"").length - 1
  const newUser = {
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
  }
  userDatabase[member.id] = newUser;
  fs.writeFile('./Database/users.json', JSON.stringify(userDatabase), function(err) {if(err) return console.error(err);});

}


module.exports.addGuild = async (member) => {
  let position = JSON.stringify(Object.values(member.guild.members.map(member => ({ name: member.user.username, id: member.user.id, joinedAt: member.joinedTimestamp}))).sort((first, second) => (first.joinedAt < second.joinedAt) ? -1 : (first.joinedAt > second.joinedAt) ? 1 : 0 )).split(member.id).slice(0, 1).join("").split("\"id\"").length - 1
    const addedGuild = {
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
    userDatabase[member.id].guilds.push(addedGuild);
    fs.writeFile('./Database/users.json', JSON.stringify(userDatabase), function(err) {if(err) return console.error(err);});
}