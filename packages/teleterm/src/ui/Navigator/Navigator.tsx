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
import { Flex, Text } from 'design';
import * as Icons from 'design/Icon';
import useNavigator, { State } from './useNavigator';
import ExpanderClusters from './ExpanderClusters';
import ExpanderGateways from './ExpanderGateways';
import NavItem from './NavItem';

export default function Container() {
  const state = useNavigator();
  return <Navigator {...state} />;
}

export function Navigator(props: State) {
  const { homeItem } = props;
  return (
    <Nav bg="primary.dark">
      <StyledBorder />
      <Text typography="body1" py={1} ml={4}>
        Teleport Terminal
      </Text>
      <StyledBorder />
      <NavItem pl={2} item={homeItem} onClick={props.processItemClick}>
        <Icons.Home mr={2} />
        <Text typography="body1">{homeItem.title}</Text>
      </NavItem>
      <ExpanderGateways />
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
