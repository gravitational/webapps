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

import React, { forwardRef } from 'react';

import styled from 'design/styled';

import { PropsWithTheme } from 'design/theme';

import type { CSSProp } from 'design/styled';

export interface MenuListProps {
  menuListCss?: (props: PropsWithTheme<MenuListProps>) => CSSProp;
}

export const MenuList = forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<MenuListProps>
>((props, ref) => {
  const { children, ...other } = props;

  return (
    <StyledMenuList role="menu" {...other} ref={ref}>
      {children}
    </StyledMenuList>
  );
});

const StyledMenuList = styled.div<MenuListProps>`
  background-color: ${props => props.theme.colors.light};
  border-radius: 4px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.24);
  box-sizing: border-box;
  max-height: calc(100% - 96px);
  overflow: hidden;
  position: relative;
  padding: 0;

  ${props => props.menuListCss && props.menuListCss(props)}
`;
