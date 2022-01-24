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
import { Flex, Text, ButtonIcon, Box } from 'design';
import { Restore, Add } from 'design/Icon';
import Expander, { ExpanderHeader, ExpanderContent } from './../Expander';
import { ExpanderClusterProps , useExpanderClusters } from './useExpanderClusters';
import { ExpanderClusterItem } from './ExpanderClusterItem';

export function ExpanderClusters() {
  const state = useExpanderClusters();
  return <ExpanderClustersPresentational {...state} />;
}


export function ExpanderClustersPresentational(props: ExpanderClusterProps) {
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

  const $clustersItems = clusterItems.map(i => (
    <ExpanderClusterItem
      key={i.uri}
      item={i}
      onLogin={login}
      onRemove={remove}
      onLogout={logout}
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
          minWidth="0"
        >
          <Text typography="body1">Clusters</Text>
          <Flex>
            <ButtonIcon
              p={3}
              color="text.placeholder"
              onClick={handleSyncClick}
            >
              <Restore />
            </ButtonIcon>
            <ButtonIcon color="text.placeholder" onClick={handleAddClick}>
              <Add />
            </ButtonIcon>
          </Flex>
        </Flex>
      </ExpanderHeader>
      <ExpanderContent>
        <Box>{$clustersItems}</Box>
      </ExpanderContent>
    </Expander>
  );
}
