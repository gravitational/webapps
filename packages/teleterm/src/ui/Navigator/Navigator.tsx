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
import { Flex } from 'design';
import ExpanderClusters from './ExpanderClusters';
import ExpanderConnections from './ExpanderConnections';
import { space, width, color, height } from 'styled-system';

export default function Navigator() {
  return (
    <Nav bg="primary.dark">
      <StyledBorder />
      <Input placeholder="Search..." />
      <StyledBorder />
      <ExpanderConnections />
      <ExpanderClusters />
    </Nav>
  );
}

const Nav = styled(Flex)`
  overflow: auto;
  height: 100%;
  flex-direction: column;
  user-select: none;
`;

const StyledBorder = styled.div(({ theme }) => {
  return {
    background: theme.colors.primary.lighter,
    height: '1px',
  };
});

const Input = styled.input(props => {
  const { theme } = props;
  return {
    background: theme.colors.primary.light,
    boxSizing: 'border-box',
    color: theme.colors.text.primary,
    width: '100%',
    border: 'none',
    outline: 'none',
    padding: '4px 12px',
    '&:hover, &:focus': {
      color: theme.colors.primary.contrastText,
      background: theme.colors.primary.lighter,
      opacity: 1,
    },

    ...space(props),
    ...width(props),
    ...height(props),
    ...color(props),
  };
});
