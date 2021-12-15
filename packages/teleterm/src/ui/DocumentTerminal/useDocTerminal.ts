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
import * as types from 'teleterm/ui/types';
import { PtyProcess } from 'teleterm/services/pty/types';

export default function useDocumentTerminal(doc: Props['doc']) {
  const ctx = useAppContext();
  const [ptyProcess, setPtyProcess] = useState<PtyProcess>();

  async function createPtyProcess(): Promise<PtyProcess> {
    if (doc.kind === 'terminal_tsh_session') {
      return ctx.serviceTerminals.createPtyProcess({
        ...doc,
        kind: 'tsh-login',
      });
    }

    if (doc.kind === 'terminal_shell') {
      return ctx.serviceTerminals.createPtyProcess({
        kind: 'new-shell',
        cwd: await getPreviousDocumentCwdIfPossible(),
      });
    }
  }

  async function getPreviousDocumentCwdIfPossible(): Promise<string> {
    const previouslyActive = ctx.serviceDocs.getPreviouslyActive();
    if (previouslyActive.kind === 'terminal_shell') {
      return ctx.serviceTerminals.getWorkingDirectory(previouslyActive.pid);
    }
  }

  function updateDocumentPid(pty: PtyProcess): void {
    ctx.serviceDocs.update(doc.uri, { pid: pty.getPid() });
  }

  useEffect(() => {
    if (!ptyProcess) {
      createPtyProcess().then(pty => {
        setPtyProcess(pty);
        updateDocumentPid(pty);
      });
    }

    return () => {
      ptyProcess?.dispose();
    };
  }, [ptyProcess]);

  return {
    ptyProcess,
  };
}

export type Props = {
  doc: types.DocumentPtySession | types.DocumentTshSession;
  visible: boolean;
};
