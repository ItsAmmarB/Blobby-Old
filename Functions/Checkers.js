module.exports.permCheck = (message) => {
  let reqPerm = cmdInfo.permission.perm

  if(message.member.hasPermission(["ADMINISTRATOR"])) return true;   
  Member.findOne({"userInfo.userID": message.author.id}, (err, res) =>{
      if(err) console.log(err)
      if(res.memberInfo.perms.includes(reqPerm)) return true;
  })
  let filterdRoles = message.member.roles.filter(role => {Role.findOne({"roleInfo.roleID": role.id})})
  if(JSON.stringify(filterdRoles).split("").length < 3) return false;
  filterdRoles.filter(role => {
      Role.findOne({"roleInfo.roleID": role.id}, (err, res) => {
          if(res.roleDetails.perms.includes(reqPerm)) return true;
      })
  })
  return false;
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