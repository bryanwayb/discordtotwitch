import Discord, { TextChannel } from 'discord.js';
import { Service, MessageHandler, MessageOptions } from '../interfaces/Service';
import { Logger, LogLevel } from '../logger';
import config from '../config';

const logger = new Logger('DiscordService');

const discordClient: Promise<Discord.Client> = (async () => {
    const client = new Discord.Client();

    const botToken = config.get('discord__bottoken');
    logger.log(LogLevel.Trace, `DiscordClient using bot token: ${botToken}`);

    logger.log(LogLevel.Info, 'Connecting to Discord...');
    await client.login(botToken);
    logger.log(LogLevel.Info, 'Connected successfully to Discord');

    return client;
})();

export default class DiscordService implements Service {
    private channelId: string;

    constructor(channelId: string) {
        this.channelId = channelId;
    }

    async connect() {
        await discordClient;
    }

    async disconnect() {
        const client = await discordClient;
        await client.destroy();
    }

    private async getChannel(): Promise<TextChannel> {
        const client = await discordClient;

        logger.log(LogLevel.Trace, `Getting channel for channelId ${this.channelId}`);
        const channel = client.channels.get(this.channelId);

        if (!channel) {
            throw new Error(`No channel found for the provided channelId ${this.channelId}`);
        }

        if (channel.type !== 'text') {
            throw new Error(`Provided channelId ${this.channelId} is not a text channel, channel type = ${channel.type}`);
        }

        return channel as TextChannel;
    }

    async onMessage(handler: MessageHandler) {
        logger.log(LogLevel.Info, `Starting to listen to messages from channelId ${this.channelId}`);

        const channel = await this.getChannel();
        const collector = channel.createMessageCollector(() => true);

        collector.on('collect', (message) => {
            if (!message.author.bot) {
                handler({
                    username: `${message.author.username}#${message.author.discriminator}`,
                    message: message.content
                });
            }
        });
    }

    async sendMessage(options: MessageOptions) {
        const channel: TextChannel = await this.getChannel();

        logger.log(LogLevel.Trace, `Sending message to channelId ${this.channelId}`);
        await channel.send(`${options.username}: ${options.message}`);

        // TODO: Send this with a Webhook instead for more options

        //await this._webhook.send(message, {
        //    username
        //});
    }
}