/*
Copyright 2019 Gravitational, Inc.

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

import React, { useEffect } from 'react';
import Document from 'teleterm/ui/Document';
import useDocTerminal, { Props } from './useDocumentTerminal';
import Terminal from './Terminal';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import { ResourceReconnect } from 'teleterm/ui/ResourceReconnect';

export default function DocumentTerminalContainer(props: Props) {
  const ctx = useAppContext();
  const { doc } = props;

  useEffect(() => {
    if (
      doc.kind === 'doc.terminal_tsh_node' &&
      ctx.serviceClusters.findCluster(`/clusters/${doc.rootClusterId}`)
        ?.connected
    ) {
      ctx.serviceDocs.update(doc.uri, { status: 'connected' });
    }
  }, []);

  const documentTerminal = (
    <DocumentTerminal visible={props.visible} doc={doc} />
  );

  if (doc.kind === 'doc.terminal_shell') {
    return documentTerminal;
  }

  return (
    <ResourceReconnect
      visible={props.visible}
      connected={doc.status !== 'disconnected'}
      clusterId={doc.rootClusterId}
      afterReconnect={() => {
        ctx.serviceDocs.update(doc.uri, { status: 'connected' });
      }}
    >
      {documentTerminal}
    </ResourceReconnect>
  );
}

export function DocumentTerminal(props: Props & { visible: boolean }) {
  const { visible, doc } = props;
  const state = useDocTerminal(doc);
  const ptyProcess = state.data?.ptyProcess;

  return (
    <Document
      visible={visible}
      flexDirection="column"
      pl={2}
      onContextMenu={state.data?.openContextMenu}
    >
      {ptyProcess && (
        <Terminal
          ptyProcess={ptyProcess}
          visible={props.visible}
          onEnterKey={state.data.refreshTitle}
        />
      )}
    </Document>
  );
}
