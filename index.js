const {Client, GatewayIntentBits, Partials, Collection} =  require('discord.js');

const config = require('./config.json')

const {loadEvents} = require('./Handlers/eventHandler');
const { loadCommands } = require('./Handlers/commandHandler');
const {loadPCommands} = require('./Handlers/prefixCommandHandler');

const client = new Client({
    intents:[Object.keys(GatewayIntentBits)],
    partials: [Object.keys(Partials)]
})


client.on('messageCreate',async message => {
    if(message.content == 'san moy'){
        message.reply({content: 'Que paso chapulin'});
    }
})

client.commands = new Collection();
client.pcommands = new Collection();


client.login(config.token).then(() => {
    loadEvents(client);
    loadCommands(client);
    loadPCommands(client);
})