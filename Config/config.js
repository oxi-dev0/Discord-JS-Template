module.exports = {
    prefix: '!',                   // Command prefix
    ignoreAllBots: true,           // Ignore messages from all bots, or just itself

    GetToken: function () {
        return 'DISCORD-TOKEN';   // Discord bot token (https://discord.com/developers/applications/)
    },

    GetIntents: function () {
        return 98303;            // Bot Intents (https://discord-intents-calculator.vercel.app/)
    },

    presence: {                 // Bot Status (https://discord.js.org/#/docs/discord.js/stable/typedef/PresenceData)
        status: 'online',
        activities: [{
         name: 'Node JS Template',
         type: 'PLAYING',
        }]
    }
};