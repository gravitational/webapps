import { contextBridge } from 'electron';
import createTshdClient from 'teleterm/services/tshd/createClient';
import createPtyService from 'teleterm/services/pty/ptyService';
import createMainProcessClient from 'teleterm/mainProcess/mainProcessClient';
import { ElectronGlobals } from './types';

const mainProcessClient = createMainProcessClient();
const cfg = mainProcessClient.getConfig();

contextBridge.exposeInMainWorld('electron', {
  mainProcessClient,
  tshdClient: createTshdClient(cfg.tshd.networkAddr),
  ptyServiceClient: createPtyService(cfg.tshd.homeDir),
} as ElectronGlobals);
