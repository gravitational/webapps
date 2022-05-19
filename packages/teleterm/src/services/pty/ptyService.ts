import { RuntimeSettings } from 'teleterm/mainProcess/types';
import { buildPtyOptions } from './ptyHost/buildPtyOptions';
import { createPtyHostClient } from './ptyHost/ptyHostClient';
import { createPtyProcess } from './ptyHost/ptyProcess';
import { PtyServiceClient } from './types';

export function createPtyService(
  runtimeSettings: RuntimeSettings
): PtyServiceClient {
  const ptyHostClient = createPtyHostClient(
    runtimeSettings.sharedProcess.networkAddr
  );

  return {
    createPtyProcess: async command => {
      const ptyOptions = await buildPtyOptions(runtimeSettings, command);
      const ptyId = await ptyHostClient.createPtyProcess(ptyOptions);

      return createPtyProcess(ptyHostClient, ptyId); // Electron's context bridge doesn't allow to return a class here
    },
  };
}
