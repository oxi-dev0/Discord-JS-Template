const modRoleId = '977987741843324939';

// Auto Commands need (msg, bot)
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

// ------------------------------------------------

// Call Commands need (msg, args, bot)
function ping(msg, args, bot){
    msg.channel.send('Pong!');
}

// Call Commands need (msg, args, bot)
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

// Some example functions

module.exports = {
    // Ran on every message
    autoCommands: [
        {
            function: blockWords,   // JS Function
            skipRoles: []           // Skip messages by these roles
        }
    ],

    // Ran when someone sends message in server
    callCommands: {
        'ping': {                               // Lowercase command without prefix
            function: ping,                         // JS Function
            roles: {roles: [], invert: false},      // Only allow these roles to use the command (or invert so that these roles cannot use command)
            args: ''                                // ARGSTRING
        },
        'kick': {
            function: kick,
            roles: {roles: [modRoleId], invert: false},
            args: '{user} | {string}'
        }
    }
}