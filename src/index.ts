import { Service } from './interfaces/Service';
import DiscordService from './services/DiscordService';
import TwitchService from './services/TwitchService';
import ServiceConnector from './ServiceConnector';
import server from './server';

server();

async function main() {
    const discord: Service = new DiscordService('846631995752579102');
    const twitch: Service = new TwitchService('natorics');

    //const discord: Service = new DiscordService('712850962880135199');
    //const twitch: Service = new TwitchService('lvbolts');

    const connector = new ServiceConnector(discord, twitch);
    connector.pipe();

    const connector2 = new ServiceConnector(twitch, discord);
    connector2.pipe();
}

main();