/*
Copyright 2020 Gravitational, Inc.

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
import styled from 'styled-components';
import { Switch, Redirect, Route } from 'teleport/components/Router';
import { useTeleport } from 'teleport/teleportContextProvider';
import { SideNav, SideNavItem } from 'design';
import SideNavItemIcon from 'design/SideNav/SideNavItemIcon';
import getFeatures, { Feature } from './features/getFeatures';
import cfg from 'teleport/config';

export default function Container() {
  const teleCtx = useTeleport();
  const [features] = React.useState(() => {
    return getFeatures(teleCtx);
  });

  return <People features={features} />;
}

export function People({ features = [] as Feature[] }) {
  const $features = features.map((item, index) => {
    const { path, title, exact, component } = item.route;
    return (
      <Route
        title={title}
        key={index}
        path={path}
        exact={exact}
        component={component}
      />
    );
  });

  const $navItems = features.map((f, index) => (
    <SideNavItem
      key={index}
      as={NavLink}
      exact={f.navItem.exact}
      to={f.navItem.to}
    >
      <SideNavItemIcon as={f.navItem.Icon} />
      {f.navItem.title}
    </SideNavItem>
  ));

  // handle index route
  const index = features.length > 0 ? features[0].navItem.to : null;

  return (
    <VerticalSplit>
      <SideNav>{$navItems}</SideNav>
      <Switch>
        {$features}
        {index && <Redirect exact from={cfg.routes.people} to={index} />}
      </Switch>
    </VerticalSplit>
  );
}

const VerticalSplit = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
  overflow: hidden;
`;
