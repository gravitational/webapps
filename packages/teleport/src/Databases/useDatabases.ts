/*
Copyright 2021 Gravitational, Inc.

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

import { useState, useEffect } from 'react';
import useTeleport from 'teleport/useTeleport';
import useAttemptNext from 'shared/hooks/useAttemptNext';
import useStickyClusterId from 'teleport/useStickyClusterId';
import { Database } from 'teleport/services/database';

export default function useDatabases() {
  const ctx = useTeleport();
  const { attempt, run } = useAttemptNext('processing');
  const { clusterId } = useStickyClusterId();

  const [databases, setDatabases] = useState<Database[]>([]);

  useEffect(() => {
    run(() => ctx.databaseService.fetchDatabases(clusterId).then(setDatabases));
  }, [clusterId]);

  return {
    databases,
    attempt,
  };
}
