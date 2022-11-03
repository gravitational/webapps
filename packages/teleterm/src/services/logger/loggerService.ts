import winston, {
  createLogger as createWinston,
  format,
  transports,
} from 'winston';
import { isObject } from 'lodash';

import split2 from 'split2';

import { Logger, LoggerService, NodeLoggerService } from './types';

export function createStdoutLoggerService(): LoggerService {
  const instance = createWinston({
    level: 'info',
    exitOnError: false,
    format: format.combine(
      format.printf(({ level, message, context }) => {
        const text = stringifier(message as unknown as unknown[]);
        return `[${context}] ${level}: ${text}`;
      })
    ),
    transports: [new transports.Console()],
  });

  return {
    createLogger(context = 'default'): Logger {
      const logger = instance.child({ context });
      return createLoggerFromWinston(logger);
    },
  };
}

export function createFileLoggerService(
  opts: FileLoggerOptions
): NodeLoggerService {
  const instance = createWinston({
    level: 'info',
    exitOnError: false,
    format: format.combine(
      format.timestamp({
        format: 'DD-MM-YY HH:mm:ss',
      }),
      format.printf(({ level, message, timestamp, context }) => {
        const text = stringifier(message as unknown as unknown[]);
        const contextAndLevel = opts.passThroughMode
          ? ''
          : ` [${context}] ${level}:`;
        return `[${timestamp}]${contextAndLevel} ${text}`;
      })
    ),
    transports: [
      new transports.File({
        maxsize: 4194304, // 4 MB - max size of a single file
        maxFiles: 5,
        dirname: opts.dir + '/logs',
        filename: `${opts.name}.log`,
      }),
    ],
  });

  if (opts.dev) {
    instance.add(
      new transports.Console({
        format: format.printf(({ level, message, context }) => {
          const loggerName =
            opts.loggerNamePrintCode &&
            `\x1b[${
              opts.loggerNamePrintCode
            }m${opts.name.toUpperCase()}\x1b[0m`;

          const text = stringifier(message as unknown as unknown[]);
          const logMessage = opts.passThroughMode
            ? text
            : `[${context}] ${level}: ${text}`;

          return [loggerName, logMessage].filter(Boolean).join(' ');
        }),
      })
    );
  }

  return {
    pipeProcessOutputIntoLogger(stream): void {
      stream
        .pipe(split2(line => ({ level: 'info', message: [line] })))
        .pipe(instance);
    },
    createLogger(context = 'default'): Logger {
      const logger = instance.child({ context });
      return createLoggerFromWinston(logger);
    },
  };
}

function createLoggerFromWinston(logger: winston.Logger): Logger {
  return {
    error: (...args) => {
      logger.error(args);
    },
    warn: (...args) => {
      logger.warn(args);
    },
    info: (...args) => {
      logger.info(args);
    },
  };
}

function stringifier(message: unknown[]): string {
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

type FileLoggerOptions = {
  dir: string;
  name: string;
  /**
   * ANSI display attribute (SGR parameter) for the logger name e.g. 104 for Bright Blue background color.
   * Logger name is printed in the terminal, only in dev mode.
   * If not specified, the logger name will not be printed.
   */
  loggerNamePrintCode?: string;
  dev?: boolean;
  /**
   * Mode for logger handling logs from other sources. Log level and context are not included in the log message.
   */
  passThroughMode?: boolean;
};
