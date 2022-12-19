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

import useWebSession from 'teleport/useWebSession';
import AjaxPoller from 'teleport/components/AjaxPoller';

import { useConsoleContext, useStoreDocs } from './consoleContextProvider';
import * as stores from './stores/types';
import { colors } from './colors';
import Tabs from './Tabs';
import ActionBar from './ActionBar';
import DocumentSsh from './DocumentSsh';
import DocumentNodes from './DocumentNodes';
import DocumentBlank from './DocumentBlank';
import usePageTitle from './usePageTitle';
import useTabRouting from './useTabRouting';
import useOnExitConfirmation from './useOnExitConfirmation';
import useKeyboardNav from './useKeyboardNav';

const POLL_INTERVAL = 5000; // every 5 sec

export default function Console() {
  const consoleCtx = useConsoleContext();
  const webSession = useWebSession();
  const { verifyAndConfirm } = useOnExitConfirmation(consoleCtx, webSession);
  const { clusterId, activeDocId } = useTabRouting(consoleCtx);

  const storeDocs = consoleCtx.storeDocs;
  const documents = storeDocs.getDocuments();
  const activeDoc = documents.find(d => d.id === activeDocId);
  const hasSshSessions = storeDocs.getSshDocuments().length > 0;

  useKeyboardNav(consoleCtx);
  useStoreDocs(consoleCtx);
  usePageTitle(activeDoc);

  function onTabClick(doc: stores.Document) {
    consoleCtx.gotoTab(doc);
  }

  function onTabClose(doc: stores.Document) {
    if (verifyAndConfirm(doc)) {
      consoleCtx.closeTab(doc);
    }
  }

  function onTabNew() {
    consoleCtx.gotoNodeTab(clusterId);
  }

  function onRefresh() {
    return consoleCtx.refreshParties();
  }

  function onLogout() {
    webSession.logout();
  }

  const disableNewTab = storeDocs.getNodeDocuments().length > 0;
  const $docs = documents.map(doc => (
    <MemoizedDocument doc={doc} visible={doc.id === activeDocId} key={doc.id} />
  ));

  return (
    <StyledConsole>
      <Flex bg={colors.terminalDark} height="32px">
        <Tabs
          flex="1"
          items={documents}
          onClose={onTabClose}
          onSelect={onTabClick}
          activeTab={activeDocId}
          clusterId={clusterId}
          disableNew={disableNewTab}
          onNew={onTabNew}
        />
        <ActionBar onLogout={onLogout} />
      </Flex>
      {$docs}
      {hasSshSessions && (
        <AjaxPoller time={POLL_INTERVAL} onFetch={onRefresh} />
      )}
    </StyledConsole>
  );
}

/**
 * Ensures that document is not getting re-rendered if it's invisible
 */
function MemoizedDocument(props: { doc: stores.Document; visible: boolean }) {
  const { doc, visible } = props;
  return React.useMemo(() => {
    switch (doc.kind) {
      case 'terminal':
        return <DocumentSsh doc={doc} visible={visible} />;
      case 'nodes':
        return <DocumentNodes doc={doc} visible={visible} />;
      default:
        return <DocumentBlank doc={doc} visible={visible} />;
    }
  }, [visible, doc]);
}

const StyledConsole = styled.div`
  background-color: ${colors.bgTerminal};
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
`;
