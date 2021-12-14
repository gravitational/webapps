/*
Copyright 2021 Gravitational, Inc.

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
import { MemoryRouter as Router } from 'react-router';
import { State } from './useDesktops';
import { Desktops } from './Desktops';
import { desktops } from './fixtures';

export default {
  title: 'Teleport/Desktops',
};

export const Loading = () => (
  <Router
    children={<Desktops {...props} attempt={{ status: 'processing' }} />}
  />
);

export const Loaded = () => <Router children={<Desktops {...props} />} />;

export const Empty = () => (
  <Router children={<Desktops {...props} desktops={[]} />} />
);

export const Failed = () => (
  <Router
    children={
      <Desktops
        {...props}
        attempt={{ status: 'failed', statusText: 'Server Error' }}
      />
    }
  />
);

const props: State = {
  desktops,
  attempt: { status: 'success' },
  username: 'user',
  clusterId: 'im-a-cluster',
  searchValue: '',
  setSearchValue: () => null,
  getWindowsLoginOptions: () => [{ login: 'login', url: 'url' }],
  openRemoteDesktopTab: () => null,
};
