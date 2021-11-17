const { ipcRenderer } = require('electron');
import { MainProcessClient } from './types';

export default function createMainProcessClient(): MainProcessClient {
  return {
    getRuntimeSettings() {
      return ipcRenderer.sendSync('main-process-get-runtime-settings');
    },
    openContextMenu() {
      return ipcRenderer.send('main-process-open-context-menu');
    },
  };
}
