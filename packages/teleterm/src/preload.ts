import { contextBridge } from 'electron';
import createTshdClient from 'teleterm/services/tshd/createClient';
import createPtyService from 'teleterm/services/pty/ptyService';
import createMainProcessClient from 'teleterm/mainProcess/mainProcessClient';
import { ElectronGlobals } from './types';

const mainProcessClient = createMainProcessClient();
const runtimeSettings = mainProcessClient.getRuntimeSettings();
const tshdClient = createTshdClient(runtimeSettings.tshd.networkAddr);
const ptyServiceClient = createPtyService(runtimeSettings);

contextBridge.exposeInMainWorld('electron', {
  mainProcessClient,
  tshdClient,
  ptyServiceClient,
} as ElectronGlobals);
