export enum LogLevel {
    Trace = "TRCE",
    Info = "INFO",
    Warning = "WARN",
    Error = "EROR",
    Fatal = "FATL"
}

export class Logger {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    log(level: LogLevel, message: string, ...data: any) {
        console.log(`<${this.name}> [${level.toString()} ${(new Date().toISOString())}] ${message}`, ...data);
    }
}