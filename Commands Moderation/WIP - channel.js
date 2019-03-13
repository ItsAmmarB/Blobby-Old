module.exports.run = async (bot, message, args) => {
  if(!permCheck(message)) return error.noPerms(message, cmdInfo.permission.group + "." + cmdInfo.permission.perm)

  let section = args[0] || "help";
  let prams = args.slice(1);
  if(!section || section.toUpperCase() === "HELP")  {
    return help.helpMessage(message); 
  }
  else if(section.toUpperCase() === "CREATE"){
      let cType = prams[0];
      if(!cType || cType === " " || cType === "") {
        help.helpMessage(message, "Channel Create", "Creates a channel with a specified name, rank and type", "[Type] [Channel Name], [Category]", "Voice Lobby [A], 454795197901963266", "T LE Chat, Law Enforcement")
        return;
      } else if(cType.toString().toUpperCase() === "V" || cType.toString().toUpperCase() === "VOICE"){
           rcType = "voice";
      } else if(cType.toString().toUpperCase() === "T" || cType.toString().toUpperCase() === "TEXT"){
          rcType = "text";
      } else {
          error.invalid(message, "cType", "You can only choose between Text and Voice")
          return;
      }
      let cName = prams.slice(1).join(" ");
      if(!cName || cName === " " || cName === "") return error.missing(message, "cName")
      let cCategory = prams.join(" ").split(", ");
      let cCate = cCategory.slice(1, 2);
      if(!cCate || cCate === " " || cCate === "" || !message.content.includes(",") || !message.content.includes(", ")) return error.missing(message, "cCategory")
      if(!isNaN(cCate)){
        rcCategory = message.guild.channels.get(cCate.toString()).id;
      } else {
        rcCategory = message.guild.channels.filter(channel => channel.name.toUpperCase() === cCate.toString().toUpperCase()).first().id
      }
      if(!rcCategory) return error.invalid(message, "cCategory", "Category could not be found")
      message.guild.createChannel(cName.split(", ").slice(0, 1).toString(), rcType).then(channel => channel.setParent(`${rcCategory}`))
      success.channelAction(message, cName.split(", ").slice(0, 1), "Created")
      
      return;
  }
  else if(section.toUpperCase() === "REMOVE"){
      let cType = args[1];
      if(!cType || cType === " " || cType === "") {
        help.helpMessage(message, "Channel Remove", "Removes a specified channel", "[Type] [Channel Name]", "Voice Lobby [A]", "T 503931410525192210")
        return;
      } else if(cType.toString().toUpperCase() === "V" || cType.toString().toUpperCase() === "VOICE"){
           rcType = "voice";
      } else if(cType.toString().toUpperCase() === "T" || cType.toString().toUpperCase() === "TEXT"){
          rcType = "text";
      } else {
          error.invalid(message, "cType", "You can only choose between Text and Voice")
          return;
      }
      let cName = prams.slice(1).join(" ");
      if(!cName || cName === " " || cName === "") return error.missing(message, "cName")
      if(!isNaN(cName)){
        rcName = message.guild.channels.filter(channel => channel.type === rcType && channel.id === cName.toString()).first();
      } else {
        rcName = message.guild.channels.filter(channel => channel.type === rcType).filter(channel => channel.name.toUpperCase() === cName.toString().toUpperCase()).first()
      }
      if(!rcName) return error.invalid(message, "cName", "Channel could not be found")
      message.guild.channels.get(rcName.id).delete();
      success.channelAction(message, cName, "Removed")
      
      return;
  }
  else if(section.toUpperCase() === "NAME"){
      let cType = args[1];
      if(!cType || cType === " " || cType === "") {
        help.helpMessage(message, "Channel Name", "Changes the name of the specified channel", "[Type] [Channel Name]**,** [New Name]", "Voice Lobby [A], Public [A]", "T 503931410525192210, Public Chat")
        return;
      } 
      if(!args.join(" ").includes(",")) return error.invalid(message, "Channel", "You must put a comma ( , ) between [Current Name] and [New Name]")
      let cName = args.slice(2).join(" ").split(", ").slice(0, 1).join("-");
      let rcName = message.guild.channels.get(cName) || message.guild.channels.filter(channel => channel.name.toString().toUpperCase() === cName.toUpperCase()).first();
      let ncName = args.join(" ").split(", ").slice(1, 2);
      
      rcName.setName(ncName.toString())
      success.channelAction(message, cName, "Edited")
        return;
    }
  if(section.toUpperCase() === "PERMS"){
    let subsection = prams[0];
    if(!subsection) return help.helpMessage(message, "Channel Perms", "Chages Premissions of a specified channel", "[Subsection] [Channel Type] [Channel Name]"," [Channel Type] [Channel Name]", "overwrite [Channel Type] [Channel Name] [Role\\User] [Premission] [Toggle 1\\2] \n \n\*\*Note:\*\*\nUse \`\`/channel perms list\`\` to see all the available  perms!")
    
    if(subsection.toUpperCase() === "LIST"){
      message.channel.send(new Discord.RichEmbed()
      .setAuthor("Command: Channel Perms List")
      .setTitle("Available Perms")
      .setDescription(`\`\`ADMINISTRATOR 
      CREATE_INSTANT_INVITE 
      KICK_MEMBERS 
      BAN_MEMBERS 
      MANAGE_CHANNELS 
      MANAGE_GUILD 
      ADD_REACTIONS 
      VIEW_AUDIT_LOG 
      PRIORITY_SPEAKER 
      VIEW_CHANNEL 
      SEND_MESSAGES 
      SEND_TTS_MESSAGES 
      MANAGE_MESSAGES 
      EMBED_LINKS 
      ATTACH_FILES 
      READ_MESSAGE_HISTORY 
      MENTION_EVERYONE 
      USE_EXTERNAL_EMOJIS 
      CONNECT 
      SPEAK 
      MUTE_MEMBERS 
      DEAFEN_MEMBERS 
      MOVE_MEMBERS 
      USE_VAD 
      CHANGE_NICKNAME 
      MANAGE_NICKNAMES 
      MANAGE_ROLES 
      MANAGE_WEBHOOKS 
      MANAGE_EMOJIS 
      READ_MESSAGES\`\` `)
      .setColor("#417af4")
      )
      
      return;
    }

    if(subsection.toUpperCase() === "OVERWRITE"){
      let cType = prams[1];
      if(!cType || cType === " " || cType === "") {
        help.helpMessage(message, "Channel Perm Overwrite", "Changes a role's perms of the specified channel", "[Type], [Channel Name], [Role], [Permission] [Toggle 0\\1\\2]", "Voice Lobby [A]  Member CONNECT 1", "T server-updates Everyone SEND_MESSAGES 0 \n \nNote:\nUse \`\`/channel perms list\`\` to see all the available  perms!")
        return;
      } else if(cType.toString().toUpperCase() === "V" || cType.toString().toUpperCase() === "VOICE"){
           rcType = "voice";
           permslst = require("../vcPerms")
  
      } else if(cType.toString().toUpperCase() === "T" || cType.toString().toUpperCase() === "TEXT"){
          rcType = "text";
          permslst = require("../tcPerms")
      } else {
          error.invalid(message, "cType", "You can only choose between Text and Voice")
          return;
      }
      let cName = prams.slice(2).join(" ").split(", ").slice(0, 1);
        if(!cName || cName === " " || cName === "") return error.missing(message, "cName")
        if(!isNaN(cName)){
          rcName = message.guild.channels.filter(channel => channel.type === rcType).filter(channel => channel.id === cName.toString()).first();
        } else {
          rcName = message.guild.channels.filter(channel => channel.type === rcType).filter(channel => channel.name.toUpperCase() === cName.toString().toUpperCase()).first();
        }
        let rName = prams.join(" ").split(", ").slice(1, 2);
        if(!isNaN(rName)){
          rrName = message.guild.roles.filter(role => role.id === rName.toString()).first() || message.guild.members.filter(member => member.id === rName.toString()).first();
        } else {
          rrName = message.guild.roles.filter(role => role.name.toUpperCase() === rName.toString().toUpperCase()).first() || message.guild.members.filter(member => member.name.toUpperCase() === rName.toString().toUpperCase()).first();
        }
        if(!rrName) return error.invalid(message, "rName", "Role could not be found")
        let perm = prams.join(" ").split(", ").slice(2, 3).join(" ").split(" ").slice(0, 1);

        let permToggle = prams.pop()
        if(permToggle === "0") {
          rPerm = false;
          sm = "Revoked from "
        } else if(permToggle === "1") {
          rPerm = null;
          sm = "Reset for "
        } else if(permToggle === "2") {
          rPerm = true;
          sm = "Approve for "
        } else {
          return error.invalid(message, "permToggle", "0 = False, 1 = Netrual, 2 = True")
        }

        for (i = 0; i < permslst.length; i++) {
          if(perm.toString().toUpperCase() === (permslst[i])) {
            var tPerm = `${perm.toString().toUpperCase()}`
            var perms = {
              [tPerm]: rPerm
            };
            console.log(perms)
            message.guild.channels.get(rcName.id).overwritePermissions(rrName, perms)
            success.channelActionD(message, cName, "Edited", tPerm + " has been " + sm + rrName.name)
          }
        }
        return;
      }
  }
}

exports.information = {
  trigger: {
    name: "channel",
    aliases: "chnl",
  },
  permission: {
    perm: "channel",
    group: "Admin"
  },
  help: {
    name: "Channel",
    description: "Creates, Removes and Changes names and perms of channels including categories",
    usage: "<SubSection>",
    examples: ["Create voice Public Lounge [A]", "Remove t Special-Chat"]
  },
  sections: {
    create: {
      name: "Create",
      description: "Creates a Voice or Text channel",
      usage: "<Channel Type> <Channel Name>",
      examples: ["voice Public Lounge [A]", "text Special Chat"]
    },
    remove: {
      name: "Remove",
      description: "Removes a Voice or Text channel",
      usage: "<Channel Type> <Channel Name>",
      examples: ["voice Public Lounge [A]", "text Special Chat"]
    },
    name: {
      name: "Name",
      description: "Changes the name of a Voice or Text channel",
      usage: "<Channel Type> <Channel Name> > <New Name>",
      examples: ["voice Public Lounge [A] > Public Lobby [A]", "text Special Chat > Administrators Chat"]
    },
    perm: {
      name: "Perm",
      description: "Changes a permission of a Voice or Text channel" + "\n• Note: 0 = Deny, 1 = Neutral, 2 = Allow",
      usage: "<Channel Type> <Channel Name>, <Target> <Permission Key> <Switch>",
      examples: ["voice Public Lounge [A], Administrators DEFEAN_MEMBERS 1", "text Special Chat, Verified Member MANAGE_MESSAGES 0"]
    }
  }
}

