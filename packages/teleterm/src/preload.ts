import { contextBridge } from 'electron';
import createTshdClient from 'teleterm/services/tshd/createClient';
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

const tshdClient = createTshdClient(runtimeSettings.tshd.networkAddr);
const ptyServiceClient = createPtyService(runtimeSettings);

contextBridge.exposeInMainWorld('electron', {
  mainProcessClient,
  tshdClient,
  ptyServiceClient,
  createLogger,
} as ElectronGlobals);
