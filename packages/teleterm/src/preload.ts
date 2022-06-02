import { contextBridge } from 'electron';
import createTshClient from 'teleterm/services/tshd/createClient';
import createMainProcessClient from 'teleterm/mainProcess/mainProcessClient';
import createLoggerService from 'teleterm/services/logger';
import PreloadLogger from 'teleterm/logger';
import { ElectronGlobals } from './types';
import { createPtyService } from 'teleterm/services/pty';
import { getNotificationsEventEmitter } from 'teleterm/services/notificationsEventEmitter';

const mainProcessClient = createMainProcessClient();
const runtimeSettings = mainProcessClient.getRuntimeSettings();
const loggerService = createLoggerService({
  dev: runtimeSettings.dev,
  dir: runtimeSettings.userDataDir,
  name: 'renderer',
});

PreloadLogger.init(loggerService);

const notificationsEventEmitter = getNotificationsEventEmitter();
const tshClient = createTshClient(runtimeSettings.tshd.networkAddr);
const ptyServiceClient = createPtyService(
  runtimeSettings,
  notificationsEventEmitter
);

contextBridge.exposeInMainWorld('electron', {
  notificationsEventEmitter,
  mainProcessClient,
  tshClient,
  ptyServiceClient,
  loggerService,
} as ElectronGlobals);
