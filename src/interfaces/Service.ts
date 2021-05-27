export type MessageOptions = {
    username: string;
    message: string;
};

export type MessageHandler = (message: MessageOptions) => void;

export interface Service {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    onMessage(handler: MessageHandler): void;
    sendMessage(options: MessageOptions): Promise<void>;
}