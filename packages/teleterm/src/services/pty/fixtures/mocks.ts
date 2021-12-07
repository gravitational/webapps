import { PtyProcess, PtyCommand, PtyServiceClient } from './../types';

export class MockPtyProcess implements PtyProcess {
  start(cols: number, rows: number) {}

  write(data: string) {}

  resize(cols: number, rows: number) {}

  dispose() {}

  onData(cb: (data: string) => void) {}

  onExit(cb: (ev: { exitCode: number; signal?: number }) => void) {}

  getWorkingDirectory(): Promise<string> {
    return Promise.resolve('');
  }
}

export class MockPtyServiceClient implements PtyServiceClient {
  createPtyProcess(cmd: PtyCommand): PtyProcess {
    return new MockPtyProcess();
  }
}
