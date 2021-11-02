import * as tshdTypes from 'teleterm/services/tshd/types';
import * as ptyTypes from 'teleterm/services/pty/types';

export interface ElectronGlobals {
  readonly tshdClient: tshdTypes.TshdClient;
  readonly ptyServiceClient: ptyTypes.PtyServiceClient;
}
