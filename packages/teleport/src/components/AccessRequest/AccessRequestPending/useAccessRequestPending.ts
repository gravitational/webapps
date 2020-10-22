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
import useAttempt from 'shared/hooks/useAttempt';

export default function useAccessRequestReason(
  getRequest: () => Promise<any>,
  renewSession: () => Promise<any>,
  logout: () => void
) {
  const [attempt, attemptActions] = useAttempt({ isProcessing: true });

  let checkerId = null;

  React.useEffect(() => {
    if (renewSession) {
      renewSession().catch(attemptActions.error);
    } else {
      startAccessChecker();
      return () => stopAccessChecker();
    }
  }, [renewSession]);

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
    }, 5000);
  }

  function stopAccessChecker() {
    clearInterval(checkerId);
    checkerId = null;
  }

  return {
    attempt,
    startAccessChecker,
    logout,
  };
}
