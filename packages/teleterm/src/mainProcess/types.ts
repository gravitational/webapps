import { ClusterContextMenuOptions } from './clusterContextMenu';

export type RuntimeSettings = {
  isDev: boolean;
  userDataDir: string;
  defaultShell: string;
  platform: Platform;
  tshd: {
    insecure: boolean;
    networkAddr: string;
    binaryPath: string;
    homeDir: string;
    flags: string[];
  };
};

export type MainProcessClient = {
  getRuntimeSettings(): RuntimeSettings;
  openContextMenu(): void;
  openClusterContextMenu(options: ClusterContextMenuOptions);
};

export type Platform = NodeJS.Platform;
