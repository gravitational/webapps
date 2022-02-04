import React from 'react';
import {
  ContextualExpander,
  ContextualExpanderHeader,
  ContextualExpanderContent,
} from './../ContextualExpander';
import { ClusterNavItem } from './types';
import NavItem from 'teleterm/ui/Navigator/NavItem';
import LinearProgress from 'teleterm/ui/components/LinearProgress';
import { Flex, Text, Box } from 'design';
import styled from 'styled-components';

const simpleItemPadding = '35px';
const expandedItemPadding = '50px';

export function ExpanderClusterItem(props: ExpanderClusterItem) {
  const { item } = props;

  if (item.leaves?.length) {
    return <ExpanderClusterWithLeaves {...props} />;
  }
  return <ClusterItem {...props} pl={simpleItemPadding} />;
}

function ExpanderClusterWithLeaves(props: ExpanderClusterItem) {
  const { item } = props;

  return (
    <ContextualExpander>
      <StyledExpanderHeader
        toggleTrigger="icon"
        pl="25px"
        $active={item.active}
      >
        <ClusterItem {...props} />
      </StyledExpanderHeader>
      <ContextualExpanderContent>
        <Box>
          {item.leaves.map(tc => (
            <ClusterItem
              {...props}
              item={tc}
              key={tc.clusterUri}
              pl={expandedItemPadding}
              onOpen={props.onOpen}
            />
          ))}
        </Box>
      </ContextualExpanderContent>
    </ContextualExpander>
  );
}

function ClusterItem(props: ExpanderClusterItem & { pl?: string }) {
  const { title, syncing, clusterUri, connected } = props.item;
  const titleColor = connected ? 'text.primary' : 'text.placeholder';

  function handleClick() {
    props.onOpen(clusterUri);
  }

  return (
    <NavItem
      active={props.item.active}
      item={props.item}
      pl={props.pl}
      onClick={handleClick}
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        flex="1"
        width="100%"
        onContextMenu={() => props.onContextMenu(props.item)}
        style={{ position: 'relative' }}
      >
        <Flex
          justifyContent="center"
          alignItems="center"
          color={titleColor}
          minWidth={0}
        >
          <Text typography="body1" title={title}>
            {title}
            {syncing && <LinearProgress />}
          </Text>
        </Flex>
      </Flex>
    </NavItem>
  );
}

type ExpanderClusterItem = {
  item: ClusterNavItem;
  onContextMenu(item: ClusterNavItem): void;
  onOpen(clusterUri: string): void;
};

const StyledExpanderHeader = styled(ContextualExpanderHeader)(props => {
  const colors = props.$active
    ? {
        color: props.theme.colors.primary.contrastText,
        background: props.theme.colors.primary.lighter,
      }
    : {};

  return {
    ...colors,
    height: '32px',
  };
});
