import React from 'react';
import Expander, { ExpanderHeader, ExpanderContent } from './../Expander';
import { Cross } from 'design/Icon';
import { ClusterNavItem } from './useExpanderClusters';
import NavItem from 'teleterm/ui/Navigator/NavItem';
import LinearProgress from 'teleterm/ui/components/LinearProgress';
import { Flex, Text, ButtonIcon, Box } from 'design';

const standardItemPadding = 5;
const expandedItemPadding = 7;

export function ExpanderClusterItem(props: ClusterItemProps) {
  const { item } = props;

  if (item.trustedClusters?.length) {
    return <ExpandableClusterItem {...props} />;
  }
  return <SimpleClusterItem {...props} pl={standardItemPadding} />;
}

function ExpandableClusterItem(props: ClusterItemProps) {
  const { item } = props;

  return (
    <Expander>
      <ExpanderHeader pl={standardItemPadding}>
        <SimpleClusterItem {...props} />
      </ExpanderHeader>
      <ExpanderContent>
        <Box>
          {item.trustedClusters.map(tc => (
            <SimpleClusterItem
              {...props}
              item={tc}
              key={tc.uri}
              pl={expandedItemPadding}
            />
          ))}
        </Box>
      </ExpanderContent>
    </Expander>
  );
}

function SimpleClusterItem(props: ClusterItemProps & { pl?: number }) {
  const { title, syncing, connected } = props.item;
  const titleColor = connected ? 'text.primary' : 'text.placeholder';

  function handleRemove(e: React.SyntheticEvent) {
    e.stopPropagation();
    props.onRemove(props.item.uri);
  }

  return (
    <NavItem item={props.item} pl={props.pl}>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        flex="1"
        width="100%"
        onContextMenu={props.onContextMenu}
      >
        <Flex
          justifyContent="center"
          alignItems="center"
          color={titleColor}
          minWidth={0}
        >
          <Text
            typography="body1"
            title={title}
          >
            {title}
            {syncing && <LinearProgress />}
          </Text>
        </Flex>
        <Flex>
          <ButtonIcon color="text.placeholder" onClick={handleRemove}>
            <Cross fontSize={12} />
          </ButtonIcon>
        </Flex>
      </Flex>
    </NavItem>
  );
}

type ClusterItemProps = {
  item: ClusterNavItem;
  onLogout(clusterUri: string): void;
  onLogin(clusterUri: string): void;
  onRemove(clusterUri: string): void;
  onContextMenu(): void;
};
