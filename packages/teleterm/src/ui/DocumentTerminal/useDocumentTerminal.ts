/*
Copyright 2020 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { useEffect, useState } from 'react';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import * as types from 'teleterm/ui/services/docs/types';
import { PtyProcess } from 'teleterm/services/pty/types';

export default function useDocumentTerminal(doc: Props['doc']) {
  const ctx = useAppContext();
  const [ptyProcess, setPtyProcess] = useState<PtyProcess>();

  function openTerminalContextMenu(): void {
    ctx.mainProcessClient.openTerminalContextMenu();
  }

  function createPtyProcess(): PtyProcess {
    if (doc.kind === 'doc.terminal_tsh_node') {
      return ctx.serviceTerminals.createPtyProcess({
        ...doc,
        kind: 'tsh-login',
      });
    }

    if (doc.kind === 'doc.terminal_shell') {
      return ctx.serviceTerminals.createPtyProcess({
        kind: 'new-shell',
        cwd: doc.cwd,
      });
    }
  }

  useEffect(() => {
    const createdPtyProcess = createPtyProcess();
    createdPtyProcess.onExit(({ exitCode }) => {
      if (exitCode === 0) {
        ctx.serviceDocs.close({ uri: doc.uri });
      }
    });

    setPtyProcess(createdPtyProcess);

    return () => {
      createdPtyProcess.dispose();
    };
  }, []);

  useEffect(() => {
    if (ptyProcess) {
      ctx.serviceDocs.update(doc.uri, {
        pid: ptyProcess.getPid(),
      });
    }
  }, [ptyProcess]);

  return {
    ptyProcess,
    openTerminalContextMenu,
  };
}

export type Props = {
  doc: types.DocumentPtySession | types.DocumentTshNode;
  visible: boolean;
};
