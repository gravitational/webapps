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

import { color } from 'design/system';

import type { ColorProps } from 'design/system';

interface SideNavItemBaseProps {
  $nested?: boolean;
}

type SideNavItemProps = SideNavItemBaseProps & ColorProps;

export const SideNavItem = styled.div<SideNavItemProps>`
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
  position: relative;
  font-size: ${p => (p.$nested ? '11px' : '12px')};
  font-weight: ${p => p.theme.regular};
  font-family: ${p => p.theme.font};
  padding-left: ${p => (p.$nested ? '96px' : p.theme.space[9] + 'px')};
  padding-right: ${p => p.theme.space[5] + 'px'};
  background: ${p => (p.$nested ? 'none' : p.theme.colors.primary.light)};
  color: ${p => p.theme.colors.text.secondary};
  min-height: ${p => (p.$nested ? '40px' : '56px')};

  &:active,
  &.active {
    border-left-color: ${p => (p.$nested ? 'none' : p.theme.colors.accent)};
    background: ${p => (p.$nested ? 'none' : p.theme.colors.primary.lighter)};
    color: ${p => p.theme.colors.primary.contrastText};
    font-weight: ${p => (p.$nested ? p.theme.regular : p.theme.bold)};

    .marker {
      background: ${p => (p.$nested ? 'none' : p.theme.colors.secondary.light)};
    }
  }

  &:hover {
    background: ${p => (p.$nested ? 'none' : p.theme.colors.primary.lighter)};
  }

  &:focus,
  &:hover {
    color: ${p => p.theme.colors.primary.contrastText};
  }

  ${color}
`;
