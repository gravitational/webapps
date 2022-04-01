import React, { useEffect } from 'react';
import styled from 'styled-components';
import { isEqual } from 'lodash';
import { Flex, Text } from 'design';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import { Document, Workspace } from 'teleterm/ui/services/workspacesService';

export function useTabsReopen() {
  const ctx = useAppContext();

  useEffect(() => {
    let notificationId;

    const reopenDocuments = () => {
      ctx.workspacesService.reopenPreviousDocuments(
        ctx.workspacesService.getRootClusterUri()
      );
      ctx.notificationsService.removeNotification(notificationId);
    };

    if (canReopenDocuments(ctx.workspacesService.getActiveWorkspace())) {
      // when changing workspaces, we need to make a time gap between closing previous and opening a new notification
      setTimeout(() => {
        notificationId = ctx.notificationsService.notifyInfo(
          <ReopenNotification onReopen={reopenDocuments} />,
          { autoRemoveDisabled: true }
        );
      }, 800);
    }

    return () => {
      if (notificationId) {
        ctx.notificationsService.removeNotification(notificationId);
      }
    };
  }, [ctx.workspacesService.getRootClusterUri()]);
}

function canReopenDocuments(workspace: Workspace) {
  const removeUri = (documents: Document[]) =>
    documents.map(d => ({ ...d, uri: undefined }));

  return (
    workspace.previous &&
    !isEqual(
      removeUri(workspace.previous.documents),
      removeUri(workspace.documents)
    )
  );
}

function ReopenNotification(props: { onReopen(): void }) {
  return (
    <Flex
      flexDirection="column"
      css={`
        line-height: 20px;
      `}
    >
      <Text fontSize={13}>Tabs from the previous session can be reopened</Text>
      <Link onClick={props.onReopen}>Reopen</Link>
    </Flex>
  );
}

const Link = styled.a`
  color: ${({ theme }) => theme.colors.link};

  :hover {
    text-decoration: underline;
  }
`;
