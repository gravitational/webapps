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

import { useAppContext } from './../appContextProvider';
import * as Icons from 'design/Icon';
import * as types from '../types';

export default function useNavigator() {
  const ctx = useAppContext();
  const homeItem = initHomeItem(ctx.cfg.routes.home);

  ctx.serviceDocs.useState();
  ctx.serviceClusters.useState();

  function processItemClick(item: types.NavItem) {
    ctx.serviceDocs.open(item.uri);
  }

  return {
    homeItem,
    processItemClick,
  };
}

function initHomeItem(uri: string): types.NavItem {
  return {
    uri,
    title: 'Home',
    Icon: Icons.Clusters,
    kind: 'home',
    items: [],
    group: false,
  };
}

export type State = ReturnType<typeof useNavigator>;
