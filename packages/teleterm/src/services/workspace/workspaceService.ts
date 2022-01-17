import path from 'path';
import fs, { readFileSync, existsSync, writeFileSync } from 'fs';
import Logger from 'teleterm/logger';
import { Document } from 'teleterm/ui/services/docs/types';
import { Store } from 'shared/libs/stores';

interface WorkspaceState {
  recentDocuments: Document[];
}

export interface WorkspaceService {
  get(): WorkspaceState;
  update(newWorkspaceState: Partial<WorkspaceState>): void;
  addToRecentDocuments(document: Document): void;
  subscribe(cb: () => void): void;
  unsubscribe(cb: () => void): void;
}

export function createWorkspaceService(options: {
  dir: string;
}): WorkspaceService {
  const defaultWorkspaceState: WorkspaceState = { recentDocuments: [] };
  const logger = new Logger('Workspace Service');
  const fileName = 'workspace.json';
  const filePath = path.join(options.dir, fileName);
  const store = new Store<WorkspaceState>();
  store.setState(readWorkspaceFileSync() || defaultWorkspaceState);

  function get(): WorkspaceState {
    return store.state;
  }

  function update(newWorkspaceState: Partial<WorkspaceState>): void {
    store.setState(newWorkspaceState);
    fs.promises
      .writeFile(filePath, getStringifiedWorkspaceState())
      .catch(error => {
        logger.error(`Cannot update ${fileName} file`, error);
      });
  }

  function addToRecentDocuments(document: Document): void {
    if (
      document.kind === 'doc.terminal_tsh_node' ||
      document.kind === 'doc.gateway'
    ) {
      const recentDocuments = [...get().recentDocuments];
      if (!recentDocuments.find(d => d.uri === document.uri)) {
        recentDocuments.push(document);
        update({ recentDocuments });
      }
    }
  }

  function subscribe(cb: () => void): void {
    return store.subscribe(cb);
  }

  function unsubscribe(cb: () => void): void {
    return store.unsubscribe(cb);
  }

  function readWorkspaceFileSync(): WorkspaceState {
    if (!existsSync(filePath)) {
      try {
        writeFileSync(filePath, getStringifiedWorkspaceState());
      } catch (error) {
        logger.error(`Cannot create ${fileName} file`, error);
        return;
      }
    }

    try {
      return JSON.parse(readFileSync(filePath, { encoding: 'utf-8' }));
    } catch (error) {
      logger.error(`Cannot read ${fileName} file`, error);
    }
  }

  function getStringifiedWorkspaceState(): string {
    return JSON.stringify(get(), null, 2);
  }

  return {
    get,
    update,
    subscribe,
    unsubscribe,
    addToRecentDocuments,
  };
}
