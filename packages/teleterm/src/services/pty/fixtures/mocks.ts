import { PtyProcessType } from 'teleterm/sharedProcess/ptyHost';
import { PtyServiceClient } from 'teleterm/services/pty';

export class MockPtyProcess implements PtyProcessType {
  start() {}

  write() {}

  resize() {}

  dispose() {}

  onData() {}

  onExit() {}

  onOpen() {}

  getPid() {
    return 0;
  }

  async getCwd() {
    return '';
  }
}

export class MockPtyServiceClient implements PtyServiceClient {
  createPtyProcess(): Promise<PtyProcessType> {
    return Promise.resolve(new MockPtyProcess());
  }
}
