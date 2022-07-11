import { contextBridge } from 'electron';
import createTshClient from 'teleterm/services/tshd/createClient';
import createMainProcessClient from 'teleterm/mainProcess/mainProcessClient';
import createLoggerService from 'teleterm/services/logger';
import PreloadLogger from 'teleterm/logger';
import { ElectronGlobals } from './types';
import { createPtyService } from 'teleterm/services/pty/ptyService';
import { readGrpcCerts } from './services/grpcCerts';

async function startPreload(): Promise<void> {
  const mainProcessClient = createMainProcessClient();
  const runtimeSettings = mainProcessClient.getRuntimeSettings();
  const loggerService = createLoggerService({
    dev: runtimeSettings.dev,
    dir: runtimeSettings.userDataDir,
    name: 'renderer',
  });

  PreloadLogger.init(loggerService);

  const grpcCerts = await readGrpcCerts(runtimeSettings.certsDir);

  const tshClient = createTshClient(runtimeSettings, grpcCerts);
  const ptyServiceClient = createPtyService(runtimeSettings, grpcCerts);

  contextBridge.exposeInMainWorld('electron', {
    mainProcessClient,
    tshClient,
    ptyServiceClient,
    loggerService,
  } as ElectronGlobals);
}

startPreload();
