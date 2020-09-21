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
import { matchPath } from 'react-router';
import SideNavItemIcon from './SideNavItemIcon';
import SideNavItem from './SideNavItem';
import * as Icons from 'design/Icon';
import { Item } from './useSideNav';

const SideNavItemGroup: React.FC<{ path: string; item: Item }> = props => {
  const { item, path } = props;
  const [expanded, setExpanded] = React.useState(() =>
    isChildActive(path, item)
  );
  const ArrowIcon = expanded ? Icons.ArrowDown : Icons.ArrowRight;
  const style = {
    display: expanded ? 'block' : 'none',
  };

  const $children = item.items.map((i, index) => (
    <SideNavItem
      key={index}
      $nested={true}
      as={NavLink}
      exact={i.exact}
      to={i.route}
    >
      <SideNavItemIcon as={i.Icon} fontSize="2" mr={2} />
      {i.title}
    </SideNavItem>
  ));

  return (
    <>
      <StyledGroup as="button" onClick={() => setExpanded(!expanded)}>
        <SideNavItemIcon as={item.Icon} />
        {item.title}
        <ArrowIcon
          ml="auto"
          mr={-2}
          color="inherit"
          style={{ fontSize: '14px' }}
        />
      </StyledGroup>
      <div style={style}>{$children}</div>
    </>
  );
};

export default SideNavItemGroup;

function isChildActive(url: string, item: Item) {
  return item.items.some(
    i =>
      !!matchPath(url, {
        path: i.route,
        exact: i.exact,
      })
  );
}

const fromTheme = ({ theme }) => {
  return {
    fontSize: '12px',
    fontWeight: theme.bold,
    fontFamily: theme.font,
    paddingLeft: theme.space[9] + 'px',
    paddingRight: theme.space[5] + 'px',
    background: theme.colors.primary.light,
    color: theme.colors.text.secondary,
    minHeight: '56px',
    '&:hover': {
      color: theme.colors.text.primary,
    },
  };
};

const StyledGroup = styled.div`
  ${fromTheme}
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: none;
  border-left: 4px solid transparent;
  cursor: pointer;
  outline: none;
  text-decoration: none;
  width: 100%;
  line-height: 24px;
`;
