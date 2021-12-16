import * as types from 'teleterm/services/pty/types';

export default class TerminalsService {
  ptyServiceClient: types.PtyServiceClient;

  constructor(ptyProvider: types.PtyServiceClient) {
    this.ptyServiceClient = ptyProvider;
  }

  createPtyProcess(cmd: types.PtyCommand) {
    return this.ptyServiceClient.createPtyProcess(cmd);
  }

  getWorkingDirectory(pid: number) {
    return this.ptyServiceClient.getWorkingDirectory(pid);
  }
}
