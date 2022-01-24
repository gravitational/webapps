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

import React, { useState } from 'react';
import AppContextProvider from 'teleterm/ui/appContextProvider';
import { Navigator } from './Navigator';
import { MockAppContext } from 'teleterm/ui/fixtures/mocks';
import { SyncStatus } from 'teleterm/ui/services/clusters/types';
import styled from 'styled-components';
import { Cluster } from 'teleterm/services/tshd/types';

export default {
  title: 'Teleterm/Navigator',
};

export const Story = () => {
  const appContext = new MockAppContext();
  const [clusters, setClusters] = useState<Cluster[]>([
    {
      uri: 'clusters/localhost',
      leaf: false,
      name: 'localhost',
      connected: true,
    },
    {
      uri: 'clusters/example-host',
      leaf: false,
      name: 'example-host',
      connected: true,
    },
  ]);

  appContext.workspaceService.getRecentDocuments = () => {
    return [
      {
        uri: 'localhost',
        kind: 'doc.terminal_shell',
        title: 'user@localhost',
      },
      {
        uri: 'example-host',
        kind: 'doc.terminal_shell',
        title: 'user@example-host',
      },
    ];
  };

  appContext.clustersService.getClusterSyncStatus = (_ = '') => {
    const loading: SyncStatus = { status: 'processing' };
    const error: SyncStatus = { status: 'failed', statusText: 'Server Error' };
    return {
      syncing: true,
      dbs: error,
      servers: loading,
      apps: loading,
      kubes: loading,
    };
  };

  appContext.clustersService.getClusters = () => clusters;

  appContext.clustersService.removeCluster = clusterUri => {
    return Promise.resolve(
      setClusters(clusters.filter(c => c.uri !== clusterUri))
    );
  };

  return (
    <AppContextProvider value={appContext}>
      <Container>
        <Navigator />
      </Container>
    </AppContextProvider>
  );
};

export function NoData() {
  const appContext = new MockAppContext();
  appContext.clustersService.getClusters = () => [];

  return (
    <AppContextProvider value={appContext}>
      <Container>
        <Navigator />
      </Container>
    </AppContextProvider>
  );
}

const Container = styled.div`
  background: white;
  max-width: 300px;
  max-height: 700px;
  overflow: auto;
`;
