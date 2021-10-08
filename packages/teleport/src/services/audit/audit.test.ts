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

import AuditService from './audit';
import api from 'teleport/services/api';

test('fetch events', async () => {
  const audit = new AuditService();

  // Test null response gives empty array.
  jest.spyOn(api, 'get').mockResolvedValue({ events: null });
  let response = await audit.fetchEvents('clusterId', params);

  expect(api.get).toHaveBeenCalledTimes(1);
  expect(response.events).toEqual([]);
  expect(response.startKey).toBeUndefined();

  // Test normal response.
  audit.maxFetchLimit = 2;
  jest.spyOn(api, 'get').mockResolvedValue(normalJson);
  response = await audit.fetchEvents('clusterId', params);

  expect(response.startKey).toEqual(normalJson.startKey);
  expect(response.events).toEqual([
    {
      codeDesc: 'Reset Password Token Created',
      message:
        'User [90678c66-ffcc-4f02.im-a-cluster-name] created a password reset token for user [root]',
      id: '5ec6-4c2c-8567-36bcb',
      code: 'T6000I',
      user: '90678c66-ffcc-4f02.im-a-cluster-name',
      time: new Date('2021-05-25T07:34:22.204Z'),
      raw: {
        cluster_name: 'im-a-cluster-name',
        code: 'T6000I',
        ei: 0,
        event: 'reset_password_token.create',
        expires: '2021-05-25T08:34:22.204114385Z',
        name: 'root',
        time: '2021-05-25T07:34:22.204Z',
        ttl: '1h0m0s',
        uid: '5ec6-4c2c-8567-36bcb',
        user: '90678c66-ffcc-4f02.im-a-cluster-name',
      },
    },
    // Test without uid, id field returns event:time format
    {
      codeDesc: 'Local Login',
      message: 'Local user [root] successfully logged in',
      id: 'user.login:2021-05-25T14:37:27.848Z',
      code: 'T1000I',
      user: 'root',
      time: new Date('2021-05-25T14:37:27.848Z'),
      raw: {
        cluster_name: 'im-a-cluster-name',
        code: 'T1000I',
        ei: 0,
        event: 'user.login',
        method: 'local',
        success: true,
        time: '2021-05-25T14:37:27.848Z',
        user: 'root',
      },
    },
    {
      codeDesc: 'Database Created',
      message: 'User [05ff66c9-a948-42f4-af0e-a1b6ba62561e.root] created database [postgres-local]',
      id: '9d37514f-aef5-426f-9fda-31fd35d070f5',
      code: 'TDB03I',
      user: '05ff66c9-a948-42f4-af0e-a1b6ba62561e.root',
      time: new Date('2021-10-08T15:42:15.39Z'),
      raw: {
        cluster_name: 'root',
        code: 'TDB03I',
        db_labels: {
          'env': 'local',
          'teleport.dev/origin': 'dynamic'
        },
        db_protocol: 'postgres',
        db_uri: 'localhost:5432',
        ei: 0,
        event: 'db.create',
        expires: '0001-01-01T00:00:00Z',
        name: 'postgres-local',
        time: '2021-10-08T15:42:15.39Z',
        uid: '9d37514f-aef5-426f-9fda-31fd35d070f5',
        user: '05ff66c9-a948-42f4-af0e-a1b6ba62561e.root'
      },
    },
    {
      codeDesc: 'Database Updated',
      message: 'User [05ff66c9-a948-42f4-af0e-a1b6ba62561e.root] updated database [postgres-local]',
      id: 'fe631a5a-6418-49d6-99e7-5280654663ec',
      code: 'TDB04I',
      user: '05ff66c9-a948-42f4-af0e-a1b6ba62561e.root',
      time: new Date('2021-10-08T15:42:24.581Z'),
      raw: {
        cluster_name: 'root',
        code: 'TDB04I',
        db_labels: {
          'env': 'local',
          'teleport.dev/origin': 'dynamic'
        },
        db_protocol: 'postgres',
        db_uri: 'localhost:5432',
        ei: 0,
        event: 'db.update',
        expires: '0001-01-01T00:00:00Z',
        name: 'postgres-local',
        time: '2021-10-08T15:42:24.581Z',
        uid: 'fe631a5a-6418-49d6-99e7-5280654663ec',
        user: '05ff66c9-a948-42f4-af0e-a1b6ba62561e.root'
      },
    },
    {
      codeDesc: 'Database Deleted',
      message: 'User [05ff66c9-a948-42f4-af0e-a1b6ba62561e.root] deleted database [postgres-local]',
      id: '74f5e6b9-50c4-4195-bb26-d615641255bc',
      code: 'TDB05I',
      user: '05ff66c9-a948-42f4-af0e-a1b6ba62561e.root',
      time: new Date('2021-10-08T15:42:36.005Z'),
      raw: {
        cluster_name: 'root',
        code: 'TDB05I',
        ei: 0,
        event: 'db.delete',
        expires: '0001-01-01T00:00:00Z',
        name: 'postgres-local',
        time: '2021-10-08T15:42:36.005Z',
        uid: '74f5e6b9-50c4-4195-bb26-d615641255bc',
        user: '05ff66c9-a948-42f4-af0e-a1b6ba62561e.root'
      },
    },
  ]);

  // Test unknown event code returns unknown format
  jest.spyOn(api, 'get').mockResolvedValue(unknownEvent);
  response = await audit.fetchEvents('clusterId', params);

  expect(response.events[0].codeDesc).toEqual('Unknown');
  expect(response.events[0].message).toEqual('Unknown');
});

const params = {
  from: new Date(0),
  to: new Date(0),
};

const normalJson = {
  events: [
    {
      cluster_name: 'im-a-cluster-name',
      code: 'T6000I',
      ei: 0,
      event: 'reset_password_token.create',
      expires: '2021-05-25T08:34:22.204114385Z',
      name: 'root',
      time: '2021-05-25T07:34:22.204Z',
      ttl: '1h0m0s',
      uid: '5ec6-4c2c-8567-36bcb',
      user: '90678c66-ffcc-4f02.im-a-cluster-name',
    },
    {
      cluster_name: 'im-a-cluster-name',
      code: 'T1000I',
      ei: 0,
      event: 'user.login',
      method: 'local',
      success: true,
      time: '2021-05-25T14:37:27.848Z',
      user: 'root',
    },
    {
      cluster_name: 'root',
      code: 'TDB03I',
      db_labels: {
        'env': 'local',
        'teleport.dev/origin': 'dynamic'
      },
      db_protocol: 'postgres',
      db_uri: 'localhost:5432',
      ei: 0,
      event: 'db.create',
      expires: '0001-01-01T00:00:00Z',
      name: 'postgres-local',
      time: '2021-10-08T15:42:15.39Z',
      uid: '9d37514f-aef5-426f-9fda-31fd35d070f5',
      user: '05ff66c9-a948-42f4-af0e-a1b6ba62561e.root'
    },
    {
      cluster_name: 'root',
      code: 'TDB04I',
      db_labels: {
        'env': 'local',
        'teleport.dev/origin': 'dynamic'
      },
      db_protocol: 'postgres',
      db_uri: 'localhost:5432',
      ei: 0,
      event: 'db.update',
      expires: '0001-01-01T00:00:00Z',
      name: 'postgres-local',
      time: '2021-10-08T15:42:24.581Z',
      uid: 'fe631a5a-6418-49d6-99e7-5280654663ec',
      user: '05ff66c9-a948-42f4-af0e-a1b6ba62561e.root'
    },
    {
      cluster_name: 'root',
      code: 'TDB05I',
      ei: 0,
      event: 'db.delete',
      expires: '0001-01-01T00:00:00Z',
      name: 'postgres-local',
      time: '2021-10-08T15:42:36.005Z',
      uid: '74f5e6b9-50c4-4195-bb26-d615641255bc',
      user: '05ff66c9-a948-42f4-af0e-a1b6ba62561e.root'
    }
  ],
  startKey: '0691-4797-ab2b-8c7b8',
};

const unknownEvent = {
  events: [
    {
      cluster_name: 'im-a-cluster-name',
      code: 'unregistered-code',
      ei: 0,
      event: 'user.login',
      method: 'local',
      success: true,
      time: '2021-05-25T14:37:27.848Z',
      user: 'root',
    },
  ],
};
