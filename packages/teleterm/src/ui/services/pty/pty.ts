import * as types from 'teleterm/services/pty/types';

export default class PtyService {
  ptyProvider: types.PtyManager;

  constructor(ptyProvider: types.PtyManager) {
    this.ptyProvider = ptyProvider;
  }

  createPtyProcess() {
    return this.ptyProvider.createPtyProcess({});
  }
}
