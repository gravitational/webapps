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

import React, { FC } from 'react';
import { useAppStore, useAppContext } from './../appContextProvider';
import AppContext from './../appContext';
import * as Icons from 'design/Icon';
import * as types from '../types';

export default function useNavigator() {
  const ctx = useAppContext();
  const store = useAppStore();
  const homeItem = initHomeItem(ctx);
  const gatewayItems = initGatewayItems(ctx);
  const clusterItems = React.useMemo<Item[]>(() => {
    return initClusterItems(ctx);
  }, [store.state.clusters]);

  function processItemClick(item: Item) {
    ctx.openDocument(item.uri);
  }

  return {
    homeItem,
    clusterItems,
    gatewayItems,
    processItemClick,
  };
}

function initClusterItems(ctx: AppContext): Item[] {
  return ctx.storeApp.state.clusters.map<Item>(cluster => ({
    title: cluster.name,
    Icon: Icons.Clusters,
    uri: cluster.uri,
    kind: 'clusters',
    items: [
      {
        title: 'Servers',
        Icon: Icons.Server,
        uri: ctx.getUriServer({ clusterId: cluster.name }),
        kind: 'servers',
        items: [],
        group: false,
      },
      {
        title: 'Databases',
        Icon: Icons.Database,
        uri: ctx.getUriDb({ clusterId: cluster.name }),
        kind: 'dbs',
        items: [],
        group: false,
      },
      {
        title: 'Applications',
        Icon: Icons.NewTab,
        uri: ctx.getUriApps({ clusterId: cluster.name }),
        kind: 'apps',
        items: [],
        group: false,
      },
    ],
    group: true,
  }));
}

function initGatewayItems(ctx: AppContext): Item[] {
  return [
    {
      title: 'platform.teleport.sh/dbs/mongo-prod',
      Icon: Icons.Clusters,
      uri: ctx.cfg.routes.gateways,
      kind: 'gateways',
      items: [],
      group: false,
    },
  ];
}

function initHomeItem(ctx: AppContext): Item {
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

export type Item = {
  items: Item[];
  title: string;
  uri: string;
  Icon: FC;
  kind: types.DocumentKind;
  group: boolean;
};
