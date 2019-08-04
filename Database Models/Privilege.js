const mongoose = require("mongoose");

const privSchema = mongoose.Schema({
    _id: String,
    userInfo: {
        userID: String,
        createdAtTimestamp: String
    },
    privileges:[{
        _id: String,
        rank: String,
        permissions: Array,
        startedAt: String,
        EndsAt: String,
        timestamp: String,
        grantedByID: String
    }]
});
module.exports = mongoose.model("Privilege", privSchema)