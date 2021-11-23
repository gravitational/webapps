import { contextBridge } from 'electron';
import createTshClient from 'teleterm/services/tshd/createClient';
import createPtyService from 'teleterm/services/pty/ptyService';
import createMainProcessClient from 'teleterm/mainProcess/mainProcessClient';
import { ElectronGlobals } from './types';
import { createLogger, initializeLogging } from './services/logger';

const mainProcessClient = createMainProcessClient();
const runtimeSettings = mainProcessClient.getRuntimeSettings();

initializeLogging({
  isDev: runtimeSettings.isDev,
  directoryPath: runtimeSettings.userDataDir,
});

const tshClient = createTshClient(runtimeSettings.tshd.networkAddr);
const ptyServiceClient = createPtyService(runtimeSettings);

contextBridge.exposeInMainWorld('electron', {
  mainProcessClient,
  tshClient: tshClient,
  ptyServiceClient,
  createLogger,
} as ElectronGlobals);
