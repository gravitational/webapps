import { TshClient } from 'teleterm/services/tshd/types';
import { PtyServiceClient } from 'teleterm/services/pty/types';
import { RuntimeSettings, MainProcessClient } from 'teleterm/mainProcess/types';

export { RuntimeSettings, MainProcessClient };

export type ElectronGlobals = {
  readonly mainProcessClient: MainProcessClient;
  readonly tshdClient: TshClient;
  readonly ptyServiceClient: PtyServiceClient;
};
