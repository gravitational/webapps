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
import { ExpanderConnectionsPresentational } from './ExpanderConnections';
import { ConnectionItem } from './types';
import { MockAppContextProvider } from 'teleterm/ui/fixtures/MockAppContextProvider';

export default {
  title: 'Teleterm/Navigator/ExpanderConnections',
};

function getItems({
  status,
}: { status?: 'connected' | 'disconnected' } = {}): ConnectionItem[] {
  return [
    { uri: 'connection-1', title: 'Connection 1', status },
    { uri: 'connection-2', title: 'Connection 2', status },
    { uri: 'connection-3', title: 'Connection 3', status },
  ];
}

export function UnknownConnection() {
  const items = getItems();

  return (
    <MockAppContextProvider>
      <ExpanderConnectionsPresentational items={items} />
    </MockAppContextProvider>
  );
}

export function NotConnected() {
  const items = getItems({ status: 'disconnected' });

  return (
    <MockAppContextProvider>
      <ExpanderConnectionsPresentational items={items} />
    </MockAppContextProvider>
  );
}

export function Connected() {
  const items = getItems({ status: 'connected' });

  return (
    <MockAppContextProvider>
      <ExpanderConnectionsPresentational items={items} />
    </MockAppContextProvider>
  );
}
