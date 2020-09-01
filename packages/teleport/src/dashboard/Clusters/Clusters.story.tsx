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

import React from 'react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import Clusters from './Clusters';
import * as fixtures from './fixtures';
import TeleportContextProvider from 'teleport/teleportContextProvider';
import TeleportContext from 'teleport/teleportContext';

export default {
  title: 'TeleportDashboard',
  excludeStories: ['createContext'],
};

export function DashboardClusters({ value }: { value: TeleportContext }) {
  const ctx = value || createContext();
  return (
    <TeleportContextProvider value={ctx}>
      <Router history={createMemoryHistory()}>
        <Clusters />
      </Router>
    </TeleportContextProvider>
  );
}

DashboardClusters.story = {
  name: 'Clusters',
};

export function createContext() {
  const ctx = new TeleportContext();
  ctx.clusterService.fetchClusters = () => Promise.resolve(fixtures.clusters);
  return ctx;
}
