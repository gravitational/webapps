import { Stream } from 'stream';

export interface Logger {
  error(...args: unknown[]): void;
  warn(...args: unknown[]): void;
  info(...args: unknown[]): void;
}

export interface LoggerService {
  pipeProcessOutput(stream: Stream): void;
  createLogger(context: string): Logger;
}
