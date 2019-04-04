module.exports.Setup = async (path) => {
    await fs.readdir(path, (err, files) => {
        if(err) console.error(err);
    
        let jsFiles = files.filter(f => f.split(".").pop() === "js");
        if(jsFiles.length <= 0) {
          console.log("==> No setup commands to load!");
          return;
        }
        console.log(`==> loading ${jsFiles.length} setup commands!`)
        jsFiles.forEach((f, i) => {
          let props = require(`.${path}/${f}`);
          console.log(`${i + 1}: ${f} loaded!`)
          bot.norCommands.set(props.information.trigger.name, props);
          bot.norAliases.set(props.information.trigger.aliases, props);
        });
      });
}

module.exports.Music = async (path) => {
    await fs.readdir(path, (err, files) => {
        if(err) console.error(err);
    
        let jsFiles = files.filter(f => f.split(".").pop() === "js");
        if(jsFiles.length <= 0) {
          console.log("==> No music commands to load!");
          return;
        }
        console.log(`==> loading ${jsFiles.length} music commands!`)
    
        jsFiles.forEach((f, i) => {
          let props = require(`.${path}/${f}`);
          console.log(`${i + 1}: ${f} loaded!`)
          bot.norCommands.set(props.information.trigger.name, props);
          bot.norAliases.set(props.information.trigger.aliases, props);
        });
      });
}

module.exports.Moderation = async (path) => {
    await fs.readdir(path, (err, files) => {
        if(err) console.error(err);
    
        let jsFiles = files.filter(f => f.split(".").pop() === "js");
        if(jsFiles.length <= 0) {
          console.log("==> No moderation commands to load!");
          return;
        }
        console.log(`==> loading ${jsFiles.length} moderation commands!`)
    
        jsFiles.forEach((f, i) => {
          let props = require(`.${path}/${f}`);
          console.log(`${i + 1}: ${f} loaded!`)
          bot.norCommands.set(props.information.trigger.name, props);
          bot.norAliases.set(props.information.trigger.aliases, props);
        });
      });
}

module.exports.Miscellaneous = async (path) => {
    await fs.readdir(path, (err, files) => {
        if(err) console.error(err);
    
        let jsFiles = files.filter(f => f.split(".").pop() === "js");
        if(jsFiles.length <= 0) {
          console.log("==> No miscellaneous commands to load!");
          return;
        }
        console.log(`==> loading ${jsFiles.length} miscellaneous commands!`)
    
        jsFiles.forEach((f, i) => {
          let props = require(`.${path}/${f}`);
          console.log(`${i + 1}: ${f} loaded!`)
          bot.norCommands.set(props.information.trigger.name, props);
          bot.norAliases.set(props.information.trigger.aliases, props);
        });
      });
}

module.exports.Development = async (path) => {
    await fs.readdir(path, (err, files) => {
        if(err) console.error(err);
        let jsFiles = files.filter(f => f.split(".").pop() === "js");
        if(jsFiles.length <= 0) {
          console.log("==> No development commands to load!");
          return;
        }
        console.log(`==> loading ${jsFiles.length} development commands!`)
    
        jsFiles.forEach((f, i) => {
          let props = require(`.${path}/${f}`);
          console.log(`${i + 1}: ${f} loaded!`)
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
        console.log("==> No Testing commands to load!");
        return;
      }
      console.log(`==> loading ${jsFiles.length} testing commands!`)
  
      jsFiles.forEach((f, i) => {
        let props = require(`.${path}/${f}`);
        console.log(`${i + 1}: ${f} loaded!`)
        bot.testCommands.set(props.information.trigger.name, props);
        bot.testAliases.set(props.information.trigger.aliases, props);
      });
    });
}