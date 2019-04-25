module.exports.run = async (bot, message, args) => {
  
  let subsections = args[0];
  
  if(!subsections || subsections.toLowerCase() === "help" || subsections.toLowerCase() === "h") return help.helpMessage(message)
  if(subsections.toLowerCase() === "give" || subsections.toLowerCase() === "g") {
    let target = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[1]) || message.mentions.roles.first() || message.guild.roles.get(args[1]);
    if(!args[1]) return help.sectionHelpMessage(message);
    if(!target) return error.invalid(message, "Target", "The targeted role or member couldn't be found");
    if(target.hexColor) {
      targetType = "Role";
    } else {
      targetType = "Member"
    }
    let permissionKey = args[2];
    if(!permissionKey) return error.missing(message, "PermissionKey");
    if(permissionKey.includes(".")) {
      commandPermission = bot.norCommands.filter(command => command.information.permission.perm.toString().toLowerCase() === permissionKey.split(".")[0].toLowerCase()).first();
      if(!commandPermission) return error.invalid(message, "CommandPermission", "No command with provided permission could be found");
      if(!permissionKey.split(".")[1]) return error.invalid(message, "CommandSectionPermission", "No command Section with provided permission could be found");

      commandSectionPermission = commandPermission.information.sections.find(sec => sec.name === permissionKey.split(".")[1].split("")[0].toUpperCase()+permissionKey.split(".")[1].split("").slice(1).join("").toLowerCase());
      if(!commandSectionPermission) return error.invalid(message, "CommandSectionPermission", "No command Section with provided permission could be found");
      final = commandPermission.information.permission.perm+"."+commandSectionPermission.permission.perm.toString().split(".")[1];
    } else {
      commandPermission = bot.norCommands.filter(command => command.information.permission.perm.toString().toLowerCase() === permissionKey.toLowerCase()).first()
      commandSectionPermission = {
        permission: {
          perm: ""
        }
      };
      if(!commandPermission) return error.invalid(message, "CommandPermission", "No command with provided permission could be found");
      final = commandPermission.information.permission.perm;
    }
    if(targetType === "Member") {
      Guild.findOne({ $and: [{_id: message.guild.id}, {"guildSettings.permissionsMap.users.userID": target.id}]})
      .then((res) => {
        if(!res || res === null) {
           Guild.updateOne({_id: message.guild.id}, {
            $push: {
              "guildSettings.permissionsMap.users": {
                userID: target.id,
                permissions:[final]
              }
            }
          }, (err, res) => {if(err) console.log(err); })
        } else if(res.guildSettings.permissionsMap.users.find(user => user.userID === target.id).permissions.includes(final)) {
          return error.invalid(message, "GainedPermission", "Member already have this permission");
        } else if(!res.guildSettings.permissionsMap.users.find(user => user.userID === target.id).permissions.includes(final)){
          Guild.updateOne({ $and: [{_id: message.guild.id}, {"guildSettings.permissionsMap.users.userID": target.id}]}, {
            $push: {
              "guildSettings.permissionsMap.users.$.permissions": final
            }
          }, (err, res) => {if(err) console.log(err); })
          Guild.save
        }
        return success.permsGained(message, target.displayName, final);
      })                                                  //Member Gain Access End
    } else {                                              //Role Gain Access Start
      Guild.findOne({ $and: [{_id: message.guild.id}, {"guildSettings.permissionsMap.roles.roleID": target.id}]})
      .then((res) => {
        if(!res || res === null) {
           Guild.updateOne({_id: message.guild.id}, {
            $push: {
              "guildSettings.permissionsMap.roles": {
                roleID: target.id,
                permissions:[final]
              }
            }
          }, (err, res) => {if(err) console.log(err); })
        } else if(res.guildSettings.permissionsMap.roles.find(role => role.roleID === target.id).permissions.includes(final)) {
          return error.invalid(message, "GainedPermission", "Role already have this permission");
        } else if(!res.guildSettings.permissionsMap.roles.find(role => role.roleID === target.id).permissions.includes(final)){
          Guild.updateOne({ $and: [{_id: message.guild.id}, {"guildSettings.permissionsMap.roles.roleID": target.id}]}, {
            $push: {
              "guildSettings.permissionsMap.roles.$.permissions": final
            }
          }, (err, res) => {if(err) console.log(err); })
          Guild.save
        }
        return success.permsGained(message, target.name, final);
      })
    }
  }                                                                                                   //Gain Access End 
  else if(subsections.toLowerCase() === "revoke" || subsections.toLowerCase() === "r") {             //Revoke Access Start
    let target = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[1]) || message.mentions.roles.first() || message.guild.roles.get(args[1]);
    if(!args[1]) return help.sectionHelpMessage(message);
    if(!target) return error.invalid(message, "Target", "The targeted role or member couldn't be found");
    if(target.hexColor) {
      targetType = "Role";
    } else {
      targetType = "Member"
    }
    let permissionKey = args[2];
    if(!permissionKey) return error.missing(message, "PermissionKey");
    if(permissionKey.includes(".")) {
      commandPermission = bot.norCommands.filter(command => command.information.permission.perm.toString().toLowerCase() === permissionKey.split(".")[0].toLowerCase()).first();
      if(!commandPermission) return error.invalid(message, "CommandPermission", "No command with provided permission could be found");
      if(!permissionKey.split(".")[1]) return error.invalid(message, "CommandSectionPermission", "No command Section with provided permission could be found");
      commandSectionPermission = commandPermission.information.sections.find(sec => sec.name === permissionKey.split(".")[1].split("")[0].toUpperCase()+permissionKey.split(".")[1].split("").slice(1).join("").toLowerCase());
      if(!commandSectionPermission) return error.invalid(message, "CommandSectionPermission", "No command Section with provided permission could be found");
      final = commandPermission.information.permission.perm+"."+commandSectionPermission.permission.perm.toString().split(".")[1];
    } else {
      commandPermission = bot.norCommands.filter(command => command.information.permission.perm.toString().toLowerCase() === permissionKey.toLowerCase()).first()
      commandSectionPermission = {
        permission: {
          perm: ""
        }
      };
      if(!commandPermission) return error.invalid(message, "CommandPermission", "No command with provided permission could be found");
      final = commandPermission.information.permission.perm;
    }
    if(targetType === "Member") {
      Guild.findOne({ $and: [{_id: message.guild.id}, {"guildSettings.permissionsMap.users.userID": target.id}]})
      .then((res) => {
        if(!res || res === null) {
          return error.invalid(message, "GainedPermission", "Member doesn't have this permission already");
        } else if(res.guildSettings.permissionsMap.users.find(user => user.userID === target.id).permissions.includes(final)) {
          if(res.guildSettings.permissionsMap.users.find(user => user.userID === target.id).permissions.length < 2){          
            Guild.updateOne({ $and: [{_id: message.guild.id}, {"guildSettings.permissionsMap.users.userID": target.id}]}, {
              $pull: {
                "guildSettings.permissionsMap.users": {
                  userID: target.id,
                  permissions:[final]
                }
              }
            }, (err, res) => {if(err) console.log(err); })
          } else {
            Guild.updateOne({ $and: [{_id: message.guild.id}, {"guildSettings.permissionsMap.users.userID": target.id}]}, {
              $pull: {
                "guildSettings.permissionsMap.users.$.permissions": final
              }
            }, (err, res) => {if(err) console.log(err); })
          }

        } else if(!res.guildSettings.permissionsMap.users.find(user => user.userID === target.id).permissions.includes(final)){
          return error.invalid(message, "GainedPermission", "Member doesn't have this permission already");
        }
        return success.permsRevoked(message, target.displayName, final);
      })
    }                                                   //Member Revoke Access End 
    else {                                              //Role Revoke Access Start
      Guild.findOne({ $and: [{_id: message.guild.id}, {"guildSettings.permissionsMap.roles.roleID": target.id}]})
      .then((res) => {
        if(!res || res === null) {
          return error.invalid(message, "GainedPermission", "Role doesn't have this permission already");
        } else if(res.guildSettings.permissionsMap.roles.find(role => role.roleID === target.id).permissions.includes(final)) {
          if(res.guildSettings.permissionsMap.roles.find(role => role.roleID === target.id).permissions.length < 2){          
            Guild.updateOne({ $and: [{_id: message.guild.id}, {"guildSettings.permissionsMap.roles.roleID": target.id}]}, {
              $pull: {
                "guildSettings.permissionsMap.roles": {
                  roleID: target.id,
                  permissions:[final]
                }
              }
            }, (err, res) => {if(err) console.log(err); })
          } else {
            Guild.updateOne({ $and: [{_id: message.guild.id}, {"guildSettings.permissionsMap.roles.roleID": target.id}]}, {
              $pull: {
                "guildSettings.permissionsMap.roles.$.permissions": final
              }
            }, (err, res) => {if(err) console.log(err); })
          }

        } else if(!res.guildSettings.permissionsMap.roles.find(role => role.roleID === target.id).permissions.includes(final)){
          return error.invalid(message, "GainedPermission", "Role doesn't have this permission already");
        }
        return success.permsRevoked(message, target.name, final);
      })
    }
  }                                                                                                  //Revoke Access End
  else if(subsections.toLowerCase() === "clear" || subsections.toLowerCase() === "c") {             //Clear Access Start
    let target = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[1]) || message.mentions.roles.first() || message.guild.roles.get(args[1]);
    if(!args[1]) return help.sectionHelpMessage(message);
    if(!target) return error.invalid(message, "Target", "The targeted role or member couldn't be found");
    if(target.hexColor) {
      targetType = "Role";
    } else {
      targetType = "Member"
    }
    if(targetType === "Member") {                      //Member Clear Access Start
      Guild.findOne({ $and: [{_id: message.guild.id}, {"guildSettings.permissionsMap.users.userID": target.id}]})
      .then((res) => {
        if(!res || res === null) {
          return error.invalid(message, "GainedPermission", "Member doesn't have any permission already");
        } else {          
            Guild.updateOne({ $and: [{_id: message.guild.id}, {"guildSettings.permissionsMap.users.userID": target.id}]}, {
              $pull: {
                "guildSettings.permissionsMap.users": {
                  userID: target.id,
                }
              }
            }, (err, res) => {if(err) console.log(err); })
        return success.permsCleared(message, target.displayName);
      }})
    }                                                   //Member Clear Access End
    else {                                              //Role Clear Access Start
      Guild.findOne({ $and: [{_id: message.guild.id}, {"guildSettings.permissionsMap.roles.roleID": target.id}]})
      .then((res) => {
        if(!res || res === null) {
          return error.invalid(message, "GainedPermission", "Role doesn't have any permission already");
        } else {
          Guild.updateOne({ $and: [{_id: message.guild.id}, {"guildSettings.permissionsMap.roles.roleID": target.id}]}, {
            $pull: {
              "guildSettings.permissionsMap.roles": {
                roleID: target.id,
              }
            }
          }, (err, res) => {if(err) console.log(err); })
        }
        return success.permsCleared(message, target.name);
      })
    }
  }                                                                                                 //Clear Access End
  else if(subsections.toLowerCase() === "all" || subsections.toLowerCase() === "a") {             //All Access Start
    let target = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[1]) || message.mentions.roles.first() || message.guild.roles.get(args[1]);
    if(!args[1]) return help.sectionHelpMessage(message);
    if(!target) return error.invalid(message, "Target", "The targeted role or member couldn't be found");
    if(target.hexColor) {
      targetType = "Role";
    } else {
      targetType = "Member"
    }
    if(targetType === "Member") {                      //Member All  Access Start
      Guild.findOne({ $and: [{_id: message.guild.id}, {"guildSettings.permissionsMap.users.userID": target.id}]})
      .then((res) => {
        if(!res || res === null) {
          Guild.updateOne({_id: message.guild.id}, {
            $push: {
              "guildSettings.permissionsMap.users": {
                userID: target.id,
                permissions:["All"]
              }
            }
          }, (err, res) => {if(err) console.log(err); })
        } else {          
          if(res.guildSettings.permissionsMap.users.find(user => user.userID === target.id).permissions.includes("All")){
            return error.invalid(message, "PermissionsAll", "Member already have all permissions")
          }
          Guild.updateOne({ $and: [{_id: message.guild.id}, {"guildSettings.permissionsMap.users.userID": target.id}]}, {
            $push: {
              "guildSettings.permissionsMap.users.$.permissions": "All"
            }
          }, (err, res) => {if(err) console.log(err); })
        }
        return success.permsAll(message, target.displayName);
      })
    }                                                   //Member All Access End
    else {                                              //Role All Access Start
      Guild.findOne({ $and: [{_id: message.guild.id}, {"guildSettings.permissionsMap.roles.roleID": target.id}]})
      .then((res) => {
        if(!res || res === null) {
          Guild.updateOne({_id: message.guild.id}, {
            $push: {
              "guildSettings.permissionsMap.roles": {
                roleID: target.id,
                permissions:["All"]
              }
            }
          }, (err, res) => {if(err) console.log(err); })
        } else {
          if(res.guildSettings.permissionsMap.users.find(user => user.userID === target.id).permissions.includes("All")){
            return error.invalid(message, "PermissionsAll", "Role already have all permissions")
          }
          Guild.updateOne({ $and: [{_id: message.guild.id}, {"guildSettings.permissionsMap.roles.roleID": target.id}]}, {
            $push: {
              "guildSettings.permissionsMap.roles.$.permissions": "All"
            }
          }, (err, res) => {if(err) console.log(err); })
        }
        return success.permsAll(message, target.name);
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
    usage: "<Subsection>",
    examples: ["Give @Max F.#0007 Kick", "Revoke @Max F.#0007 SetPrefix"]
  },
  sections: [
    {
      permission: {
        perm: "Permissions.Give",
        group: "Owner"
      },
      name: "Give",
      shortcut: "g",
      description: "Give a Member or a Role a permission within the bot",
      usage:"<Target> <Permission Key>",
      examples: ["@Max F.#0007 Ban", "@Staff Team Kick"]
    },
    {
      permission: {
        perm: "Permissions.Revoke",
        group: "Owner"
      },
      name: "Revoke",
      shortcut: "r",
      description: "Revokes a Member or a Role's permission within the bot",
      usage:"<Target> <Permission Key>",
      examples: ["@Max F.#0007 Ban", "@Staff Team Kick"]
    },
    {
      permission: {
        perm: "Permissions.Clear",
        group: "Owner"
      },
      name: "Clear",
      shortcut: "c",
      description: "Clears all member's or a role's permissions within the bot.",
      usage:"<Target> ",
      examples: ["@Max F.#0007", "@Staff Team"]
    },
    {
      permission: {
        perm: "Permissions.All",
        group: "Owner"
      },
      name: "All",
      shortcut: "a",
      description: "Give a Member or a Role All permissions within the bot",
      usage:"<Target>",
      examples: ["@Max F.#0007", "@Staff Team"]
    },
  ]
} 
