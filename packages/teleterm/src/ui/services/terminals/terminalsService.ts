import * as types from 'teleterm/sharedProcess/ptyHost';

export class TerminalsService {
  ptyServiceClient: types.PtyServiceClient;

  constructor(ptyProvider: types.PtyServiceClient) {
    this.ptyServiceClient = ptyProvider;
  }

  createPtyProcess(cmd: types.PtyCommand) {
    return this.ptyServiceClient.createPtyProcess(cmd);
  }
}
