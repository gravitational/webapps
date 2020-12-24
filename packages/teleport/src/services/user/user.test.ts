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

import user from './user';
import api from 'teleport/services/api';
import { defaultAccess } from 'teleport/services/user/makeAcl';
import { defaultStrategy } from 'teleport/services/user/makeUserContext';

test('fetch user context, null response gives proper default values', async () => {
  jest.spyOn(api, 'get').mockResolvedValue(null);

  let response = await user.fetchUserContext(false);

  expect(response.acl).toStrictEqual({
    logins: [],
    authConnectors: defaultAccess,
    trustedClusters: defaultAccess,
    roles: defaultAccess,
    sessions: defaultAccess,
    events: defaultAccess,
    users: defaultAccess,
    appServers: defaultAccess,
    tokens: defaultAccess,
    accessRequests: defaultAccess,
  });

  expect(response.accessStrategy).toStrictEqual(defaultStrategy);
  expect(response.requestableRoles).toStrictEqual([]);
  expect(response.cluster).toEqual(expect.anything());
});

test('fetch users, null response gives empty array', async () => {
  jest.spyOn(api, 'get').mockResolvedValue(null);

  let response = await user.fetchUsers();

  expect(response).toStrictEqual([]);
});
