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
import DefaultApps from './Apps';
import TeleportContextProvider from 'teleport/teleportContextProvider';
import TeleportContext from 'teleport/teleportContext';
import makeAcl from 'teleport/services/user/makeAcl';

export default {
  title: 'TeleportDashboard/Apps',
};

export const Loaded = () => {
  const ctx = new TeleportContext();
  const acl = makeAcl(sample.acl);

  ctx.storeUser.setState({ acl });
  ctx.appService.fetchApps = () => Promise.resolve(sample.apps);
  return render(ctx, <DefaultApps />);
};

export const Empty = () => {
  const ctx = new TeleportContext();
  const acl = makeAcl(sample.acl);

  ctx.storeUser.setState({ acl });
  ctx.appService.fetchApps = () => Promise.resolve([]);
  return render(ctx, <DefaultApps />);
};

export const Processing = () => {
  const ctx = new TeleportContext();
  const acl = makeAcl(sample.acl);

  ctx.storeUser.setState({ acl });
  ctx.appService.fetchApps = () => new Promise(() => null);
  return render(ctx, <DefaultApps />);
};

export const Failed = () => {
  const ctx = new TeleportContext();
  const acl = makeAcl(sample.acl);

  ctx.storeUser.setState({ acl });
  ctx.appService.fetchApps = () =>
    Promise.reject(new Error('some error message'));
  return render(ctx, <DefaultApps />);
};

function render(ctx: TeleportContext, children: JSX.Element) {
  return (
    <TeleportContextProvider value={ctx}>{children}</TeleportContextProvider>
  );
}

const sample = {
  acl: {
    apps: {
      list: true,
      create: true,
      remove: true,
      edit: true,
      read: true,
    },
  },
  apps: [
    {
      id: '1',
      name: 'jenkins',
      clusterId: 'root-cluster-name',
      labels: [],
      publicAddr: 'https://jekins.example.com/',
      internalAddr: 'localhost:8080',
      hostname: 'jenkin-hostname',
    },
    {
      id: '2',
      name: 'github',
      clusterId: 'leaf-cluster-name',
      labels: [
        { name: 'auth', value: 'dev' },
        { name: 'infrastructure', value: 'deployment' },
      ],
      publicAddr: 'https://github.example.com/',
      internalAddr: 'localhost:8081',
      hostname: 'github-hostname',
    },
    {
      id: '3',
      name: 'slack',
      clusterId: 'leaf2-cluster-longNameFormat-reallyLong',
      labels: [
        { name: 'auth', value: 'general' },
        { name: 'tools', value: 'comms' },
        { name: 'version', value: 'latest' },
        { name: 'teams', value: 'all' },
        { name: 'type', value: 'internal' },
      ],
      publicAddr: 'https://slack.example.com/',
      internalAddr: 'localhost:8080',
      hostname: 'slack-hostname',
    },
  ],
};
