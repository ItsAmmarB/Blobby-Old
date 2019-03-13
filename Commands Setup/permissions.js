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
    let commandPermission = bot.commands.filter(command => command.information.permission.perm.toString().toLowerCase() === permissionKey.toLowerCase()).first();
    if(!commandPermission) return error.invalid(message, "CommandPermission", "No command with provided permission could be found");
    if(targetType === "Member") {
      Member.findOne({"userInfo.userID": target.id, "memberInfo.guildID": message.guild.id}, (err, res) => {
        if(res.memberInfo.perms.includes(commandPermission.information.permission.perm.toString())) return error.invalid(message, "GainedPermission", "Target alread have this permission")
        Member.findOneAndUpdate({"userInfo.userID": target.id, "memberInfo.guildID": message.guild.id},{
          $push : {
          "memberInfo.perms": commandPermission.information.permission.perm.toString()
          }
          },(err, res) =>{
            if(err) console.log(err)
          }, { strict: false })
        Member.save
        return success.permsActions(message, "gained", target.displayName, commandPermission.information.permission.perm.toString())
      } )
    } else {
      await Role.findOne({"roleInfo.roleID": target.id, "roleInfo.guildID": message.guild.id}, async (err, res) => {
        if(err) console.log(err)

        if(!res) {
          await newRole(target)
          Role.findOneAndUpdate({"roleInfo.roleID": target.id},{
            $push : {
              "roleDetails.perms": commandPermission.information.permission.perm
            }
          },(err, res) =>{
            if(err) console.log(err)
          }, { strict: false })
          Role.save
          return success.permsActions(message, "gained", target.name, commandPermission.information.permission.perm.toString())
        } else {
          if(res.roleDetails.perms.includes(commandPermission.information.permission.perm.toString())) {
            return error.invalid(message, "GainedPermission", "Target alread have this permission")
          } else {
            Role.findOneAndUpdate({"roleInfo.roleID": target.id},{
              $push : {
                "roleDetails.perms": commandPermission.information.permission.perm
              }
            },(err, res) =>{
              if(err) console.log(err)
            }, { strict: false })
            Role.save
            return success.permsActions(message, "gained", target.name, commandPermission.information.permission.perm.toString())
          }
        }
      })
    }
  }
  if(subsections.toLowerCase() === "revoke" || subsections.toLowerCase() === "r") {
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
    let commandPermission = bot.commands.filter(command => command.information.permission.perm.toString().toLowerCase() === permissionKey.toLowerCase()).first();
    if(!commandPermission) return error.invalid(message, "CommandPermission", "No command with provided permission could be found");
    if(targetType === "Member") {
      Member.findOne({"userInfo.userID": target.id, "memberInfo.guildID": message.guild.id}, (err, res) => {
        if(!res.memberInfo.perms.includes(commandPermission.information.permission.perm.toString())) return error.invalid(message, "RevokedPermission", "Target doesn't have this permission")
        Member.findOneAndUpdate({"userInfo.userID": target.id, "memberInfo.guildID": message.guild.id},{
          $pull : {
          "memberInfo.perms": commandPermission.information.permission.perm.toString()
          }
          },(err, res) =>{
            if(err) console.log(err)
          }, { strict: false })
        Member.save
        return success.permsActions(message, "lost", target.displayName, commandPermission.information.permission.perm.toString())
      } )
    } else {
      await Role.findOne({"roleInfo.roleID": target.id, "roleInfo.guildID": message.guild.id}, async (err, res) => {
        if(err) console.log(err)

        if(!res) {
          await newRole(target)
          Role.findOneAndUpdate({"roleInfo.roleID": target.id},{
            $push : {
              "roleDetails.perms": commandPermission.information.permission.perm
            }
          },(err, res) =>{
            if(err) console.log(err)
          }, { strict: false })
          Role.save
          return success.permsActions(message, "lost", target.name, commandPermission.information.permission.perm.toString())
        } else {
          if(!res.roleDetails.perms.includes(commandPermission.information.permission.perm.toString())) {
            return error.invalid(message, "RevokedPermission", "Target doesn't have this permission")
          } else {
            Role.findOneAndUpdate({"roleInfo.roleID": target.id},{
              $pull : {
                "roleDetails.perms": commandPermission.information.permission.perm
              }
            },(err, res) =>{
              if(err) console.log(err)
            }, { strict: false })
            Role.save
            return success.permsActions(message, "lost", target.name, commandPermission.information.permission.perm.toString())
          }
        }
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
