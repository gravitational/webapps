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

import React from 'react';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import * as types from 'teleterm/ui/types';

export default function useDocumentTerminal(doc: Props['doc']) {
  const ctx = useAppContext();
  const ptyProcess = React.useMemo(() => {
    if (doc.kind === 'terminal_tsh_session') {
      return ctx.servicePty.createPtyProcess({ ...doc, kind: 'tsh-login' });
    }

    if (doc.kind === 'terminal_shell') {
      return ctx.servicePty.createPtyProcess({ kind: 'new-shell' });
    }
  }, []);

  React.useEffect(() => {
    const cleanup = () => {
      ptyProcess.dispose();
    };

    return cleanup;
  }, []);

  return {
    ptyProcess,
  };
}

export type Props = {
  doc: types.DocumentPtySession | types.DocumentTshSession;
  visible: boolean;
};
