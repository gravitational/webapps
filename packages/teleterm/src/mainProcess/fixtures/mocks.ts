import { RuntimeSettings, MainProcessClient } from 'teleterm/types';

export class MockMainProcessClient implements MainProcessClient {
  getRuntimeSettings(): RuntimeSettings {
    return {
      platform: 'darwin',
      isDev: true,
      userDataDir: '',
      defaultShell: '',
      tshd: {
        networkAddr: '',
        binaryPath: '',
        homeDir: '',
        flags: [],
      },
    };
  }

  openContextMenu() {}
}
