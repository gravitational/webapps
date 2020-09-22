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
import * as Teleport from 'teleport/teleportContext';

export default {
  title: 'Teleport/Clusters',
  excludeStories: ['createContext'],
};

export function Story({ value }: { value: Teleport.Context }) {
  const ctx = value || createContext();
  return (
    <Teleport.ReactContextProvider value={ctx}>
      <Router history={createMemoryHistory()}>
        <Clusters />
      </Router>
    </Teleport.ReactContextProvider>
  );
}

Story.story = {
  name: 'Clusters',
};

export function createContext() {
  const ctx = new Teleport.Context();
  ctx.clusterService.fetchClusters = () => Promise.resolve(fixtures.clusters);
  return ctx;
}
