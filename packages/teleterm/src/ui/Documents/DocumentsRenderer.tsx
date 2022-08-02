import React from 'react';

import styled from 'styled-components';

import { useAppContext } from 'teleterm/ui/appContextProvider';
import * as types from 'teleterm/ui/services/workspacesService';
import { DocumentsService } from 'teleterm/ui/services/workspacesService';
import DocumentCluster from 'teleterm/ui/DocumentCluster';
import DocumentGateway from 'teleterm/ui/DocumentGateway';
import DocumentTerminal from 'teleterm/ui/DocumentTerminal';
import Document from 'teleterm/ui/Document';

import { WorkspaceDocumentsServiceProvider } from './workspaceDocumentsServiceContext';
import { KeyboardShortcutsPanel } from './KeyboardShortcutsPanel';

export function DocumentsRenderer() {
  const { workspacesService } = useAppContext();

  function renderDocuments(documentsService: DocumentsService) {
    return documentsService.getDocuments().map(doc => {
      const isActiveDoc = workspacesService.isDocumentActive(doc.uri);
      return <MemoizedDocument doc={doc} visible={isActiveDoc} key={doc.uri} />;
    });
  }

  return (
    <>
      {workspacesService
        .getWorkspacesDocumentsServices()
        .map(({ clusterUri, workspaceDocumentsService }) => (
          <DocumentsContainer
            isVisible={clusterUri === workspacesService.getRootClusterUri()}
            key={clusterUri}
          >
            <WorkspaceDocumentsServiceProvider
              value={workspaceDocumentsService}
            >
              {workspaceDocumentsService.getDocuments().length ? (
                renderDocuments(workspaceDocumentsService)
              ) : (
                <KeyboardShortcutsPanel />
              )}
            </WorkspaceDocumentsServiceProvider>
          </DocumentsContainer>
        ))}
    </>
  );
}

const DocumentsContainer = styled.div`
  display: ${props => (props.isVisible ? 'contents' : 'none')};
`;

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
