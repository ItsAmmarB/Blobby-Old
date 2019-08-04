 
  sagiri = require('sagiri'),
  isImageUrl = require('is-image-url'),
  path = require('path'),
  notSupportedExts = new Set(['gif']),
  search = new sagiri(Config.SaucenaoAPIKey, {
    numRes: 1
  });

exports.run = (bot, msg, args) => {
  let getSauce = function(image) {
    search.getSauce(image).then(response => {
      let data = response[0];
      let results = {
        thumbnail: data.original.header.thumbnail,
        similarity: data.similarity,
        material: data.original.data.material || 'none',
        characters: data.original.data.characters || 'none',
        creator: data.original.data.creator || 'none',
        site: data.site,
        url: data.url
      };
      const minSimilarity = 30;
      if (minSimilarity <= ~~results.similarity) {
        msg.channel.send({
          embed: {
            'title': 'Image sauce',
            'image': {
              url: results.thumbnail
            },
            'fields': [{
              'name': 'Similarity',
              'value': `${results.similarity}%`
            },{
              'name': 'Original site',
              'value': `${results.site} - ${results.url}`
            }],
            'color': 0x417af4
          }
        });
      } else {
        error.invalid(message, "Image", "Image source cannot be found")
      }
    }).catch((error) => {
      console.error(error.message);
      error = error.toString();
      if (error.includes('You need an image') || error.includes('Supplied URL is not usable') || error.includes('Error: Got HTML response while expecting JSON')) {
        console.error('API Error!');
        error.invalid(message, "Image", "Image source cannot be found")
        return;
      }
    });
  };
  if (!msg.attachments.array()[0] && !args[0]) {
    help.helpMessage(message)
  } else if (msg.attachments.array()[0]) {
    if (isImageUrl(msg.attachments.array()[0].url) && !notSupportedExts.has(path.extname(msg.attachments.array()[0].url).slice(1).toLowerCase())) {
      getSauce(msg.attachments.array()[0].url);
    } else {
      error.invalid(message, "Image", "The file extention is not an image")
    }
  } else if (args[0]) {
    if (isImageUrl(args[0]) && !notSupportedExts.has(path.extname(args[0]).slice(1).toLowerCase())) {
      getSauce(args[0]);
    } else {
      error.invalid(message, "Image", "The file extention is not an image")

    }
  }
};

  const me = bot.users.get("357842475328733186");
exports.information = {
  trigger: {
    name: "image",
    aliases: "img",
  },
  permission: {
    perm: "Image",
    group: "Miscellaneous"
  },
  help: {
    name: "Image",
    description: "searches for a picture's or a git's source",
    usage: "<Message attachment>",
    examples: ["Attach a picture with the message", "Send a gif with the message"],
  }
}


