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
import { NavLink } from 'react-router-dom';
import NavItemIcon from './NavItemIcon';
import NavItem from './NavItem';
import useNavigator from './useNavigator';
import * as Icons from 'design/Icon';
import { ButtonIcon, Flex } from 'design';

export default function Container() {
  const state = useNavigator();
  return <Navigator {...state} />;
}

export function Navigator(props: ReturnType<typeof useNavigator>) {
  const { items } = props;

  return (
    <Nav>
      <NavItem>
        <NavItemIcon as={Icons.Cli} />
        Terminal
      </NavItem>
      <NavItem>
        <NavItemIcon as={Icons.Cli} />
        Gateways
      </NavItem>
      <NavItem>
        <NavItemIcon as={Icons.Cli} />
        <Flex flex="1" justifyContent="space-between" alignItems="center">
          Clusters
          <ButtonIcon>
            <Icons.Add />
          </ButtonIcon>
        </Flex>
      </NavItem>
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
