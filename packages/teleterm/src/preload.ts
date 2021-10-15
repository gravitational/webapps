import { contextBridge } from 'electron';
import createApiClient from 'teleterm/services/tshd/electron/createClient';
import { ElectronGlobals } from './types';

contextBridge.exposeInMainWorld('electron', {
  tshApiClient: createApiClient('unix:///tmp/tshd/socket'),
} as ElectronGlobals);
