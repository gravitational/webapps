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
import Icon from 'design/Icon';
import { color, space } from 'design/system';
import * as types from 'teleterm/ui/Navigator/types';
import { useAppContext } from 'teleterm/ui/appContextProvider';

type Props = {
  item?: types.NavItem;
  onClick?: (item: types.NavItem) => void;
  [key: string]: any;
};

const NavItem: React.FC<Props> = props => {
  const { item, onClick, ...styles } = props;
  const { docsService } = useAppContext();
  const active = docsService.isActive(item.uri);

  const handleClick = () => {
    if (onClick) {
      onClick(item);
    } else {
      docsService.open(item.uri);
    }
  };

  return (
    <StyledNavItem $active={active} {...styles} onClick={handleClick}>
      {!props.children && (
        <>
          <Icon
            as={item.Icon}
            mr={2}
            ml={-2}
            fontSize="10px"
            color="text.secondary"
          />
          <div style={{ position: 'relative' }}>{item.title}</div>
        </>
      )}
      {props.children}
    </StyledNavItem>
  );
};

const StyledNavItem = styled.div(props => {
  const { theme, $active } = props;
  const colors = $active
    ? {
        color: theme.colors.primary.contrastText,
        background: theme.colors.primary.light,
      }
    : {};

  return {
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    cursor: 'pointer',
    width: '100%',
    position: 'relative',
    fontSize: '12px',
    fontWeight: theme.regular,
    fontFamily: theme.font,
    color: theme.colors.text.primary,
    height: '32px',

    '&:hover': {
      background: theme.colors.primary.light,
    },

    '&:focus, &:hover': {
      color: theme.colors.primary.contrastText,
    },

    ...colors,
    ...color(props),
    ...space(props),
  };
});

export default NavItem;
