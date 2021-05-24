import { Service } from './interfaces/Service';

export default class ServiceConnector {
    private fromService: Service;
    private toService: Service;

    constructor(fromService: Service, toService: Service) {
        this.fromService = fromService;
        this.toService = toService;
    }

    pipe() {
        this.fromService.onMessage((message) => {
            this.toService.sendMessage(message);
        });
    }
}