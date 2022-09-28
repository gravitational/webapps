import { MockMainProcessClient } from 'teleterm/mainProcess/fixtures/mocks';
import { MockTshClient } from 'teleterm/services/tshd/fixtures/mocks';
import { MockPtyServiceClient } from 'teleterm/services/pty/fixtures/mocks';
import AppContext from 'teleterm/ui/appContext';

export class MockAppContext extends AppContext {
  constructor() {
    const mainProcessClient = new MockMainProcessClient();
    const tshdClient = new MockTshClient();
    const ptyServiceClient = new MockPtyServiceClient();

    super({
      mainProcessClient,
      tshClient: tshdClient,
      ptyServiceClient,
    });
  }
}
