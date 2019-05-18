exports.run = async (bot, message, args) => {
    if(!args[0]) return help.helpMessage(message)
    let mName = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!mName) return error.invalid(message, "mName", "Member cannot be found")
    if(!mName.nickname) {
        nick = mName.user.username
      } else {
        nick = mName.nickname
      }
    if(Admins[mName.id+"-"+message.guild.id] || Mods[mName.id+"-"+message.guild.id] || mName.hasPermission("ADMINISTRATOR")) return error.unable(message, "Mute", `\`\`${nick}\`\``, "Cannot mute administrators or moderators")
    let muteRole = message.guild.roles.find(role => role.name == "Muted")
    if(!muteRole) {
        try{
            role = await message.guild.createRole({
              name: "Muted",
              color: "#000000",
              permissions: []
            });
        } catch(e) {
            error.missingPerm(message, "MANAGE_ROLES")
          }
        try{
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(role, {
                  SEND_MESSAGES:  false,
                  SPEAK: false,
                  ADD_REACTIONS: false
                });
              });
        } catch(e) {
            error.missingPerm(message, "MANAGE_ROLES")
          }
    }
    if(!muteRole) return error.system(message, "Error", "An error occurred while creating ``Mute`` role, Report has been successfully created and sent to the development team!")
    let duration = args[1];
    if(!duration) return error.missing(message, "Duration");
    let durations = {
        "s": parseInt(1000),
        "m": parseInt(60000),
        "h": parseInt(3600000),
        "d": parseInt(86400000),
        "max": parseInt(1814490000)
    }
    if(duration.toLowerCase().includes("s")) {
        var secs = duration.split("s")[0];
        if(!secs) {
            return error.missing(message, "Duration")
        } else if(secs[secs.length - 1] && !isNaN(secs[secs.length - 1])) {
            var secs = secs.split("")

            if(secs[secs.length - 1] && !isNaN(secs[secs.length - 1])) {
                if(secs[secs.length - 2] && !isNaN(secs[secs.length - 2])) {
                    if(secs[secs.length - 3] && !isNaN(secs[secs.length - 3])) {
                        if(secs[secs.length - 4] && !isNaN(secs[secs.length - 4])) {
                            if(secs[secs.length - 5] && !isNaN(secs[secs.length - 5])) {
                                if(secs[secs.length - 6] && !isNaN(secs[secs.length - 6])) {
                                    if(secs[secs.length - 7] && !isNaN(secs[secs.length - 7])) {
                                        if(secs[secs.length - 8] && !isNaN(secs[secs.length - 8])) {
                                            error.invalid(message, "Duration", "maximum Mute duration is 21 days")
                                        } else {
                                            if(secs[secs.length - 8] && !durations[secs[secs.length - 8]]) return error.invalid(message, "Duration", "Invalid duration shortcut")
                                            var seconds = secs[secs.length - 7]+secs[secs.length - 6]+secs[secs.length - 5]+secs[secs.length - 4]+secs[secs.length - 3]+secs[secs.length - 2]+secs[secs.length - 1];
                                        }
                                    } else {
                                        if(secs[secs.length - 7] && !durations[secs[secs.length - 7]]) return error.invalid(message, "Duration", "Invalid duration shortcut")
                                        var seconds = secs[secs.length - 6]+secs[secs.length - 5]+secs[secs.length - 4]+secs[secs.length - 3]+secs[secs.length - 2]+secs[secs.length - 1];
                                    }
                                } else {
                                    if(secs[secs.length - 6] && !durations[secs[secs.length - 6]]) return error.invalid(message, "Duration", "Invalid duration shortcut")
                                    var seconds = secs[secs.length - 5]+secs[secs.length - 4]+secs[secs.length - 3]+secs[secs.length - 2]+secs[secs.length - 1];
                                }
                            } else {
                                if(secs[secs.length - 5] && !durations[secs[secs.length - 5]]) return error.invalid(message, "Duration", "Invalid duration shortcut")
                                var seconds = secs[secs.length - 4]+secs[secs.length - 3]+secs[secs.length - 2]+secs[secs.length - 1];
                            }
                        } else {
                            if(secs[secs.length - 4] && !durations[secs[secs.length - 4]]) return error.invalid(message, "Duration", "Invalid duration shortcut")
                            var seconds = secs[secs.length - 3]+secs[secs.length - 2]+secs[secs.length - 1];
                        }
                    } else {
                        if(secs[secs.length - 3] && !durations[secs[secs.length - 3]]) return error.invalid(message, "Duration", "Invalid duration shortcut")
                        var seconds = secs[secs.length - 2]+secs[secs.length - 1];
                    }
                } else {
                    if(secs[secs.length - 2] && !durations[secs[secs.length - 2]]) return error.invalid(message, "Duration", "Invalid duration shortcut")
                    var seconds = secs[secs.length - 1];
                } 
            } else {
                return error.invalid(message, "Duration", "Invalid amount of seconds provided")
            }
        } else {
            return error.invalid(message, "Duration", "Invalid amount of seconds provided")
        }
        var sFinal = 0;
        var sFinal = seconds * durations["s"] || 0;

    } 
    if(duration.toLowerCase().includes("m")) {
        var mins = duration.split("m")[0];
        if(!mins) {
            return error.missing(message, "Duration")
        } else if(mins[mins.length - 1] && !isNaN(mins[mins.length - 1])) {
            var mins = mins.split("")

            if(mins[mins.length - 1] && !isNaN(mins[mins.length - 1])) {
                if(mins[mins.length - 2] && !isNaN(mins[mins.length - 2])) {
                    if(mins[mins.length - 3] && !isNaN(mins[mins.length - 3])) {
                        if(mins[mins.length - 4] && !isNaN(mins[mins.length - 4])) {
                            if(mins[mins.length - 5] && !isNaN(mins[mins.length - 5])) {
                                if(mins[mins.length - 6] && !isNaN(mins[mins.length - 6])) {
                                    if(mins[mins.length - 7] && !isNaN(mins[mins.length - 7])) {
                                        if(mins[mins.length - 8] && !isNaN(mins[mins.length - 8])) {
                                            error.invalid(message, "Duration", "maximum Mute duration is 21 days")
                                        } else {
                                            if(mins[mins.length - 8] && !durations[mins[mins.length - 8]]) return error.invalid(message, "Duration", "Invalid duration shortcut")
                                            var minutes = mins[mins.length - 7]+mins[mins.length - 6]+mins[mins.length - 5]+mins[mins.length - 4]+mins[mins.length - 3]+mins[mins.length - 2]+mins[mins.length - 1];
                                        }
                                    } else {
                                        if(mins[mins.length - 7] && !durations[mins[mins.length - 7]]) return error.invalid(message, "Duration", "Invalid duration shortcut")
                                        var minutes = mins[mins.length - 6]+mins[mins.length - 5]+mins[mins.length - 4]+mins[mins.length - 3]+mins[mins.length - 2]+mins[mins.length - 1];
                                    }
                                } else {
                                    if(mins[mins.length - 6] && !durations[mins[mins.length - 6]]) return error.invalid(message, "Duration", "Invalid duration shortcut")
                                    var minutes = mins[mins.length - 5]+mins[mins.length - 4]+mins[mins.length - 3]+mins[mins.length - 2]+mins[mins.length - 1];
                                }
                            } else {
                                if(mins[mins.length - 5] && !durations[mins[mins.length - 5]]) return error.invalid(message, "Duration", "Invalid duration shortcut")
                                var minutes = mins[mins.length - 4]+mins[mins.length - 3]+mins[mins.length - 2]+mins[mins.length - 1];
                            }
                        } else {
                            if(mins[mins.length - 4] && !durations[mins[mins.length - 4]]) return error.invalid(message, "Duration", "Invalid duration shortcut")
                            var minutes = mins[mins.length - 3]+mins[mins.length - 2]+mins[mins.length - 1];
                        }
                    } else {
                        if(mins[mins.length - 3] && !durations[mins[mins.length - 3]]) return error.invalid(message, "Duration", "Invalid duration shortcut")
                        var minutes = mins[mins.length - 2]+mins[mins.length - 1];
                    }
                } else {
                    if(mins[mins.length - 2] && !durations[mins[mins.length - 2]]) return error.invalid(message, "Duration", "Invalid duration shortcut")
                    var minutes = mins[mins.length - 1];
                } 
            } else {
                return error.invalid(message, "Duration", "Invalid amount of minutes provided1")
            }
        } else {
            return error.invalid(message, "Duration", "Invalid amount of minutes provided2")
        }
        var mFinal = 0;
        var mFinal = minutes * durations["m"] || 0;
    } 
    if(duration.toLowerCase().includes("h")) {
        var hrs = duration.split("h")[0];
        if(!hrs) {
            return error.missing(message, "Duration")
        } else if(hrs[hrs.length - 1] && !isNaN(hrs[hrs.length - 1])) {
            var hrs = hrs.split("")

            if(hrs[hrs.length - 1] && !isNaN(hrs[hrs.length - 1])) {
                if(hrs[hrs.length - 2] && !isNaN(hrs[hrs.length - 2])) {
                    if(hrs[hrs.length - 3] && !isNaN(hrs[hrs.length - 3])) {
                        if(hrs[hrs.length - 4] && !isNaN(hrs[hrs.length - 4])) {
                            if(hrs[hrs.length - 5] && !isNaN(hrs[hrs.length - 5])) {
                                if(hrs[hrs.length - 6] && !isNaN(hrs[hrs.length - 6])) {
                                    if(hrs[hrs.length - 7] && !isNaN(hrs[hrs.length - 7])) {
                                        if(hrs[hrs.length - 8] && !isNaN(hrs[hrs.length - 8])) {
                                            error.invalid(message, "Duration", "maximum Mute duration is 21 days")
                                        } else {
                                            if(hrs[hrs.length - 8] && !durations[hrs[hrs.length - 8]]) return error.invalid(message, "Duration", "Invalid duration shortcut")
                                            var hours = hrs[hrs.length - 7]+hrs[hrs.length - 6]+hrs[hrs.length - 5]+hrs[hrs.length - 4]+hrs[hrs.length - 3]+hrs[hrs.length - 2]+hrs[hrs.length - 1];
                                        }
                                    } else {
                                        if(hrs[hrs.length - 7] && !durations[hrs[hrs.length - 7]]) return error.invalid(message, "Duration", "Invalid duration shortcut")
                                        var hours = hrs[hrs.length - 6]+hrs[hrs.length - 5]+hrs[hrs.length - 4]+hrs[hrs.length - 3]+hrs[hrs.length - 2]+hrs[hrs.length - 1];
                                    }
                                } else {
                                    if(hrs[hrs.length - 6] && !durations[hrs[hrs.length - 6]]) return error.invalid(message, "Duration", "Invalid duration shortcut")
                                    var hours = hrs[hrs.length - 5]+hrs[hrs.length - 4]+hrs[hrs.length - 3]+hrs[hrs.length - 2]+hrs[hrs.length - 1];
                                }
                            } else {
                                if(hrs[hrs.length - 5] && !durations[hrs[hrs.length - 5]]) return error.invalid(message, "Duration", "Invalid duration shortcut")
                                var hours = hrs[hrs.length - 4]+hrs[hrs.length - 3]+hrs[hrs.length - 2]+hrs[hrs.length - 1];
                            }
                        } else {
                            if(hrs[hrs.length - 4] && !durations[hrs[hrs.length - 4]]) return error.invalid(message, "Duration", "Invalid duration shortcut")
                            var hours = hrs[hrs.length - 3]+hrs[hrs.length - 2]+hrs[hrs.length - 1];
                        }
                    } else {
                        if(hrs[hrs.length - 3] && !durations[hrs[hrs.length - 3]]) return error.invalid(message, "Duration", "Invalid duration shortcut")
                        var hours = hrs[hrs.length - 2]+hrs[hrs.length - 1];
                    }
                } else {
                    if(hrs[hrs.length - 2] && !durations[hrs[hrs.length - 2]]) return error.invalid(message, "Duration", "Invalid duration shortcut")
                    var hours = hrs[hrs.length - 1];
                } 
            } else {
                return error.invalid(message, "Duration", "Invalid amount of hours provided1")
            }
        } else {
            return error.invalid(message, "Duration", "Invalid amount of hours provided2")
        }
        var hFinal = 0;
        var hFinal = hours * durations["h"] || 0;
    } 
    if(duration.toLowerCase().includes("d")) {
        var dys = duration.split("d")[0];
        if(!dys) {
            return error.missing(message, "Duration")
        } else if(dys[dys.length - 1] && !isNaN(dys[dys.length - 1])) {
            var dys = dys.split("")

            if(dys[dys.length - 1] && !isNaN(dys[dys.length - 1])) {
                if(dys[dys.length - 2] && !isNaN(dys[dys.length - 2])) {
                    if(dys[dys.length - 3] && !isNaN(dys[dys.length - 3])) {
                        if(dys[dys.length - 4] && !isNaN(dys[dys.length - 4])) {
                            if(dys[dys.length - 5] && !isNaN(dys[dys.length - 5])) {
                                if(dys[dys.length - 6] && !isNaN(dys[dys.length - 6])) {
                                    if(dys[dys.length - 7] && !isNaN(dys[dys.length - 7])) {
                                        if(dys[dys.length - 8] && !isNaN(dys[dys.length - 8])) {
                                            error.invalid(message, "Duration", "maximum Mute duration is 21 days")
                                        } else {
                                            if(dys[dys.length - 8] && !durations[dys[dys.length - 8]]) return error.invalid(message, "Duration", "Invalid duration shortcut")
                                            var days = dys[dys.length - 7]+dys[dys.length - 6]+dys[dys.length - 5]+dys[dys.length - 4]+dys[dys.length - 3]+dys[dys.length - 2]+dys[dys.length - 1];
                                        }
                                    } else {
                                        if(dys[dys.length - 7] && !durations[dys[dys.length - 7]]) return error.invalid(message, "Duration", "Invalid duration shortcut")
                                        var days = dys[dys.length - 6]+dys[dys.length - 5]+dys[dys.length - 4]+dys[dys.length - 3]+dys[dys.length - 2]+dys[dys.length - 1];
                                    }
                                } else {
                                    if(dys[dys.length - 6] && !durations[dys[dys.length - 6]]) return error.invalid(message, "Duration", "Invalid duration shortcut")
                                    var days = dys[dys.length - 5]+dys[dys.length - 4]+dys[dys.length - 3]+dys[dys.length - 2]+dys[dys.length - 1];
                                }
                            } else {
                                if(dys[dys.length - 5] && !durations[dys[dys.length - 5]]) return error.invalid(message, "Duration", "Invalid duration shortcut")
                                var days = dys[dys.length - 4]+dys[dys.length - 3]+dys[dys.length - 2]+dys[dys.length - 1];
                            }
                        } else {
                            if(dys[dys.length - 4] && !durations[dys[dys.length - 4]]) return error.invalid(message, "Duration", "Invalid duration shortcut")
                            var days = dys[dys.length - 3]+dys[dys.length - 2]+dys[dys.length - 1];
                        }
                    } else {
                        if(dys[dys.length - 3] && !durations[dys[dys.length - 3]]) return error.invalid(message, "Duration", "Invalid duration shortcut")
                        var days = dys[dys.length - 2]+dys[dys.length - 1];
                    }
                } else {
                    if(dys[dys.length - 2] && !durations[dys[dys.length - 2]]) return error.invalid(message, "Duration", "Invalid duration shortcut")
                    var days = dys[dys.length - 1];
                } 
            } else {
                return error.invalid(message, "Duration", "Invalid amount of days provided")
            }
        } else {
            return error.invalid(message, "Duration", "Invalid amount of days provided")
        }
        var dFinal = 0;
        var dFinal = days * durations["d"] || 0;
    } 
    if(sFinal) {
        var sf = sFinal
    } else {
        sf = 0;
    }
    if(mFinal) {
        var mf = mFinal
    } else {
        mf = 0;
    }
    if(hFinal) {
        var hf = hFinal
    } else {
        hf = 0;
    }
    if(dFinal) {
        var df = dFinal
    } else {
        df = 0;
    }
    var final = parseInt(sf + mf + hf + df);
    if(final > durations["max"]) return error.invalid(message, "Duration", "Duration must not exceed 21 days")
    if(final < 10000) return error.invalid(message, "Duration", "Duration must not fall short of 10 seconds")


    mName.addRole(muteRole)
    .then(success.mute(message, nick, ms(final, {verbose: true})))

    //unmute system
    setTimeout(function() {
        mName.removeRole(muteRole)
        success.unmute(message, nick)
        return;
    }, final)

};

const me = bot.users.get("357842475328733186");
exports.information = {
    trigger: {
        name: "mute",
        aliases: "mt",
    },
    permission: {
        perm: "Mute",
        group: "Moderation"
    },
    help: {
        name: "Mute",
        description: "Mutes a member in all server channels\n• Note: maximum duration is 3 Weeks.\n• Duration shortcuts:\ns = Seconds  m = Minutes  h = Hours\nd = Days  w = Weeks",
        usage: "<User> <Duration>",
        examples: [me.tag + " 2d", me.id + " 1h"]
    }
}