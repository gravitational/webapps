/*
Copyright 2020 Gravitational, Inc.

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
import { MemoryRouter } from 'react-router';

import AgentButtocnAdd, { Props } from './AgentButtonAdd';

export default {
  title: 'Teleport/AgentButtonAdd',
};

export const CanCreate = () => (
  <MemoryRouter>
    <AgentButtocnAdd {...props} />
  </MemoryRouter>
);

export const CannotCreate = () => (
  <MemoryRouter>
    <AgentButtocnAdd {...props} canCreate={false} />
  </MemoryRouter>
);

export const CannotCreateVowel = () => (
  <MemoryRouter>
    <AgentButtocnAdd
      {...props}
      agent="application"
      beginsWithVowel={true}
      canCreate={false}
    />
  </MemoryRouter>
);

export const OnLeaf = () => (
  <MemoryRouter>
    <AgentButtocnAdd {...props} isLeafCluster={true} />
  </MemoryRouter>
);

export const OnLeafVowel = () => (
  <MemoryRouter>
    <AgentButtocnAdd {...props} isLeafCluster={true} beginsWithVowel={true} />
  </MemoryRouter>
);

const props: Props = {
  agent: 'server',
  beginsWithVowel: false,
  canCreate: true,
  isLeafCluster: false,
  onClick: () => null,
};
