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
import Logger from 'shared/libs/logger';
import useAttempt from 'shared/hooks/useAttempt';

export default function useAccessRequestReason({
  getRequest,
  renewSession,
  createRequest,
  checkerInterval = 5000,
}: Props) {
  const logger = Logger.create('AccessRequestPending');
  const [attempt, attemptActions] = useAttempt({ isProcessing: true });
  let checkerId = null;
  let retryAction = null;

  if (getRequest) {
    retryAction = getRequest;
  } else if (renewSession) {
    retryAction = renewSession;
  } else if (createRequest) {
    retryAction = createRequest;
  } else {
    logger.error('retryAction is empty');
  }

  React.useEffect(() => {
    if (renewSession) {
      renewSession().catch(attemptActions.error);
    } else if (createRequest) {
      createRequest().catch(attemptActions.error);
    } else if (getRequest) {
      startAccessChecker();
      return () => stopAccessChecker();
    }
  }, [renewSession, createRequest]);

  function startAccessChecker() {
    attemptActions.start();

    checkerId = setInterval(() => {
      getRequest()
        .then(done => {
          if (done) {
            stopAccessChecker();
          }
        })
        .catch(err => {
          stopAccessChecker();
          attemptActions.error(err);
        });
    }, checkerInterval);
  }

  function stopAccessChecker() {
    clearInterval(checkerId);
    checkerId = null;
  }

  return {
    attempt,
    retryAction,
  };
}

export type Props = {
  getRequest?(): Promise<any>;
  renewSession?(): Promise<any>;
  createRequest?(): Promise<any>;
  checkerInterval?: number;
};
