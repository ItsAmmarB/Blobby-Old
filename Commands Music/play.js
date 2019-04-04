module.exports.run = async (bot, message, args) => {
    const avatar = "https://xaqkww.am.files.1drv.com/y4mp6ACqMRPOSdfBsnFGz0O0JOsfl0zOS6CQdAAqEBr_UxFB_WFTYZdgpl2itKP5VRcTfs-v2z_l0g_5lVniYhVq_kWMHIqFqDlP_UmiwOLuTSQNa6mhtzSDB-aCZW1vpSBDjh2Gg51WiNhbZwyIH95C4HqhPU92X_R9AQaA660Fx7jedyqroqi0Xdhr3yt6z4rrlRFPrnmSlMXElGGjzOTSA?width=400&height=400&cropmode=none"
	const url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
    if(!args[0] && !args[1] && !args[2] && !args[3]) return help.helpMessage(message, "Play", "Plays the audio of a specified video", "[Song name \\ YouTube URL]", "MAX - Light Down Low", "https://www.youtube.com/watch?v=5-xVwxqjNyI")
    if(!message.member.voiceChannel) return error.invalid(message, "Play", "You must be in a voice channel first")
    if (message.member.voiceChannel || guilds[message.guild.id].voiceChannel != null) {
        if (guilds[message.guild.id].queue.length > 0 || guilds[message.guild.id].isPlaying === true) {
            if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
                try {
                var playlist = await youtube.getPlaylist(url);
                let videos = await playlist.getVideos();
                for (let video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id);
                await add_to_queue(video.id, message)
                await guilds[message.guild.id].queueNames.push(video.title)

                }
                } catch (err) {
                    error.error(message, "Error", "Playlist is private or some videos are private.\nQueue has been reset!")
                    guilds[message.guild.id].queueNames = [];
                    guilds[message.guild.id].queue = [];
                    message.member.voiceChannel.leave()
                    return;
                }
                return success.YTPlaylist(message, playlist, avatar);
            } else {
                getID(args, function(id) {
                    add_to_queue(id, message);
                    fetchVideoInfo(id, function(err, videoInfo) {
                        if (err) throw new Error(err);
                        success.mQueue(message, avatar, videoInfo.title, videoInfo.url, videoInfo.thumbnailUrl, ms(videoInfo.duration * 1000, {verbose: true}), videoInfo.owner);
                        guilds[message.guild.id].queueNames.push(videoInfo.title);
                    });
                });
            }
        } else {
            guilds[message.guild.id].isPlaying = true;
            if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
                try {
                var playlist = await youtube.getPlaylist(url);
                let videos = await playlist.getVideos();
                for (let video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id);
                await add_to_queue(video.id, message)
                await guilds[message.guild.id].queueNames.push(video.title)

                }
                } catch (err) {
                    error.error(message, "Error", "Playlist is private or some videos are private.\nQueue has been reset!")
                    guilds[message.guild.id].queueNames = [];
                    guilds[message.guild.id].queue = [];
                    message.member.voiceChannel.leave()
                    return;
                }
                success.YTPlaylist(message, playlist, avatar);
                let id = guilds[message.guild.id].queue[0]
                playMusic(id, message);

            } else {
                getID(args, function(id) {
                    guilds[message.guild.id].queue.push(id);
                    fetchVideoInfo(id, function(err, videoInfo) {
                        if (err => console.log(err));
                        success.mPlay(message, avatar, videoInfo.title, videoInfo.url, videoInfo.thumbnailUrl, ms(videoInfo.duration * 1000, {verbose: true}), videoInfo.owner);
                      });
                    playMusic(id, message);
                    fetchVideoInfo(id, function(err, videoInfo) {
                        if (err) throw new Error(err);
                        guilds[message.guild.id].queueNames.push(videoInfo.title);
                    });
                });
            }
        }
    } else {
        return error.invalid(message, "Play", "You must be in a voice channel first")
    }

}

  exports.information = {
      trigger: {
      name: "play",
      aliases: "p",
      },
      permission: {
      perm: "Play",
      group: "Member"
      },
      help: {
      name: "Play",
      description: "Plays an audio off of YourTube (Playlists supported)",
      usage: "<Key Word or URL>",
      examples: ["MAX - Light Down Low", "https://www.youtube.com/watch?v=5-xVwxqjNyI"]
      }
  }
  
