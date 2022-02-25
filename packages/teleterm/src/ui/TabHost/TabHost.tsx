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
import * as types from 'teleterm/ui/services/workspacesService/documentsService/types';
import { Tabs } from 'teleterm/ui/Tabs';
import Document from 'teleterm/ui/Document';
import DocumentGateway from 'teleterm/ui/DocumentGateway';
import DocumentTerminal from 'teleterm/ui/DocumentTerminal';
import DocumentCluster from 'teleterm/ui/DocumentCluster';
import { useTabShortcuts } from './useTabShortcuts';
import { Workspace } from 'teleterm/ui/services/workspacesService/workspacesService';

export function TabHostContainer() {
  const ctx = useAppContext();
  ctx.workspacesService.useState();

  const isRootClusterSelected = !!ctx.workspacesService.state.rootClusterUri;

  return useMemo(() => {
    if (isRootClusterSelected) {
      return <TabHost />;
    }
    return <p>Select a cluster first</p>;
  }, [isRootClusterSelected]);
}

export function TabHost() {
  const ctx = useAppContext();
  const documentsService = ctx.workspacesService.getActiveWorkspaceDocumentService();
  const docActive = documentsService.getActive();
  ctx.workspacesService.useState();

  // enable keyboard shortcuts
  useTabShortcuts();

  function handleTabClick(doc: types.Document) {
    documentsService.open(doc.uri);
  }

  function handleTabClose(doc: types.Document) {
    documentsService.close(doc.uri);
  }

  function handleTabMoved(oldIndex: number, newIndex: number) {
    documentsService.swapPosition(oldIndex, newIndex);
  }

  function handleTabNew() {
    const doc = documentsService.createClusterDocument({
      clusterUri: ctx.workspacesService.state.rootClusterUri,
    });
    documentsService.add(doc);
    documentsService.open(doc.uri);
  }

  function handleTabContextMenu(doc: types.Document) {
    ctx.mainProcessClient.openTabContextMenu({
      documentKind: doc.kind,
      onClose: () => {
        documentsService.close(doc.uri);
      },
      onCloseOthers: () => {
        documentsService.closeOthers(doc.uri);
      },
      onCloseToRight: () => {
        documentsService.closeToRight(doc.uri);
      },
      onDuplicatePty: () => {
        documentsService.duplicatePtyAndActivate(doc.uri);
      },
    });
  }

  function getVisibleDocuments() {
    return ctx.workspacesService.getActiveWorkspace().documents;
  }

  function getAllDocuments(): Array<{ clusterUri: string; value: Workspace }> {
    return Object.entries(ctx.workspacesService.state.workspaces).map(
      ([clusterUri, value]) => {
        return { clusterUri, value };
      }
    );
  }

  function renderDocuments(documents: types.Document[]) {
    return documents.map(doc => {
      const isActiveDoc = doc === docActive;
      return <MemoizedDocument doc={doc} visible={isActiveDoc} key={doc.uri} />;
    });
  }

  return (
    <StyledTabHost>
      <Flex bg="terminalDark" height="32px">
        <Tabs
          flex="1"
          items={getVisibleDocuments()}
          onClose={handleTabClose}
          onSelect={handleTabClick}
          onContextMenu={handleTabContextMenu}
          activeTab={docActive?.uri}
          onMoved={handleTabMoved}
          disableNew={false}
          onNew={handleTabNew}
        />
      </Flex>
      {getAllDocuments().map((d, index) => (
        <div
          style={{
            display:
              d.clusterUri === ctx.workspacesService.state.rootClusterUri
                ? 'contents'
                : 'none',
          }}
          key={index}
        >
          {renderDocuments(d.value.documents)}
        </div>
      ))}
    </StyledTabHost>
  );
}

function MemoizedDocument(props: { doc: types.Document; visible: boolean }) {
  const { doc, visible } = props;
  return React.useMemo(() => {
    switch (doc.kind) {
      case 'doc.cluster':
        return <DocumentCluster doc={doc} visible={visible} />;
      case 'doc.gateway':
        return <DocumentGateway doc={doc} visible={visible} />;
      case 'doc.terminal_shell':
      case 'doc.terminal_tsh_node':
      case 'doc.terminal_tsh_kube':
        return <DocumentTerminal doc={doc} visible={visible} />;
      default:
        return (
          <Document visible={visible}>
            Document kind "{doc.kind}" is not supported
          </Document>
        );
    }
  }, [visible, doc]);
}

const StyledTabHost = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;