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
        console.log(`[${level.toString()} ${(new Date().toISOString())}] <${this.name}> ${message}`, ...data);
    }

    trace(message: string, ...data: any) {
        this.log(LogLevel.Trace, message, ...data);
    }

    info(message: string, ...data: any) {
        this.log(LogLevel.Info, message, ...data);
    }

    warning(message: string, ...data: any) {
        this.log(LogLevel.Warning, message, ...data);
    }

    error(message: string, ...data: any) {
        this.log(LogLevel.Error, message, ...data);
    }

    fatal(message: string, ...data: any) {
        this.log(LogLevel.Fatal, message, ...data);
    }
}