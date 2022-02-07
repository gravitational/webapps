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

import { useEffect } from 'react';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import { IAppContext } from 'teleterm/ui/types';
import * as types from 'teleterm/ui/services/docs/types';
import { PtyCommand } from 'teleterm/services/pty/types';
import useAsync from 'teleterm/ui/useAsync';

export default function useDocumentTerminal(doc: Doc) {
  const ctx = useAppContext();
  const [state, init] = useAsync(async () => initState(ctx, doc));

  useEffect(() => {
    init();
    return () => {
      state.data?.ptyProcess.dispose();
    };
  }, []);

  return state;
}

async function initState(ctx: IAppContext, doc: Doc) {
  const cmd = createCmd(doc);
  const ptyProcess = ctx.terminalsService.createPtyProcess(cmd);
  const openContextMenu = () => ctx.mainProcessClient.openTerminalContextMenu();

  const refreshTitle = async () => {
    if (cmd.kind !== 'pty.shell') {
      return;
    }

    const cwd = await ptyProcess.getCwd();
    ctx.docsService.update(doc.uri, { cwd, title: cwd });
  };

  ptyProcess.onOpen(() => {
    ctx.docsService.update(doc.uri, { status: 'connected' });
    refreshTitle();
  });

  ptyProcess.onExit(() => {
    ctx.docsService.close(doc.uri);
  });

  return {
    ptyProcess,
    refreshTitle,
    openContextMenu,
  };
}

function createCmd(doc: Doc): PtyCommand {
  if (doc.kind === 'doc.terminal_tsh_node') {
    return {
      ...doc,
      kind: 'pty.tsh-login',
    };
  }

  if (doc.kind === 'doc.terminal_tsh_kube') {
    return {
      ...doc,
      kind: 'pty.tsh-kube-login',
    };
  }

  return {
    kind: 'pty.shell',
    cwd: doc.cwd,
  };
}

type Doc = types.DocumentTerminal;

export type Props = {
  doc: Doc;
  visible: boolean;
};
