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
import { Image, SideNav, SideNavItem } from 'design';
import SideNavItemIcon from 'design/SideNav/SideNavItemIcon';
import {
  useStoreNav,
  useStoreClusterId,
} from 'teleport/teleportContextProvider';
import logoSvg from './logo';
import cfg from 'teleport/config';

export default function Nav() {
  const clusterId = useStoreClusterId().getId();
  const items = useStoreNav().getSideItems();
  const $items = items.map((item, index) => (
    <SideNavItem
      key={index}
      as={NavLink}
      exact={item.exact}
      to={item.getLink(clusterId)}
    >
      <SideNavItemIcon as={item.Icon} />
      {item.title}
    </SideNavItem>
  ));

  return (
    <SideNav>
      <StyledLogoItem pl="4" width="208px" as="a" href={cfg.routes.app}>
        <Image src={logoSvg} mx="3" maxHeight="24px" maxWidth="160px" />
      </StyledLogoItem>
      <div
        style={{ display: 'flex', flexDirection: 'column', overflow: 'auto' }}
      >
        {$items}
      </div>
    </SideNav>
  );
}

const StyledLogoItem = styled(SideNavItem)`
  &:focus,
  &:active {
    border-left-color: transparent;
    background: inherit;
  }
`;
