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

import React from 'react';
import styled from 'styled-components';
import { Flex } from 'design';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import * as types from 'teleterm/ui/types';
import Tabs from 'teleterm/ui/Tabs';
import DocumentHome from 'teleterm/ui/DocumentHome';
import DocumentServers from 'teleterm/ui/DocumentServers';
import DocumentDbs from 'teleterm/ui/DocumentDbs';
import DocumentGateway from 'teleterm/ui/DocumentGateway';

export default function TabHost(props: Props) {
  const { serviceDocs } = useAppContext();
  const documents = serviceDocs.getDocuments();
  const docActive = serviceDocs.getActive();

  serviceDocs.useState();

  function handleTabClick(doc: types.Document) {
    serviceDocs.open(doc.uri);
  }

  function handleTabClose(doc: types.Document) {
    serviceDocs.close(doc);
  }

  function handleTabNew() {}

  const $docs = documents.map(doc => (
    <MemoizedDocument doc={doc} visible={doc === docActive} key={doc.uri} />
  ));

  return (
    <StyledTabHost {...props}>
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

type Props = {
  [key: string]: any;
};

/**
 * Ensures that document is not getting re-rendered if it's invisible
 */
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
