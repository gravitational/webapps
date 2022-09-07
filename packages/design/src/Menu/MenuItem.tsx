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

import styled, { fontSize, color, margin, padding } from 'design/styled';

import { Icon } from 'design/Icon';

import type { PropsWithTheme } from 'design/theme';

const fromTheme = (props: PropsWithTheme<unknown>) => {
  return {
    fontWeight: props.theme.regular,
    color: props.theme.colors.grey[600],

    '&:hover, &:focus': {
      color: props.theme.colors.link,
      background: props.theme.colors.grey[50],
    },
  };
};

export const MenuItem = styled.div([margin, padding, fontSize, color])`
  min-height: 40px;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-width: 140px;
  overflow: hidden;
  text-decoration: none;
  white-space: nowrap;

  &:hover,
  &:focus {
    text-decoration: none;

    ${Icon} {
      color: ${p => p.theme.colors.link};
    }
  }

  ${fromTheme}
`;

MenuItem.defaultProps = {
  bg: 'light',
  color: 'grey.400',
  fontSize: 1,
  px: 3,
};
