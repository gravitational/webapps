import * as types from 'teleterm/types';

export default class Logger {
  private static service: types.LoggerService;
  private logger: types.Logger;

  constructor(private context = '') {}

  warn(message: string, ...args: any[]) {
    this.getLogger().warn(message, ...args);
  }

  info(message: string, ...args: any[]) {
    this.getLogger().info(message, ...args);
  }

  error(message: string, ...args: any[]) {
    this.getLogger().error(message, ...args);
  }

  static init(service: types.LoggerService) {
    Logger.service = service;
  }

  private getLogger(): types.Logger {
    if (!Logger.service) {
      throw new Error('Logger is not initialized');
    }

    if (!this.logger) {
      this.logger = Logger.service.createLogger(this.context);
    }

    return this.logger;
  }
}
