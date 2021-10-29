import { contextBridge } from 'electron';
import createApiClient from 'teleterm/services/tshd/electron/createClient';
import { ElectronGlobals } from './types';
import createPtyManager from 'teleterm/services/pty/createPtyManager';

contextBridge.exposeInMainWorld('electron', {
  tshClient: createApiClient('unix:///tmp/mama/tshd.socket'),
  ptyManager: createPtyManager(),
} as ElectronGlobals);
