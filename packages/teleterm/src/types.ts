import * as tshTypes from 'teleterm/services/tshd/types';
import * as ptyTypes from 'teleterm/services/pty/types';

export interface ElectronGlobals {
  readonly tshClient: tshTypes.ApiClient;
  readonly ptyManager: ptyTypes.PtyManager;
}
