import path from 'path';
import fs, { readFileSync, existsSync, writeFileSync } from 'fs';
import Logger from 'teleterm/logger';
import { Document } from 'teleterm/ui/services/docs/types';
import { Store } from 'shared/libs/stores';
import { merge } from 'lodash';

interface WorkspaceState {
  recentDocuments: Document[];
  layout: {
    navigatorWidth?: number;
  };
}

export interface WorkspaceService {
  getRecentDocuments(): Document[];
  addToRecentDocuments(document: Document): void;
  removeFromRecentDocuments(uri: string): void;
  setNavigatorWidth(width: number): void;
  getNavigatorWidth(): number;
  subscribe(cb: () => void): void;
  unsubscribe(cb: () => void): void;
}

export function createWorkspaceService(options: {
  dir: string;
}): WorkspaceService {
  const defaultWorkspaceState: WorkspaceState = {
    recentDocuments: [],
    layout: {},
  };
  const logger = new Logger('Workspace Service');
  const fileName = 'workspace.json';
  const filePath = path.join(options.dir, fileName);
  const store = new Store<WorkspaceState>();
  store.setState(merge(readWorkspaceFileSync(), defaultWorkspaceState));

  function getRecentDocuments(): Document[] {
    return store.state.recentDocuments;
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
      const recentDocuments = [...getRecentDocuments()];
      if (!recentDocuments.find(d => d.uri === document.uri)) {
        recentDocuments.push(document);
        update({ recentDocuments });
      }
    }
  }

  function removeFromRecentDocuments(uri: string): void {
    const recentDocuments = getRecentDocuments().filter(d => d.uri !== uri);
    update({ recentDocuments });
  }

  function setNavigatorWidth(width: number): void {
    update({ layout: { navigatorWidth: width } });
  }

  function getNavigatorWidth(): number {
    return store.state.layout.navigatorWidth;
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
    return JSON.stringify(store.state, null, 2);
  }

  return {
    getRecentDocuments,
    subscribe,
    unsubscribe,
    addToRecentDocuments,
    removeFromRecentDocuments,
    setNavigatorWidth,
    getNavigatorWidth,
  };
}
