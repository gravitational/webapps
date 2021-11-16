import { TshClient } from 'teleterm/services/tshd/types';
import { PtyServiceClient } from 'teleterm/services/pty/types';

export type RuntimeSettings = {
  isDev: boolean;
  userDataDir: string;
  defaultShell: string;
  tshd: {
    networkAddr: string;
    binaryPath: string;
    homeDir: string;
    flags: string[];
  };
};

export type MainProcessClient = {
  getRuntimeSettings(): RuntimeSettings;
  openContextMenu(): void;
};

export type ElectronGlobals = {
  readonly mainProcessClient: MainProcessClient;
  readonly tshdClient: TshClient;
  readonly ptyServiceClient: PtyServiceClient;
};
