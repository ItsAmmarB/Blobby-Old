module.exports.run = async (bot, message, args) => {
	let section = args[0] || "help";
	let prams = args.slice(1).join(" ")
	if(isNaN(section) && message.guild.member(message.mentions.users.first())){
		mName =	message.guild.member(message.mentions.users.first())
	} else {
		mName = message.guild.members.get(section);
	}
	if(!section || section.toUpperCase() === "HELP") return help.helpMessage(message); 

	// Role Create <=======##
	else if(section.toUpperCase() === "CREATE") {
		let prams = args.slice(1).join(" ")
		let rName = prams.split(" #").shift(6)
		if(!rName) return help.helpMessage(message, "Role Create", "Create a non-existing role", "[Role Name] {Role Color}", "Hypesquad #f9cc00", "Administration #ff0000")
		var gRole = message.guild.roles.filter(role => role.name.toString().toUpperCase() === rName).first()
		if(gRole) return error.invalid(message, "rName", "Role already exist");
		let rColor = prams.slice(rName.length + 2) || "ffffff";
		message.guild.createRole({ name: rName, color: rColor})
		success.cRole(message, rName)
		
		return;
	}
	
	// Role Remove <=======##
	else if(section.toUpperCase() === "REMOVE") {
		let prams = args.slice(1).join(" ")
		let rName = prams;
		if(!rName) return help.helpMessage(message, "Role Remove", "Removes an existing role", "[Role Name]", "Hypesquad", "Administration")
		var gRole = message.guild.roles.filter(role => role.name.toString().toUpperCase() === rName.toString().toUpperCase()).first() || message.mentions.roles.first() || message.guild.roles.get(rName);
		if(!gRole) error.invalid(message, "rName", "Role does not exist");	
		gRole.delete()
		success.rRole(message, gRole.name)
		
		return;
	}

	//Strip's member from all roles (sets a member's roles to none)
	else if(section.toUpperCase() === "STRIP") {
		if(!message.member.hasPermission("ADMINISTRATOR") && Admins[message.member.id]) return error.noPerms(message, "ADMINISTRATOR")
		let mName = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[1]);
		if(!args[1]) return help.helpMessage(message, "Role Strip", "Strips a user from all roles", "[User]", "@Max F.#0902", "@Alfred#3922");
		if(!mName) return error.invalid(message, "mName", "Member does not exist")
		if(mName.id === message.guild.ownerID) return error.unable(message, "Strip", mName.user.username, "User has ownership of the guild")
		if(mName.hasPermission("ADMINISTRATOR")) return error.unable(message, "Strip", mName.user.username, "User has admin perms")
		mName.setRoles([])
			.then(success.success(message, mName.user.username, "Stripped"))
			
		return;
	} 
	
	//Role's information
	else if(section.toUpperCase() === "INFO") {
		let rName = prams.split(" ").slice(0).join(" ")
		if(!rName) return help.helpMessage(message, "Role Info", "Gives a brief information of a role", "[Role Name]", "Member", "Friends");
		let gRole = message.guild.roles.find(role => role.name.toUpperCase() === rName.toUpperCase()) || message.mentions.roles.first() || message.guild.roles.get(rName);
		if(!gRole) return error.invalid(message, "rName", "Role does not exist");
		if(gRole.mentionable) {
			mRole = "True"
		} else {
			mRole = "False"
		}
		if(gRole.hoist) {
			hRole = "True"
		} else {
			hRole = "False"
		}
			
		let embed = new Discord.RichEmbed()
			.setDescription("What is **" + gRole.name + "** (ID:" + gRole.id + ")")
			.addField("⇢ Role Details",`ID: ${gRole.id}\nName: ${gRole.name}\nPosition: ${gRole.calculatedPosition}\nMembers Count: ${gRole.members.size}\nHoisted: ${hRole}\nMentionable: ${mRole}\nColor: ${gRole.hexColor}\nCreated At:  ${moment.utc(gRole.createdAt).format("M/D/YYYY HH:mm:ss")} `)
			.setColor("#417af4")

			permsCheck(gRole, function(acknow) {
			
				if(acknow.length < 1) {
					null;
				} else if (acknow[0] === "ADMINISTRATOR") {
					embed.addField("⇢ Role Acknowledgments", `\`\`${acknow[0]}\`\``)
				} else {
					embed.addField("⇢ Role Acknowledgments", `\`\`${acknow.toString().split(",").join("\n").split("\n").join(", ")}\`\``)
				}
			});

		message.channel.send(embed)
		
		return;
	}

	//Roles List
	else if(section.toUpperCase() === "LIST") {
		let spacers = "　　　　";
		let rList = message.guild.roles.filter(role => role.id !== message.guild.id).map(role => `　　${message.guild.members.filter(member => member.roles.has(role.id)).size}` + `${spacers.slice(message.guild.members.filter(member => member.roles.has(role.id)).size.toString().length)}- 　　` + role.name.toString().slice())
		if(message.guild.roles.array().length - 1 < 2) {
		  rNum = "Role"
		} else {
		  rNum = "Roles"
		}
		message.channel.send(new Discord.RichEmbed()
		  .setAuthor("All " + message.guild.name + "'s Roles", message.guild.iconURL)
		  .setTitle(message.guild.roles.array().length - 1 + " " + rNum + " in total")
		  .setDescription(`
		   Members　　　Role Name
		  ${rList.sort().toString().split(",").join("\n")}`)
		  .setColor("#417af4")
		  )
		  
		return;
	}

	//Role @member <=======##
	else if(mName) {
		if(args[0].length < 3 || args[0].toUpperCase() === "@MEMBER") return help.helpMessage(message, "Role @Member", "Adds or removes a role for all Human members", "[Role Name]", me.tag + " Verified", me.id + "Warns");
		let rName = args.slice(1).join(" ").toString().toUpperCase();
		if(!rName) return error.missing(message, "rName")
		var gRole = message.guild.roles.filter(role => role.name.toString().toUpperCase() === rName).first() || message.mentions.roles.first() || message.guild.roles.get(rName);;
		if(!gRole) return error.invalid(message, "rName", "Role does not exist");
		if(mName.roles.has(gRole.id)) {
			mName.removeRole(gRole.id)
			success.role(message, gRole.name, "has been unassigned from", mName.user.username)
			return;
		}
		if(!mName.roles.has(gRole.id.id)) {
			mName.addRole(gRole.id)
			success.role(message, gRole.name, "has been assigned to", mName.user.username)
			
			return;
		}
		
		return;
	}

	else {
			help.helpMessage(message, "Role Humans", "Adds or removes a role for all Human members", "[Add/Remove] [Role Name]", "Add Verified", "Remove Warns")
	}
};

exports.help = {
	name: "role",
	aliases: "r",
	hName: "Role",
	Description: "Creates, Removes an d Changes setting and perms of a role",
	usage: "[SubSection] \n __Use ``/role`` for more information__",
	permission: "admin.role"
  };

  exports.information = {
	  trigger: {
	  name: "role",
	  aliases: "rl",
	  },
	  permission: {
	  perm: "Role",
	  group: "Admin"
	  },
	  help: {
	  name: "Role",
	  description: "Creates, Removes an d Changes setting and perms of a role",
	  usage: "<SubSection>",
	  examples: ["Create Member #fffff2", "Remove Naughty"]
	  },
	  sections: {
		  
	  }
  }