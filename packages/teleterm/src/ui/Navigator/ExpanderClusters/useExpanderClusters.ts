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

import * as Icons from 'design/Icon';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import AppContext from 'teleterm/ui/appContext';
import * as navTypes from 'teleterm/ui/Navigator/types';
import { SyncStatus } from 'teleterm/ui/services/clusters/types';

export default function useExpanderClusters() {
  const ctx = useAppContext();
  const clusterItems = initItems(ctx);

  // subscribe
  ctx.serviceClusters.useState();

  function addCluster() {
    ctx.serviceModals.openDialog({ kind: 'add-cluster' });
  }

  function syncClusters() {
    ctx.serviceClusters.syncClusters();
  }

  function logout(clusterUri: string) {
    ctx.serviceClusters.logout(clusterUri);
  }

  function remove(clusterUri: string) {
    ctx.serviceClusters.removeCluster(clusterUri);
  }

  return {
    clusterItems,
    addCluster,
    syncClusters,
    logout,
    remove,
    openLoginDialog(clusterUri: string) {
      ctx.serviceModals.openDialog({
        kind: 'cluster-login',
        clusterUri,
      });
    },
  };
}

function initItems(ctx: AppContext): ClusterNavItem[] {
  return ctx.serviceClusters.getClusters().map<ClusterNavItem>(cluster => {
    const syncing = ctx.serviceClusters.getClusterSyncStatus(cluster.uri);
    return {
      title: cluster.name,
      Icon: Icons.Clusters,
      uri: cluster.uri,
      kind: 'clusters',
      connected: cluster.connected,
      syncing: syncing.servers,
      items: [
        {
          title: 'Servers',
          status: getNavItemStatus(syncing.servers),
          Icon: Icons.Server,
          uri: ctx.uris.getUriServers({ clusterId: cluster.name }),
          kind: 'servers',
          items: [],
          group: false,
        },
        {
          title: 'Databases',
          Icon: Icons.Database,
          uri: ctx.uris.getUriDbs({ clusterId: cluster.name }),
          kind: 'dbs',
          items: [],
          status: getNavItemStatus(syncing.dbs),
          group: false,
        },
      ],
      group: true,
    };
  });
}

function getNavItemStatus(syncStatus: SyncStatus): navTypes.NavItem['status'] {
  switch (syncStatus.status) {
    case 'failed':
      return 'failed';
    case 'processing':
      return 'loading';
    default:
      return '';
  }
}

export type State = ReturnType<typeof useExpanderClusters>;

export interface ClusterNavItem extends navTypes.NavItem {
  connected: boolean;
}
