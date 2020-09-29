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
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import makeAcl from 'teleport/services/user/makeAcl';
import TeleportContext, {
  ReactContextProvider,
} from 'teleport/teleportContext';

export default {
  title: 'Teleport/Apps',
};

export const Loaded = () => {
  const ctx = new TeleportContext();
  const acl = makeAcl(sample.acl);

  ctx.storeUser.setState({ acl });
  ctx.appService.fetchApps = () => Promise.resolve(sample.apps);
  return render(ctx);
};

export const Empty = () => {
  const ctx = new TeleportContext();
  const acl = makeAcl(sample.acl);

  ctx.storeUser.setState({ acl });
  ctx.appService.fetchApps = () => Promise.resolve([]);
  return render(ctx);
};

export const Processing = () => {
  const ctx = new TeleportContext();
  const acl = makeAcl(sample.acl);

  ctx.storeUser.setState({ acl });
  ctx.appService.fetchApps = () => new Promise(() => null);
  return render(ctx);
};

export const Failed = () => {
  const ctx = new TeleportContext();
  const acl = makeAcl(sample.acl);

  ctx.storeUser.setState({ acl });
  ctx.appService.fetchApps = () =>
    Promise.reject(new Error('some error message'));
  return render(ctx);
};

function render(ctx) {
  const history = createMemoryHistory({
    initialEntries: ['/web/cluster/localhost/audit/events'],
    initialIndex: 0,
  });

  return (
    <ReactContextProvider value={ctx}>
      <Router history={history}>
        <DefaultApps />
      </Router>
    </ReactContextProvider>
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
      id: '61',
      name: 'jenkins',
      uri: '/internal/',
      publicAddr: 'jenkins.one',
      clusterId: 'one',
      fqdn: 'jenkins.one',
      launchUrl: '/web/launcher/one',
      labels: [],
    },
    {
      id: '191',
      name: 'jenkins',
      uri: '/internal/',
      publicAddr: 'jenkins.two',
      clusterId: 'two',
      fqdn: 'jenkins.two',
      launchUrl: '/web/launcher/two',
      labels: [],
    },
  ],
};
