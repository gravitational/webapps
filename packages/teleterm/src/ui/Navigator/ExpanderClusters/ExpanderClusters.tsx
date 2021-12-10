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
  const {
    clusterItems,
    login,
    syncClusters,
    addCluster,
    logout,
    remove,
    openContextMenu,
  } = props;

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
    .map(i => (
      <ClusterItem key={i.uri} item={i} onRemove={remove} onLogout={logout} onContextMenu={openContextMenu(i)} />
    ));

  const $offlineClusters = clusterItems
    .filter(i => !i.connected)
    .map(i => (
      <ClusterOfflineItem
        key={i.uri}
        item={i}
        onRemove={remove}
        onLogin={login}
        onContextMenu={openContextMenu(i)}
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

type ClusterItemProps = {
  item: ClusterNavItem;
  onLogout(string): void;
  onRemove(string): void;
  onContextMenu(): void;
};

const ClusterItem: React.FC<ClusterItemProps> = props => {
  const { title, items } = props.item;

  function handleLogout(e: React.SyntheticEvent) {
    e.stopPropagation();
    props.onLogout(props.item.uri);
  }

  function handleRemove(e: React.SyntheticEvent) {
    e.stopPropagation();
    props.onRemove(props.item.uri);
  }

  return (
    <Expander>
      <ExpanderHeader pl={5}  onContextMenu={props.onContextMenu}>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          flex="1"
          width="100%"
        >
          <Text typography="body1" style={{ position: 'relative' }}>
            {title}
          </Text>
          <ButtonIcon color="text.placeholder" onClick={handleLogout}>
            <Icons.EmailSolid />
          </ButtonIcon>
          <ButtonIcon color="text.placeholder" onClick={handleRemove}>
            <Icons.Trash />
          </ButtonIcon>
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
  onLogin(string): void;
  onRemove(string): void;
  onContextMenu(): void;
}> = props => {
  const { item } = props;

  function handleRemove(e: React.SyntheticEvent) {
    e.stopPropagation();
    props.onRemove(item.uri);
  }

  function handleLogin(e: React.SyntheticEvent) {
    e.stopPropagation();
    props.onLogin(item.uri);
  }

  return (
    <Expander>
      <ExpanderHeader pl={5} color="grey.500" onContextMenu={props.onContextMenu}>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          flex="1"
          width="100%"
        >
          <Text typography="body1">{item.title}</Text>
          <ButtonIcon color="text.placeholder" onClick={handleLogin}>
            <Icons.Restore />
          </ButtonIcon>
          <ButtonIcon color="text.placeholder" onClick={handleRemove}>
            <Icons.Trash />
          </ButtonIcon>
        </Flex>
      </ExpanderHeader>
      <ExpanderContent />
    </Expander>
  );
};
