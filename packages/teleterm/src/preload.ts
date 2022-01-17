import { contextBridge } from 'electron';
import createTshClient from 'teleterm/services/tshd/createClient';
import createPtyService from 'teleterm/services/pty/ptyService';
import createMainProcessClient from 'teleterm/mainProcess/mainProcessClient';
import createLoggerService from 'teleterm/services/logger';
import PreloadLogger from 'teleterm/logger';
import { ElectronGlobals } from './types';
import { createWorkspaceService } from 'teleterm/services/workspace';

const mainProcessClient = createMainProcessClient();
const runtimeSettings = mainProcessClient.getRuntimeSettings();
const loggerService = createLoggerService({
  dev: runtimeSettings.dev,
  dir: runtimeSettings.userDataDir,
});

PreloadLogger.init(loggerService);

const tshClient = createTshClient(runtimeSettings.tshd.networkAddr);
const ptyServiceClient = createPtyService(runtimeSettings);
const workspaceService = createWorkspaceService({
  dir: runtimeSettings.userDataDir,
});

contextBridge.exposeInMainWorld('electron', {
  mainProcessClient,
  tshClient,
  ptyServiceClient,
  loggerService,
  workspaceService,
} as ElectronGlobals);
