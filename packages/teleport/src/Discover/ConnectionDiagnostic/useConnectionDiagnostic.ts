/**
 * Copyright 2022 Gravitational, Inc.
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

import { useState, useEffect } from 'react';
import useAttempt from 'shared/hooks/useAttemptNext';
import { DiscoverContext } from '../discoverContext';
import type { AgentConnectionDiagnostic } from 'teleport/services/agents';
import type { AgentStepProps } from '../types';

export function useConnectionDiagnostic({ ctx, props }: Props) {
  const [diagnostic, setDiagnostic] = useState<AgentConnectionDiagnostic>();
  const { attempt, run } = useAttempt('');
  const [connectionId, setConnectionId] = useState('hello-world'); // TODO use a UUID library
  const [fetchErrMsg, setFetchErrMsg] = useState('');

  function onRefresh() {
    return ctx.agentService
      .fetchConnectionDiagnostic(connectionId)
      .then(setDiagnostic)
      .catch((err: Error) => {
        if (!err.message.includes(connectionId)) {
          setFetchErrMsg(err.message);
        }
      });
  }

  return {
    attempt,
    onRefresh,
    diagnostic,
    connectionId,
    fetchErrMsg,
  };
}

type Props = {
  ctx: DiscoverContext;
  props: AgentStepProps;
};

type FetchError = {
  message?: string;
};

export type State = ReturnType<typeof useConnectionDiagnostic>;
