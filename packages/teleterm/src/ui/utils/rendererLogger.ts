import { ElectronGlobals } from 'teleterm/types';

const electronGlobals = window['electron'] as ElectronGlobals;
export const createLogger = electronGlobals.createLogger