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

export default function useExpanderClusters() {
  const ctx = useAppContext();
  const clusterItems = initItems(ctx);

  // subscribe
  ctx.serviceClusters.useState();
  ctx.serviceDocs.useState();

  function addCluster() {
    ctx.serviceModals.openAddClusterDialog();
  }

  function syncClusters() {
    ctx.serviceClusters.syncClusters();
  }

  function login(clusterUri: string) {
    ctx.serviceModals.openLoginDialog(clusterUri);
  }

  function logout(clusterUri: string) {
    ctx.serviceClusters.logout(clusterUri);
  }

  function remove(clusterUri: string) {
    const cluster = ctx.serviceClusters.findCluster(clusterUri);
    ctx.serviceModals.openDialog({
      kind: 'cluster-remove',
      clusterUri: cluster.uri,
      clusterTitle: cluster.name,
    });
  }

  function openContextMenu(cluster: ClusterNavItem) {
    return () => {
      ctx.mainProcessClient.openClusterContextMenu({
        isClusterConnected: cluster.connected,
        onLogin() {
          login(cluster.uri);
        },
        onLogout() {
          logout(cluster.uri);
        },
        onRemove() {
          remove(cluster.uri);
        },
        onRefresh() {
          ctx.serviceClusters.syncRootCluster(cluster.uri);
        },
      });
    };
  }

  return {
    clusterItems,
    addCluster,
    openContextMenu,
    syncClusters,
    logout,
    remove,
    login,
  };
}

function initItems(ctx: AppContext): ClusterNavItem[] {
  return ctx.serviceClusters.getClusters().map<ClusterNavItem>(cluster => {
    const { syncing } = ctx.serviceClusters.getClusterSyncStatus(cluster.uri);
    return {
      title: cluster.name,
      Icon: Icons.Clusters,
      uri: cluster.uri,
      kind: 'cluster',
      connected: cluster.connected,
      syncing: syncing,
      items: [],
      group: true,
    };
  });
}

export type State = ReturnType<typeof useExpanderClusters>;

export interface ClusterNavItem extends navTypes.NavItem {
  connected: boolean;
  syncing: boolean;
  trustedClusters?: ClusterNavItem[];
}
