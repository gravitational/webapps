import { ElectronGlobals } from 'teleterm/types';

const electronGlobals = window['electron'] as ElectronGlobals;
export const createLogger: typeof electronGlobals.createLogger =
  electronGlobals.createLogger || (() => undefined); // prevent tests from failing
