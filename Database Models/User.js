const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: String,
    userInfo: {
        userID: String,
        createdAtTimestamp: String
    },
    guilds:[{
        _id: String,
        guildID: String,
        position: String,
        currency:{
            xp: String,
            cash: String,
        },
        infractions: Array
    }],
    patron:[{
        _id: String,
        startedAt: String,
        EndsAt: String,
    }]
});
module.exports = mongoose.model("User", userSchema)

