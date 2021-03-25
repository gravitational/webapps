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

import makeUserContext from 'teleport/services/user/makeUserContext';

export const userContext = makeUserContext({
  authType: 'sso',
  userName: 'Sam',
  accessCapabilities: {
    suggestedReviewers: ['george_washington@gmail.com', 'chad'],
    requestableRoles: ['dev-a', 'dev-b', 'dev-c', 'dev-d'],
  },
  userAcl: {
    tokens: {
      list: true,
      read: true,
      create: true,
    },
    appServers: {
      list: true,
      read: true,
    },
    sessions: {
      list: true,
      read: true,
      edit: false,
      create: false,
      remove: false,
    },
    authConnectors: {
      list: true,
      read: true,
      edit: true,
      create: true,
      remove: true,
    },
    roles: { list: true, read: true, edit: true, create: true, remove: true },
    users: { list: true, read: true, edit: true, create: true, remove: true },
    trustedClusters: {
      list: true,
      read: true,
      edit: true,
      create: true,
      remove: true,
    },
    events: {
      list: true,
      read: true,
      edit: false,
      create: false,
      remove: false,
    },
    accessRequests: {
      list: true,
      read: true,
      edit: true,
      create: true,
      remove: true,
    },
    sshLogins: ['dev', 'root'],
  },
  cluster: {
    name: 'aws',
    lastConnected: '2020-09-26T17:30:23.512876876Z',
    status: 'online',
    nodeCount: 1,
    publicURL: 'localhost',
    authVersion: '4.4.0-dev',
    proxyVersion: '4.4.0-dev',
  },
});
