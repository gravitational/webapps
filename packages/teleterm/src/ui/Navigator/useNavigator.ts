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

import { useAppContext, useAppStore } from './../appContextProvider';
import AppContext from './../appContext';
import * as Icons from 'design/Icon';
import * as types from '../types';

export default function useNavigator() {
  const ctx = useAppContext();
  useAppStore();
  const homeItem = initHomeItem(ctx);

  function processItemClick(item: types.NavItem) {
    ctx.openDocument(item.uri);
  }

  return {
    homeItem,
    processItemClick,
  };
}

function initHomeItem(ctx: AppContext): types.NavItem {
  return {
    title: 'Home',
    Icon: Icons.Clusters,
    uri: ctx.cfg.routes.home,
    kind: 'home',
    items: [],
    group: false,
  };
}

export type State = ReturnType<typeof useNavigator>;
