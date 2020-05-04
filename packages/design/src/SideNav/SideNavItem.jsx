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

import styled from 'styled-components';
import { borderColor } from './../system';
import defaultTheme from './../theme';

const fromTheme = ({ theme = defaultTheme }) => {
  return {
    background: theme.colors.primary.main,
    color: theme.colors.text.secondary,
    fontSize: theme.fontSizes[1],
    fontWeight: theme.bold,
    
    '&:active': {
      background: theme.colors.primary.light,
      color: theme.colors.primary.contrastText,
    },
    '&.active': {
      borderLeftColor: theme.colors.accent,
      background: theme.colors.primary.lighter,
      color: theme.colors.primary.contrastText,
    },
    '&:hover': {
      background: theme.colors.primary.light,
    },
  };
};

const SideNavItem = styled.button`
  align-items: center;
  border: none;
  border-left: 4px solid transparent;
  cursor: pointer;
  display: flex;
  height: 56px;
  margin: 0;
  outline: none;
  padding: 0 28px;
  text-decoration: none;
  text-align: left;
  transition: all .3s;
  ${fromTheme}
  ${borderColor}
`;

SideNavItem.displayName = 'SideNavItem';

SideNavItem.defaultProps = {
  bg: 'primary.main',
  theme: defaultTheme,
  color: 'text.primary',
};

export default SideNavItem;
