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

import { useEffect, useState } from 'react';
import { useAttempt } from 'shared/hooks';

import { Session } from 'teleport/services/session';
import Ctx from 'teleport/teleportContext';

export default function useSessions(ctx: Ctx, clusterId: string) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [attempt, attemptActions] = useAttempt({ isProcessing: true });

  function onRefresh() {
    return ctx.sshService.fetchSessions(clusterId).then(setSessions);
  }

  useEffect(() => {
    attemptActions.do(() => onRefresh());
  }, [clusterId]);

  return {
    attempt,
    sessions,
    onRefresh,
  };
}
