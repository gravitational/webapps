/*
Copyright 2019 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from 'react';
import Logger from 'shared/libs/logger';
const logger = Logger.create('shared/hooks/useAttempt');

// This is the next version of existing useAttempt hook
export default function useAttemptNext(status = '' as Attempt['status']) {
  const [attempt, setAttempt] = React.useState<Attempt>(() => ({
    status,
    statusText: '',
  }));

  function handleError(err: Error) {
    logger.error('attempt', err);
    setAttempt({ status: 'failed', statusText: err.message });
  }

  function run(fn: Callback) {
    try {
      setAttempt({ status: 'processing' });
      return fn()
        .then(() => {
          setAttempt({ status: 'success' });
        })
        .catch(err => {
          handleError(err);
        })
        .then(() => {
          return attempt;
        });
    } catch (err) {
      handleError(err);
    }
  }

  return { attempt, setAttempt, run };
}

type Attempt = {
  status: 'processing' | 'failed' | 'success' | '';
  statusText?: string;
};

type Callback = (fn?: any) => Promise<any>;
