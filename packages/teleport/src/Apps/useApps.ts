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

import { useState, useEffect } from 'react';
import { useAttemptNext } from 'shared/hooks';
import { App } from 'teleport/services/apps';
import useTeleport from 'teleport/useTeleport';

export default function useApps() {
  const ctx = useTeleport();
  const clusterId = ctx.stickyCluster.id;
  const { attempt, run } = useAttemptNext('processing');
  const [apps, setApps] = useState([] as App[]);

  function fetchApps() {
    return ctx.appService.fetchApps(clusterId).then(setApps);
  }

  useEffect(() => {
    run(() => fetchApps());
  }, [clusterId]);

  return {
    attempt,
    apps,
  };
}
