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
import styled from 'design/styled';
import { NavLink, Link } from 'react-router-dom';
import { Flex, Image } from 'design';

import cfg from 'teleport/config';

import { SideNavItemIcon } from './SideNavItemIcon';
import { SideNavItem } from './SideNavItem';
import { SideNavItemGroup } from './SideNavItemGroup';

import logoSvg from './logo';
import useSideNav, { Item } from './useSideNav';

interface SideNavItemsProps {
  items: Item[];
  path: string;
}

export function SideNavItems(props: SideNavItemsProps) {
  return (
    <>
      {props.items.map((item, index) => {
        const isChild = item.items.length > 0;
        if (isChild) {
          return <SideNavItemGroup path={props.path} item={item} key={index} />;
        }

        return (
          <SideNavItem
            key={index}
            as={NavLink}
            exact={item.exact}
            to={item.route}
          >
            <SideNavItemIcon as={item.Icon} />
            {item.title}
          </SideNavItem>
        );
      })}
    </>
  );
}

export function SideNavContainer(props: { children?: React.ReactNode }) {
  return (
    <Nav>
      <Logo />
      <Content>{props.children}</Content>
    </Nav>
  );
}

export function SideNav() {
  const { items, path } = useSideNav();

  return (
    <SideNavContainer>
      <SideNavItems items={items} path={path} />
    </SideNavContainer>
  );
}

export const Logo = () => (
  <LogoItem pl="4" width="208px" as={Link} to={cfg.routes.root}>
    <Image src={logoSvg} mx="3" maxHeight="24px" maxWidth="160px" />
  </LogoItem>
);

const LogoItem = styled(Flex)`
  min-height: 56px;
  align-items: center;
  cursor: pointer;
  outline: none;
  text-decoration: none;
  width: 100%;

  &:hover {
    background: ${p => p.theme.colors.primary.lighter};
    color: ${p => p.theme.colors.primary.contrastText};
  }
`;

export const Nav = styled.nav`
  background: ${props => props.theme.colors.primary.light};
  border-right: 1px solid ${props => props.theme.colors.primary.dark};
  overflow: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-width: var(--sidebar-width);
  width: var(--sidebar-width);
  box-sizing: border-box;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
`;
