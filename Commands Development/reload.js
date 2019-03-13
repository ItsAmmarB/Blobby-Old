module.exports.run = async (bot, message, args) => {
    if(!Dev[message.member.id] && !Own[message.member.id] && message.author.id !== "357842475328733186") return;
    let fName = args[0]
    if(!fName) return help.helpMessage(message, "Reload", "Reloads a command or all commands", "[Command Name \\ All]", "All", "Role")
    if(fName.toUpperCase() !== "ALL") {
        try {
            delete require.cache[require.resolve(`../CMDS-Bot/${fName}.js`)]
            await fs.readdir("../CMDS-Bot", (err, files) => {
                  let props = require(`../CMDS-Bot/${fName}.js`);
                  bot.ConfigCommands.set(props.help.name, props);
              })
              success.reloaded(message, fName)
        } catch (e) {
            try {
                delete require.cache[require.resolve(`../CMDS-Misc/${fName}.js`)]
                await fs.readdir("../CMDS-Misc", (err, files) => {
                      let props = require(`../CMDS-Misc/${fName}.js`);
                      bot.commands.set(props.help.name, props);
                      bot.aliases.set(props.help.aliases, props);
                  })
                  success.reloaded(message, fName)
            } catch(e) {
                try {
                    delete require.cache[require.resolve(`../CMDS-Moderation/${fName}.js`)]
                    await fs.readdir("../CMDS-Moderation", (err, files) => {
                          let props = require(`../CMDS-Moderation/${fName}.js`);
                          bot.commands.set(props.help.name, props);
                          bot.aliases.set(props.help.aliases, props);
                      })
                      success.reloaded(message, fName)
                } catch (e) { 
                    try {
                        delete require.cache[require.resolve(`../CMDS-Music/${fName}.js`)]
                        await fs.readdir("../CMDS-Music", (err, files) => {
                              let props = require(`../CMDS-Music/${fName}.js`);
                              bot.commands.set(props.help.name, props);
                              bot.aliases.set(props.help.aliases, props);
                          })
                          success.reloaded(message, fName)
                    } catch(e) {
                        try {
                            delete require.cache[require.resolve(`../CMDS-Setup/${fName}.js`)]
                            await fs.readdir("../CMDS-Setup", (err, files) => {
                                  let props = require(`../CMDS-Setup/${fName}.js`);
                                  bot.commands.set(props.help.name, props);
                                  bot.aliases.set(props.help.aliases, props);
                              })
                              success.reloaded(message, fName)
                        } catch(e) {
                            try {
                                delete require.cache[require.resolve(`../utilities/${fName}.js`)]
                                await fs.readdir("../utilities", (err, files) => {
                                      let props = require(`../utilities/${fName}.js`);
                                  })
                                  success.reloaded(message, fName)
                            } catch(e) {
                                error.invalid(message, fName, "File cannot be found")
                            }
                        }
                    }
                }
            }
        }
        console.log(fName + " Has been reloaded!")
    } 
    else if(fName.toUpperCase() === "ALL") {
        await fs.readdir("./CMDS-Bot", (err, files) => {
            files.forEach(f => {
                delete require.cache[require.resolve(`../CMDS-Bot/${f}`)]
                let props = require(`../CMDS-Bot/${f}`);
                bot.ConfigCommands.set(props.help.name, props);
            });
        });
        await fs.readdir("./CMDS-Misc", (err, files) => {
            files.forEach(f => {
                delete require.cache[require.resolve(`../CMDS-Misc/${f}`)]
                let props = require(`../CMDS-Misc/${f}`);
                bot.commands.set(props.help.name, props);
                bot.aliases.set(props.help.aliases, props);
            });
        });
        await fs.readdir("./CMDS-Moderation", (err, files) => {
            files.forEach(f => {
                delete require.cache[require.resolve(`../CMDS-Moderation/${f}`)]
                let props = require(`../CMDS-Moderation/${f}`);
                bot.commands.set(props.help.name, props);
                bot.aliases.set(props.help.aliases, props);            
            });
        });
        await fs.readdir("./CMDS-Music", (err, files) => {
            files.forEach(f => {
                delete require.cache[require.resolve(`../CMDS-Music/${f}`)]
                let props = require(`../CMDS-Music/${f}`);
                bot.commands.set(props.help.name, props);
                bot.aliases.set(props.help.aliases, props);            
            });
        });
        await fs.readdir("./CMDS-Setup", (err, files) => {
            files.forEach(f => {
                delete require.cache[require.resolve(`../CMDS-Setup/${f}`)]
                let props = require(`../CMDS-Setup/${f}`);
                bot.commands.set(props.help.name, props);
                bot.aliases.set(props.help.aliases, props);            
            });
        });
        await fs.readdir("./utilities", (err, files) => {
            files.forEach(f => {
                delete require.cache[require.resolve(`../utilities/${f}`)]
                let props = require(`../utilities/${f}`);
            });
        });
        console.log("All files has been reloaded")
        success.reloaded(message, "Every")
    }
}

module.exports.help = {
    name: "reload",
    hName: "Reload",
    Description: "Reloads a command or all commands",
    usage: "[Command Name] \n**Note:** Command can only be use by the developers and owners!",
    permission: "developer.reload"
}
