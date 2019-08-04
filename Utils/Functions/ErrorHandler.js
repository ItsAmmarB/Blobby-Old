const colors = require("colors/safe")
const errRespond = new Discord.RichEmbed()
    .setColor("#d63431")
    .setTitle("Fatal Error")
    .setDescription(`An unexpected error occurred, Report has been sent to the developers!`);

module.exports.processErrorA = function processError() {
    process.on('unhandledRejection', (error, promise) => {
        console.log(colors.bold.red(`----------------------------[Error Caught]----------------------------`));
        console.log(colors.bold.red(`[Error Event Name]: unhandledRejection`));
        console.log(colors.bold.red(`[Error Type]: ${error.name}`));
        console.log(colors.bold.red(`[Error Message]: ${error.message}`));
        console.log(colors.bold.red(`[Error Stack]: ${error.stack}`));
        console.log(colors.bold.red(`----------------------------[Error Caught]----------------------------`));
        // if(!lastMessage) return;
        //     console.log(colors.bold.red(`----------------------------[Possible Cause]----------------------------`));
        //     console.log(colors.bold.red(`[Message ID]: ${lastMessage.id}`));
        //     console.log(colors.bold.red(`[Message Guild ID]: ${lastMessage.guild.id || "DM"}`));
        //     console.log(colors.bold.red(`[Message Channel ID]: ${lastMessage.channel.id}`));
        //     console.log(colors.bold.red(`[Message Author Username]: ${lastMessage.author.tag}`));
        //     console.log(colors.bold.red(`[Message Author ID]: ${lastMessage.author.id}`));
        //     console.log(colors.bold.red(`[Message Timestamp]: ${lastMessage.createdTimestamp}`));
        //     console.log(colors.bold.red(`[Message Content]: ${lastMessage.content}`));
        //     console.log(colors.bold.red(`----------------------------[Possible Cause]----------------------------`));
            //lastMessage.channel.send(errRespond)
    });
}
module.exports.processErrorB = function processError() {
    process.on('error', error => {
        console.log(colors.bold.red(`----------------------------[Error Caught]----------------------------`));
        console.log(colors.bold.red(`[Error Event Name]: error`));
        console.log(colors.bold.red(`[Error Type]: ${error.name}`));
        console.log(colors.bold.red(`[Error Message]: ${error.message}`));
        console.log(colors.bold.red(`[Error Stack]: ${error.stack}`));
        console.log(colors.bold.red(`----------------------------[Error Caught]----------------------------`));
        if(!lastMessage) return;
            console.log(colors.bold.red(`----------------------------[Possible Cause]----------------------------`));
            console.log(colors.bold.red(`[Message ID]: ${lastMessage.id}`));
            console.log(colors.bold.red(`[Message Guild ID]: ${lastMessage.guild.id || "DM"}`));
            console.log(colors.bold.red(`[Message Channel ID]: ${lastMessage.channel.id}`));
            console.log(colors.bold.red(`[Message Author Username]: ${lastMessage.author.tag}`));
            console.log(colors.bold.red(`[Message Author ID]: ${lastMessage.author.id}`));
            console.log(colors.bold.red(`[Message Timestamp]: ${lastMessage.createdTimestamp}`));
            console.log(colors.bold.red(`[Message Content]: ${lastMessage.content}`));
            console.log(colors.bold.red(`----------------------------[Possible Cause]----------------------------`));
            //lastMessage.channel.send(errRespond)
    });
}
module.exports.processException = function processError() {
    process.on('uncaughtException', (error) => {
        console.log(colors.bold.yellow(`----------------------------[Exception Caught]----------------------------`));
        console.log(colors.bold.yellow(`[Exception Event Name]: uncaughtException`));
        console.log(colors.bold.yellow(`[Exception Type]: ${error.name}`));
        console.log(colors.bold.yellow(`[Exception Message]: ${error.message}`));
        console.log(colors.bold.yellow(`[Exception Stack]: ${error.stack}`));
        console.log(colors.bold.yellow(`----------------------------[Exception Caught]----------------------------`));
    });
}
module.exports.processWarning = function processError() {
    process.on('warning', (error) => {
        console.log(colors.bold.yellow(`----------------------------[Warning Caught]----------------------------`));
        console.log(colors.bold.yellow(`[Warning Event Name]: Warning`));
        console.log(colors.bold.yellow(`[Warning Type]: ${error.name}`));
        console.log(colors.bold.yellow(`[Warning Message]: ${error.message}`));
        console.log(colors.bold.yellow(`[Warning Stack]: ${error.stack}`));
        console.log(colors.bold.yellow(`----------------------------[Warning Caught]----------------------------`));
        if(!lastMessage) return;
            console.log(colors.bold.red(`----------------------------[Possible Cause]----------------------------`));
            console.log(colors.bold.red(`[Message ID]: ${lastMessage.id}`));
            console.log(colors.bold.red(`[Message Guild ID]: ${lastMessage.guild.id || "DM"}`));
            console.log(colors.bold.red(`[Message Channel ID]: ${lastMessage.channel.id}`));
            console.log(colors.bold.red(`[Message Author Username]: ${lastMessage.author.tag}`));
            console.log(colors.bold.red(`[Message Author ID]: ${lastMessage.author.id}`));
            console.log(colors.bold.red(`[Message Timestamp]: ${lastMessage.createdTimestamp}`));
            console.log(colors.bold.red(`[Message Content]: ${lastMessage.content}`));
            console.log(colors.bold.red(`----------------------------[Possible Cause]----------------------------`));
            //lastMessage.channel.send(errRespond)
    });
}

module.exports.botError = function botError(error) {
    bot.on('error', err => {
        let error = err;
        console.log(colors.bold.red(`----------------------------[Error Caught]----------------------------`));
        console.log(colors.bold.red(`[Error Event Name]: error`));
        console.log(colors.bold.red(`[Error Type]: ${error.name}`));
        console.log(colors.bold.red(`[Error Message]: ${error.message}`));
        console.log(colors.bold.red(`[Error Stack]: ${error.stack}`));
        console.log(colors.bold.red(`----------------------------[Error Caught]----------------------------`));
        if(!lastMessage) return;
            console.log(colors.bold.red(`----------------------------[Possible Cause]----------------------------`));
            console.log(colors.bold.red(`[Message ID]: ${lastMessage.id}`));
            console.log(colors.bold.red(`[Message Guild ID]: ${lastMessage.guild.id || "DM"}`));
            console.log(colors.bold.red(`[Message Channel ID]: ${lastMessage.channel.id}`));
            console.log(colors.bold.red(`[Message Author Username]: ${lastMessage.author.tag}`));
            console.log(colors.bold.red(`[Message Author ID]: ${lastMessage.author.id}`));
            console.log(colors.bold.red(`[Message Timestamp]: ${lastMessage.createdTimestamp}`));
            console.log(colors.bold.red(`[Message Content]: ${lastMessage.content}`));
            console.log(colors.bold.red(`----------------------------[Possible Cause]----------------------------`));
            //lastMessage.channel.send(errRespond)
    });
}
module.exports.botWarning = function processError() {
    bot.on('warn', (warn) => {
        let warning = new warning(warn)

        console.log(colors.bold.yellow(`----------------------------[Warning Caught]----------------------------`));
        console.log(colors.bold.yellow(`[Warning Event Name]: Warning`));
        console.log(colors.bold.yellow(`[Warning Type]: ${warning.name}`));
        console.log(colors.bold.yellow(`[Warning Message]: ${warning.message}`));
        console.log(colors.bold.yellow(`[Warning Stack]: ${warning.stack}`));
        console.log(colors.bold.yellow(`----------------------------[Warning Caught]----------------------------`));
        if(!lastMessage) return;
            console.log(colors.bold.red(`----------------------------[Possible Cause]----------------------------`));
            console.log(colors.bold.red(`[Message ID]: ${lastMessage.id}`));
            console.log(colors.bold.red(`[Message Guild ID]: ${lastMessage.guild.id || "DM"}`));
            console.log(colors.bold.red(`[Message Channel ID]: ${lastMessage.channel.id}`));
            console.log(colors.bold.red(`[Message Author Username]: ${lastMessage.author.tag}`));
            console.log(colors.bold.red(`[Message Author ID]: ${lastMessage.author.id}`));
            console.log(colors.bold.red(`[Message Timestamp]: ${lastMessage.createdTimestamp}`));
            console.log(colors.bold.red(`[Message Content]: ${lastMessage.content}`));
            console.log(colors.bold.red(`----------------------------[Possible Cause]----------------------------`));
            //lastMessage.channel.send(errRespond)
    });
}
