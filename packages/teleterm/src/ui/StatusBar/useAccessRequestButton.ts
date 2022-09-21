import { useAppContext } from '../appContextProvider';

export function useAccessRequestsButton() {
  const ctx = useAppContext();
  ctx.workspacesService.useState();

  const workspaceAccessRequest =
    ctx.workspacesService.getActiveWorkspaceAccessRequestsService();

  function toggleAccessRequestBar() {
    if (!workspaceAccessRequest) {
      return;
    }
    return workspaceAccessRequest.toggleBar();
  }

  function isCollapsed() {
    if (!workspaceAccessRequest) {
      return true;
    }
    return workspaceAccessRequest.getCollapsed();
  }

  function getPendingResourceCount() {
    if (!workspaceAccessRequest) {
      return 0;
    }
    const resourceIds = workspaceAccessRequest.getPendingAccessRequest();
    return (
      Object.keys(resourceIds.node).length +
      Object.keys(resourceIds.db).length +
      Object.keys(resourceIds.app).length +
      Object.keys(resourceIds.kube_cluster).length +
      Object.keys(resourceIds.windows_desktop).length
    );
  }

  return {
    isCollapsed,
    toggleAccessRequestBar,
    getPendingResourceCount,
  };
}
