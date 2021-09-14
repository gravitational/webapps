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
import { color, space } from 'design/system';
import { Item } from './useNavigator';
import Icon from 'design/Icon';

type Props = {
  item?: Item;
  [key: string]: any;
};

const NavItem: React.FC<Props> = props => {
  const { item, ...styles } = props;
  return (
    <StyledNavItem {...styles}>
      {!props.children && (
        <>
          <NavItemIcon as={item.Icon} fontSize="2" mr={2} />
          {item.title}
        </>
      )}
      {props.children}
    </StyledNavItem>
  );
};

const StyledNavItem = styled.div(props => {
  const { theme } = props;
  return {
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    cursor: 'pointer',
    width: '100%',
    position: 'relative',
    fontSize: '14px',
    fontWeight: theme.regular,
    fontFamily: theme.font,
    color: theme.colors.text.primary,
    height: '36px',

    '&:active, &.active': {
      color: theme.colors.primary.contrastText,
    },

    '&:hover': {
      background: theme.colors.primary.light,
    },

    '&:focus, &:hover': {
      color: theme.colors.primary.contrastText,
    },

    ...color(props),
    ...space(props),
  };
});

const NavItemIcon = styled(Icon)``;
NavItemIcon.defaultProps = {
  mr: 2,
  ml: -2,
  fontSize: '12px',
  color: 'inherit',
};

export default NavItem;
