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

import { MemoryRouter } from 'react-router';

import { LoginTrait } from './LoginTrait';
import { State } from './useLoginTrait';

export default {
  title: 'Teleport/Discover/Server/LoginTrait',
};

export const NoLoginsAndPerm = () => (
  <MemoryRouter>
    <LoginTrait
      {...props}
      canEditUser={false}
      staticLogins={[]}
      dynamicLogins={[]}
    />
  </MemoryRouter>
);

export const NoLoginsAndPermAndSsoUser = () => (
  <MemoryRouter>
    <LoginTrait
      {...props}
      canEditUser={false}
      isSsoUser={true}
      staticLogins={[]}
      dynamicLogins={[]}
    />
  </MemoryRouter>
);

export const NoPerm = () => (
  <MemoryRouter>
    <LoginTrait {...props} canEditUser={false} />
  </MemoryRouter>
);

export const SsoUser = () => (
  <MemoryRouter>
    <LoginTrait {...props} isSsoUser={true} />
  </MemoryRouter>
);

export const StaticAndDynamic = () => (
  <MemoryRouter>
    <LoginTrait {...props} />
  </MemoryRouter>
);

export const DynamicOnly = () => (
  <MemoryRouter>
    <LoginTrait {...props} staticLogins={[]} />
  </MemoryRouter>
);

export const StaticOnly = () => (
  <MemoryRouter>
    <LoginTrait {...props} dynamicLogins={[]} />
  </MemoryRouter>
);

export const NoLogins = () => (
  <MemoryRouter>
    <LoginTrait {...props} dynamicLogins={[]} staticLogins={[]} />
  </MemoryRouter>
);

export const Processing = () => (
  <MemoryRouter>
    <LoginTrait {...props} attempt={{ status: 'processing' }} />
  </MemoryRouter>
);

export const Failed = () => (
  <MemoryRouter>
    <LoginTrait
      {...props}
      attempt={{ status: 'failed', statusText: 'some error message' }}
    />
  </MemoryRouter>
);

const props: State = {
  attempt: {
    status: 'success',
    statusText: '',
  },
  dynamicLogins: [
    'root',
    'llama',
    'george_washington_really_long_name_testing',
  ],
  staticLogins: ['ubunutu', 'debian'],
  nextStep: () => null,
  addLogin: () => null,
  fetchLoginTraits: () => null,
  canEditUser: true,
  isSsoUser: false,
};
