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
import ServiceGlobalSearch from 'teleterm/ui/services/globalSearch';
import AppContextProvider from 'teleterm/ui/appContextProvider';
import { MockAppContext } from 'teleterm/ui/fixtures/mocks';
import GlobalSearch from './GlobalSearch';

export default {
  title: 'Teleterm/GlobalSearch',
};

export const Story = () => {
  const appContext = new MockAppContext();
  appContext.serviceGlobalSearch = new ServiceGlobalSearch();
  appContext.serviceGlobalSearch.search = () => [
    {
      kind: 'tsh.server',
      data: {
        uri: 'clusters/localhost/servers/hostname3',
        uriKind: 'server',
        tunnel: false,
        name: 'server1',
        clusterId: 'localhost',
        hostname: 'hostname3',
        addr: '123.12.12.12',
        labelsList: [
          { name: 'os', value: 'linux' },
          { name: 'date', value: 'linux' },
          { name: 'ram', value: 'linux' },
          { name: 'disk', value: 'linux' },
        ],
      },
    },
    {
      kind: 'tsh.server',
      data: {
        uri: 'clusters/localhost/servers/hostname2',
        uriKind: 'server',
        tunnel: false,
        name: 'server2',
        clusterId: 'localhost',
        hostname: 'hostname2',
        addr: '123.12.12.11',
        labelsList: [],
      },
    },
    {
      kind: 'tsh.server',
      data: {
        uri: 'clusters/localhost/servers/hostname1',
        uriKind: 'server',
        tunnel: false,
        name: 'server3',
        clusterId: 'localhost',
        hostname: 'hostname3',
        addr: '123.12.11.11',
        labelsList: [{ name: 'os', value: 'linux' }],
      },
    },
    {
      kind: 'tsh.db',
      data: {
        uri: 'clusters/localhost/dbs/db-server1',
        uriKind: 'db',
        name: 'production',
        desc: 'postgre',
        clusterId: 'localhost',
        type: 'RDS PostgreSQL',
        hostname: 'localhost',
        protocol: 'postgresql',
        addr: '123.12.12.12',
        labelsList: [{ name: 'os', value: 'linux' }],
      },
    },
  ];
  return (
    <AppContextProvider value={appContext}>
      <GlobalSearch />
    </AppContextProvider>
  );
};
