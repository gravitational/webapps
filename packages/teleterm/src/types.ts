import { TshClient } from 'teleterm/services/tshd/types';
import { PtyServiceClient } from 'teleterm/services/pty/types';
import { RuntimeSettings, MainProcessClient } from 'teleterm/mainProcess/types';
import { Logger, LoggerService } from './services/logger/types';
import { WorkspaceService } from 'teleterm/services/workspace/workspaceService';

export { Logger, LoggerService, RuntimeSettings, MainProcessClient };

export type ElectronGlobals = {
  readonly mainProcessClient: MainProcessClient;
  readonly tshClient: TshClient;
  readonly ptyServiceClient: PtyServiceClient;
  readonly loggerService: LoggerService;
  readonly workspaceService: WorkspaceService;
};
