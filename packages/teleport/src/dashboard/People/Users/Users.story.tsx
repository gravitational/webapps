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
import Users from './Users';
import TeleportContextProvider from 'teleport/teleportContextProvider';
import TeleportContext from 'teleport/teleportContext';
import makeAcl from 'teleport/services/user/makeAcl';

export default {
  title: 'TeleportDashboard/Users',
};

export const Loaded = () => {
  const ctx = new TeleportContext();
  const acl = makeAcl(sample.acl);

  ctx.storeUser.setState({ acl });
  ctx.resourceService.fetchRoles = () => Promise.resolve(sample.roles);
  ctx.userService.fetchUsers = () => Promise.resolve(sample.users);
  return render(ctx, <Users />);
};

export const Processing = () => {
  const ctx = new TeleportContext();
  const acl = makeAcl(sample.acl);

  ctx.storeUser.setState({ acl });
  ctx.resourceService.fetchRoles = () => new Promise(() => null);
  ctx.userService.fetchUsers = () => new Promise(() => null);
  return render(ctx, <Users />);
};

export const Failed = () => {
  const ctx = new TeleportContext();
  const acl = makeAcl(sample.acl);

  ctx.storeUser.setState({ acl });
  ctx.resourceService.fetchRoles = () =>
    Promise.reject(new Error('some error message'));
  return render(ctx, <Users />);
};

function render(ctx: TeleportContext, children: JSX.Element) {
  return (
    <TeleportContextProvider value={ctx}>{children}</TeleportContextProvider>
  );
}

const sample = {
  acl: {
    users: {
      list: true,
      create: true,
      remove: true,
      edit: true,
    },
    roles: {
      list: true,
      read: true,
    },
  },
  roles: [
    {
      content: '',
      displayName: '',
      id: '',
      kind: 'role',
      name: 'admin',
    } as const,
    {
      content: '',
      displayName: '',
      id: '',
      kind: 'role',
      name: 'testrole',
    } as const,
  ],
  users: [
    {
      name: 'cikar@egaposci.me',
      roles: ['admin'],
      created: new Date('2020-12-20T17:28:20.93Z'),
    },
    {
      name: 'hi@nen.pa',
      roles: ['ruhh', 'admin'],
      created: new Date('2020-12-18T17:28:20.93Z'),
    },
    {
      name: 'ziat@uthatebo.sl',
      roles: ['kaco', 'ziuzzow', 'admin'],
      created: new Date('2020-12-11T17:28:20.93Z'),
    },
    {
      name: 'pamkad@ukgir.ki',
      roles: ['vuit', 'vedkonm', 'valvapel'],
      created: new Date('2020-12-14T17:28:20.93Z'),
    },
    {
      name: 'jap@kosusfaw.mp',
      roles: ['ubip', 'duzjadj', 'dupiwuzocafe', 'abc', 'anavebikilonim'],
      created: new Date('2020-12-17T17:28:20.93Z'),
    },
    {
      name: 'azesotil@jevig.org',
      roles: ['tugu'],
      created: new Date('2020-12-10T17:28:20.93Z'),
    },
  ],
};
