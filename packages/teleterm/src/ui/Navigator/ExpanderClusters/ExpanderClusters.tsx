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
import { Flex, Text, Box } from 'design';
import { Restore, Add } from 'design/Icon';
import Expander, { ExpanderHeader, ExpanderContent } from './../Expander';
import { useExpanderClusters } from './useExpanderClusters';
import { ExpanderClusterItem } from './ExpanderClusterItem';
import { ExpanderClusterState } from './types';
import { ButtonIcon } from 'teleterm/ui/components/ButtonIcon';

export function ExpanderClusters() {
  const state = useExpanderClusters();
  return <ExpanderClustersPresentational {...state} />;
}

export function ExpanderClustersPresentational(props: ExpanderClusterState) {
  const { items, onSyncClusters, onAddCluster, onOpen, onOpenContextMenu } =
    props;

  const handleSyncClick = (e: React.BaseSyntheticEvent) => {
    e.stopPropagation();
    onSyncClusters?.();
  };

  const handleAddClick = (e: React.BaseSyntheticEvent) => {
    e.stopPropagation();
    onAddCluster?.();
  };

  const $clustersItems = items.map(i => (
    <ExpanderClusterItem
      key={i.clusterUri}
      item={i}
      onOpen={onOpen}
      onContextMenu={onOpenContextMenu}
    />
  ));

  return (
    <Expander>
      <ExpanderHeader toggleTrigger='header'>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          flex="1"
          width="100%"
          minWidth="0"
        >
          <Text typography="body1" bold>
            Clusters
          </Text>
          <Flex>
            <ButtonIcon
              mr={2}
              color="text.primary"
              title="Sync clusters"
              onClick={handleSyncClick}
            >
              <Restore />
            </ButtonIcon>
            <ButtonIcon
              mr={1}
              color="text.primary"
              onClick={handleAddClick}
              title="Add cluster"
            >
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
