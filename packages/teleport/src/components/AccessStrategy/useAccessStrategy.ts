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
import userService, { AccessStrategy } from 'teleport/services/user';
import accessRequestService, {
  AccessRequestResult,
} from 'teleport/services/accessRequest';
import { getUrlParameter } from 'teleport/services/history';

export default function useAccessStrategy() {
  const clusterId = cfg.proxyCluster;
  const [attempt, attemptActions] = useAttempt({ isProcessing: true });
  const [strategy, setStrategy] = React.useState<AccessStrategy>(null);
  const [accessRequest, setAccessRequest] = React.useState<AccessRequestResult>(
    storage.getAccessRequest()
  );
  const requestId = getUrlParameter('requestId', window.location.search);

  React.useEffect(() => {
    if (accessRequest) {
      attemptActions.clear();
      return;
    }

    attemptActions.do(() =>
      userService.fetchUser(clusterId).then(res => {
        setStrategy(res.acl.accessStrategy);
      })
    );
  }, []);

  function getRequest() {
    return accessRequestService
      .getAccessRequest(requestId)
      .then(applyPermission)
      .catch(setError);
  }

  function createRequest(reason?: string) {
    return accessRequestService
      .createAccessRequest(reason)
      .then(req => {
        const url = `${window.location.pathname}?requestId=${req.id}`;
        window.history.replaceState(null, '', url);
        setAccessRequest(req);
      })
      .catch(setError);
  }

  function removeUrlRequestParam() {
    if (!requestId) {
      return;
    }

    window.history.replaceState(null, '', window.location.pathname);
  }

  function applyPermission(request: AccessRequestResult) {
    if (request.state === 'APPROVED') {
      return accessRequestService.applyPermission(requestId).then(() => {
        storage.setAccessRequest(request);
        removeUrlRequestParam();
        setAccessRequest(request);
      });
    }
    setAccessRequest(request);
  }

  // If user were to refresh page on error, the requestId
  // has to be removed.
  function setError(err: Error) {
    removeUrlRequestParam();
    attemptActions.error(err);
  }

  return {
    attempt,
    requestId,
    accessRequest,
    strategy,
    getRequest,
    createRequest,
  };
}

export type State = ReturnType<typeof useAccessStrategy>;
