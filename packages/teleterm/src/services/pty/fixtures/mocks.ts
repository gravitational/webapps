import { PtyProcess, PtyCommand, PtyServiceClient } from './../types';
import { WorkspaceService } from 'teleterm/services/workspace';

export class MockPtyProcess implements PtyProcess {
  start(cols: number, rows: number) {}

  write(data: string) {}

  resize(cols: number, rows: number) {}

  dispose() {}

  onData(cb: (data: string) => void) {}

  onExit(cb: (ev: { exitCode: number; signal?: number }) => void) {}

  onOpen(cb: () => void) {}

  getPid() {
    return 0;
  }

  getCwd = async () => '';
}

export class MockPtyServiceClient implements PtyServiceClient {
  createPtyProcess(cmd: PtyCommand): PtyProcess {
    return new MockPtyProcess();
  }
}

export function createMockWorkspaceService(): WorkspaceService {
  return {
    get: () => ({ recentDocuments: [] }),
    update: () => {},
    subscribe: () => {},
    unsubscribe: () => {},
  };
}
