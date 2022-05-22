const Discord = require('discord.js');

const Config = require('../config');
const Events = require('../events');
const Functions = require('../functions');

const intents = new Discord.Intents(Config.GetIntents());
const bot = new Discord.Client({ intents:intents, presence:Config.presence });

bot.login(Config.GetToken());

Object.keys(Events.eventCommands).forEach(async (event) => {
    bot.on(event, (...args) => {
        Events.eventCommands[event]([args, bot]);
    });
});

bot.on('messageCreate', async (msg) => {
    Functions.autoCommands.forEach((command) => {
        var skip = false;
        command.skipRoles.forEach((skipRole) => {
            if(msg.member.roles.find(role => role.id == skipRole)){
                skip = true;
            }
        })
        if (skip) { return; }

        command.function(msg, bot);
    });

    if(msg.content.startsWith(Config.prefix)){
        var parts = msg.content.split(" ");
        var key = parts[0].substring(1);

        if(key in Functions.callCommands){
            var command = Functions.callCommands[key];

            var args = [];
            var argsExpected = command.args.split(" "); // {user} | {string}

            var optional = false;
            var valid = true;
            var p = 1;
            for(var i = 0; i < argsExpected.length; i++){
                if(argsExpected[i] == '|') {optional = true; continue;}
                if(p >= parts.length){
                    if(optional){
                        break;
                    } else {
                        msg.reply(`Too little arguments were passed. Expected \`${argsExpected.join(" ")}\``);
                        valid = false;
                        break;
                    }
                }

                var type = argsExpected[i].substring(1, argsExpected[i].length-1).toLowerCase();
                if(type == 'user') { 
                    if(parts[p].startsWith('<@!')){
                        var usrId = parts[p].replace('<@!', '').replace('>','');
                        args.push(usrId);
                    } else {
                        msg.reply(`Invalid argument in position ${p}. Expected type of ${type}`);
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