const mongoose = require("mongoose");

const MemberSchema = mongoose.Schema({
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
    }],
    privileges:[{
        _id: String,
        rank: String,
        permission: String,
        startedAt: String,
        EndsAt: String,
    }]
});
module.exports = mongoose.model("Member", MemberSchema)