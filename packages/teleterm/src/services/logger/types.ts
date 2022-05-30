import winston from 'winston';

export interface Logger {
  error(...args: unknown[]): void;
  warn(...args: unknown[]): void;
  info(...args: unknown[]): void;
}

export interface LoggerService {
  getInstance(): winston.Logger;
  createLogger(context: string): Logger;
}
