module.exports.run = async (bot, message, args) => {
  if(!permCheck(message)) return error.noPerms(message, cmdInfo.permission.group + "." + cmdInfo.permission.perm)

  const msgdel = args[0];

  if(!msgdel) return help.helpMessage(message);

  if(msgdel >= 1 & msgdel <= 100) {
    try {
      await message.channel.fetchMessages()
            .then(async (messages) => {
              message.channel.bulkDelete(msgdel);
              success.clean(message, msgdel + " Messages");
              return;
            });
      } catch(e) {
        let cErr = e.toString().split(":").slice(1)
        error.fetal(message, cErr)
      }
  };

  if(msgdel > 100 & msgdel <= 200) {
    let msgs = msgdel - 100;
    try {
      await message.channel.fetchMessages()
            .then(async (messages) => {
              await message.channel.bulkDelete(100);
              await message.channel.bulkDelete(msgs);
              await success.clean(message, msgdel + " Messages");
                return;
                await success.clean(message, msgdel + " Messages");
              return;
            });
      } catch(e) {
        let cErr = e.toString().split(":").slice(1)
        error.fetal(message, cErr)
      }
  };

  if(msgdel > 200 & msgdel <= 300) {
    let msgs = msgdel - 200;
    await message.channel.fetchMessages()
          .then(async (messages) => {
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(msgs);
            await success.clean(message, msgdel + " Messages");
            return;
          });
  };

  if(msgdel > 300 & msgdel <= 400) {
    try {
      let msgs = msgdel - 300;
      await message.channel.fetchMessages()
            .then(async (messages) => {
              await message.channel.bulkDelete(100);
              await message.channel.bulkDelete(100);
              await message.channel.bulkDelete(100);
              await message.channel.bulkDelete(msgs);
              await success.clean(message, msgdel + " Messages");
              return;
            });
    } catch(e) {
      let cErr = e.toString().split(":").slice(1)
      error.fetal(message, cErr)
    }
  };

  if(msgdel > 400 & msgdel <= 500) {
    try {
      let msgs = msgdel - 400;
      await message.channel.fetchMessages()
            .then(async (messages) => {
              await message.channel.bulkDelete(100);
              await message.channel.bulkDelete(100);
              await message.channel.bulkDelete(100);
              await message.channel.bulkDelete(100);
              await message.channel.bulkDelete(msgs);
              await success.clean(message, msgdel + " Messages");
              return;
            });
    } catch(e) {
      let cErr = e.toString().split(":").slice(1)
      error.fetal(message, cErr)
    }
  };

  if(msgdel > 500 & msgdel <= 600) {
    try {
      let msgs = msgdel - 500;
      await message.channel.fetchMessages()
            .then(async (messages) => {
              await message.channel.bulkDelete(100);
              await message.channel.bulkDelete(100);
              await message.channel.bulkDelete(100);
              await message.channel.bulkDelete(100);
              await message.channel.bulkDelete(100);
              await message.channel.bulkDelete(msgs);
              await success.clean(message, msgdel + " Messages");
              return;
            });
    } catch(e) {
      let cErr = e.toString().split(":").slice(1)
      error.fetal(message, cErr)
    }
  };

  if(msgdel > 600 & msgdel <= 700) {
    let msgs = msgdel - 600;
    await message.channel.fetchMessages()
          .then(async (messages) => {
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(msgs);
            await success.clean(message, msgdel + " Messages");
            return;
          });
  };

  if(msgdel > 700 & msgdel <= 800) {
    try {
      let msgs = msgdel - 700;
      await message.channel.fetchMessages()
            .then(async (messages) => {
              await message.channel.bulkDelete(100);
              await message.channel.bulkDelete(100);
              await message.channel.bulkDelete(100);
              await message.channel.bulkDelete(100);
              await message.channel.bulkDelete(100);
              await message.channel.bulkDelete(100);
              await message.channel.bulkDelete(100);
              await message.channel.bulkDelete(msgs);
              await success.clean(message, msgdel + " Messages");
              return;
            });
    } catch(e) {
      let cErr = e.toString().split(":").slice(1)
      error.fetal(message, cErr)
    }
  };

  if(msgdel > 800 & msgdel <= 900) {
    try {
      let msgs = msgdel - 800;
      await message.channel.fetchMessages()
            .then(async (messages) => {
              await message.channel.bulkDelete(100);
              await message.channel.bulkDelete(100);
              await message.channel.bulkDelete(100);
              await message.channel.bulkDelete(100);
              await message.channel.bulkDelete(100);
              await message.channel.bulkDelete(100);
              await message.channel.bulkDelete(100);
              await message.channel.bulkDelete(100);
              await message.channel.bulkDelete(msgs);
              await success.clean(message, msgdel + " Messages");
              return;
            });
    } catch(e) {
      let cErr = e.toString().split(":").slice(1)
      error.fetal(message, cErr)
    }
  };

  if(msgdel > 900 & msgdel <= 1000) {
    try {
      let msgs = msgdel - 900;
      await message.channel.fetchMessages()
            .then(async (messages) => {
              await message.channel.bulkDelete(100);
              await message.channel.bulkDelete(100);
              await message.channel.bulkDelete(100);
              await message.channel.bulkDelete(100);
              await message.channel.bulkDelete(100);
              await message.channel.bulkDelete(100);
              await message.channel.bulkDelete(100);
              await message.channel.bulkDelete(100);
              await message.channel.bulkDelete(100);
              await message.channel.bulkDelete(msgs);
              await success.clean(message, msgdel + " Messages");
              return;
            });
    } catch(e) {
      let cErr = e.toString().split(":").slice(1)
      error.fetal(message, cErr)
    }
  };

  if(msgdel < 1) {
    try {
    await message.channel.fetchMessages()
          .then(async (messages) => {
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100);
            await success.cleared(message, "All Chat")
            return;
      });
    } catch(e) {
      let cErr = e.toString().split(":").slice(1)
      error.fetal(message, cErr)
    }

  };
}

exports.information = {
  trigger: {
    name: "clean",
    aliases: "c",
  },
  permission: {
    perm: "Clean",
    group: "Admin"
  },
  help: {
    name: "Clean",
    description: "Cleans a specified number of mssages at of maximum 1000 messages",
    usage: "<Number of Messages>",
    examples: ["999" + "3"]
  }
}
