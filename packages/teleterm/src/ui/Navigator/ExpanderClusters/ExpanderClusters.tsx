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
import {
  ExpanderHeader,
  ExpanderContent,
} from './../Expander';
import { useExpanderClusters } from './useExpanderClusters';
import { ExpanderClusterItem } from './ExpanderClusterItem';
import { ExpanderClusterState } from './types';
import { ButtonIcon } from 'teleterm/ui/components/ButtonIcon';
import styled from 'styled-components';
import { NavigatorSplitPaneHeaderProps } from '../NavigatorSplitPanes';

export function ExpanderClustersBody() {
  const state = useExpanderClusters();
  return <ExpanderClustersBodyPresentational {...state} />;
}

export function ExpanderClustersBodyPresentational(props: ExpanderClusterState) {
  const { items, onOpen, onOpenContextMenu } = props;

  const $clustersItems = items.map(i => (
    <ExpanderClusterItem
      key={i.clusterUri}
      item={i}
      onOpen={onOpen}
      onContextMenu={onOpenContextMenu}
    />
  ));

  return (
    <ExpanderContent>
      <Scrollable>{$clustersItems}</Scrollable>
    </ExpanderContent>
  );
}

export function ExpanderClustersHeader(props: NavigatorSplitPaneHeaderProps) {
  const state = useExpanderClusters();

  const handleSyncClick = (e: React.BaseSyntheticEvent) => {
    e.stopPropagation();
    state.onSyncClusters?.();
  };

  const handleAddClick = (e: React.BaseSyntheticEvent) => {
    e.stopPropagation();
    state.onAddCluster?.();
  };

  return (
    <ExpanderHeader
      onToggle={props.onToggle}
      expanded={props.expanded}
    >
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
  );
}

const Scrollable = styled(Box)`
  height: 100%;
  min-height: 0;
  overflow: auto;
`;
