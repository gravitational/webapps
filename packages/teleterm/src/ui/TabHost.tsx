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
import { useStore } from 'shared/libs/stores';
import { useAppContext, useStoreDocs } from './appContextProvider';
import * as types from './types';
import Tabs from './Tabs';
import DocumentBlank from './DocumentBlank';

export default function TabHost(props: Props) {
  const appCtx = useAppContext();
  const storeDocs = appCtx.storeDocs;
  const documents = storeDocs.getDocuments();
  const activeDoc = documents.find(d => d.id === storeDocs.state.active);

  useStore(storeDocs);

  function onTabClick(doc: types.Document) {
    appCtx.gotoTab(doc);
  }

  function onTabClose(doc: types.Document) {
    appCtx.closeTab(doc);
  }

  function onTabNew() {}

  const $docs = documents.map(doc => (
    <MemoizedDocument doc={doc} visible={doc === activeDoc} key={doc.id} />
  ));

  return (
    <StyledTabHost {...props}>
      <Flex bg="bgTerminal" height="32px">
        <Tabs
          flex="1"
          items={documents}
          onClose={onTabClose}
          onSelect={onTabClick}
          activeTab={activeDoc.id}
          disableNew={false}
          onNew={onTabNew}
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
      case 'blank':
        return <DocumentBlank doc={doc} visible={visible} />;
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
