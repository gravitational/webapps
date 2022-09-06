/*
Copyright 2022 Gravitational, Inc.

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
import Logger from 'shared/libs/logger';

import { fetchClusterAlerts } from 'teleport/services/alerts';
import useStickyClusterId from 'teleport/useStickyClusterId';

import type { ClusterAlert } from 'teleport/services/alerts';

const logger = Logger.create('ClusterAlerts');

export function useAlerts() {
  const [alerts, setAlerts] = useState<ClusterAlert[]>([]);
  const { clusterId } = useStickyClusterId();

  useEffect(() => {
    fetchClusterAlerts(clusterId)
      .then(res => {
        if (!res) {
          return;
        }

        setAlerts(res);
      })
      .catch(err => {
        logger.error(err);
      });
  }, [clusterId]);

  return alerts;
}
