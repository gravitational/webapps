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

export interface ClusterContextMenuOptions {
  isClusterConnected: boolean;
  onRefresh(): void;
  onLogin(): void;
  onLogout(): void;
  onRemove(): void;
}

export const ClusterContextMenuEventChannel = 'ClusterContextMenuEventChannel';

export enum ClusterContextMenuEventType {
  Refresh = 'Refresh',
  Login = 'Login',
  Logout = 'Logout',
  Remove = 'Remove',
}
