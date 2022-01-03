import { RuntimeSettings, MainProcessClient } from 'teleterm/types';

export class MockMainProcessClient implements MainProcessClient {
  getRuntimeSettings(): RuntimeSettings {
    return {
      platform: 'darwin',
      dev: true,
      userDataDir: '',
      defaultShell: '',
      tshd: {
        insecure: true,
        networkAddr: '',
        binaryPath: '',
        homeDir: '',
        flags: [],
      },
    };
  }

  openTerminalContextMenu() {}

  openClusterContextMenu() {}

  configService: {
    get: () => undefined;
    update: () => undefined;
  };
}
