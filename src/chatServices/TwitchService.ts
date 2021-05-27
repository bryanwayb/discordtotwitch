import tmi from 'tmi.js';
import { Logger } from '../logger';
import config from '../config';
import { MessageHandler, MessageOptions, Service } from '../interfaces/Service';

const log = new Logger('TwitchService');

let ircClient: tmi.Client | null = null;
const icrClientChannels: Set<string> = new Set<string>();
async function getIRCClient(channel: string): Promise<tmi.Client> {
    log.trace(`Getting client with channel ${channel}`);
    if (!icrClientChannels.has(channel)) {
        log.trace(`Channel ${channel} is not in the current client, will disconnect and recreate`);
        icrClientChannels.add(channel);

        await ircClient?.disconnect();
        ircClient = null;
    }

    if (!ircClient) {
        const username = config.get('twitchbot__username');
        const password = config.get('twitchbot__password');

        log.trace(`Creating new client with username ${username} and password ${password}`);
        ircClient = new tmi.Client({
            options: { debug: false },
            connection: {
                reconnect: true,
                secure: true
            },
            identity: {
                username,
                password
            },
            channels: Array.from(icrClientChannels)
        });

        log.trace(`Connecting to Twitch IRC`);

        await ircClient.connect();

        log.info(`Connected to Twitch IRC`);
    }

    return ircClient;
}

export default class TwitchService implements Service {
    private channel: string;

    constructor(channel: string) {
        this.channel = channel;
    }

    private async getClient() {
        return await getIRCClient(this.channel);
    }

    async connect() {
        await this.getClient();
    }

    async disconnect() {
        const client = await getIRCClient(this.channel);
        await client.disconnect();
    }

    async onMessage(handler: MessageHandler) {
        log.info(`Starting to listen to messages from channel ${this.channel}`);

        this.getClient().then((client) => {
            client.on('message', async (channel, tags, message, self) => {
                if (!self) {
                    console.log(channel, tags, message, self);

                    await handler({
                        username: tags['display-name'] ? tags['display-name'] : '',
                        message
                    });
                }
            });
        });
    }

    async sendMessage(options: MessageOptions) {
        const client = await this.getClient();

        log.trace(`Sending message to channel ${this.channel}`);
        await client.say(this.channel, `<${options.username}> ${options.message}`);
    }
}