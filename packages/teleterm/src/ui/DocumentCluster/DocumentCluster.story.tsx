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
import styled from 'styled-components';
import AppContextProvider from 'teleterm/ui/appContextProvider';
import { MockAppContext } from 'teleterm/ui/fixtures/mocks';
import { SyncStatus } from 'teleterm/ui/services/clusters/types';
import { DocumentCluster } from './DocumentCluster';

export default {
  title: 'Teleterm/Cluster',
};

export const Story = () => {
  const appContext = new MockAppContext();

  appContext.serviceClusters.getClusterSyncStatus = (_ = '') => {
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

  appContext.serviceClusters.getClusters = () => [
    {
      uri: 'clusters/localhost',
      leaf: false,
      name: 'localhost',
      connected: true,
    },
  ];

  return (
    <AppContextProvider value={appContext}>
      <Wrapper>
        <DocumentCluster visible={true} />
      </Wrapper>
    </AppContextProvider>
  );
};

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;
