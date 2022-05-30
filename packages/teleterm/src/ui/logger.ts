import Logger from 'teleterm/logger';
import { ElectronGlobals } from 'teleterm/types';

export default Logger;

export function initLogger(globals: ElectronGlobals) {
  Logger.init(globals.loggerService);
}
