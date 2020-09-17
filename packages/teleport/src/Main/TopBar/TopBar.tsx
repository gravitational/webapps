/*
Copyright 2019-2020 Gravitational, Inc.

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
import { NavLink } from 'react-router-dom';
import TopNavUserMenu from 'design/TopNav/TopNavUserMenu';
import { MenuItemIcon, MenuItem } from 'design/Menu';
import session from 'teleport/services/session';
import { useTeleport } from 'teleport/teleportContextProvider';
import { Flex, ButtonPrimary, TopNav } from 'design';
import TeleportContext from 'teleport/teleportContext';
import ClusterSelector from './ClusterSelector';
import { useTheme } from 'styled-components';
import history from 'teleport/services/history';
import cfg from 'teleport/config';

export default function Container() {
  const ctx = useTeleport();
  const state = useTopBar(ctx);
  return <TopBar {...state} />;
}

export function TopBar(props: ReturnType<typeof useTopBar>) {
  const {
    username,
    loadClusters,
    popupItems,
    changeCluster,
    clusterId,
  } = props;

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  function showMenu() {
    setOpen(true);
  }

  function closeMenu() {
    setOpen(false);
  }

  function logout() {
    closeMenu();
    props.logout();
  }

  const menuItemProps = {
    onClick: closeMenu,
    py: 2,
    as: NavLink,
    exact: true,
  };

  const $userMenuItems = popupItems.map((item, index) => (
    <MenuItem {...menuItemProps} key={index} to={item.getLink(props.clusterId)}>
      <MenuItemIcon as={item.Icon} mr="2" />
      {item.title}
    </MenuItem>
  ));

  return (
    <TopNav
      height="56px"
      bg="inherit"
      pl="5"
      style={{
        overflowY: 'initial',
        flexShrink: '0',
        borderBottom: `1px solid ${theme.colors.primary.main}`,
      }}
    >
      <ClusterSelector
        value={clusterId}
        width="400px"
        maxMenuHeight={200}
        mr="20px"
        onChange={changeCluster}
        onLoad={loadClusters}
      />
      <Flex ml="auto" height="100%">
        <TopNavUserMenu
          menuListCss={menuListCss}
          open={open}
          onShow={showMenu}
          onClose={closeMenu}
          user={username}
        >
          {$userMenuItems}
          <MenuItem>
            <ButtonPrimary my={3} block onClick={logout}>
              Sign Out
            </ButtonPrimary>
          </MenuItem>
        </TopNavUserMenu>
      </Flex>
    </TopNav>
  );
}

const menuListCss = () => `
  width: 250px;
`;

function useTopBar(ctx: TeleportContext) {
  const clusterId = ctx.storeClusterId.getId();
  const popupItems = ctx.storeNav.getTopMenuItems();
  const { username } = ctx.storeUser.state;

  function loadClusters() {
    return ctx.clusterService.fetchClusters();
  }

  function logout() {
    session.logout();
  }

  function changeCluster(value: string) {
    const loc = history.getLocation() as Location;
    const newPrefix = cfg.getClusterRoute(value);
    const oldPrefix = cfg.getClusterRoute(clusterId);
    const newPath = loc.pathname.replace(oldPrefix, newPrefix);
    history.push(newPath);
  }

  return {
    popupItems,
    username,
    clusterId,
    changeCluster,
    loadClusters,
    logout,
  };
}
