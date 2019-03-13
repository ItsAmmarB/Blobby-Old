module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) return error.noPerms(message, "MANAGE_GUILD");
   let ServCon = GuildsConfig[message.guild.id];
    let subsection = args[0];
    if(!subsection || subsection.toUpperCase() === "HELP") {
        return help.helpMessage(message, "Logs", "Sets logging channel and Enables or Disables logging types", "[SubSection]", "set (Use it in the logging channel)", "enable memberupdate")
    } else if(subsection.toUpperCase() === "SET") {
        if(args[1] && args[1].toUpperCase() === "HELP") return help.helpMessage(message, "Logs Set", "Sets this channel as the logging channel where everything is gonna be logged at", " ", " ", " ")
        let loggingChannel = message.channel.id;
        if(loggingChannel === ServCon.Logs.loggingchannel) return error.loggingChannel(message)
        ServCon.loggingchannel = loggingChannel;
        fs.writeFile("./GuildsConfig.json", JSON.stringify(GuildsConfig), err => {
            if(err) throw err;});
        return success.loggingChannel(message)
    } else if(subsection.toUpperCase() === "ENABLE") {
        let loggingType = args[1];
        if(!loggingType || loggingType.toUpperCase() === "HELP") return help.helpMessage(message, "Logs Enable", "Enables a logging type", "[Logging type]", "MemberUpdate", "MessageDelete");

        if(loggingType.toUpperCase() === "CHANNELCREATE") {
            console.log(ServCon.Logs.memberupdate)
            ServCon.Logs.channelcreate = 1;
            fs.writeFile("./GuildsConfig.json", JSON.stringify(GuildsConfig), err => {             if(err) throw err;});
            success.logEnabledDisabled(message, "ChannelCreate", "Enabled")
        } 
        else if (loggingType.toUpperCase() === "CHANNELDELETE") {
            ServCon.Logs.channeldelete = 1;
            fs.writeFile("./GuildsConfig.json", JSON.stringify(GuildsConfig), err => {             if(err) throw err;});
            success.logEnabledDisabled(message, "ChannelDelete", "Enabled")
        }
        else if (loggingType.toUpperCase() === "CHANNELUPDATE") {
            ServCon.Logs.channelupdate = 1;
            fs.writeFile("./GuildsConfig.json", JSON.stringify(GuildsConfig), err => {             if(err) throw err;});
            success.logEnabledDisabled(message, "ChannelUpdate", "Enabled")
        }
        else if (loggingType.toUpperCase() === "MEMBERUPDATE") {
            ServCon.Logs.memberupdate = 1;
            fs.writeFile("./GuildsConfig.json", JSON.stringify(GuildsConfig), err => {             if(err) throw err;});
            success.logEnabledDisabled(message, "MemberUpdate", "Enabled")
        }
        else if (loggingType.toUpperCase() === "MEMBERREMOVE") {
            ServCon.Logs.memberremove = 1;
            fs.writeFile("./GuildsConfig.json", JSON.stringify(GuildsConfig), err => {             if(err) throw err;});
            success.logEnabledDisabled(message, "MemberRemove", "Enabled")
        }
        else if (loggingType.toUpperCase() === "MEMBERADD") {
            ServCon.Logs.memberadd = 1;
            fs.writeFile("./GuildsConfig.json", JSON.stringify(GuildsConfig), err => {             if(err) throw err;});
            success.logEnabledDisabled(message, "MemberAdd", "Enabled")
        }
        else if (loggingType.toUpperCase() === "MEMBERUNBAN") {
            ServCon.Logs.memberunban = 1;
            fs.writeFile("./GuildsConfig.json", JSON.stringify(GuildsConfig), err => {             if(err) throw err;});
            success.logEnabledDisabled(message, "MemberUnban", "Enabled")
        }
        else if (loggingType.toUpperCase() === "MEMBERBAN") {
            ServCon.Logs.memberban = 1;
            fs.writeFile("./GuildsConfig.json", JSON.stringify(GuildsConfig), err => {             if(err) throw err;});
            success.logEnabledDisabled(message, "MemberBan", "Enabled")
        }
        else if (loggingType.toUpperCase() === "ROLEUPDATE") {
            ServCon.Logs.roleupdate = 1;
            fs.writeFile("./GuildsConfig.json", JSON.stringify(GuildsConfig), err => {             if(err) throw err;});
            success.logEnabledDisabled(message, "RoleUpdate", "Enabled")
        }
        else if (loggingType.toUpperCase() === "ROLECREATE") {
            ServCon.Logs.rolecreate = 1;
            fs.writeFile("./GuildsConfig.json", JSON.stringify(GuildsConfig), err => {             if(err) throw err;});
            success.logEnabledDisabled(message, "RoleCreate", "Enabled")
        }
        else if (loggingType.toUpperCase() === "ROLEDELETE") {
            ServCon.Logs.roledelete = 1;
            fs.writeFile("./GuildsConfig.json", JSON.stringify(GuildsConfig), err => {             if(err) throw err;});
            success.logEnabledDisabled(message, "RoleDelete", "Enabled")
        }
        else if (loggingType.toUpperCase() === "MESSAGEUPDATE") {
            ServCon.Logs.messageupdate = 1;
            fs.writeFile("./GuildsConfig.json", JSON.stringify(GuildsConfig), err => {             if(err) throw err;});
            success.logEnabledDisabled(message, "MessageUpdate", "Enabled")
        }
        else if (loggingType.toUpperCase() === "MESSAGEDELETE") {
            ServCon.Logs.messagedelete = 1;
            fs.writeFile("./GuildsConfig.json", JSON.stringify(GuildsConfig), err => {             if(err) throw err;});
            success.logEnabledDisabled(message, "MessageDelete", "Enabled")
        }
        else if (loggingType.toUpperCase() === "MESSAGEBULKDELETE") {
            ServCon.Logs.messagebulkdelete = 1;
            fs.writeFile("./GuildsConfig.json", JSON.stringify(GuildsConfig), err => {             if(err) throw err;});
            success.logEnabledDisabled(message, "MessageBulkDelete", "Enabled")
        }
        else if (loggingType.toUpperCase() === "ALL") {
            ServCon.Logs.all = 1;
            fs.writeFile("./GuildsConfig.json", JSON.stringify(GuildsConfig), err => {             if(err) throw err;});
            success.logEnabledDisabled(message, "All Logs", "Enabled")
        }
        else {
            error.invalid(message, "Logs", "Log Type is invalid")
        }

    } else if(subsection.toUpperCase() === "DISABLE") {
        let loggingType = args[1];
        if(!loggingType || loggingType.toUpperCase() === "HELP") return help.helpMessage(message, "Logs Disable", "Disables a logging type", "[Logging type]", "MemberUpdate", "MessageDelete");

        if(loggingType.toUpperCase() === "CHANNELCREATE") {
            console.log(ServCon.Logs.memberupdate)
            ServCon.Logs.channelcreate = 0;
            fs.writeFile("./GuildsConfig.json", JSON.stringify(GuildsConfig), err => {             if(err) throw err;});
            success.logEnabledDisabled(message, "ChannelCreate", "Disabled")
        } 
        else if (loggingType.toUpperCase() === "CHANNELDELETE") {
            ServCon.Logs.channeldelete = 0;
            fs.writeFile("./GuildsConfig.json", JSON.stringify(GuildsConfig), err => {             if(err) throw err;});
            success.logEnabledDisabled(message, "ChannelDelete", "Disabled")
        }
        else if (loggingType.toUpperCase() === "CHANNELUPDATE") {
            ServCon.Logs.channelupdate = 0;
            fs.writeFile("./GuildsConfig.json", JSON.stringify(GuildsConfig), err => {             if(err) throw err;});
            success.logEnabledDisabled(message, "ChannelUpdate", "Disabled")
        }
        else if (loggingType.toUpperCase() === "MEMBERUPDATE") {
            ServCon.Logs.memberupdate = 0;
            fs.writeFile("./GuildsConfig.json", JSON.stringify(GuildsConfig), err => {             if(err) throw err;});
            success.logEnabledDisabled(message, "MemberUpdate", "Disabled")
        }
        else if (loggingType.toUpperCase() === "MEMBERREMOVE") {
            ServCon.Logs.memberremove = 0;
            fs.writeFile("./GuildsConfig.json", JSON.stringify(GuildsConfig), err => {             if(err) throw err;});
            success.logEnabledDisabled(message, "MemberRemove", "Disabled")
        }
        else if (loggingType.toUpperCase() === "MEMBERADD") {
            ServCon.Logs.memberadd = 0;
            fs.writeFile("./GuildsConfig.json", JSON.stringify(GuildsConfig), err => {             if(err) throw err;});
            success.logEnabledDisabled(message, "MemberAdd", "Disabled")
        }
        else if (loggingType.toUpperCase() === "MEMBERBAN") {
            ServCon.Logs.memberban = 0;
            fs.writeFile("./GuildsConfig.json", JSON.stringify(GuildsConfig), err => {             if(err) throw err;});
            success.logEnabledDisabled(message, "MemberBan", "Disabled")
        }
        else if (loggingType.toUpperCase() === "MEMBERUNBAN") {
            ServCon.Logs.memberunban = 1;
            fs.writeFile("./GuildsConfig.json", JSON.stringify(GuildsConfig), err => {             if(err) throw err;});
            success.logEnabledDisabled(message, "MemberUnban", "Disabled")
        }
        else if (loggingType.toUpperCase() === "ROLEUPDATE") {
            ServCon.Logs.roleupdate = 0;
            fs.writeFile("./GuildsConfig.json", JSON.stringify(GuildsConfig), err => {             if(err) throw err;});
            success.logEnabledDisabled(message, "RoleUpdate", "Disabled")
        }
        else if (loggingType.toUpperCase() === "ROLECREATE") {
            ServCon.Logs.rolecreate = 0;
            fs.writeFile("./GuildsConfig.json", JSON.stringify(GuildsConfig), err => {             if(err) throw err;});
            success.logEnabledDisabled(message, "RoleCreate", "Disabled")
        }
        else if (loggingType.toUpperCase() === "ROLEDELETE") {
            ServCon.Logs.roledelete = 0;
            fs.writeFile("./GuildsConfig.json", JSON.stringify(GuildsConfig), err => {             if(err) throw err;});
            success.logEnabledDisabled(message, "RoleDelete", "Disabled")
        }
        else if (loggingType.toUpperCase() === "MESSAGEUPDATE") {
            ServCon.Logs.messageupdate = 0;
            fs.writeFile("./GuildsConfig.json", JSON.stringify(GuildsConfig), err => {             if(err) throw err;});
            success.logEnabledDisabled(message, "MessageUpdate", "Disabled")
        }
        else if (loggingType.toUpperCase() === "MESSAGEDELETE") {
            ServCon.Logs.messagedelete = 0;
            fs.writeFile("./GuildsConfig.json", JSON.stringify(GuildsConfig), err => {             if(err) throw err;});
            success.logEnabledDisabled(message, "MessageDelete", "Disabled")
        }
        else if (loggingType.toUpperCase() === "MESSAGEBULKDELETE") {
            ServCon.Logs.messagebulkdelete = 0;
            fs.writeFile("./GuildsConfig.json", JSON.stringify(GuildsConfig), err => {             if(err) throw err;});
            success.logEnabledDisabled(message, "MessageBulkDelete", "Disabled")
        }
        else if (loggingType.toUpperCase() === "ALL") {
            ServCon.Logs.all = 0;
            fs.writeFile("./GuildsConfig.json", JSON.stringify(GuildsConfig), err => {             if(err) throw err;});
            success.logEnabledDisabled(message, "All Logs", "Disabled")
        }
        else {
            error.invalid(message, "Logs", "Log Type is invalid")
        }

    } else return help.helpMessage(message, "Config Logs", "Sets logging channel, ignores channel and Enables or Disables logs type", "SubSection]", "set (Use it in the logging channel)", "ChannelUpdate Off")
    

};
  
  exports.help = {
    name: "logs",
    aliases: "lgs",
    hName: "Logs",
    Description: "enable or disable all or some logs",
    usage: "[Subsection]",
  };
  
  