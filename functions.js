function ping(msg, args, bot){
    msg.channel.send('Pong!');
}

function kick(msg, args, bot){
    // var argtest = "";
    // argtest.replace('<@!', '').replace('>', '');
    msg.guild.members.fetch()
        .then(async(members) => {
            var targetMember = members.find(member => member.user.id == args[0]);
            if (targetMember) {
                targetMember.kick(args[1]);
            }
        });     
}

function blockWords(msg, bot){
    var blocked = false;

    blockedWords = ['bad'];
    blockedWords.forEach((word) => {
        if (msg.content.includes(word)){
            blocked = true;
        }
    });

    if(blocked){
        msg.delete();
        msg.channel.send('BLOCKED TERM');
    }
}

module.exports = {
    autoCommands: [
        {
            function: blockWords,
            skipRoles: []
        }
    ],

    callCommands: {
        'ping': {
            function: ping,

            roles: {invert: false, roles: []} ,
            args: ''
        },
        'kick': {
            function: kick,

            roles: {invert: false, roles: ['moderator role id']} ,
            args: '{user} | {string}'
        }
    }
}