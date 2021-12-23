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

import { useEffect, useMemo, useState } from 'react';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import * as types from 'teleterm/ui/services/docs/types';
import { PtyProcess } from 'teleterm/services/pty/types';
import { debounce } from 'lodash';

export default function useDocumentTerminal(doc: Props['doc']) {
  const ctx = useAppContext();
  const [ptyProcess, setPtyProcess] = useState<PtyProcess>();

  async function createPtyProcess(): Promise<PtyProcess> {
    if (doc.kind === 'doc.terminal_tsh_node') {
      return ctx.serviceTerminals.createPtyProcess({
        ...doc,
        kind: 'tsh-login',
      });
    }

    if (doc.kind === 'doc.terminal_shell') {
      return ctx.serviceTerminals.createPtyProcess({
        kind: 'new-shell',
        cwd: await getPreviousDocumentCwdIfPossible(),
      });
    }
  }

  async function getPreviousDocumentCwdIfPossible(): Promise<string> {
    const previouslyActive = ctx.serviceDocs.getPreviouslyActive();
    if (previouslyActive.kind === 'doc.terminal_shell') {
      return ctx.serviceTerminals.getWorkingDirectory(previouslyActive.pid);
    }
  }

  function updateDocumentPid(pty: PtyProcess): void {
    const pid = pty.getPid();
    if (pid) {
      ctx.serviceDocs.update(doc.uri, { pid });
    }
  }

  const refreshDocumentCwd = useMemo(() => {
    return debounce(async () => {
      const pid = ptyProcess.getPid();
      const cwd = await ctx.serviceTerminals.getWorkingDirectory(pid);
      ctx.serviceDocs.update(doc.uri, { cwd, title: cwd });
    }, 2000);
  }, [ptyProcess]);

  useEffect(() => {
    let disposed = false;
    if (!ptyProcess) {
      createPtyProcess().then(pty => {
        if (!disposed) {
          setPtyProcess(pty);
          updateDocumentPid(pty);
        }
      });
    }

    return () => {
      disposed = true;
      ptyProcess?.dispose();
    };
  }, [ptyProcess]);

  return {
    ptyProcess,
    refreshDocumentCwd,
  };
}

export type Props = {
  doc: types.DocumentPtySession | types.DocumentTshNode;
  visible: boolean;
};
