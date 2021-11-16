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
import { Flex, Text, ButtonIcon, ButtonBorder } from 'design';
import * as Icons from 'design/Icon';
import Expander, { ExpanderHeader, ExpanderContent } from './../Expander';
import NavItem, { StyledNavItem } from 'teleterm/ui/Navigator/NavItem';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import useExpanderClusters, {
  State,
  ClusterNavItem,
} from './useExpanderClusters';

export default function Container() {
  const state = useExpanderClusters();
  return <ExpanderClusters {...state} />;
}

export const ExpanderClusters: React.FC<State> = props => {
  const { serviceModals } = useAppContext();

  const handleConnect = (clusterUri: string) => {
    serviceModals.openDialog({
      kind: 'cluster-login',
      clusterUri,
    });
  };

  const handleAdd = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    serviceModals.openDialog({ kind: 'add-cluster' });
  };

  const $onlineClusters = props.clusterItems
    .filter(i => i.connected)
    .map(i => <ClusterItem key={i.uri} item={i} />);

  const $offlineClusters = props.clusterItems
    .filter(i => !i.connected)
    .map(i => (
      <ClusterOfflineItem
        key={i.uri}
        item={i}
        onClick={() => handleConnect(i.uri)}
      />
    ));

  return (
    <Expander>
      <ExpanderHeader>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          flex="1"
          width="100%"
        >
          <Text typography="body1">Clusters</Text>
          <Flex>
            <ButtonIcon p={3} color="text.placeholder">
              <Icons.Restore />
            </ButtonIcon>
            <ButtonIcon color="text.placeholder" onClick={handleAdd}>
              <Icons.Add />
            </ButtonIcon>
          </Flex>
        </Flex>
      </ExpanderHeader>
      <ExpanderContent>
        {$onlineClusters}
        {$offlineClusters}
      </ExpanderContent>
    </Expander>
  );
};

const ClusterItem: React.FC<{ item: ClusterNavItem }> = props => {
  const { title } = props.item;
  const $navItems = props.item.items.map(i => (
    <NavItem pl={9} key={i.uri} item={i} />
  ));

  return (
    <Expander>
      <ExpanderHeader pl={5}>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          flex="1"
          width="100%"
        >
          <Text typography="body1">{title}</Text>
          <ButtonIcon color="text.placeholder">
            <Icons.Trash />
          </ButtonIcon>
        </Flex>
      </ExpanderHeader>
      <ExpanderContent>{$navItems}</ExpanderContent>
    </Expander>
  );
};

const ClusterOfflineItem: React.FC<{
  item: ClusterNavItem;
  onClick(): void;
}> = props => {
  const { item, onClick } = props;
  return (
    <Expander>
      <ExpanderHeader pl={5} color="grey.500">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          flex="1"
          width="100%"
        >
          <Text typography="body1">{item.title}</Text>
          <ButtonIcon color="text.placeholder">
            <Icons.Trash />
          </ButtonIcon>
        </Flex>
      </ExpanderHeader>
      <ExpanderContent>
        <StyledNavItem pl={8}>
          <Text color="text.secondary">
            <ButtonBorder size="small" onClick={onClick}>
              connect
            </ButtonBorder>
          </Text>
        </StyledNavItem>
      </ExpanderContent>
    </Expander>
  );
};

/*
{!props.item.connected && (
        <ExpanderContent>
          <StyledNavItem pl={8}>
            <Text color="text.secondary">
              <ButtonBorder size="small">connect</ButtonBorder>
            </Text>
          </StyledNavItem>
        </ExpanderContent>
      )}

*/
