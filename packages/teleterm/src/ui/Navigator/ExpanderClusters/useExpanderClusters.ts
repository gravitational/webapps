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

import { useAppContext } from 'teleterm/ui/appContextProvider';
import AppContext from 'teleterm/ui/appContext';
import { ExpanderClusterProps, ClusterNavItem } from './types';

export function useExpanderClusters(): ExpanderClusterProps {
  const ctx = useAppContext();
  const items = initItems(ctx);

  // subscribe
  ctx.clustersService.useState();

  function onAddCluster() {
    ctx.commandLauncher.executeCommand('cluster-connect', {});
  }

  function onSyncClusters() {
    ctx.clustersService.syncClusters();
  }

  function onLogin(clusterUri: string) {
    ctx.commandLauncher.executeCommand('cluster-connect', { clusterUri });
  }

  function onLogout(clusterUri: string) {
    ctx.clustersService.logout(clusterUri);
  }

  function onRemove(clusterUri: string) {
    const cluster = ctx.clustersService.findCluster(clusterUri);
    ctx.modalsService.openDialog({
      kind: 'cluster-remove',
      clusterUri: cluster.uri,
      clusterTitle: cluster.name,
    });
  }

  function onOpenContextMenu(cluster: ClusterNavItem) {
    ctx.mainProcessClient.openClusterContextMenu({
      isClusterConnected: cluster.connected,
      onLogin() {
        onLogin(cluster.uri);
      },
      onLogout() {
        onLogout(cluster.uri);
      },
      onRemove() {
        onRemove(cluster.uri);
      },
      onRefresh() {
        ctx.clustersService.syncRootCluster(cluster.uri);
      },
    });
  }

  return {
    items,
    onAddCluster,
    onOpenContextMenu,
    onSyncClusters,
    onRemove,
  };
}

function initItems(ctx: AppContext): ClusterNavItem[] {
  return ctx.clustersService.getClusters().map<ClusterNavItem>(cluster => {
    const { syncing } = ctx.clustersService.getClusterSyncStatus(cluster.uri);
    return {
      title: cluster.name,
      uri: cluster.uri,
      connected: cluster.connected,
      syncing: syncing,
    };
  });
}
