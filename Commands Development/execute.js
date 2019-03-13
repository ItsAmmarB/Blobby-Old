module.exports.run = async (bot, message, args) => {
        eval(args.join(" ")).catch(err => console.log(err))
};

exports.information = {
  trigger: {
  name: "execute",
  aliases: "test",
  },
  permission: {
  perm: "execute",
  group: "execute"
  },
  help: {
  name: "Mute",
  description: "Mutes a member in all server channels\n• Note: maximum duration is 3 Weeks.\nDuration shortcuts:\ns = Seconds  m = Minutes  h = Hours\nd = Days  w = Weeks",
  usage: "<User> <Duration>",
  examples: ["test"," 1h"]
  }
}


