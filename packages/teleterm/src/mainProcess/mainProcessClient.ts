const { ipcRenderer } = require('electron');
import * as types from './types';

export default function createMainProcessClient() {
  return {
    getConfig(): types.ProcessConfig {
      return ipcRenderer.sendSync('main-process-get-config');
    },
  };
}
