module.exports.permCheck = (message, reqPerm, callback) => {
// if(message.member.hasPermission(["ADMINISTRATOR"])) return callback(true);
  if(guildDatabase[message.guild.id].guildSettings.permissionsMap.users[message.author.id] && guildDatabase[message.guild.id].guildSettings.permissionsMap.users[message.author.id].permissions[reqPerm]) return callback(true);
  const rolesWithPermissions = message.member.roles.filter(role => guildDatabase[message.guild.id].guildSettings.permissionsMap.roles[role.id]);
  if(rolesWithPermissions.size < 1) return callback(false)
  // if()
  console.log(rolesWithPermissions.size);
  // if( ) return callback(true);
  return callback(false)
}



module.exports.permCheckDev = (message, callback) => {
  Privilege.findOne({_id: message.author.id})
  .then(res => {
    if(res){
      if(res.privileges.find(priv => priv.permissions.includes(cmdInfo.permission.permLevel))) {
        return callback(true)
      } else {
        Privilege.findOne({_id: message.author.id})
        .then(res => {
          if(res){
            if(res.privileges.find(priv => priv.permissions.includes(cmdInfo.permission.permLevel))) {
              return callback(true)
            } else {
              return callback(false)
            }
          } else {
            return callback(false)
          }
        })
      }
    } else {
      Privilege.findOne({_id: message.author.id})
      .then(res => {
        if(res){
          if(res.privileges.find(priv => priv.permissions.includes(cmdInfo.permission.permLevel))) {
            return callback(true)
          } else {
            return callback(false)
          }
        } else {
          return callback(false)
        }
      })
    }
  })
}

bot.on("message", message => {

})

module.exports.permCheckTest = (message, callback) => {
  return
}

module.exports.modifierCheck = (message, callback) => {
 let subCommand = message.content.split(" ").slice(2)
 if(message.content.includes("--")){
    let modifiers = subCommand.join(" ").split("--").slice(1)
    if(modifiers.length < 1) return callback(false)
    if(modifiers.length < 2) {
      if(modifiers.includes("norecord") || modifiers.includes("nr")) {
        return callback("norecord")
      } else {
        return callback("Error: Unknown modifier requested")
      }
    } else if(modifiers.length > 1 && modifiers.length < 3) {
      if(!modifiers.includes("norecord") && !modifiers.includes("nr")) {
        return callback("Error: Unknown modifier requested.")
      } else {
        if(modifiers.includes("norecord").length > 1 || modifiers.includes("nr").length > 1){
          return callback("Error: Dublicated modifiers requested")
        } else {
          return callback("Error: Unknown modifier requested.")
        }
      }
    } else {
        return callback("Error: Unknown modifier requested.")
    }
  } else {
    return callback(false);
  }
}