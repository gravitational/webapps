import { contextBridge } from 'electron';
import createTshClient from 'teleterm/services/tshd/createClient';
import createMainProcessClient from 'teleterm/mainProcess/mainProcessClient';
import createLoggerService from 'teleterm/services/logger';
import PreloadLogger from 'teleterm/logger';
import { ElectronGlobals } from './types';
import { createPtyService } from 'teleterm/services/pty/ptyService';
import { readGrpcCerts } from './services/grpcCerts';

const mainProcessClient = createMainProcessClient();
const runtimeSettings = mainProcessClient.getRuntimeSettings();
const loggerService = createLoggerService({
  dev: runtimeSettings.dev,
  dir: runtimeSettings.userDataDir,
  name: 'renderer',
});

PreloadLogger.init(loggerService);

contextBridge.exposeInMainWorld('electron', getElectronGlobals());

async function getElectronGlobals(): Promise<ElectronGlobals> {
  try {
    const [grpcCerts, resolvedAddresses] = await Promise.all([
      readGrpcCerts(runtimeSettings.certsDir),
      mainProcessClient.getResolvedChildProcessAddresses(),
    ]);
    const tshClient = createTshClient(resolvedAddresses.tsh, grpcCerts);
    const ptyServiceClient = createPtyService(
      resolvedAddresses.shared,
      runtimeSettings,
      grpcCerts
    );

    return {
      mainProcessClient,
      tshClient,
      ptyServiceClient,
      loggerService,
    };
  } catch (e) {
    return e;
  }
}
