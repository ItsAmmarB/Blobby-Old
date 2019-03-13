module.exports.run = async (bot, message, args) => {
	// try {
	if(message.channel.type === "dm") return;
	if(!message.member.hasPermission("MANAGE_ROLES") && !Admins[message.author.id+"-"+message.guild.id]) return error.noPerms(message, "MANAGE_ROLES")

	let section = args[0] || "help";
	let prams = args.slice(1).join(" ")
	if(isNaN(section) && message.guild.member(message.mentions.users.first())){
		mName =	message.guild.member(message.mentions.users.first())
	} else {
		mName = message.guild.members.get(section);
	}
	if(!section || section.toUpperCase() === "HELP") return help.role(message, "Role", "Adds or Removes a role from or to a member or multiple members", "Create", "Create a non-existing role", "[Role Name] {Role Color}", "Remove", "Removes an existing role", "[Role Name]", "In", "Adds or removes a role for all members of a role", "[Role Name] [Add/Remove] [Role Name]", "All", "Adds or removes a role for all members", "[Add/Remove][Role Name]", "Humans", "Adds or removes a role for all Human members", "[Add/Remove] [Role Name]", "@Member", "Add or Removes a role from a member", "[Role Name]", "List", "Lists all the available roles in the guild"); 

	// Role Create <=======##
	else if(section.toUpperCase() === "CREATE") {
		let prams = args.slice(1).join(" ")
		let rName = prams.split(" #").shift(6)
		if(!rName) return help.helpMessage(message, "Role Create", "Create a non-existing role", "[Role Name] {Role Color}", "Hypesquad #f9cc00", "Administration #ff0000")
		var gRole = message.guild.roles.filter(role => role.name.toString().toUpperCase() === rName).first()
		if(gRole) return error.invalid(message, "rName", "Role already exist");
		let rColor = prams.slice(rName.length + 2) || "ffffff";
		// message.channel.send(`Role Name: ${rName}\nRole Color: ${rColor}\nHERE: ${message.guild.roles.find("name", rName).name}`)
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
		success.rRole(message, rName)
		
		return;
	}

	// Role In <=======##
	// else if(section.toUpperCase() === "IN") {
	// 	let prams = args.slice(1).join(" ")
	// 	if(!args[1]) return help.helpMessage(message, "Role In", "Adds or removes a role for all members of a role", "[Role Name] [Add/Remove] [Role Name]", "Member Add Verified", "Member Remove Warns");
	// 	let subSection = args[2];
	// 	message.channel.send(subSection)
	// 	if(!subSection) return error.missing(message, "subSection");
	// 	if(subSection.toUpperCase() !== "ADD" || subSection.toUpperCase() !== "REMOVE") return error.invalid(message, "subSection", "Choose Add or Remove");
	// 	if(subSection.toUpperCase() === "ADD"){
	// 		let tRole = prams.split(" add").shift(1);
	// 		if(!message.guild.roles.find("name", tRole)) return error.invalid(message, "tRole", "Targeted role does not exist");
	// 		let gRole = prams.split("add ").pop(1);
	// 		if(!gRole) return error.missing(message, "rName");
	// 		if(!message.guild.roles.find("name", gRole)) return error.invalid(message, "gRole", "Given role does not exist");
	// 		if(message.guild.roles.find("name", "Chucky").members.filter(member => !member.roles.find("name", gRole)).size < 1) return error.invalid(message, "tRole", "All targeted role member has the role")
	// 		message.guild.roles.get(message.guild.roles.find("name", tRole).id).members.forEach(member => member.addRole(message.guild.roles.find("name", gRole).id))
	// 		message.channel.send(`Section: ${subSection}\nRole 1: ${tRole}\nRole 2: ${gRole}`)
	// 		success.role(message, gRole, "has been assigned to whoever has", tRole)
	// 		
	// 		return;
	// 	}
	// 	if(subSection.toUpperCase() === "REMOVE"){
	// 		let tRole = prams.split(" remove").shift(1);
	// 		if(!message.guild.roles.find("name", tRole)) error.invalid(message, "tRole", "Targeted role does not exist");
	// 		let gRole = prams.split("remove ").pop(1);
	// 		if(!gRole) return error.missing(message, "rName");
	// 		if(!message.guild.roles.find("name", gRole)) return error.invalid(message, "gRole", "Given role does not exist");
	// 		if(message.guild.roles.find("name", "Chucky").members.filter(member => member.roles.find("name", gRole)).size < 1) return error.invalid(message, "tRole", "None of the targeted roloe members has the role")
	// 		message.guild.roles.get(message.guild.roles.find("name", tRole).id).members.forEach(member => member.removeRole(gRole.id))
	// 		// message.channel.send(`Section: ${subSection}\nRole 1: ${tRole}\nRole 2: ${gRole}`)
	// 		success.role(message, gRole.name, "has been unassigned from whoever has", tRole)
	// 		
	// 		return;
	// 	}
	// 	return;
	// }

	// Role All <=======##
	else if(section.toUpperCase() === "ALL") {
		let prams = args.slice(1).join(" ")
		if(!args[1]) return help.helpMessage(message, "Role All", "Adds or removes a role for all members", "[Add/Remove][Role Name]", "add Member", "remove Warns");
		let subSection = args[1];
		if(!subSection) return error.missing(message, "subSection");
		if(subSection.toUpperCase() === "ADD"){
			let rName = prams.split(" ").slice(1).join(" ").toString().toUpperCase();
			if(!rName) return help.helpMessage(message, "Role In Add", "Adds a role to all members", "[Role Name]", "Member", "Loyal Member");
			var gRole = message.guild.roles.filter(role => role.name.toString().toUpperCase() === rName).first() || message.mentions.roles.first() || message.guild.roles.get(rName);
			if(!gRole) error.invalid(message, "rName", "Role does not exist");			
			if(message.guild.members.filter(member => !member.roles.get(gRole.id)).size < 1) return error.invalid(message, "rName", "Everone has the role")
			message.guild.members.forEach(member => member.addRole(gRole.id))
			success.role(message, gRole.name, "has been assigned to", "Everyone")
			
			return;
		}
		if(subSection.toUpperCase() === "REMOVE"){
			let rName = prams.split(" ").slice(1).join(" ").toString().toUpperCase();
			if(!rName) return help.helpMessage(message, "Role In Remove", "Removes a role from all members", "[Role Name]", "Member", "Loyal Member");
			var gRole = message.guild.roles.filter(role => role.name.toString().toUpperCase() === rName).first() || message.mentions.roles.first() || message.guild.roles.get(rName);
			if(!gRole) error.invalid(message, "rName", "Role does not exist");
			if(message.guild.members.filter(member => !member.roles.get(gRole.id)).size > 1) return error.invalid(message, "rName", "No one has the role")
			message.guild.members.forEach(member => member.removeRole(gRole.id))
			success.role(message, gRole.name, "has been unassigned from", "Everyone")
			
			return;
		}
		return;
	}

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
	
	else if(section.toUpperCase() === "INFO") {
		let rName = prams.split(" ").slice(0).join(" ")
		if(!rName) return help.helpMessage(message, "Role Info", "Gives a brief information of a tole", "[Role Name]", "Member", "Friends");
		if(!message.guild.roles.find("name", rName) && !message.mentions.roles.first()) return error.invalid(message, "rName", "Role does not exist");
		let sRole = message.guild.roles.find("name", rName) || message.mentions.roles.first();
		if(sRole.mentionable) {
			mRole = "Yes"
		} else {
			mRole = "No"
		}
		if(sRole.hoist) {
			hRole = "Yes"
		} else {
			hRole = "No"
		}
		let embed = new Discord.RichEmbed()
			.setTitle(sRole.name)
			.addField("ID", sRole.id, true)
			.addField("Name", sRole.name, true)
			.addField("Members", sRole.members.size + " Members", true)
			.addField("Hoisted", hRole, true)
			.addField("Mentionable", mRole, true)
			.addField("Postion", sRole.calculatedPosition, true)
			.setColor("#417af4")
			// console.log(sRole.hexColor)
		message.channel.send(embed)
		
		return;
	}

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
		  .setDescription(`\`\`
		   Members　　　Role Name
		  ${rList.sort().toString().split(",").join("\n")}\`\``)
		  .setColor("#417af4")
		  )
		  
		return;
	}


	// Role Humans <=======##
	else if(section.toUpperCase() === "HUMANS") {
		let prams = args.slice(1).join(" ")
		if(!args[1]) return help.helpMessage(message, "Role Humans", "Adds or removes a role for all Human members", "[Add/Remove] [Role Name]", "Add Verified", "Remove Warns");
		let subSection = args[1];
		if(!subSection) return error.missing(message, "subSection");
		if(subSection.toUpperCase() === "ADD"){
			let rName = prams.split(" ").slice(1).join(" ").toString().toUpperCase();
			if(!rName) return help.helpMessage(message, "Role In Add", "Adds a role to all human members", "[Role Name]", "Member", "Loyal Member");
			var gRole = message.guild.roles.filter(role => role.name.toString().toUpperCase() === rName).first() || message.mentions.roles.first() || message.guild.roles.get(rName);
			if(!gRole) error.invalid(message, "rName", "Role does not exist");
			if(message.guild.roles.get(gRole.id).members.size === message.guild.members.filter(member => !member.user.bot).size) return error.invalid(message, "rName", "Everone has the role")
			message.guild.members.filter(member => !member.user.bot).forEach(member => member.addRole(gRole.id))
			success.role(message, gRole.name, "has been assigned to", "All Humans")
			
			return;
		}
		else if(subSection.toUpperCase() === "REMOVE"){
			let rName = prams.split(" ").slice(1).join(" ").toString().toUpperCase();
			if(!rName) return help.helpMessage(message, "Role In Remove", "Removes a role from all human members", "[Role Name]", "Member", "Loyal Member");
			var gRole = message.guild.roles.filter(role => role.name.toString().toUpperCase() === rName).first() || message.mentions.roles.first() || message.guild.roles.get(rName);;
			if(!gRole) error.invalid(message, "rName", "Role does not exist");
			if(message.guild.roles.get(gRole.id).members.size === 0) return error.invalid(message, "rName", "No one has the role")
			message.guild.members.filter(member => !member.user.bot).forEach(member => member.removeRole(gRole.id))
			success.role(message, gRole.name, "has been unassigned from", "All Humans")
			
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
		return;
	}

	else {
		error.invalid(message, "Entity", "Invalid Entity")
	}

// } catch (e) {
// 	error.system(bot, e)
//   }
};

exports.help = {
	name: "role",
	aliases: "r",
	hName: "Role",
	Description: "Creates, Removes an d Changes setting and perms of a role",
	usage: "[SubSection] \n __Use ``/role`` for more information__",
  };


