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
import ClusterNavButton from 'teleterm/ui/DocumentCluster/ClusterNavButton';
import { NavLocation } from 'teleterm/ui/DocumentCluster/clusterContext';

export type SideNavItem = {
  to: NavLocation;
  title: string;
};

export type SideNavProps = {
  items: SideNavItem[];
};

export default function SideNav({ items }: SideNavProps) {
  const $items = items.map((item, index) => {
    return (
      <ClusterNavButton py={1} title={item.title} to={item.to} key={index} />
    );
  });

  return (
    <Nav>
      <div
        style={{ display: 'flex', flexDirection: 'column', overflow: 'auto' }}
      >
        {$items}
      </div>
    </Nav>
  );
}

const Nav = styled.nav`
  min-width: 180px;
  width: 240px;
  overflow: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
