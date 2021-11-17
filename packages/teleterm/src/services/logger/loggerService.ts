import {
  createLogger as createWinstonLogger,
  format,
  Logger as WinstonLogger,
  transports,
} from 'winston';
import { isObject } from 'lodash';

export interface Logger {
  error(...args: unknown[]): void;

  warn(...args: unknown[]): void;

  info(...args: unknown[]): void;
}

let loggerInstance: WinstonLogger;

function initializeLogging(options: {
  directoryPath: string;
  isDev?: boolean;
}): void {
  loggerInstance = createWinstonLogger({
    level: 'info',
    format: format.combine(
      format.timestamp({
        format: 'DD-MM-YY HH:mm:ss',
      }),
      format.printf(({ level, message, timestamp, context }) => {
        const strigifiedMessage = messageStringifier(
          (message as unknown) as unknown[]
        );
        return `[${timestamp}] [${context}] ${level}: ${strigifiedMessage}`;
      })
    ),
    exitOnError: false,
    transports: [
      new transports.File({
        maxsize: 4194304, // 4 MB - max size of a single file
        maxFiles: 5,
        dirname: options.directoryPath,
        filename: `${process.type}.log`, // browser.log, renderer.log, worker.log
      }),
    ],
  });

  if (options.isDev) {
    loggerInstance.add(
      new transports.Console({
        format: format.printf(({ level, message, context }) => {
          const strigifiedMessage = messageStringifier(
            (message as unknown) as unknown[]
          );
          return `[${context}] ${level}: ${strigifiedMessage}`;
        }),
      })
    );
  }
}

function createLogger(context = 'default'): Logger {
  if (!loggerInstance) {
    throw new Error('Logger is not initialized, use initializeLogging() first');
  }

  const childLogger = loggerInstance.child({ context });
  return {
    error: (...args) => {
      childLogger.error(args);
    },
    warn: (...args) => {
      childLogger.warn(args);
    },
    info: (...args) => {
      childLogger.info(args);
    },
  };
}

function messageStringifier(message: unknown[]): string {
  return message
    .map(singleMessage => {
      if (singleMessage instanceof Error) {
        return singleMessage.stack;
      }
      if (isObject(singleMessage)) {
        return JSON.stringify(singleMessage);
      }
      return singleMessage;
    })
    .join(' ');
}

export { initializeLogging, createLogger };
