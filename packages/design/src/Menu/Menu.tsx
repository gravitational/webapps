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

import { PropsWithTheme } from 'design/theme';

import { StyledPopoverProps } from 'design/Popover/Popover';

import { Origins, Popover } from '../Popover';

import getScrollbarSize from './../utils/scrollbarSize';
import { MenuList, MenuListProps } from './MenuList';

import type { CSSProp } from 'design/styled';

const POSITION: Origins = {
  vertical: 'top',
  horizontal: 'right',
};

export class Menu extends React.Component<MenuProps> {
  menuListRef = React.createRef<HTMLDivElement>();

  handleEntering = (element: HTMLDivElement) => {
    const menuList = this.menuListRef.current;

    // Let's ignore that piece of logic if users are already overriding the width
    // of the menu.
    if (
      menuList &&
      element.clientHeight < menuList.clientHeight &&
      !menuList.style.width
    ) {
      const size = `${getScrollbarSize()}px`;
      menuList.style['paddingRight'] = size;
      menuList.style.width = `calc(100% + ${size})`;
    }

    if (this.props.onEntering) {
      this.props.onEntering(element);
    }
  };

  render() {
    const { children, popoverCss, menuListCss, ...other } = this.props;

    return (
      <Popover
        popoverCss={popoverCss}
        anchorEl={this.menuListRef.current}
        onEntering={this.handleEntering}
        anchorOrigin={POSITION}
        transformOrigin={POSITION}
        {...other}
      >
        <MenuList menuListCss={menuListCss} ref={this.menuListRef}>
          {children}
        </MenuList>
      </Popover>
    );
  }
}

export interface MenuProps extends MenuListProps {
  anchorEl?: HTMLElement;
  onClose?: () => void;
  onEntering?: (element: HTMLDivElement) => void;
  open?: boolean;
  popoverCss?: (props: PropsWithTheme<StyledPopoverProps>) => CSSProp;
  anchorOrigin?: Origins;
  transformOrigin?: Origins;
  getContentAnchorEl?: () => HTMLElement;
}
