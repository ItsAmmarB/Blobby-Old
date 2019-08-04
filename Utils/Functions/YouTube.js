module.exports.skip_song = function skip_song(message) {
    guilds[message.guild.id].dispatcher.end();
}

module.exports.playMusic = function playMusic(id, message) {
  guilds[message.guild.id].voiceChannel = message.member.voiceChannel;
  guilds[message.guild.id].voiceChannel.join().then(function(connection) {
    stream = ytdl("https://www.youtube.com/watch?v=" + id, {
        filter: 'audioonly',
        quality: 'highestaudio'
    });
    guilds[message.guild.id].skispReq = 0;
    guilds[message.guild.id].skippers = [];
    guilds[message.guild.id].dispatcher = connection.playStream(stream);
    message.guild.voiceConnection.dispatcher.setVolumeLogarithmic(guilds[message.guild.id].volume / 9)
    guilds[message.guild.id].dispatcher.on('end', function() {
      guilds[message.guild.id].skipReq = 0;
      guilds[message.guild.id].skippers = [];
      if(guilds[message.guild.id].loop === 2) {
        guilds[message.guild.id].queue.push(guilds[message.guild.id].queue[0]);
        guilds[message.guild.id].queueNames.push(guilds[message.guild.id].queueNames[0]);
        guilds[message.guild.id].queue.shift()
        guilds[message.guild.id].queueNames.shift()
        setTimeout(function() {
          playMusic(guilds[message.guild.id].queue[0], message);
        }, 500);
      } 
      else if(guilds[message.guild.id].loop === 1) {
        setTimeout(function() {
          playMusic(guilds[message.guild.id].queue[0], message);
        }, 500);
      }
      else if(guilds[message.guild.id].loop === 0) {
        guilds[message.guild.id].queue.shift()
        guilds[message.guild.id].queueNames.shift()
        
        if (guilds[message.guild.id].queue.length === 0) {
            guilds[message.guild.id].queue = [];
            guilds[message.guild.id].queueNames = [];
            guilds[message.guild.id].isPlaying = false;
            message.member.voiceChannel.leave()

        } else {
          setTimeout(function() {
              playMusic(guilds[message.guild.id].queue[0], message);
          }, 500);
        }
      }
    });
  });
}   



module.exports.add_to_queue = function add_to_queue(strID, message) {
    if (isYoutube(strID)) {
        guilds[message.guild.id].queue.push(getYoutubeID(strID));
    } else {
        guilds[message.guild.id].queue.push(strID);
    }
}

module.exports.getID = function getID(str, cb) {
    if (isYoutube(str)) {
        cb(getYoutubeID(str));
    } else {
        search_video(str, function(id) {
            cb(id);
        });
    }
}

module.exports.search_video = function search_video(query, callback) {
    request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + Config.YouTube_API_Key, function(error, response, body) {
        var json = JSON.parse(body);
        if (!json.items[0]) callback("3_-a9nVZYjk");
        else {
            callback(json.items[0].id.videoId);
        }
    });
}

module.exports.isYoutube = function isYoutube(str) {
    return str.toString().toLowerCase().indexOf("youtube.com") > -1;
}