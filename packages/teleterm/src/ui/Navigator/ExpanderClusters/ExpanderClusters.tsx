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
import { Flex, Text, ButtonIcon } from 'design';
import * as Icons from 'design/Icon';
import Expander, { ExpanderHeader, ExpanderContent } from './../Expander';
import NavItem from 'teleterm/ui/Navigator/NavItem';
import useExpanderClusters, {
  State,
  ClusterNavItem,
} from './useExpanderClusters';

export default function Container() {
  const state = useExpanderClusters();
  return <ExpanderClusters {...state} />;
}

export const ExpanderClusters: React.FC<State> = props => {
  const { clusterItems, openLoginDialog, syncClusters, addCluster } = props;

  const handleSyncClick = (e: React.BaseSyntheticEvent) => {
    e.stopPropagation();
    syncClusters();
  };

  const handleAddClick = (e: React.BaseSyntheticEvent) => {
    e.stopPropagation();
    addCluster();
  };

  const $onlineClusters = clusterItems
    .filter(i => i.connected)
    .map(i => <ClusterItem key={i.uri} item={i} />);

  const $offlineClusters = clusterItems
    .filter(i => !i.connected)
    .map(i => (
      <ClusterOfflineItem
        key={i.uri}
        item={i}
        onSync={() => openLoginDialog(i.uri)}
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
            <ButtonIcon
              p={3}
              color="text.placeholder"
              onClick={handleSyncClick}
            >
              <Icons.Restore />
            </ButtonIcon>
            <ButtonIcon color="text.placeholder" onClick={handleAddClick}>
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
  const { title, items } = props.item;
  return (
    <Expander>
      <ExpanderHeader pl={5}>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          flex="1"
          width="100%"
        >
          <Text typography="body1" style={{ position: 'relative' }}>
            {title}
          </Text>
        </Flex>
      </ExpanderHeader>
      <ExpanderContent>
        {items.map(i => (
          <NavItem key={i.uri} pl={9} item={i} />
        ))}
      </ExpanderContent>
    </Expander>
  );
};

const ClusterOfflineItem: React.FC<{
  item: ClusterNavItem;
  onSync(): void;
}> = props => {
  const { item, onSync } = props;
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
          <ButtonIcon
            color="text.placeholder"
            onClick={(e: React.BaseSyntheticEvent) => {
              e.stopPropagation();
              onSync();
            }}
          >
            <Icons.Restore />
          </ButtonIcon>
        </Flex>
      </ExpanderHeader>
      <ExpanderContent></ExpanderContent>
    </Expander>
  );
};
