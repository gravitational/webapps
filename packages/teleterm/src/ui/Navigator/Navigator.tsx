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
import useNavigator, { State } from './useNavigator';
import ExpanderClusters from './ExpanderClusters';

import ExpanderGateways from './ExpanderGateways';

export default function Container() {
  const state = useNavigator();
  return <Navigator {...state} />;
}

export function Navigator(props: State) {
  const { clusterItems, gatewayItems } = props;

  return (
    <Nav>
      <ExpanderGateways items={gatewayItems} />
      <ExpanderClusters items={clusterItems} />
    </Nav>
  );
}

const Nav = styled.nav`
  background: ${props => props.theme.colors.primary.light};
  overflow: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
