module.exports.run = async (bot, message, args) => {
    let Division = args.join(" ");
    let mName = message.author.id;
    if(!Division) {
    return help.helpMessage(message, "Join", "Requests to join a Division", "[Division Key Word]", "Development Team", "Tester")
    }
    else if (Division.toUpperCase() === "DEVELOPMENT TEAM" || Division.toUpperCase() === "DEVELOPMENT" || Division.toUpperCase() === "DEVELOPER" || Division.toUpperCase() === "TEAM DEVELOPMENT" || Division.toUpperCase() === "TEAM OF DEVELOPMENT" || Division.toUpperCase() === "DEVELOPS TEAM" || Division.toUpperCase() === "DEV TEAM" || Division.toUpperCase() === "DEV" || Division.toUpperCase() === "DEVS TEAM") {
        message.channel.send(new Discord.RichEmbed()
            .setDescription("Your app has been sent to the Proj. Lead to review it.")
            .setColor("#417af4"))
        message.guild.members.get(message.guild.ownerID).send(`Application for Developemt Team
        Applicant: ${message.member.displayName}
        ApplicantID: ${message.author.id}`)
        return;
    } else if (Division.toUpperCase() === "TESTING TEAM" || Division.toUpperCase() === "TESTING" || Division.toUpperCase() === "TESTER" || Division.toUpperCase() === "TEAM TESTING" || Division.toUpperCase() === "TEAM OF TESTING" || Division.toUpperCase() === "TESTER TEAM" || Division.toUpperCase() === "TEST" || Division.toUpperCase() === "TESTERS TEAM") {
        message.member.addRoles(["511876278958424064", "511869213091037199"]) 
        .then(message.channel.send(new Discord.RichEmbed()
            .setDescription("Your app has been accepted, Roles has been assigned to you!")
            .setColor("#417af4")))
        return;
    } else return help.helpMessage(message, "Join", "Requests to join a Division", "[Division Key Word", "Development Team", "Tester")

};

exports.help = {
  name: "join",
  aliases: "join",
  hName: "Join",
  Description: "Requests to join a Division",
  usage: "[Division]",
};


