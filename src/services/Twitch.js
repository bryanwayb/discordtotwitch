const tmi = require('tmi.js');

class Twitch {
    constructor(username, password, channel) {
        this._channel = channel;

        this._client = new tmi.Client({
            options: { debug: false },
            connection: {
                reconnect: true,
                secure: true
            },
            identity: {
                username,
                password
            },
            channels: [ channel ]
        });
    }

    async connect() {
        await this._client.connect();
    }

    onMessage(handler) {
        this._client.on('message', async (channel, tags, message, self) => {
            if(!self) {
                await handler(tags['display-name'], message);
            }
        });
    }

    async sendMessage(username, message) {
        await this._client.say(this._channel, `<${username}> ${message}`);
    }
}

module.exports = Twitch;