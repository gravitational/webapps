import { useState } from 'react';
import { useAppContext } from 'teleterm/ui/appContextProvider';

export function useClusters() {
  const { workspacesService, clustersService, commandLauncher } =
    useAppContext();

  workspacesService.useState();
  clustersService.useState();

  function findLeaves(clusterUri: string) {
    return clustersService
      .getClusters()
      .filter(c => c.leaf && c.uri.startsWith(clusterUri));
  }

  function hasPendingAccessRequest() {
    const rootClusterUri = workspacesService.getRootClusterUri();
    const accessRequestsService =
      workspacesService.getWorkspaceAccessRequestsService(rootClusterUri);
    if (!accessRequestsService) {
      return false;
    }

    const pendingAccessRequest =
      accessRequestsService.getPendingAccessRequest();

    if (!pendingAccessRequest) {
      return false;
    }

    const count =
      Object.keys(pendingAccessRequest.node).length +
      Object.keys(pendingAccessRequest.db).length +
      Object.keys(pendingAccessRequest.app).length +
      Object.keys(pendingAccessRequest.kube_cluster).length +
      Object.keys(pendingAccessRequest.windows_desktop).length;
    return count > 0;
  }

  function clearPendingAccessRequest() {
    const rootClusterUri = workspacesService.getRootClusterUri();
    const accessRequestsService =
      workspacesService.getWorkspaceAccessRequestsService(rootClusterUri);
    if (!accessRequestsService) {
      return false;
    }

    accessRequestsService.clearPendingAccessRequest();
  }

  const rootClusterUri = workspacesService.getRootClusterUri();
  const localClusterUri =
    workspacesService.getActiveWorkspace()?.localClusterUri;
  const rootCluster = clustersService.findCluster(rootClusterUri);
  const items =
    (rootCluster && [rootCluster, ...findLeaves(rootClusterUri)]) || [];

  return {
    hasLeaves: items.some(i => i.leaf),
    hasPendingAccessRequest: hasPendingAccessRequest(),
    clearPendingAccessRequest,
    selectedItem:
      localClusterUri && clustersService.findCluster(localClusterUri),
    selectItem: (localClusterUri: string) => {
      workspacesService.setWorkspaceLocalClusterUri(
        rootClusterUri,
        localClusterUri
      );
      commandLauncher.executeCommand('cluster-open', {
        clusterUri: localClusterUri,
      });
    },
    items,
  };
}
