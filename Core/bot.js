const Discord = require('discord.js');

const Config = require('../Config/config');
const Events = require('../Config/events');
const Functions = require('../Config/functions');

const intents = new Discord.Intents(Config.GetIntents());
const bot = new Discord.Client({ intents:intents });

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);

    bot.user.setPresence(Config.presence);
});


bot.login(Config.GetToken());

Object.keys(Events.eventCommands).forEach(async (event) => {
    bot.on(event, (...args) => {
        Events.eventCommands[event](...[...args, bot]);
    });
});

bot.on('messageCreate', async (msg) => {
    if(msg.author.bot && Config.ignoreAllBots) { return; }
    if(msg.author == bot) { return; }

    Functions.autoCommands.forEach((command) => {
        var skip = false;
        command.skipRoles.forEach((skipRole) => {
            if(msg.member.roles.cache.some(role => role.id == skipRole)){
                skip = true;
            }
        });
        if (skip) { return; }

        command.function(msg, bot);
    });

    if(msg.content.startsWith(Config.prefix)){
        var parts = msg.content.split(" ");
        var key = parts[0].substring(1).toLowerCase();

        if(key in Functions.callCommands){
            var command = Functions.callCommands[key];

            var permitted = false;
            command.roles.roles.forEach((commandRole) => {
                if(msg.member.roles.cache.some(role => role.id == commandRole)){
                    permitted = true;
                }
            });
            if(command.roles.roles.length == 0){
                permitted = true;
            }
            if(command.roles.invert){
                permitted = !permitted;
            }

            if(!permitted){
                msg.reply(`You are not permitted to run that command.`);
                return;
            }

            var args = [];
            var argsExpected = command.args.split(" "); // ARGSTRING

            if(argsExpected == ''){
                command.function(...[msg, args, bot]);
                return;
            }

            var optional = false;
            var valid = true;
            var p = 1;
            for(var i = 0; i < argsExpected.length; i++){
                if(argsExpected[i] == '|') {optional = true; continue;}
                if(p >= parts.length){
                    if(optional){
                        break;
                    } else {
                        msg.reply(`${parts.length-1} arguments were passed. Expected \`${argsExpected.join(" ")}\``);
                        valid = false;
                        break;
                    }
                }

                var type = argsExpected[i].substring(1, argsExpected[i].length-1).toLowerCase();
                if(type == 'user') { 
                    if(parts[p].startsWith('<@')){
                        var usrId = parts[p].replace('<@', '').replace('>','').replace('!','');
                        args.push(usrId);
                    } else {
                        msg.reply(`Invalid argument in position ${p}. Expected type \`${type}\``);
                        valid = false;
                        break;
                    }
                }

                if(type == 'string'){
                    if(i == argsExpected.length-1){
                        args.push(parts.slice(p).join(' '));
                    } else {
                        args.push(parts[p]);
                    }
                }
                
                if(type == 'int'){
                    if(isNaN(parts[p])) {
                        msg.reply(`Invalid argument in position ${p}. Expected type \`${type}\``);
                    } else {
                        args.push(parseInt(parts[p]));
                    }
                }

                p++;
            }

            if(valid){
                command.function(...[msg, args, bot]);
            }

        } else {
            msg.reply('This command was not found.');
        }
    }
});