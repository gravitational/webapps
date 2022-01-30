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

import React from 'react';
import { ExpanderClustersPresentational } from 'teleterm/ui/Navigator/ExpanderClusters/ExpanderClusters';
import { ClusterNavItem } from 'teleterm/ui/Navigator/ExpanderClusters/types';
import { MockAppContextProvider } from 'teleterm/ui/fixtures/MockAppContextProvider';

export default {
  title: 'Teleterm/Navigator/ExpanderClusters',
};

function getItems({
  syncing,
  connected,
}: { syncing?: boolean; connected?: boolean } = {}): ClusterNavItem[] {
  return [
    { uri: 'simple-cluster-uri', title: 'Simple cluster', syncing, connected },
    {
      uri: 'root-cluster-uri',
      title: 'Root cluster',
      connected,
      syncing,
      leaves: [
        {
          uri: 'trusted-cluster-uri',
          title: 'Trusted cluster 1',
          syncing,
          connected,
        },
        {
          uri: 'trusted-cluster-uri-2',
          title: 'Trusted cluster 2',
          syncing,
          connected,
        },
      ],
    },
  ];
}

export function NotConnected() {
  const items = getItems();

  return (
    <MockAppContextProvider>
      <ExpanderClustersPresentational items={items} />
    </MockAppContextProvider>
  );
}

export function Syncing() {
  const items = getItems({ syncing: true });

  return (
    <MockAppContextProvider>
      <ExpanderClustersPresentational items={items} />
    </MockAppContextProvider>
  );
}

export function Connected() {
  const items = getItems({ connected: true });

  return (
    <MockAppContextProvider>
      <ExpanderClustersPresentational items={items} />
    </MockAppContextProvider>
  );
}
