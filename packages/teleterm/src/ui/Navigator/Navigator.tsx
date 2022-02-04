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
import styled from 'styled-components';
import { Box, Text } from 'design';
import {
  ExpanderClustersHeader,
  ExpanderClustersBody,
} from './ExpanderClusters';
import {
  ExpanderConnectionsHeader,
  ExpanderConnectionsBody,
} from './ExpanderConnections';
import { NavigatorSplitPanes } from './NavigatorSplitPanes';

export function Navigator() {
  return (
    <Nav bg="primary.main">
      <Text typography="subtitle2" m={2}>
        NAVIGATOR
      </Text>
      <NavigatorSplitPanes
        panes={[
          {
            key: 'connections',
            initialSize: '50%',
            minSize: 100,
            Header: ({ onToggle, expanded }) => (
              <ExpanderConnectionsHeader
                onToggle={onToggle}
                expanded={expanded}
              />
            ),
            Body: <ExpanderConnectionsBody />,
          },
          {
            key: 'clusters',
            minSize: 100,
            Header: ({ onToggle, expanded }) => (
              <ExpanderClustersHeader onToggle={onToggle} expanded={expanded} />
            ),
            Body: <ExpanderClustersBody />,
          },
        ]}
      />
    </Nav>
  );
}

const Nav = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
  user-select: none;
`;
