module.exports.permCheck = (message, reqPerm, callback) => {
if(message.member.hasPermission(["ADMINISTRATOR"])) return callback(true);
Guild.findOne({_id: message.guild.id, "guildSettings.permissionsMap.users.userID": message.author.id})
  .then(res => {
    if(res) {
      if(res.guildSettings.permissionsMap.users.find(user => user.userID === message.author.id).permissions.includes(reqPerm)||res.guildSettings.permissionsMap.users.find(user => user.userID === message.author.id).permissions.includes("All")) {
        return callback(true)
      } else {
        Guild.findOne({_id: message.guild.id})
        .then(res => {
          try {
            if(!res.guildSettings.permissionsMap.roles.find(role => role.roleID === message.member.roles.find(role2 => role2.id === role.roleID).id)){
              return callback(false)
            }
          } catch(err){
            return callback(false)
          }
          if(res.guildSettings.permissionsMap.roles.find(role => role.roleID === message.member.roles.find(role2 => role2.id === role.roleID).id).permissions.includes(reqPerm)||res.guildSettings.permissionsMap.roles.find(role => role.roleID === message.member.roles.find(role2 => role2.id === role.roleID).id).permissions.includes("All")) {
            return callback(true)
          } else {
            return callback(false)
          }
        })
      }
    } else {
    Guild.findOne({_id: message.guild.id})
      .then(res => {
        if(!res.guildSettings.permissionsMap.roles.find(role => message.member.roles.get(role.roleID))) {
          return callback(false)
        } else {
          if(res.guildSettings.permissionsMap.roles.find(role => role.roleID === message.member.roles.find(role2 => role2.id === role.roleID).id).permissions.includes(reqPerm)||res.guildSettings.permissionsMap.roles.find(role => role.roleID === message.member.roles.find(role2 => role2.id === role.roleID).id).permissions.includes("All")) {
            return callback(true)
          } else {
            return callback(false)
          }
        }
      })
    }
  })
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

module.exports.permCheckTest = (message, callback) => {
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
                return callback(true)
              } else {
                return callback(false)
              }
            })
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
  })
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