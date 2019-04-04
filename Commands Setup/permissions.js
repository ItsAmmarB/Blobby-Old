module.exports.run = async (bot, message, args) => {
  
  let subsections = args[0];
  
  if(!subsections || subsections.toLowerCase() === "help" || subsections.toLowerCase() === "h") return help.helpMessage(message)
  if(subsections.toLowerCase() === "give" || subsections.toLowerCase() === "g") {
    let target = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[1]) || message.mentions.roles.first() || message.guild.roles.get(args[1]);
    if(!args[1]) return error.missing(message, "Target");
    if(!target) return error.invalid(message, "Target", "The targeted role or member couldn't be found");
    if(target.hexColor) {
      targetType = "Role";
    } else {
      targetType = "Member"
    }
    let permissionKey = args[2];
    if(!permissionKey) return error.missing(message, "PermissionKey");
    let commandPermission = bot.norCommands.filter(command => command.information.permission.perm.toString().toLowerCase() === permissionKey.toLowerCase()).first()
    if(!commandPermission) return error.invalid(message, "CommandPermission", "No command with provided permission could be found");
    if(targetType === "Member") {
      Guild.findOne({ $and: [{_id: message.guild.id}, {"guildSettings.permissionsMap.users.userID": target.id}]})
      .then((res) => {
        if(!res || res === null) {
           Guild.updateOne({_id: message.guild.id}, {
            $push: {
              "guildSettings.permissionsMap.users": {
                userID: target.id,
                permissions:[commandPermission.information.permission.perm.toString()]
              }
            }
          }, (err, res) => {if(err) console.log(err); })
        } else if(res.guildSettings.permissionsMap.users.find(user => user.userID === target.id).permissions.includes(commandPermission.information.permission.perm.toString())) {
          return error.invalid(message, "GainedPermission", "Member already have this permission");
        } else if(!res.guildSettings.permissionsMap.users.find(user => user.userID === target.id).permissions.includes(commandPermission.information.permission.perm.toString())){
          Guild.updateOne({ $and: [{_id: message.guild.id}, {"guildSettings.permissionsMap.users.userID": target.id}]}, {
            $push: {
              "guildSettings.permissionsMap.users.$.permissions": commandPermission.information.permission.perm.toString()
            }
          }, (err, res) => {if(err) console.log(err); })
          Guild.save
        }
        return success.permsGained(message, target.displayName, commandPermission.information.permission.perm.toString());
      })
    } else {
      Guild.findOne({ $and: [{_id: message.guild.id}, {"guildSettings.permissionsMap.roles.roleID": target.id}]})
      .then((res) => {
        if(!res || res === null) {
           Guild.updateOne({_id: message.guild.id}, {
            $push: {
              "guildSettings.permissionsMap.roles": {
                roleID: target.id,
                permissions:[commandPermission.information.permission.perm.toString()]
              }
            }
          }, (err, res) => {if(err) console.log(err); })
        } else if(res.guildSettings.permissionsMap.roles.find(role => role.roleID === target.id).permissions.includes(commandPermission.information.permission.perm.toString())) {
          return error.invalid(message, "GainedPermission", "Role already have this permission");
        } else if(!res.guildSettings.permissionsMap.roles.find(role => role.roleID === target.id).permissions.includes(commandPermission.information.permission.perm.toString())){
          Guild.updateOne({ $and: [{_id: message.guild.id}, {"guildSettings.permissionsMap.roles.roleID": target.id}]}, {
            $push: {
              "guildSettings.permissionsMap.roles.$.permissions": commandPermission.information.permission.perm.toString()
            }
          }, (err, res) => {if(err) console.log(err); })
          Guild.save
        }
        return success.permsGained(message, target.name, commandPermission.information.permission.perm.toString());
      })
    }
  }                                                                                                   //Gain Access End 
  else if(subsections.toLowerCase() === "revoke" || subsections.toLowerCase() === "r") {             //Revoke Access Start
    let target = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[1]) || message.mentions.roles.first() || message.guild.roles.get(args[1]);
    if(!args[1]) return error.missing(message, "Target");
    if(!target) return error.invalid(message, "Target", "The targeted role or member couldn't be found");
    if(target.hexColor) {
      targetType = "Role";
    } else {
      targetType = "Member"
    }
    let permissionKey = args[2];
    if(!permissionKey) return error.missing(message, "PermissionKey");
    let commandPermission = bot.norCommands.filter(command => command.information.permission.perm.toString().toLowerCase() === permissionKey.toLowerCase()).first()
    if(!commandPermission) return error.invalid(message, "CommandPermission", "No command with provided permission could be found");
    if(targetType === "Member") {
      Guild.findOne({ $and: [{_id: message.guild.id}, {"guildSettings.permissionsMap.users.userID": target.id}]})
      .then((res) => {
        if(!res || res === null) {
          return error.invalid(message, "GainedPermission", "Member doesn't have this permission already");
        } else if(res.guildSettings.permissionsMap.users.find(user => user.userID === target.id).permissions.includes(commandPermission.information.permission.perm.toString())) {
          if(res.guildSettings.permissionsMap.users.find(user => user.userID === target.id).permissions.length < 2){          
            Guild.updateOne({ $and: [{_id: message.guild.id}, {"guildSettings.permissionsMap.users.userID": target.id}]}, {
              $pull: {
                "guildSettings.permissionsMap.users": {
                  userID: target.id,
                  permissions:[commandPermission.information.permission.perm.toString()]
                }
              }
            }, (err, res) => {if(err) console.log(err); })
          } else {
            Guild.updateOne({ $and: [{_id: message.guild.id}, {"guildSettings.permissionsMap.users.userID": target.id}]}, {
              $pull: {
                "guildSettings.permissionsMap.users.$.permissions": commandPermission.information.permission.perm.toString()
              }
            }, (err, res) => {if(err) console.log(err); })
          }

        } else if(!res.guildSettings.permissionsMap.users.find(user => user.userID === target.id).permissions.includes(commandPermission.information.permission.perm.toString())){
          return error.invalid(message, "GainedPermission", "Member doesn't have this permission already");
        }
        return success.permsRevoked(message, target.displayName, commandPermission.information.permission.perm.toString());
      })
    }                                                   //Member Revoke Access End 
    else {                                              //Role Revoke Access Start
      Guild.findOne({ $and: [{_id: message.guild.id}, {"guildSettings.permissionsMap.roles.roleID": target.id}]})
      .then((res) => {
        if(!res || res === null) {
          return error.invalid(message, "GainedPermission", "Role doesn't have this permission already");
        } else if(res.guildSettings.permissionsMap.roles.find(role => role.roleID === target.id).permissions.includes(commandPermission.information.permission.perm.toString())) {
          if(res.guildSettings.permissionsMap.roles.find(role => role.roleID === target.id).permissions.length < 2){          
            Guild.updateOne({ $and: [{_id: message.guild.id}, {"guildSettings.permissionsMap.roles.roleID": target.id}]}, {
              $pull: {
                "guildSettings.permissionsMap.roles": {
                  roleID: target.id,
                  permissions:[commandPermission.information.permission.perm.toString()]
                }
              }
            }, (err, res) => {if(err) console.log(err); })
          } else {
            Guild.updateOne({ $and: [{_id: message.guild.id}, {"guildSettings.permissionsMap.roles.roleID": target.id}]}, {
              $pull: {
                "guildSettings.permissionsMap.roles.$.permissions": commandPermission.information.permission.perm.toString()
              }
            }, (err, res) => {if(err) console.log(err); })
          }

        } else if(!res.guildSettings.permissionsMap.roles.find(role => role.roleID === target.id).permissions.includes(commandPermission.information.permission.perm.toString())){
          return error.invalid(message, "GainedPermission", "Role doesn't have this permission already");
        }
        return success.permsRevoked(message, target.name, commandPermission.information.permission.perm.toString());
      })
    }
  }
};


module.exports.information = {
  trigger: {
    name: "permissions",
    aliases: "perms",
  },
  permission: {
    perm: "Permissions",
    group: "Owner"
  },
  help: {
    name: "Permissions",
    Description: "Gives Or Revokes someone or some role's permission within bot",
    usage: "<Subsection> <Username/Role name> <Permission Key>",
    examples: ["Give @Max F.#0007 Kick", "Revoke @Max F.#0007 SetPrefix"]
  },
  sections: {
    Give: {name: "Give", description: "Give a Member or a Role a permission within bot", usage:"<User/Role> <Permission Key>", examples: ["@Max F.#0007 Ban", "@Staff Team Kick"]},
    Revoke: {name: "Revoke", description: "Revokes a Member or a Role's permission within bot", usage:"<User/Role> <Permission Key>", examples: ["@Max F.#0007 Ban", "@Staff Team Kick"]},
  }
}
