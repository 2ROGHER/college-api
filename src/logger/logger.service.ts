import { Injectable, LoggerService as NestLogger } from "@nestjs/common";
import * as winston from 'winston';
/**
 * LoggerService is a custom logger service that uses Winston for logging.
 */
@Injectable()
export class LoggerService implements NestLogger{
    private logger: winston.Logger; // Winston logger instance
    constructor() {
        this.logger = winston.createLogger({
            level: 'info', // Default log level
            format: winston.format.combine(
                winston.format.timestamp(), // Add timestamps to logs
                winston.format.json(), // Format logs as JSON
                winston.format.colorize(), // Colorize logs for better readability
                winston.format.printf(({ timestamp, level, message}) => {
                    return `${timestamp} [${level.toUpperCase()}]: ${message}`; // Custom log format
                }),
            ),
            transports: [new winston.transports.Console()] // Log to console
        });
    }

    log(message: string) {
        this.logger.info(message); // Log info messages
    }

    error(message: string, trace?: string) {
        this.logger.error(message, trace); // Log error messages
    }

    warn(message: any, ...optionalParams: any[]) {
        this.logger.warn(message, ...optionalParams); // Log warning messages
    }

    debug(message: any, ...optionalParams: any[]) {
        this.logger.debug(message, ...optionalParams); // Log debug messages
    }

    verbose(message: any, ...optionalParams: any[]) {
        this.logger.verbose(message, ...optionalParams); // Log verbose messages
    }
}
