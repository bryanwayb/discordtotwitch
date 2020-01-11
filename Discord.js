const Discord = require('discord.js');

class DiscordClient {
    constructor(channelId, webhookId, webhookToken, botToken) {
        this._channelId = channelId;
        this._botToken = botToken;
        this._client = new Discord.Client();
        this._webhook = new Discord.WebhookClient(webhookId, webhookToken);
    }

    async connect() {
        await this._client.login(this._botToken);
    }

    onMessage(handler) {
        this._client.on('message', (message) => {
            if(!message.author.bot
                && message.channel.id === this._channelId) {
                handler(`${message.author.username}#${message.author.discriminator}`, message.content);
            }
        });
    }

    async sendMessage(username, message) {
        await this._webhook.send(message, {
            username
        });
    }
}

module.exports = DiscordClient;