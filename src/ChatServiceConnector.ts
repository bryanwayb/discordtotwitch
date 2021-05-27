import { Service } from './interfaces/Service';
import { Logger } from './logger'

const log = new Logger('ServiceConnector');

export default class ChatServiceConnector {
    private fromService: Service;
    private toService: Service;

    constructor(fromService: Service, toService: Service) {
        this.fromService = fromService;
        this.toService = toService;
    }

    async pipe() {
        await this.fromService.connect();
        await this.toService.connect();

        this.fromService.onMessage(async (message) => {
            try {
                await this.toService.sendMessage(message);
            }
            catch (ex) {
                log.error('Error while trying to send a message', ex);
            }
        });
    }

    async shutdown() {
        await this.fromService.disconnect();
        await this.toService.disconnect();
    }
}