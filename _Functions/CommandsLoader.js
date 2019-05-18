const colors = require("colors/safe");

module.exports.Settings = async (path) => {
    await fs.readdir(path, (err, files) => {
        if(err) console.error(err);
    
        let jsFiles = files.filter(f => f.split(".").pop() === "js");
        if(jsFiles.length <= 0) {
          console.log(colors.magenta("==> No setup Settings to load!"));
          return;
        }
        console.log(colors.magenta(`==> loading ${jsFiles.length} Settings commands!`))
        jsFiles.forEach((f, i) => {
          let props = require(`.${path}/${f}`);
          console.log(colors.cyan(`${i + 1}: ${f} loaded!`))
          bot.allCommands.set(props.information.trigger.name, props);
          bot.settingsCommands.set(props.information.trigger.name, props);
          bot.settingsAliases.set(props.information.trigger.aliases, props);
        });
      });
}

module.exports.Music = async (path) => {
    await fs.readdir(path, (err, files) => {
        if(err) console.error(err);
    
        let jsFiles = files.filter(f => f.split(".").pop() === "js");
        if(jsFiles.length <= 0) {
          console.log(colors.magenta("==> No music commands to load!"));
          return;
        }
        console.log(colors.magenta(`==> loading ${jsFiles.length} music commands!`))
    
        jsFiles.forEach((f, i) => {
          let props = require(`.${path}/${f}`);
          console.log(colors.cyan(`${i + 1}: ${f} loaded!`))
          bot.allCommands.set(props.information.trigger.name, props);
          bot.musicCommands.set(props.information.trigger.name, props);
          bot.musicAliases.set(props.information.trigger.aliases, props);
        });
      });
}

module.exports.Moderation = async (path) => {
    await fs.readdir(path, (err, files) => {
        if(err) console.error(err);
    
        let jsFiles = files.filter(f => f.split(".").pop() === "js");
        if(jsFiles.length <= 0) {
          console.log(colors.magenta("==> No moderation commands to load!"));
          return;
        }
        console.log(colors.magenta(`==> loading ${jsFiles.length} moderation commands!`))
    
        jsFiles.forEach((f, i) => {
          let props = require(`.${path}/${f}`);
          console.log(colors.cyan(`${i + 1}: ${f} loaded!`))
          bot.allCommands.set(props.information.trigger.name, props);
          bot.moderationCommands.set(props.information.trigger.name, props);
          bot.moderationAliases.set(props.information.trigger.aliases, props);
        });
      });
}

module.exports.Miscellaneous = async (path) => {
    await fs.readdir(path, (err, files) => {
        if(err) console.error(err);
    
        let jsFiles = files.filter(f => f.split(".").pop() === "js");
        if(jsFiles.length <= 0) {
          console.log(colors.magenta("==> No miscellaneous commands to load!"));
          return;
        }
        console.log(colors.magenta(`==> loading ${jsFiles.length} miscellaneous commands!`))
    
        jsFiles.forEach((f, i) => {
          let props = require(`.${path}/${f}`);
          console.log(colors.cyan(`${i + 1}: ${f} loaded!`))
          bot.allCommands.set(props.information.trigger.name, props);
          bot.miscellaneousCommands.set(props.information.trigger.name, props);
          bot.miscellaneousAliases.set(props.information.trigger.aliases, props);
        });
      });
}

module.exports.Development = async (path) => {
    await fs.readdir(path, (err, files) => {
        if(err) console.error(err);
        let jsFiles = files.filter(f => f.split(".").pop() === "js");
        if(jsFiles.length <= 0) {
          console.log(colors.magenta("==> No development commands to load!"));
          return;
        }
        console.log(colors.magenta(`==> loading ${jsFiles.length} development commands!`))
    
        jsFiles.forEach((f, i) => {
          let props = require(`.${path}/${f}`);
          console.log(colors.cyan(`${i + 1}: ${f} loaded!`))
          bot.devCommands.set(props.information.trigger.name, props);
          bot.devAliases.set(props.information.trigger.aliases, props);
        });
      });
}

module.exports.Testing = async (path) => {
  await fs.readdir(path, (err, files) => {
      if(err) console.error(err);
      let jsFiles = files.filter(f => f.split(".").pop() === "js");
      if(jsFiles.length <= 0) {
        console.log(colors.magenta("==> No Testing commands to load!"));
        return;
      }
      console.log(colors.magenta(`==> loading ${jsFiles.length} testing commands!`))
  
      jsFiles.forEach((f, i) => {
        let props = require(`.${path}/${f}`);
        console.log(colors.cyan(`${i + 1}: ${f} loaded!`))
        bot.testCommands.set(props.information.trigger.name, props);
        bot.testAliases.set(props.information.trigger.aliases, props);
      });
    });
}

module.exports.Utility = async (path) => {
  await fs.readdir(path, (err, files) => {
      if(err) console.error(err);
      let jsFiles = files.filter(f => f.split(".").pop() === "js");
      if(jsFiles.length <= 0) {
        console.log(colors.magenta("==> No Utility commands to load!"));
        return;
      }
      console.log(colors.magenta(`==> loading ${jsFiles.length} Utility commands!`))
  
      jsFiles.forEach((f, i) => {
        let props = require(`.${path}/${f}`);
        console.log(colors.cyan(`${i + 1}: ${f} loaded!`))
        bot.allCommands.set(props.information.trigger.name, props);
        bot.utilityCommands.set(props.information.trigger.name, props);
        bot.utilityAliases.set(props.information.trigger.aliases, props);
      });
    });
}

module.exports.Games = async (path) => {
  await fs.readdir(path, (err, files) => {
      if(err) console.error(err);
      let jsFiles = files.filter(f => f.split(".").pop() === "js");
      if(jsFiles.length <= 0) {
        console.log(colors.magenta("==> No Games commands to load!"));
        return;
      }
      console.log(colors.magenta(`==> loading ${jsFiles.length} Games commands!`))
  
      jsFiles.forEach((f, i) => {
        let props = require(`.${path}/${f}`);
        console.log(colors.cyan(`${i + 1}: ${f} loaded!`))
        bot.allCommands.set(props.information.trigger.name, props);
        bot.gamesCommands.set(props.information.trigger.name, props);
        bot.gamesAliases.set(props.information.trigger.aliases, props);
      });
    });
}

module.exports.Information = async (path) => {
  await fs.readdir(path, (err, files) => {
      if(err) console.error(err);
      let jsFiles = files.filter(f => f.split(".").pop() === "js");
      if(jsFiles.length <= 0) {
        console.log(colors.magenta("==> No Information commands to load!"));
        return;
      }
      console.log(colors.magenta(`==> loading ${jsFiles.length} Information commands!`))
  
      jsFiles.forEach((f, i) => {
        let props = require(`.${path}/${f}`);
        console.log(colors.cyan(`${i + 1}: ${f} loaded!`))
        bot.allCommands.set(props.information.trigger.name, props);
        bot.informationCommands.set(props.information.trigger.name, props);
        bot.informationAliases.set(props.information.trigger.aliases, props);
      });
    });
}