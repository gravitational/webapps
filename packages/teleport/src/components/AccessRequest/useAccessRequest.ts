/**
 * Copyright 2020 Gravitational, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import cfg from 'teleport/config';
import storage from 'teleport/services/localStorage';
import useAttempt from 'shared/hooks/useAttempt';
import userService, { DynamicAccess } from 'teleport/services/user';
import accessRequestService, {
  AccessRequest,
} from 'teleport/services/accessRequest';
import { getUrlParameter } from 'teleport/services/history';

export default function useAccessRequestReason({
  children,
  checkerInterval = 5000,
}: Props) {
  const clusterId = cfg.proxyCluster;
  const [attempt, attemptActions] = useAttempt({ isProcessing: true });
  const [access, setAccess] = React.useState<DynamicAccess>(null);
  const [request, setRequest] = React.useState<AccessRequest>(
    storage.getAccessRequest()
  );
  const requestId = getUrlParameter('requestId', window.location.search);

  React.useEffect(() => {
    if (request) {
      attemptActions.clear();
      return;
    }

    attemptActions.do(() =>
      userService.fetchUser(clusterId).then(res => {
        setAccess(res.acl.request);
      })
    );
  }, []);

  function getRequest() {
    return accessRequestService.getAccessRequest(requestId).then(res => {
      setRequest(res);
      if (res.state === 'APPROVED') {
        return 'done';
      }
    });
  }

  function createRequest(reason?: string) {
    return accessRequestService.createAccessRequest(reason).then(req => {
      const url = `${window.location.pathname}?requestId=${req.id}`;
      window.history.replaceState(null, '', url);
      setRequest(req);
    });
  }

  function renewSession() {
    return accessRequestService.renewSession(requestId).then(() => {
      request.renewedSession = true;
      storage.setAccessRequest(request);
      setRequest(storage.getAccessRequest());
    });
  }

  function removeUrlRequestParam() {
    window.history.replaceState(null, '', window.location.pathname);
  }

  return {
    children,
    attempt,
    requestId,
    request,
    access,
    getRequest,
    createRequest,
    renewSession,
    removeUrlRequestParam,
    checkerInterval,
  };
}

export type Props = {
  children: React.ReactNode;
  checkerInterval?: number;
};
