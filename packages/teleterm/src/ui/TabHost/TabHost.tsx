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

import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Flex } from 'design';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import * as types from 'teleterm/ui/types';
import Tabs from 'teleterm/ui/Tabs';
import DocumentHome from 'teleterm/ui/DocumentHome';
import DocumentServers from 'teleterm/ui/DocumentServers';
import DocumentDbs from 'teleterm/ui/DocumentDbs';
import DocumentGateway from 'teleterm/ui/DocumentGateway';
import DocumentTerminal from 'teleterm/ui/DocumentTerminal';
import {
  KeyboardShortcutHandlers,
  useKeyboardShortcuts,
} from 'teleterm/ui/services/keyboardShortcuts';
import DocumentService from 'teleterm/ui/services/docs';

export default function TabHost(props: Props) {
  const { serviceDocs } = useAppContext();
  const documents = serviceDocs.getDocuments();
  const docActive = serviceDocs.getActive();
  const { mainProcessClient } = useAppContext();

  function buildTabsShortcuts(
    serviceDocs: DocumentService
  ): KeyboardShortcutHandlers {
    const handle = (index: number) => () => {
      const docs = serviceDocs.getDocuments();
      if (docs[index]) {
        serviceDocs.open(docs[index].uri);
      }
    };

    return {
      'tab-1': handle(1),
      'tab-2': handle(2),
      'tab-3': handle(3),
      'tab-4': handle(4),
      'tab-5': handle(5),
      'tab-6': handle(6),
      'tab-7': handle(7),
      'tab-8': handle(8),
      'tab-9': handle(9),
    };
  }

  const tabsShortcuts = useMemo(() => buildTabsShortcuts(serviceDocs), [
    serviceDocs,
  ]);

  useKeyboardShortcuts(tabsShortcuts);

  // subscribe
  serviceDocs.useState();

  function handleTabClick(doc: types.Document) {
    serviceDocs.open(doc.uri);
  }

  function handleTabClose(doc: types.Document) {
    serviceDocs.close(doc);
  }

  function handleTabNew() {
    const doc = serviceDocs.addNewTerminalShellDocument();
    serviceDocs.open(doc.uri);
  }

  const $docs = documents.map(doc => (
    <MemoizedDocument doc={doc} visible={doc === docActive} key={doc.uri} />
  ));

  const openContextMenu = () => {
    mainProcessClient.openContextMenu();
  };

  return (
    <StyledTabHost {...props} onContextMenu={openContextMenu}>
      <Flex bg="bgTerminal" height="32px">
        <Tabs
          flex="1"
          items={documents}
          onClose={handleTabClose}
          onSelect={handleTabClick}
          activeTab={docActive.uri}
          disableNew={false}
          onNew={handleTabNew}
        />
      </Flex>
      {$docs}
    </StyledTabHost>
  );
}

function MemoizedDocument(props: { doc: types.Document; visible: boolean }) {
  const { doc, visible } = props;
  return React.useMemo(() => {
    switch (doc.kind) {
      case 'home':
        return <DocumentHome doc={doc} visible={visible} />;
      case 'servers':
        return <DocumentServers doc={doc} visible={visible} />;
      case 'dbs':
        return <DocumentDbs doc={doc} visible={visible} />;
      case 'gateway':
        return <DocumentGateway doc={doc} visible={visible} />;
      case 'terminal_shell':
      case 'terminal_tsh_session':
        return <DocumentTerminal doc={doc} visible={visible} />;

      default:
        return null;
    }
  }, [visible, doc]);
}

const StyledTabHost = styled.div`
  background-color: ${props => props.theme.colors.bgTerminal};
  display: flex;
  flex-direction: column;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

type Props = {
  [key: string]: any;
};
