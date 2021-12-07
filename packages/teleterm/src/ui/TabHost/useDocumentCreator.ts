import { MutableRefObject, useCallback } from 'react';
import { Document } from '../types';
import uris from '../uris';
import { unique } from '../utils/uid';
import DocumentService from '../services/docs';

export interface DocumentTerminalRef {
  type: 'document_terminal';

  getWorkingDirectory(): Promise<string>;
}

export type ActiveDocumentRef = DocumentTerminalRef;

export function useDocumentCreator(options: {
  serviceDocs: DocumentService;
  activeDocumentRef: MutableRefObject<ActiveDocumentRef>;
}) {
  async function getTerminalWorkingDirectory(): Promise<string | undefined> {
    if (options.activeDocumentRef.current.type === 'document_terminal') {
      try {
        return await options.activeDocumentRef.current.getWorkingDirectory();
      } catch (err) {
        return; // default cwd will be used
      }
    }
  }

  async function getNewDocumentBasingOnActive(): Promise<Document> {
    const activeDocument = options.serviceDocs.getActive();

    switch (activeDocument.kind) {
      case 'terminal_tsh_session':
        return {
          ...activeDocument,
          uri: uris.getUriPty({ sid: unique() }),
        };
      case 'terminal_shell':
        return {
          ...activeDocument,
          uri: uris.getUriPty({ sid: unique() }),
          cwd: await getTerminalWorkingDirectory(),
        };
      default:
        return {
          uri: uris.getUriPty({ sid: unique() }),
          title: 'Terminal',
          kind: 'terminal_shell',
        };
    }
  }

  return {
    getNewDocumentBasingOnActive: useCallback(getNewDocumentBasingOnActive, [
      options.activeDocumentRef,
      options.serviceDocs,
    ]),
  };
}
