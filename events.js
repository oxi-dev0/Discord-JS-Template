function deleted(msg, bot){
    var channel = bot.channels.cache.get('LOG CHANNEL ID');
    channel.send(`\`${msg.content}\` was deleted.`);
}

function updated(oldMsg, newMsg, bot){
    var channel = bot.channels.cache.get('LOG CHANNEL ID');
    channel.send(`\`${oldMsg.content}\` was edited to \`${newMsg.content}\`.`);
}

function left(member, bot){
    var channel = bot.channels.cache.get('LOG CHANNEL ID');
    channel.send(`\`${member.displayName}\` left.`);
}

module.exports = {
    eventCommands: {
        'messageDelete': deleted,
        'messageUpdate': updated,
        'guildMemberRemove': left
    }
}