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
import { useAppStore } from './../appContextProvider';
import * as Icons from 'design/Icon';
import * as types from './../../services/types';

export default function useNavigator() {
  const store = useAppStore();
  const gatewayItems = initGatewayItems();
  const clusterItems = React.useMemo<Item[]>(() => {
    return initClusters(store.state.clusters);
  }, [store.state.clusters]);

  return {
    clusterItems,
    gatewayItems,
  };
}

export type State = ReturnType<typeof useNavigator>;

export type Item = {
  items: Item[];
  title: string;
  id: string;
  Icon: FC;
  kind: 'cluster' | 'apps' | 'servers' | 'clusterGroup' | 'gateway';
  group: boolean;
};

function initClusters(clusters: types.Cluster[]): Item[] {
  return clusters.map<Item>(cluster => ({
    title: cluster.name,
    Icon: Icons.Clusters,
    id: cluster.uri,
    kind: 'cluster',
    items: [
      {
        title: 'Servers',
        Icon: Icons.Server,
        id: cluster.uri,
        kind: 'servers',
        items: [],
        group: false,
      },
      {
        title: 'Applications',
        Icon: Icons.Server,
        id: cluster.uri,
        kind: 'apps',
        items: [],
        group: false,
      },
    ],
    group: true,
  }));
}

function initGatewayItems(): Item[] {
  return [
    {
      title: 'platform.teleport.sh/dbs/mongo-prod',
      Icon: Icons.Clusters,
      id: '/gateways/',
      kind: 'gateway',
      items: [],
      group: false,
    },
  ];
}
