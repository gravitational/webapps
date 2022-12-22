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
import { MockAppContext } from 'teleterm/ui/fixtures/mocks';

import { getEmptyPendingAccessRequest } from '../services/workspacesService/accessRequestsService';

import QuickInput from './QuickInput';

export default {
  title: 'Teleterm/QuickInput',
};

export const Story = () => {
  return (
    <>
      {/* Extra bottom margin to accommodate the suggestions displayed under the input. */}
      <QuickInputDemo description="Pristine state" mb={350} />
      <QuickInputDemo description="Command suggestions" inputValue="ts" />
      <QuickInputDemo
        description="Login suggestions"
        inputValue="tsh ssh "
        mb={160}
      />
      <QuickInputDemo
        description="Server suggestions"
        inputValue="tsh ssh root@"
        mb={350}
      />
      <QuickInputDemo
        description="Database suggestions"
        inputValue="tsh proxy db "
        mb={350}
      />
    </>
  );
};

const QuickInputDemo = (props: {
  description: string;
  inputValue?: string;
  mb?: number;
}) => {
  const appContext = new MockAppContext();

  appContext.workspacesService.state = {
    workspaces: {
      '/clusters/localhost': {
        documents: [],
        location: undefined,
        localClusterUri: '/clusters/localhost',
        accessRequests: {
          pending: getEmptyPendingAccessRequest(),
          isBarCollapsed: true,
        },
      },
    },
    rootClusterUri: '/clusters/localhost',
  };

  const cluster = {
    uri: '/clusters/localhost' as const,
    name: 'Test',
    leaf: false,
    connected: true,
    proxyHost: 'localhost:3080',
    loggedInUser: {
      activeRequestsList: [],
      name: 'admin',
      acl: {},
      sshLoginsList: [
        'root',
        'ubuntu',
        'ansible',
        'lorem-ipsum-dolor-sit-amet-lorem-ipsum-dolor-sit-amet-lorem-ipsum-dolor-sit-amet',
      ],
      rolesList: [],
    },
  };

  appContext.clustersService.getClusters = () => {
    return [cluster];
  };

  appContext.clustersService.setState(draftState => {
    draftState.clusters = new Map([[cluster.uri, cluster]]);
  });

  appContext.resourcesService.fetchServers = async () => ({
    agentsList: [
      {
        uri: '/clusters/localhost/servers/foo',
        tunnel: false,
        name: '2018454d-ef3b-4b15-84f7-61ca213d37e3',
        hostname: 'foo',
        addr: 'foo.localhost',
        labelsList: [
          { name: 'env', value: 'prod' },
          { name: 'kernel', value: '5.15.0-1023-aws' },
        ],
      },
      {
        uri: '/clusters/localhost/servers/bar',
        tunnel: false,
        name: '24c7aebe-4741-4464-ab69-f076fe467ebd',
        hostname: 'bar',
        addr: 'bar.localhost',
        labelsList: [
          { name: 'env', value: 'staging' },
          { name: 'kernel', value: '5.14.1-1058-aws' },
        ],
      },
      {
        uri: '/clusters/localhost/servers/lorem',
        tunnel: false,
        name: '24c7aebe-4741-4464-ab69-f076fe467ebd',
        hostname:
          'lorem-ipsum-dolor-sit-amet-lorem-ipsum-dolor-sit-amet-lorem-ipsum-dolor-sit-amet',
        addr: 'lorem.localhost',
        labelsList: [
          { name: 'env', value: 'staging' },
          { name: 'kernel', value: '5.14.1-1058-aws' },
          {
            name: 'lorem',
            value:
              'lorem-ipsum-dolor-sit-amet-lorem-ipsum-dolor-sit-amet-lorem-ipsum-dolor-sit-amet',
          },
          { name: 'kernel2', value: '5.14.1-1058-aws' },
          { name: 'env2', value: 'staging' },
          { name: 'kernel3', value: '5.14.1-1058-aws' },
        ],
      },
    ],
    totalCount: 3,
    startKey: 'foo',
  });

  appContext.resourcesService.fetchDatabases = async () => ({
    agentsList: [
      {
        uri: '/clusters/localhost/dbs/postgres',
        name: 'postgres',
        desc: 'A PostgreSQL database',
        protocol: 'postgres',
        type: 'self-hosted',
        hostname: 'postgres.localhost',
        addr: 'postgres.localhost',
        labelsList: [
          { name: 'env', value: 'prod' },
          { name: 'kernel', value: '5.15.0-1023-aws' },
        ],
      },
      {
        uri: '/clusters/localhost/dbs/mysql',
        name: 'mysql',
        desc: 'A MySQL database',
        protocol: 'mysql',
        type: 'self-hosted',
        hostname: 'mysql.localhost',
        addr: 'mysql.localhost',
        labelsList: [
          { name: 'env', value: 'staging' },
          { name: 'kernel', value: '5.14.1-1058-aws' },
        ],
      },
      {
        uri: '/clusters/localhost/dbs/lorem',
        name: 'lorem-ipsum-dolor-sit-amet-lorem-ipsum-dolor-sit-amet-lorem-ipsum-dolor-sit-amet',
        desc: 'Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
        protocol: 'mysql',
        type: 'self-hosted',
        hostname: 'lorem.localhost',
        addr: 'lorem.localhost',
        labelsList: [
          { name: 'env', value: 'staging' },
          { name: 'kernel', value: '5.14.1-1058-aws' },
          {
            name: 'lorem',
            value:
              'lorem-ipsum-dolor-sit-amet-lorem-ipsum-dolor-sit-amet-lorem-ipsum-dolor-sit-amet',
          },
          { name: 'kernel2', value: '5.14.1-1058-aws' },
          { name: 'env2', value: 'staging' },
          { name: 'kernel3', value: '5.14.1-1058-aws' },
        ],
      },
    ],
    totalCount: 2,
    startKey: 'foo',
  });

  if (props.inputValue !== undefined) {
    appContext.quickInputService.setInputValue(props.inputValue);
    appContext.quickInputService.show();
    appContext.quickInputService.hide = () => {};
  }

  return (
    <AppContextProvider value={appContext}>
      <p>{props.description}</p>
      <div
        css={`
          height: 40px;
          margin-bottom: ${props.mb || 150}px;
        `}
      >
        <QuickInput />
      </div>
    </AppContextProvider>
  );
};
