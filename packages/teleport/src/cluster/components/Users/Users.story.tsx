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
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import Users from './Users';
import TeleportContextProvider from 'teleport/teleportContextProvider';
import TeleportContext from 'teleport/teleportContext';
import resourceService from 'e-teleport/services/resources';
import userServices from 'teleport/services/user';

export default {
  title: 'Teleport/Users/UsersView',
};

export const Success = () => {
  resourceService.fetchRoles = () =>
    Promise.resolve([
      {
        content: '',
        displayName: '',
        id: '',
        kind: 'role',
        name: 'admin',
      },
      {
        content: '',
        displayName: '',
        id: '',
        kind: 'role',
        name: 'testrole',
      },
    ]);
  userServices.fetchUsers = () => Promise.resolve([]);
  return render(ctx);
};

export const Processing = () => {
  resourceService.fetchRoles = () => new Promise(() => null);
  userServices.fetchUsers = () => new Promise(() => null);
  return render(ctx);
};

export const Failed = () => {
  resourceService.fetchRoles = () =>
    Promise.reject(new Error('some error message'));
  return render(ctx);
};

function render(ctx) {
  const history = createMemoryHistory();
  return (
    <TeleportContextProvider value={ctx}>
      <Router history={history}>
        <Users />
      </Router>
    </TeleportContextProvider>
  );
}

const ctx = new TeleportContext();
ctx.storeUser.state = {
  acl: {
    users: {
      list: true,
      read: true,
      create: false,
      remove: true,
      edit: true,
    },
    roles: {
      list: true,
      read: true,
      create: true,
      remove: true,
      edit: true,
    },
    logins: null,
    authConnectors: null,
    trustedClusters: null,
    sessions: null,
    events: null,
  },
  authType: null,
  username: null,
  cluster: {
    clusterId: '',
    lastConnected: null,
    connectedText: '',
    status: '',
    url: '',
    nodeCount: 0,
    publicURL: '',
    authVersion: '',
    proxyVersion: '',
  },
};

userServices.createUser = () => new Promise(() => null);
