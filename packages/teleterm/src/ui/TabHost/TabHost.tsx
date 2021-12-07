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

import React, { useRef, Ref, useCallback } from 'react';
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
import useTabShortcuts from './useTabShortcuts';
import { ActiveDocumentRef, useDocumentCreator } from './useDocumentCreator';

export default function TabHost(props: Props) {
  const ctx = useAppContext();
  const { serviceDocs, mainProcessClient } = ctx;
  const documents = serviceDocs.getDocuments();
  const docActive = serviceDocs.getActive();
  const activeDocumentRef = useRef<ActiveDocumentRef>();
  const { getNewDocumentBasingOnActive } = useDocumentCreator({
    serviceDocs,
    activeDocumentRef,
  });

  const handleTabNew = useCallback(async () => {
    const newDocument = await getNewDocumentBasingOnActive();
    serviceDocs.addAndOpen(newDocument);
  }, [getNewDocumentBasingOnActive, serviceDocs]);

  // enable keyboard shortcuts
  useTabShortcuts(ctx, { openNewTab: handleTabNew });

  // subscribe
  serviceDocs.useState();

  function handleTabClick(doc: types.Document) {
    serviceDocs.open(doc.uri);
  }

  function handleTabClose(doc: types.Document) {
    serviceDocs.close(doc);
  }

  function handleTabMoved(oldIndex: number, newIndex: number) {
    serviceDocs.changeIndex(oldIndex, newIndex);
  }

  const $docs = documents.map(doc => {
    const isActiveDoc = doc === docActive;

    return (
      <MemoizedDocument
        doc={doc}
        visible={isActiveDoc}
        activeDocumentRef={isActiveDoc ? activeDocumentRef : null}
        key={doc.uri}
      />
    );
  });

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
          onMoved={handleTabMoved}
          disableNew={false}
          onNew={handleTabNew}
        />
      </Flex>
      {$docs}
    </StyledTabHost>
  );
}

function MemoizedDocument(props: {
  doc: types.Document;
  visible: boolean;
  activeDocumentRef: Ref<ActiveDocumentRef>;
}) {
  const { doc, visible, activeDocumentRef } = props;
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
        return (
          <DocumentTerminal
            doc={doc}
            visible={visible}
            ref={activeDocumentRef}
          />
        );
      default:
        return null;
    }
  }, [visible, doc, activeDocumentRef]);
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
