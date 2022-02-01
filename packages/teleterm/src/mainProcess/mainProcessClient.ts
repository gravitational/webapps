import { ipcRenderer } from 'electron';
import { openClusterContextMenu } from './contextMenus/clusterContextMenu';
import { openTerminalContextMenu } from './contextMenus/terminalContextMenu';
import { MainProcessClient } from './types';
import { createConfigServiceClient } from '../services/config';
import { openTabContextMenu } from './contextMenus/tabContextMenu';
import { openConnectionContextMenu } from './contextMenus/connectionContextMenu';

export default function createMainProcessClient(): MainProcessClient {
  return {
    getRuntimeSettings() {
      return ipcRenderer.sendSync('main-process-get-runtime-settings');
    },
    openTerminalContextMenu,
    openConnectionContextMenu,
    openClusterContextMenu,
    openTabContextMenu,
    configService: createConfigServiceClient(),
  };
}
