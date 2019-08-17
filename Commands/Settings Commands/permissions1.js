module.exports.run = async (bot, message, args) => {
  
  let subsections = args[0];
  
  if(!subsections || subsections.toLowerCase() === "help" || subsections.toLowerCase() === "h") return help.helpMessage(message)
  if(subsections.toLowerCase() === "give" || subsections.toLowerCase() === "g") {
    if(!args[1]) return help.helpMessage(message)
    const target = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[1]) || message.mentions.roles.first() || message.guild.roles.get(args[1]);
    if(!target) return error.invalid(message, 'Target', 'Target cannot be found');
    const permission = args[2];
    if(!permission) return error.invalid(message, 'Permission', 'You need to provide a valid permission')
    if(permission.toString().includes('.')) {

    }else{
      
    }
  }
  else if(subsections.toLowerCase() === "revoke" || subsections.toLowerCase() === "r") {
  }
  else if(subsections.toLowerCase() === "clear" || subsections.toLowerCase() === "c") {
  }
  else if(subsections.toLowerCase() === "all" || subsections.toLowerCase() === "a") {
};


module.exports.information = {
  trigger: {
    name: "permissions",
    aliases: "perms",
  },
  permission: {
    perm: "Permissions",
    group: "Settings"
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
        group: "Settings"
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
        group: "Settings"
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
        group: "Settings"
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
        group: "Settings"
      },
      name: "All",
      shortcut: "a",
      description: "Give a Member or a Role All permissions within the bot",
      usage:"<Target>",
      examples: ["@Max F.#0007", "@Staff Team"]
    },
  ]
} 
