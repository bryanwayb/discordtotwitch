import { Service } from './interfaces/Service';
import DiscordService from './chatServices/DiscordService';
import TwitchService from './chatServices/TwitchService';
import ChatServiceConnector from './ChatServiceConnector';
import server from './server';

import { GetUser } from './repository/userRepository';

server();

async function main() {
    const discord: Service = new DiscordService('846631995752579102');
    const twitch: Service = new TwitchService('natorics');

    //const discord: Service = new DiscordService('712850962880135199');
    //const twitch: Service = new TwitchService('lvbolts');

    const connector = new ChatServiceConnector(discord, twitch);
    connector.pipe();

    const connector2 = new ChatServiceConnector(twitch, discord);
    connector2.pipe();

    console.log('getting user', await GetUser('testing user'));
}

main();