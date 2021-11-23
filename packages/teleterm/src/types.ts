import { TshClient } from 'teleterm/services/tshd/types';
import { PtyServiceClient } from 'teleterm/services/pty/types';
import { RuntimeSettings, MainProcessClient } from 'teleterm/mainProcess/types';
import { createLogger } from './services/logger';

export { RuntimeSettings, MainProcessClient };

export type ElectronGlobals = {
  readonly mainProcessClient: MainProcessClient;
  readonly tshClient: TshClient;
  readonly ptyServiceClient: PtyServiceClient;
  readonly createLogger: typeof createLogger;
};
