import { Kind } from 'teleterm/ui/services/workspacesService';
import { FileStorage } from 'teleterm/services/fileStorage';

import { ConfigService } from '../services/config';

export type RuntimeSettings = {
  dev: boolean;
  userDataDir: string;
  // Points to a directory that should be prepended to PATH. Only present in the packaged version.
  binDir: string | undefined;
  certsDir: string;
  kubeConfigsDir: string;
  defaultShell: string;
  platform: Platform;
  tshd: {
    insecure: boolean;
    requestedNetworkAddress: string;
    binaryPath: string;
    homeDir: string;
    flags: string[];
  };
  sharedProcess: {
    requestedNetworkAddress: string;
  };
};

export type MainProcessClient = {
  getRuntimeSettings(): RuntimeSettings;
  getResolvedChildProcessAddresses(): Promise<ChildProcessAddresses>;
  openTerminalContextMenu(): void;
  openTabContextMenu(options: TabContextMenuOptions): void;
  configService: ConfigService;
  fileStorage: FileStorage;
  removeKubeConfig(options: {
    relativePath: string;
    isDirectory?: boolean;
  }): Promise<void>;
};

export type ChildProcessAddresses = {
  tsh: string;
  shared: string;
};

export type Platform = NodeJS.Platform;

export interface ClusterContextMenuOptions {
  isClusterConnected: boolean;

  onRefresh(): void;

  onLogin(): void;

  onLogout(): void;

  onRemove(): void;
}

export interface TabContextMenuOptions {
  documentKind: Kind;

  onClose(): void;

  onCloseOthers(): void;

  onCloseToRight(): void;

  onDuplicatePty(): void;
}

export const TerminalContextMenuEventChannel =
  'TerminalContextMenuEventChannel';
export const TabContextMenuEventChannel = 'TabContextMenuEventChannel';
export const ConfigServiceEventChannel = 'ConfigServiceEventChannel';
export const FileStorageEventChannel = 'FileStorageEventChannel';

export enum TabContextMenuEventType {
  Close = 'Close',
  CloseOthers = 'CloseOthers',
  CloseToRight = 'CloseToRight',
  DuplicatePty = 'DuplicatePty',
}

export enum ConfigServiceEventType {
  Get = 'Get',
  Update = 'Update',
}

export enum FileStorageEventType {
  Get = 'Get',
  Put = 'Put',
  PutAllSync = 'PutAllSync',
}
