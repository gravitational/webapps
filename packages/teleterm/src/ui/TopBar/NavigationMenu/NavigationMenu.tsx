import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useIdentity } from '../Identity/useIdentity';
import { MoreVert, OpenBox, Add } from 'design/Icon';
import { Box, Text, Flex } from 'design';
import { NavigationItem } from './NavigationItem';
import Popover from 'design/Popover';
import { AccessRequestDocumentState } from 'teleterm/ui/services/workspacesService';

export function NavigationMenuContainer() {
  const { activeRootCluster } = useIdentity();
  return (
    <NavigationMenu
      clusterName={activeRootCluster?.name}
      clusterUri={activeRootCluster?.uri}
    />
  );
}

const navigationItems: {
  title: string;
  Icon: JSX.Element;
  state: AccessRequestDocumentState;
}[] = [
  {
    title: 'New Access Request',
    Icon: <Add fontSize={2} />,
    state: 'creating',
  },
  {
    title: 'Review Access Requests',
    Icon: <OpenBox fontSize={2} />,
    state: 'reviewing',
  },
];

function NavigationMenu({ clusterName, clusterUri }) {
  const [isPopoverOpened, setIsPopoverOpened] = useState(false);
  const selectorRef = useRef<HTMLButtonElement>();

  if (!clusterName) {
    return <></>;
  }
  return (
    <>
      <Container
        ref={selectorRef}
        isOpened={isPopoverOpened}
        onClick={() => setIsPopoverOpened(true)}
      >
        <MoreVert fontSize={6} />
      </Container>
      <Popover
        open={isPopoverOpened}
        anchorEl={selectorRef.current}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={() => setIsPopoverOpened(false)}
        popoverCss={() => `max-width: min(560px, 90%)`}
      >
        <MenuContainer p={3}>
          <Box minWidth="280px">
            <Text fontWeight={700}>Go To</Text>
            <Flex flexDirection="column">
              {navigationItems.map((item, index) => (
                <NavigationItem
                  key={index}
                  Icon={item.Icon}
                  state={item.state}
                  title={item.title}
                  closeMenu={() => setIsPopoverOpened(false)}
                  clusterUri={clusterUri}
                />
              ))}
            </Flex>
          </Box>
        </MenuContainer>
      </Popover>
    </>
  );
}

const Container = styled.button`
  display: flex;
  font-family: inherit;
  background: inherit;
  cursor: pointer;
  align-items: center;
  color: ${props => props.theme.colors.text.primary};
  flex-direction: row;
  height: 100%;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  border-color: ${props =>
    props.isOpened
      ? props.theme.colors.action.disabledBackground
      : 'transparent'};

  &:hover {
    background: ${props => props.theme.colors.primary.light};
  }
`;

const MenuContainer = styled(Box)`
  background: ${props => props.theme.colors.primary.light};
`;
