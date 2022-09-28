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
    return workspaceAccessRequest.getAddedResourceCount();
  }

  return {
    isCollapsed,
    toggleAccessRequestBar,
    getPendingResourceCount,
  };
}
