const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
    _id: String,
    guildInfo: {
        guildID: String,
        position: String,
        guildCreatedAtTimestamp: String,

    },
    guildSettings: {
        prefix: String,
        djRole: Object,
        logsSystem: Object,
        xpSystem: Object,
        cashSystem: Object,
        automodSysten: Object,
        permissionsMap:{
            users: Object,
            roles: Object,
        }
    }

});
module.exports = mongoose.model("Guild", guildSchema)