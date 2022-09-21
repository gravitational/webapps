import { useState, useEffect } from 'react';
import * as types from 'teleterm/ui/services/workspacesService';
import { useAppContext } from '../appContextProvider';
import useAttempt from 'shared/hooks/useAttemptNext';
import {
  AccessRequest as TshdAccessRequest,
  LoggedInUser,
} from 'teleterm/services/tshd/types';
import { AccessRequest } from 'e-teleport/services/workflow';
import { makeAccessRequest } from 'e-teleport/services/workflow';
import { useIdentity } from '../TopBar/Identity/useIdentity';

export default function useAccessRequests(doc: types.DocumentAccessRequests) {
  const ctx = useAppContext();
  const docState = doc.state;
  const clusterUri = ctx.workspacesService.getRootClusterUri();
  const documentService =
    ctx.workspacesService.getActiveWorkspaceDocumentService();
  const accessRequestService =
    ctx.workspacesService.getActiveWorkspaceAccessRequestsService();
  const assumed = accessRequestService.getAssumed();
  const identity = useIdentity();
  const [accessRequests, setAccessRequests] = useState<AccessRequest[]>();
  const [reviewing, setReviewing] = useState<string>('');
  const { attempt, setAttempt } = useAttempt('');
  const { attempt: assumeRoleAttempt, run: runAssumeRole } = useAttempt('');

  // transform tsdh Access Request type into the web's Access Request
  // to promote code reuse
  function makeRow(request: AccessRequest) {
    const ownRequest =
      request.user === identity?.activeRootCluster?.loggedInUser.name;
    const canAssume = ownRequest && request.state === 'APPROVED';
    const isAssumed = assumed[request.id];

    return {
      ...request,
      canAssume,
      isAssumed,
    };
  }

  function onViewRequest(requestId: string) {
    if (requestId) {
      documentService.update(doc.uri, {
        title: `Request: ${requestId}`,
      });
    } else {
      documentService.update(doc.uri, {
        title: `Access Requests`,
      });
    }
    setReviewing(requestId);
  }

  const getRequests = async () => {
    try {
      const response = await ctx.clustersService.getAccessRequests(clusterUri);
      setAttempt({ status: 'success' });
      // transform tshd access request to the webui access request and add flags
      const requests = response.map(r => makeRow(makeUiAccessRequest(r)));
      setAccessRequests(requests);
    } catch (err) {
      setAttempt({
        status: 'failed',
        statusText: err.message,
      });
    }
  };

  async function assumeRole(request: AccessRequest) {
    runAssumeRole(() =>
      // pass the requestId to the requestIds array on its own, and nothing into the dropids array
      // since we are only 'assuming' one requestId at a time
      ctx.clustersService.assumeRole(clusterUri, [request.id], []).then(() => {
        ctx.clustersService.syncCluster(clusterUri);
        accessRequestService.addToAssumed(request);
        // update the access request in the table
        setAccessRequests(
          accessRequests.map(r => {
            if (r.id === request.id) {
              return {
                ...r,
                isAssumed: true,
              };
            }
            return r;
          })
        );
      })
    );
  }

  useEffect(() => {
    // only fetch when visitng RequestList
    if (reviewing === '') {
      getRequests();
    }
  }, [reviewing]);

  return {
    ctx,
    attempt,
    accessRequests,
    assumeRoleAttempt,
    assumeRole,
    onViewRequest,
    docState,
    getRequests,
    reviewing,
    setReviewing,
  };
}

export function makeUiAccessRequest(request: TshdAccessRequest) {
  return makeAccessRequest({
    ...request,
    roles: request.rolesList,
    reviews: request.reviewsList,
    reviewers: request.reviewsList,
    thresholdNames: request.thresholdNamesList,
    resourceIds: request.resourceIdsList,
  });
}
