import { Injectable } from '@nestjs/common';
import * as winston from 'winston';

const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = winston.createLogger({
  level: 'info', // Set your desired log level
  format: winston.format.combine(winston.format.timestamp(), logFormat),
  transports: [
    new winston.transports.Console(),
    // Add more transports as needed (e.g., file, database, etc.)
  ],
});

@Injectable()
export class LoggerService {
  info(message: string, context?: string) {
    logger.info(`${context ? `[${context}] ` : ''}${message}`);
  }

  error(message: string, trace: string, context?: string) {
    logger.error(`${context ? `[${context}] ` : ''}${message}\n${trace}`);
  }

  warn(message: string, context?: string) {
    logger.warn(`${context ? `[${context}] ` : ''}${message}`);
  }

  debug(message: string, context?: string) {
    logger.debug(`${context ? `[${context}] ` : ''}${message}`);
  }
}
