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
import localStorage from 'teleport/services/localStorage';
import useAttempt from 'shared/hooks/useAttempt';
import userService, {
  AccessStrategy,
  AccessRequest,
  makeAccessRequest,
} from 'teleport/services/user';

export default function useAccessStrategy() {
  const clusterId = cfg.proxyCluster; // root cluster
  const [attempt, attemptActions] = useAttempt({ isProcessing: true });
  const [strategy, setStrategy] = React.useState<AccessStrategy>(null);

  const [accessRequest, setAccessRequest] = React.useState<AccessRequest>(
    makeAccessRequest(localStorage.getAccessRequestResult())
  );

  React.useEffect(() => {
    attemptActions.do(() =>
      userService.fetchUser(clusterId).then(res => {
        setStrategy(res.accessStrategy);
        if (
          accessRequest.state === '' &&
          res.accessStrategy.type === 'always'
        ) {
          return createRequest();
        }
      })
    );
  }, []);

  function refresh() {
    return userService
      .fetchAccessRequest(accessRequest.id)
      .then(updateState)
      .catch(attemptActions.error);
  }

  function createRequest(reason?: string) {
    return userService.createAccessRequest(reason).then(updateState);
  }

  function updateState(result: AccessRequest) {
    localStorage.setAccessRequestResult(result);

    if (result.state === 'APPROVED') {
      return userService.applyPermission(result.id).then(() => {
        result.state = 'APPLIED';
        localStorage.setAccessRequestResult(result);
        window.location.reload();
      });
    }

    setAccessRequest(result);
  }

  return {
    attempt,
    accessRequest,
    strategy,
    refresh,
    createRequest,
  };
}

export type State = ReturnType<typeof useAccessStrategy>;
