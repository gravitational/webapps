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

import { Store } from 'shared/libs/stores';
import { NavGroup } from 'teleport/types';

const defaultState = {
  sideNav: [] as NavItem[],
  topNav: [] as NavItem[],
  topMenu: [] as NavItem[],
};

export default class StoreNav extends Store<typeof defaultState> {
  state = {
    ...defaultState,
  };

  addTopMenuItem(item: NavItem) {
    const items = [...this.state.topMenu, item];
    return this.setState({
      topMenu: items,
    });
  }

  addTopItem(item: NavItem) {
    const items = [...this.state.topNav, item];
    return this.setState({
      topNav: items,
    });
  }

  addSideItem(item: NavItem) {
    const items = [...this.state.sideNav, item];
    return this.setState({
      sideNav: items,
    });
  }

  getSideItems() {
    return this.state.sideNav;
  }

  getTopMenuItems() {
    return this.state.topMenu;
  }

  getTopItems() {
    return this.state.topNav;
  }
}

export type NavItem = {
  title: string;
  Icon: any;
  exact?: boolean;
  getLink(clusterId: string): string;
  group?: NavGroup;
};
