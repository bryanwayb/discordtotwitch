const Twitch = require('./Twitch');
const Discord = require('./Discord');

const argv = require('yargs')
    .options({
        'verbose': {
            alias: 'v',
            type: 'boolean',
            description: 'Enable verbose logging',
            demandOption: false
        },
        'twitch-login': {
            type: 'string',
            description: 'Twitch user that will be used to send messages from',
            demandOption: true
        },
        'twitch-auth': {
            type: 'string',
            description: 'Twitch authentication token to login as the given user',
            demandOption: true
        },
        'twitch-channel': {
            type: 'string',
            description: 'Twitch channel to connect to for sending/receiving of messages',
            demandOption: true
        },
        'discord-channel-id': {
            type: 'string',
            description: 'Discord text channel ID to monitor for messages',
            demandOption: true
        },
        'discord-webhook-id': {
            type: 'string',
            description: 'Discord authentication channel Webhook ID to for sending messages',
            demandOption: true
        },
        'discord-webhook-token': {
            type: 'string',
            description: 'Discord Webhook token associated to the provided Webhook ID',
            demandOption: true
        },
        'discord-bot-token': {
            type: 'string',
            description: 'Discord bot authentication token',
            demandOption: true
        }
    })
    .argv;

const twitchLogin = argv['twitch-login'];
const twitchAuthentication = argv['twitch-auth'];
const twitchChannel = argv['twitch-channel'];
const discordChannelId = argv['discord-channel-id'];
const discordWebhookId = argv['discord-webhook-id'];
const discordWebhookToken = argv['discord-webhook-token'];
const discordBotToken = argv['discord-bot-token'];
const verbose = argv.v || argv.verbose;

function log(...args) {
    if(verbose) {
        console.log.apply(console, args);
    }
}

async function main() {
    let twitchClient = new Twitch(twitchLogin, twitchAuthentication, twitchChannel);
    let discordClient = new Discord(discordChannelId, discordWebhookId, discordWebhookToken, discordBotToken);

    log('Connecting to Twitch...');
    await twitchClient.connect();
    log('Connected!');

    log('Connecting to Discord...');
    await discordClient.connect();
    log('Connected!');

    discordClient.onMessage(async (username, message) => {
        log(`Received Discord message; username = "${username}"; message = "${message}"`);

        await twitchClient.sendMessage(username, message);
    });

    log('Listening to Twitch messages');
    twitchClient.onMessage(async (username, message) => {
        log(`Received Twitch message; username = "${username}"; message = "${message}"`);

        await discordClient.sendMessage(username, message);
    });
}

main();