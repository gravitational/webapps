import { useState } from 'react';
import useAttempt from 'shared/hooks/useAttemptNext';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import { ResourceKind } from '../NewRequest/useNewRequest';

export default function useAccessRequestCheckout() {
  const ctx = useAppContext();
  ctx.workspacesService.useState();
  const clusterUri = ctx.workspacesService.getRootClusterUri();
  const [showCheckout, setShowCheckout] = useState(false);

  const {
    attempt: createRequestAttempt,
    setAttempt: setCreateRequestAttempt,
    run: runCreateRequest,
  } = useAttempt('');
  const workspaceAccessRequest =
    ctx.workspacesService.getActiveWorkspaceAccessRequestsService();
  const docService = ctx.workspacesService.getActiveWorkspaceDocumentService();

  function getData() {
    const data: { kind: ResourceKind; name: string; id: string }[] = [];
    if (!workspaceAccessRequest) {
      return data;
    }
    const resourceIds = workspaceAccessRequest.getPendingAccessRequest();
    const resourceKeys = Object.keys(resourceIds) as ResourceKind[];
    resourceKeys.forEach(kind => {
      Object.keys(resourceIds[kind]).forEach(id => {
        data.push({ kind, id, name: resourceIds[kind][id] });
      });
    });
    return data;
  }

  function isCollapsed() {
    if (!workspaceAccessRequest) {
      return true;
    }
    return workspaceAccessRequest.getCollapsed();
  }

  function toggleResource(
    kind: ResourceKind,
    resourceId: string,
    resourceName: string
  ) {
    workspaceAccessRequest.addOrRemoveResource(kind, resourceId, resourceName);
  }

  function getAssumed() {
    if (!workspaceAccessRequest) {
      return {};
    }
    return workspaceAccessRequest.getAssumed();
  }

  function getAssumedRoles() {
    if (!workspaceAccessRequest) {
      return [];
    }
    const assumed = workspaceAccessRequest.getAssumed();
    return Object.keys(assumed).map(requestId => assumed[requestId]);
  }

  async function createRequest(reason: string, suggestedReviewers: string[]) {
    const data = getData();
    const req = {
      clusterUri,
      reason,
      suggestedReviewers,
      resourceIds: data.filter(d => d.kind !== 'role'),
      roles: data.filter(d => d.kind === 'role').map(d => d.name),
    };
    runCreateRequest(() =>
      ctx.clustersService.createAccessRequest(req).then(() => {
        reset();
      })
    );
  }

  function clearCreateAttempt() {
    setCreateRequestAttempt({ status: '', statusText: '' });
  }

  function collapseBar() {
    if (workspaceAccessRequest) {
      return workspaceAccessRequest.toggleBar();
    }
  }

  function reset() {
    if (workspaceAccessRequest) {
      return workspaceAccessRequest.clearPendingAccessRequest();
    }
    clearCreateAttempt();
  }

  function goToRequestsList() {
    const listDoc = docService.createAccessRequestDocument({
      clusterUri,
      state: 'browsing',
    });

    docService.add(listDoc);
    docService.open(listDoc.uri);
  }

  return {
    showCheckout,
    isCollapsed,
    assumed: getAssumed(),
    assumedRoles: getAssumedRoles(),
    toggleResource,
    data: getData(),
    createRequest,
    reset,
    goToRequestsList,
    clearCreateAttempt,
    clusterUri,
    attempt: createRequestAttempt,
    collapseBar,
    setShowCheckout,
  };
}
