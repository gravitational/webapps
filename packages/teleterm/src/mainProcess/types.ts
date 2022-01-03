import { ConfigService } from '../services/config';

export type RuntimeSettings = {
  dev: boolean;
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
  openTerminalContextMenu(): void;
  openClusterContextMenu(options: ClusterContextMenuOptions): void;
  configService: ConfigService;
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
export const TerminalContextMenuEventChannel = 'TerminalContextMenuEventChannel';
export const ConfigServiceEventChannel = 'ConfigServiceEventChannel';

export enum ClusterContextMenuEventType {
  Refresh = 'Refresh',
  Login = 'Login',
  Logout = 'Logout',
  Remove = 'Remove',
}

export enum ConfigServiceEventType {
  Get = 'Get',
  Update = 'Update',
}
