import { contextBridge } from 'electron';
import createTshClient from 'teleterm/services/tshd/createClient';
import createMainProcessClient from 'teleterm/mainProcess/mainProcessClient';
import createLoggerService from 'teleterm/services/logger';
import PreloadLogger from 'teleterm/logger';
import { ElectronGlobals } from './types';
import { createPtyHostClient } from 'teleterm/sharedProcess/ptyHost/client';

const mainProcessClient = createMainProcessClient();
const runtimeSettings = mainProcessClient.getRuntimeSettings();
const loggerService = createLoggerService({
  dev: runtimeSettings.dev,
  dir: runtimeSettings.userDataDir,
  name: "renderer"
});

PreloadLogger.init(loggerService);

const tshClient = createTshClient(runtimeSettings.tshd.networkAddr);
const ptyServiceClient = createPtyHostClient(runtimeSettings);

contextBridge.exposeInMainWorld('electron', {
  mainProcessClient,
  tshClient,
  ptyServiceClient,
  loggerService,
} as ElectronGlobals);
