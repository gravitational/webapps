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
import UsersList from './UserList';

export default {
  title: 'Teleport/Users',
};

export const UserList = () => {
  return <UsersList users={users} pageSize={5} onView={() => null} />;
};

const users = [
  {
    name: 'cikar@egaposci.me',
    roles: ['admin'],
    created: new Date('02/15/2020'),
  },
  {
    name: 'hi@nen.pa',
    roles: ['ruhh', 'admin'],
    created: new Date('10/15/2020'),
  },
  {
    name: 'ziat@uthatebo.sl',
    roles: ['kaco', 'ziuzzow', 'admin'],
    created: new Date('01/15/2020'),
  },
  {
    name: 'pamkad@ukgir.ki',
    roles: ['vuit', 'vedkonm', 'valvapel'],
    created: new Date('08/15/2020'),
  },
  {
    name: 'jap@kosusfaw.mp',
    roles: ['ubip', 'duzjadj', 'dupiwuzocafe', 'abc', 'anavebikilonim'],
    created: new Date('01/15/2020'),
  },
  {
    name: 'azesotil@jevig.org',
    roles: ['tugu'],
    created: new Date('09/15/2020'),
  },
];
