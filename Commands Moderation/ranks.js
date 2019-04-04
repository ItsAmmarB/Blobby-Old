module.exports.run = async (bot, message, args) => {
  const Rank = GuildsConfig[message.guild.id].Ranks.ranks;
  let subSection = args[0];
  if(!Rank) {
    error.error(message, "FATAL ERROR", "Server could not be found in database, Reloading database now!", "Database has been reloaded, you may do the command again!")
    return newGuild(message)
  }

  if(!subSection || subSection.toUpperCase() === "HELP") return help.helpMessage(message)
  if(subSection.toUpperCase() === "CREATE" || subSection.toUpperCase() === "C") {
    let rankName = args.slice(1).join(" ").split(" ").join("_");
    if(!rankName) return error.missing(message, "rankName")
    if(rankName.includes(",")) return error.invalid(message, "rankName", "You can only use Numbers and letters in the Rank's name")
    if(Rank[rankName]) return error.invalid(message, "Rank", "Ranks can not be duplicated")

    Rank[rankName] = {
      members:{},
      perms:{},
      powerLevel: 0
    }
    fs.writeFile("./GuildsConfig.json", JSON.stringify(GuildsConfig), err => {
      if(err) throw err;});
    return success.Rank(message, rankName, "Created")
  } else if(subSection.toUpperCase() === "REMOVE" || subSection.toUpperCase() === "R") {
    let rankName = args.slice(1).join(" ").split(" ").join("_");
    if(!rankName) return error.missing(message, "rankName")
    if(!Rank[rankName]) return error.invalid(message, "Rank", "Rank could not be found")
    delete Rank[rankName];
    fs.writeFile("./GuildsConfig.json", JSON.stringify(GuildsConfig), err => {
      if(err) throw err;});
    return success.Rank(message, rankName, "Removed")
  } else if(subSection.toUpperCase() === "MEMBERS" || subSection.toUpperCase() === "M") {
    let rankName = args.slice(1).join(" ").split(" ").join("_").split(",").slice(0, 1).join("");
    if(!rankName) return error.missing(message, "rankName")
    if(!message.content.includes(",")) return error.invalid(message, "rankName", "a Comma must be place after the rank name. ex. " + prefix + "rank members admins, @Max F.#0007")
    if(!Rank[rankName]) return error.invalid(message, "Rank", "Rank could not be found")
    let memberCheck = args.slice(1).join(" ").split(",").slice(1).join("")
    if(!memberCheck) return error.missing(message, "Members")
    let members = message.mentions.members;
    if(!message.mentions.members.first()) return error.invalid(message, "Members", "You need to mentions member to add/remove them")
    let changes = {};
    members.forEach(member => {
      let skip;
      skip = false
      if(Rank[rankName].members[member.id]) {
        delete Rank[rankName].members[member.id];
        if(!changes["Removed"]) {changes["Removed"] = {};}
        changes.Removed[member.id] = {
          username: member.user.username
        }
        skip = true
      }
      if(!Rank[rankName].members[member.id] && !skip) {
        if(!changes["Added"]) {changes["Added"] = {};}
        Rank[rankName].members[member.id] = {
          tag: member.user.tag
        }
        changes.Added[member.id] = {
          username: member.user.username
        }
      }
    })
    fs.writeFile("./GuildsConfig.json", JSON.stringify(GuildsConfig), err => {
      if(err) throw err;});
    return success.RankMembers(message, rankName, changes)
  } else {
    return help.helpMessage(message)
  }

};

exports.information = {
  trigger: {
    name: "rank",
    aliases: "r",
  },
  permission: {
    perm: "Rank",
    group: "Admin"
  },
  help: {
    name: "Rank",
    description: "Creates, Removes and Edits an existant ranks",
    usage: "<Subsection>",
    examples: ["Create Subscribers", "Remove Dirty People"]
  },
  sections: {
    create: {name: "Create", description: "Creates a rank within the bot", usage: "<Rank Name>", examples: ["Administrators", "Undercover Administrators"]},
    remove: {name: "Remove", description: "Removes a rank within the bot", usage: "<Rank Name>", examples: ["Administrators", "Undercover Administrators"]},
    edit: {name: "Members", description: "Adds and removes members from a rank", usage: "<Rank Name>, <Members>", examples: ["Administrators, @Max F.#0007", "Undercover Administrators, @Max F.#0007 @Alfred#8461"]},
  }
}
