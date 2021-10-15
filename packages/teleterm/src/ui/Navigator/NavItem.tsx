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
import defaultTheme from 'design/theme';
import { color } from 'design/system';

const fromTheme = ({ $nested = false, theme = defaultTheme }) => {
  const css = {
    position: 'relative',
    fontSize: '12px',
    fontWeight: theme.regular,
    fontFamily: theme.font,
    paddingLeft: theme.space[3] + 'px',
    paddingRight: theme.space[2] + 'px',
    background: theme.colors.primary.light,
    color: theme.colors.text.secondary,
    minHeight: '42px',
    borderBottomColor: theme.colors.primary.dark,

    '&:active, &.active': {
      borderLeftColor: $nested ? 'none' : theme.colors.accent,
      background: theme.colors.primary.lighter,
      color: theme.colors.primary.contrastText,
      fontWeight: theme.bold,

      '.marker': {
        background: theme.colors.secondary.light,
      },
    },

    '&:hover': {},
    '&:focus, &:hover': {
      color: theme.colors.primary.contrastText,
    },
  };

  if ($nested) {
    css.fontSize = '11px';
    css.background = 'none';
    css.fontWeight = theme.regular;
    css.paddingLeft = '96px';
    css.minHeight = '40px';
  }

  return css;
};

const SideNavItem = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: none;
  border-bottom: 1px solid transparent;
  cursor: pointer;
  outline: none;
  text-decoration: none;
  width: 100%;
  line-height: 24px;
  ${fromTheme}
  ${color}
`;

export default SideNavItem;
