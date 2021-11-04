const { ipcRenderer } = require('electron');
import { RuntimeSettings } from 'teleterm/types';

export default function createMainProcessClient() {
  return {
    getRuntimeSettings(): RuntimeSettings {
      return ipcRenderer.sendSync('main-process-get-runtime-settings');
    },
  };
}
