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

import styled, { borderColor } from 'design/styled';

import { Flex } from 'design/Flex';

export const SideNavItem = styled(Flex, [borderColor])`
  min-height: 56px;
  align-items: center;
  justify-content: flex-start;
  border-left: 4px solid transparent;
  cursor: pointer;
  outline: none;
  text-decoration: none;
  width: 100%;
  background: ${p => p.theme.colors.primary.light};
  color: ${p => p.theme.colors.text.secondary};
  font-size: ${p => p.theme.fontSizes[1]};
  font-weight: ${p => p.theme.bold};

  &:active,
  &.active {
    border-left-color: ${p => p.theme.colors.accent};
    background: ${p => p.theme.colors.primary.lighter};
    color: ${p => p.theme.colors.primary.contrastText};
  }

  &:hover,
  &:focus {
    background: ${p => p.theme.colors.primary.lighter};
    color: ${p => p.theme.colors.primary.contrastText};
  }
`;

SideNavItem.defaultProps = {
  pl: 9,
  pr: 5,
  bg: 'primary.main',
  color: 'text.primary',
};
