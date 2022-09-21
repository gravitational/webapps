import React from 'react';
import styled from 'styled-components';
import { Box, Text, Flex } from 'design';
import { AccessRequestDocumentState } from 'teleterm/ui/services/workspacesService';
import { useAppContext } from 'teleterm/ui/appContextProvider';

export function NavigationItem({
  Icon,
  title,
  state,
  closeMenu,
  clusterUri,
}: NavigationItemProps) {
  const ctx = useAppContext();
  const docService = ctx.workspacesService.getActiveWorkspaceDocumentService();

  const onClick = () => {
    if (!docService) {
      return;
    }
    const doc = docService.createAccessRequestDocument({ clusterUri, state });
    docService.add(doc);
    docService.open(doc.uri);
    closeMenu();
  };
  return (
    <ListItem p={2} pl={0} gap={2} onClick={onClick}>
      <IconBox p={2}>{Icon}</IconBox>
      <Text>{title}</Text>
    </ListItem>
  );
}

const ListItem = styled(Flex)`
  border-radius: 4px;
  align-items: center;
  justify-content: start;
  cursor: pointer;
  &:hover {
    background: ${props => props.theme.colors.primary.lighter};
  }
`;

const IconBox = styled(Box)`
  display: flex;
  align-items: center;
  border-radius: 4px;
  background-color: ${props => props.theme.colors.primary.lighter};
`;

type NavigationItemProps = {
  state: AccessRequestDocumentState;
  title: string;
  Icon: JSX.Element;
  closeMenu: () => void;
  clusterUri: string;
};
