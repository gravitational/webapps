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
import { Box, Flex, Text } from 'design';
import {
  ExpanderHeader,
  ExpanderContent,
} from '../Expander';
import { useExpanderConnections, State } from './useExpanderConnections';
import { ExpanderConnectionItem } from './ExpanderConnectionItem';
import styled from 'styled-components';
import { NavigatorSplitPaneHeaderProps } from '../NavigatorSplitPanes';

export function ExpanderConnectionsBody() {
  const state = useExpanderConnections();
  return <ExpanderConnectionsBodyPresentational {...state} />;
}

export function ExpanderConnectionsBodyPresentational(props: State) {
  const { items } = props;
  return (
    <ExpanderContent>
      <Scrollable>
        {items.map(i => (
          <ExpanderConnectionItem
            key={i.id}
            item={i}
            onOpen={props.processClick}
            onRemove={props.processRemove}
            onContextMenu={props.onContextMenu}
          />
        ))}
      </Scrollable>
    </ExpanderContent>
  );
}

export function ExpanderConnectionsHeader(props: NavigatorSplitPaneHeaderProps) {
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
      >
        <Text typography="body1" bold>
          Connections
        </Text>
      </Flex>
    </ExpanderHeader>
  );
}

const Scrollable = styled(Box)`
  height: 100%;
  min-height: 0;
  overflow: auto;
`;
