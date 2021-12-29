import Terminal from 'teleterm/ui/DocumentTerminal/Terminal';
import { useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import {
  DocumentPtySession,
  DocumentTshNode,
} from 'teleterm/ui/services/docs/types';

export function useDocumentCwdUpdater(
  document: DocumentPtySession | DocumentTshNode,
  terminal: Terminal
) {
  const ctx = useAppContext();
  const isDocumentPtySession = document.kind === 'doc.terminal_shell';
  const pid = isDocumentPtySession ? document.pid : undefined;

  async function updateWorkingDirectory(): Promise<void> {
    if (pid) {
      const cwd = await ctx.serviceTerminals.getWorkingDirectory(pid);
      ctx.serviceDocs.update(document.uri, { cwd, title: cwd });
    }
  }

  useEffect(() => {
    if (isDocumentPtySession) {
      const debouncedUpdateWorkingDirectory = debounce(
        updateWorkingDirectory,
        2000
      );

      if (!document.cwd || !document.title) {
        updateWorkingDirectory();
      }
      terminal?.terminal.term.onKey(event => {
        if (event.domEvent.key === 'Enter') {
          debouncedUpdateWorkingDirectory();
        }
      });
      return () => debouncedUpdateWorkingDirectory.cancel();
    }
  }, [terminal, pid]);
}
