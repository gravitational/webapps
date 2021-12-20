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
import AppContextProvider from 'teleterm/ui/appContextProvider';
import Navigator from './Navigator';
import { MockAppContext } from 'teleterm/ui/fixtures/mocks';
import { SyncStatus } from 'teleterm/ui/services/clusters/types';

export default {
  title: 'Teleterm/Navigator',
};

export const Story = () => {
  const appContext = new MockAppContext();

  appContext.serviceClusters.getClusterSyncStatus = (_ = '') => {
    const loading: SyncStatus = { status: 'processing' };
    const error: SyncStatus = { status: 'failed', statusText: 'Server Error' };
    return {
      dbs: error,
      servers: loading,
      apps: loading,
      kubes: loading,
    };
  };

  appContext.serviceClusters.getClusters = () => [
    {
      uri: 'clusters/localhost',
      name: 'localhost',
      connected: true,
    },
  ];

  return (
    <AppContextProvider value={appContext}>
      <Navigator />
    </AppContextProvider>
  );
};
