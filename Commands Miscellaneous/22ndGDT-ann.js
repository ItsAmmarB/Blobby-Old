module.exports.run = async (bot, message, args) => {
    
    if(message.guild.id !== "413354457028362240") return;
    if(!message.member.hasPermission(["MANAGE_MESSAGES"])) return;

    const mentionHook = new Discord.WebhookClient("541753831587840000", "6U9VWWXlki_OSVrm_oBsqMm_UOp_dq3nVg_oS-eM03q01vI1i_vaOmHI0E5gQYPQyq-Y");
    let title = args.join(" ").split(",")[0];
    let body = args.join(" ").split(",").slice(1).join(",");

    let embed = new Discord.RichEmbed()
        .setAuthor("22nd Gladiators")
        .addField(title, body)
        .setFooter("Announced by " + message.member.user.username)
        .setTimestamp()
        .setColor("#444de2")
    
    mentionHook.send(embed)
    message.delete()
    
}


exports.information = {
    trigger: {
        name: "22gdtannounce",
        aliases: "ann",
    },
    permission: {
      perm: "22GDT.Announce",
      group: "22GDT"
    },
    help: {
        name: "Announce",
        description: "sends an update message to #announcement",
        usage: "<Title>, <Body> ",
        examples: ["Offical Discord, This is the 22nd Gladiators Offical Discord Server.", "Training, Tomorrow will be a training at 6PM EST."]
    }
  }