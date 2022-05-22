module.exports = {
    prefix: '.',
    
    GetToken: function () {
        return 'DISCORD-TOKEN';
    },

    GetIntents: function () {
        return 98303; // All intents (https://discord-intents-calculator.vercel.app/)
    },

    presence: {
        status: 'online',
        activity: {
         name: 'Node JS',
         type: 'PLAYING',
        }
    }
};