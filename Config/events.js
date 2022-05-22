const logId = '901140101097193553';

function deleted(msg, bot){
    var channel = bot.channels.cache.get(logId);
    channel.send(`\`${msg.content}\` was deleted.`);
}

// All variables that the event will give, along with a 'bot' parameter
function updated(oldMsg, newMsg, bot){
    var channel = bot.channels.cache.get(logId);
    channel.send(`\`${oldMsg.content}\` was edited to \`${newMsg.content}\`.`);
}

function left(member, bot){
    var channel = bot.channels.cache.get(logId);
    channel.send(`\`${member.displayName}\` left.`);
}

// Some example event functions

module.exports = {
    eventCommands: {
        // [Discord Event Name]: [JS Function]

        'messageDelete': deleted,
        'messageUpdate': updated,
        'guildMemberRemove': left
    }
}