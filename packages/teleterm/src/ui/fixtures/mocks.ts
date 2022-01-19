import { MockMainProcessClient } from 'teleterm/mainProcess/fixtures/mocks';
import { MockTshClient } from 'teleterm/services/tshd/fixtures/mocks';
import { createMockWorkspaceService, MockPtyServiceClient } from 'teleterm/services/pty/fixtures/mocks';
import AppContext from 'teleterm/ui/appContext';

export class MockAppContext extends AppContext {
  constructor() {
    const mainProcessClient = new MockMainProcessClient();
    const tshdClient = new MockTshClient();
    const ptyServiceClient = new MockPtyServiceClient();
    const loggerService = createLoggerService();
    const workspaceService = createMockWorkspaceService();

    super({
      loggerService,
      mainProcessClient,
      tshClient: tshdClient,
      ptyServiceClient,
      workspaceService,
    });
  }
}

function createLoggerService() {
  return {
    createLogger() {
      return {
        error: () => {},
        warn: () => {},
        info: () => {},
      };
    },
  };
}
