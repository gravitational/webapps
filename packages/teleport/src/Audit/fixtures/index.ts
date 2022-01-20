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

import { makeEvent } from 'teleport/services/audit';

// events contains sample JSON's of all supported event types
export const events = [
  {
    code: 'T1004I',
    uid: 'b121fc4c-e419-56a2-a760-19cd746c0650',
    time: '2020-06-05T16:24:05Z',
    event: 'user.delete',
    name: 'bob',
    user: 'benarent',
  },
  {
    code: 'T1003I',
    event: 'user.update',
    name: 'bob',
    time: '2020-06-05T16:24:05Z',
    uid: '3a8cd55b5-bce9-5a4c-882d-8e0a5ae10008',
    expires: 111111,
    roles: ['root'],
  },
  {
    code: 'T4002I',
    event: 'session.network',
    namespace: 'default',
    sid: '44c6cea8-362f-11ea-83aa-125400432324',
    server_id: '96f2bed2',
    login: 'root',
    user: 'benarent',
    pid: 2653,
    cgroup_id: 4294968064,
    program: 'bash',
    src_addr: '10.217.136.161',
    dst_addr: '190.58.129.4',
    dst_port: '3000',
    version: 4,
    time: '2019-04-22T19:39:26.676Z',
  },
  {
    code: 'T4001I',
    event: 'session.disk',
    namespace: 'default',
    sid: '44c6cea8-362f-11ea-83aa-125400432324',
    server_id: '96f2bed2',
    login: 'root',
    user: 'benarent',
    pid: 2653,
    cgroup_id: 4294968064,
    program: 'bash',
    path: '/etc/profile.d/',
    flags: 2100000,
    return_code: 0,
    time: '2019-04-22T19:39:26.676Z',
  },
  {
    argv: ['google.com'],
    cgroup_id: 4294968064,
    code: 'T4000I',
    ei: 5,
    event: 'session.command',
    login: 'root',
    namespace: 'default',
    path: '/bin/ping',
    pid: 2653,
    ppid: 2660,
    program: 'ping',
    return_code: 0,
    server_id: '96f2bed2-ebd1-494a-945c-2fd57de41644',
    sid: '44c6cea8-362f-11ea-83aa-125400432324',
    time: '2020-01-13T18:05:53.919Z',
    uid: '734930bb-00e6-4ee6-8798-37f1e9473fac',
    user: 'benarent',
  },
  {
    id: '66b827b2-1b0b-512b-965d-6c789388d3c9',
    code: 'T5000I',
    event: 'access_request.create',
    time: '2020-06-05T19:26:53Z',
    uid: '68a83a99-73ce-4bd7-bbf7-99103c2ba6a0',
    user: 'Carrie_Sandoval',
    state: 'PENDING',
    roles: ['admin'],
  },
  {
    id: '66b827b2-1b0b-512b-965d-6c789388d3c9',
    code: 'T5001I',
    event: 'access_request.update',
    time: '2020-06-05T19:26:53Z',
    uid: '68a83a99-73ce-4bd7-bbf7-99103c2ba6a0',
    state: 'APPROVED',
    updated_by: 'Sam_Waters',
  },
  {
    id: '66b827b2-1b0b-512b-965d-6c789388d3c9',
    code: 'T5003I',
    event: 'access_request.delete',
    time: '2020-06-05T19:26:53Z',
    uid: '68a83a99-73ce-4bd7-bbf7-99103c2ba6a0',
  },
  {
    'addr.local': '172.10.1.1:3022',
    'addr.remote': '172.10.1.254:46992',
    code: 'T2006I',
    ei: 2147483646,
    event: 'session.data',
    login: 'root',
    rx: 3974,
    server_id: 'b331fb6c-85f9-4cb0-b308-3452420bf81e',
    sid: '5fc8bf85-a73e-11ea-afd1-0242ac0a0101',
    time: '2020-06-05T15:14:51Z',
    tx: 4730,
    uid: '2f2f07d0-8a01-4abe-b1c0-5001fd86829b',
    user: 'Stanley_Cooper',
  },
  {
    code: 'T6000I',
    name: 'hello',
    event: 'reset_password_token.create',
    time: '2020-06-05T16:24:22Z',
    ttl: '8h0m0s',
    uid: '85fef5df-6dca-475e-a049-393f4cf1d6a3',
    user: 'b331fb6c-85f9-4cb0-b308-3452420bf81e.one',
  },
  {
    cluster_name: 'im-a-cluster-name',
    code: 'T6001I',
    ei: 0,
    event: 'recovery_token.create',
    expires: '2021-08-05T21:56:14.935267Z',
    name: 'user@example.com',
    time: '2021-08-05T21:41:14.935Z',
    ttl: '15m0s',
    uid: '29cd2ad5-f1cd-54d2-85fc-4910fbfc9bfa',
    user: 'user@example.com',
  },
  {
    cluster_name: 'im-a-cluster-name',
    code: 'T6002I',
    ei: 0,
    event: 'privilege_token.create',
    expires: '2021-11-01T22:29:47.989984Z',
    name: 'user@example.com',
    time: '2021-11-01T22:24:47.99Z',
    ttl: '5m0s',
    uid: '6a9d5ac1-08c5-5c1e-9ebd-086d34155b08',
    user: 'user@example.com',
  },
  {
    cluster_name: 'im-a-cluster-name',
    code: 'T1008I',
    ei: 0,
    event: 'recovery_code.generated',
    time: '2021-08-05T21:16:17.13Z',
    uid: 'ed0f6962-e34d-5fa4-bd41-7961cf2c51bb',
    user: 'user@example.com',
  },
  {
    cluster_name: 'im-a-cluster-name',
    code: 'T1009I',
    ei: 0,
    event: 'recovery_code.used',
    success: true,
    time: '2021-08-05T21:22:46.042Z',
    uid: '4bb44dfe-70dc-5820-8c65-0baf40f62d13',
    user: 'user@example.com',
  },
  {
    cluster_name: 'localhost',
    code: 'T1009W',
    ei: 0,
    error: 'recovery code did not match',
    event: 'recovery_code.used',
    message: 'recovery code did not match',
    success: false,
    time: '2021-08-05T23:32:41.273Z',
    uid: '714625ab-48d5-51d0-ab1f-c4b267881594',
    user: 'user@example.com',
  },
  {
    code: 'T8000I',
    event: 'github.created',
    name: 'new_github_connector',
    time: '2020-06-05T19:28:00Z',
    uid: '2b7bb323-35d1-4b9c-9a6d-00ab34c95fb8',
    user: 'unimplemented',
  },
  {
    code: 'T8001I',
    event: 'github.deleted',
    name: 'new_github_connector',
    time: '2020-06-05T19:28:28Z',
    uid: '26f12a67-d593-40df-b3d3-965faee60143',
    user: 'unimplemented',
  },
  {
    code: 'T8100I',
    event: 'oidc.created',
    name: 'new_oidc_connector',
    time: '2020-06-05T19:29:14Z',
    uid: '6208b4b9-0077-41aa-967a-f173b6bcc0d3',
    user: 'unimplemented',
  },
  {
    code: 'T1002I',
    connector: 'local',
    name: 'hello',
    event: 'user.create',
    expires: '0001-01-01T00:00:00Z',
    roles: ['admin'],
    time: '2020-06-05T16:24:05Z',
    uid: '22a273678c-ee78-5ffc-a298-68a841555c98',
    user: 'b331fb6c-85f9-4cb0-b308-3452420bf81e.one',
  },
  {
    code: 'T1005I',
    event: 'user.password_change',
    time: '2020-06-05T19:26:53Z',
    uid: '68a83a99-73ce-4bd7-bbf7-99103c2ba6a0',
    user: 'Ivan_Jordan',
  },
  {
    'addr.local': '172.10.1.1:3022',
    'addr.remote': '172.10.1.254:46992',
    code: 'T2006I',
    ei: 2147483646,
    event: 'session.data',
    login: 'root',
    rx: 3974,
    server_id: 'b331fb6c-85f9-4cb0-b308-3452420bf81e',
    sid: '5fc8bf85-a73e-11ea-afd1-0242ac0a0101',
    time: '2020-06-05T15:14:51Z',
    tx: 4730,
    uid: '2f2f07d0-8a01-4abe-b1c0-5001fd86829b',
    user: 'Betty_Dixon',
  },
  {
    code: 'T1000I',
    event: 'user.login',
    method: 'local',
    success: true,
    time: '2019-04-22T00:49:03Z',
    uid: '173d6b6e-d613-44be-8ff6-f9f893791ef2',
    user: 'admin@example.com',
  },
  {
    code: 'T3007W',
    error:
      'ssh: principal "fsdfdsf" not in the set of valid principals for given certificate: ["root"]',
    event: 'auth',
    success: false,
    time: '2019-04-22T02:09:06Z',
    uid: '036659d6-fdf7-40a4-aa80-74d6ac73b9c0',
    user: 'admin@example.com',
  },
  {
    code: 'T1000W',
    error: 'user(name="fsdfsdf") not found',
    event: 'user.login',
    method: 'local',
    success: false,
    time: '2019-04-22T18:06:32Z',
    uid: '597bf08b-75b2-4dda-a578-e387c5ce9b76',
    user: 'fsdfsdf',
  },
  {
    'addr.local': '172.31.28.130:3022',
    'addr.remote': '151.181.228.114:51454',
    code: 'T2000I',
    ei: 0,
    event: 'session.start',
    login: 'root',
    namespace: 'default',
    server_id: 'de3800ea-69d9-4d72-a108-97e57f8eb393',
    sid: '56408539-6536-11e9-80a1-427cfde50f5a',
    size: '80:25',
    time: '2019-04-22T19:39:26.676Z',
    uid: '84c07a99-856c-419f-9de5-15560451a116',
    user: 'admin@example.com',
  },
  {
    code: 'T2002I',
    ei: 3,
    event: 'resize',
    login: 'root',
    namespace: 'default',
    sid: '56408539-6536-11e9-80a1-427cfde50f5a',
    size: '80:25',
    time: '2019-04-22T19:39:52.432Z',
    uid: '917d8108-3617-4273-ab37-7bbf8e7c1ab9',
    user: 'admin@example.com',
  },
  {
    cluster_name: 'kimlisa.cloud.gravitational.io',
    code: 'T2004I',
    ei: 1,
    enhanced_recording: false,
    event: 'session.end',
    interactive: false,
    login: 'root',
    namespace: 'default',
    participants: ['foo'],
    server_addr: '172.31.30.254:32962',
    server_hostname: 'ip-172-31-30-254',
    server_id: 'd3ddd1f8-b602-488b-00c66e29879f',
    session_start: '2021-05-21T22:23:55.313562027Z',
    session_stop: '2021-05-21T22:54:27.122508023Z',
    sid: '9d92ad96-a45c-4add-463cc7bc48b1',
    time: '2021-05-21T22:54:27.123Z',
    uid: '984ac949-6605-4f0a-e450aa5665f4',
    user: 'foo',
  },
  {
    code: 'T2004I',
    ei: 29,
    enhanced_recording: false,
    event: 'session.end',
    interactive: true,
    namespace: 'default',
    participants: ['root'],
    server_addr: '192.168.86.47:3022',
    server_hostname: 'im-a-nodename',
    server_id: 'e1826ad2-4b7d-464b-8891-54cf7fedb7fb',
    session_start: '2020-07-15T19:01:24.660230257Z',
    session_stop: '2020-07-15T19:03:05.193252488Z',
    sid: '941a4c65-c6cd-11ea-9bef-482ae3513733',
    time: '2021-05-12T01:26:22.613Z',
    uid: '0ca9c34b-f13b-458d-9bdf-c5b5cd1660d3',
    user: 'root',
  },
  {
    cluster_name: 'im-a-cluster-name',
    code: 'T2004I',
    ei: 3,
    enhanced_recording: false,
    event: 'session.end',
    interactive: true,
    namespace: 'default',
    participants: ['root'],
    server_addr: '192.168.0.105:3022',
    server_hostname: 'im-a-nodename',
    server_id: '7df6e1-29b487e-018cd162',
    session_recording: 'off',
    session_start: '2021-05-12T01:26:16.624683927Z',
    session_stop: '2021-05-12T01:26:22.61263808Z',
    sid: '5ef7244c-0f7b-4f57-80b0-26a79f960aae',
    time: '2021-05-12T01:26:22.613Z',
    uid: '9b19a0a5-24bcd3adb249b',
    user: 'root',
  },
  {
    'addr.local': '172.31.28.130:3022',
    'addr.remote': '151.181.228.114:51752',
    code: 'T2001I',
    ei: 4,
    event: 'session.join',
    login: 'root',
    namespace: 'default',
    server_id: 'de3800ea-69d9-4d72-a108-97e57f8eb393',
    sid: '56408539-6536-11e9-80a1-427cfde50f5a',
    time: '2019-04-22T19:39:52.434Z',
    uid: '13d26190-289b-41d4-af67-c8c8b0617ebe',
    user: 'admin@example.com',
  },
  {
    code: 'T3004I',
    action: 'download',
    'addr.local': '172.31.28.130:3022',
    'addr.remote': '127.0.0.1:55594',
    event: 'scp',
    login: 'root',
    namespace: 'default',
    path: '~/fsdfsdfsdfsdfs',
    time: '2019-04-22T19:41:23Z',
    uid: '183ca6de-c24b-4f67-854f-163c01245fa1',
    user: 'admin@example.com',
  },
  {
    action: 'download',
    'addr.local': '192.168.0.105:3022',
    'addr.remote': '127.0.0.1:39932',
    cluster_name: 'im-a-cluster-name',
    code: 'T3004E',
    command:
      '/home/path scp --remote-addr="127.0.0.1:39932" --local-addr="111.222.0.105:3022" -f ~/sdfsdf',
    ei: 0,
    event: 'scp',
    exitCode: '1',
    exitError: 'exit status 1',
    login: 'root',
    namespace: 'default',
    path: '~/sdfsdf',
    server_id: '8045a8cc-49bb-4e02-bdc99313',
    sid: '8ff117ec-70a2-4481-8e359cf6',
    time: '2019-04-22T19:41:23Z',
    uid: '30e13b84-a51f-467676258b9bf',
    user: 'root',
  },
  {
    action: 'upload',
    'addr.local': '192.168.0.105:3022',
    'addr.remote': '127.0.0.1:57058',
    cluster_name: 'im-a-cluster-name',
    code: 'T3005I',
    command:
      '/home/path scp --remote-addr="127.0.0.1:57058" --local-addr="111.222.0.105:3022" -t ~/',
    ei: 0,
    event: 'scp',
    exitCode: '0',
    login: 'root',
    namespace: 'default',
    path: '~/',
    server_id: '8045a8cc-49bb-4e02-bdc5-a782a313',
    sid: 'b484b5cc-9065-40fa-9a0c-db3',
    time: '2019-04-22T19:41:23Z',
    uid: '16bfdc34-2766-a5d3-dfd6f7ff7ad6',
    user: 'root',
  },
  // add scp upload failures from kimlisa.dev
  {
    'addr.remote': '50.34.48.113:56902',
    code: 'T2007I',
    ei: 0,
    event: 'app.session.start',
    namespace: 'default',
    public_addr: 'dumper.test.domain.com',
    server_id: 'a0518380-0d53-4188-ac8b-8ddd8103e45b',
    sid: '6593cf87-9839-4f18-abf8-c54873aaeb4e',
    time: '2020-10-30T17:28:14.381Z',
    uid: '80400ed9-644e-4a6e-ab99-b264b34d0f55',
    user: 'kimlisa',
  },
  {
    code: 'T2008I',
    ei: 0,
    event: 'app.session.chunk',
    namespace: 'default',
    server_id: 'a0518380-0d53-4188-ac8b-8ddd8103e45b',
    session_chunk_id: '3a54f32d-210f-4338-abf5-133bfe19ccc0',
    sid: '6593cf87-9839-4f18-abf8-c54873aaeb4e',
    time: '2020-10-30T17:28:14.705Z',
    uid: '8ea5be3d-07b1-4308-8e0d-2d2ec57cbb20',
    user: '',
  },
  {
    code: 'T3002I',
    proto: 'kube',
    kubernetes_cluster: 'clusterOne',
    ei: 0,
    'addr.local': '172.31.28.130:3022',
    'addr.remote': '151.181.228.114:51752',
    event: 'exec',
    namespace: 'default',
    sid: '8d57a9d5-3848-5ce2-a326-85eb4a6d2eed',
    time: '2020-10-30T17:28:14.705Z',
    uid: '8ea5be3d-07b1-4308-8e0d-2d2ec57cbb20',
    user: 'alex',
  },
  {
    'addr.local': '127.0.0.1:3027',
    'addr.remote': '[::1]:43026',
    code: 'T3009I',
    ei: 0,
    event: 'kube.request',
    kubernetes_cluster: 'gke_teleport-a',
    login: 'awly',
    namespace: 'default',
    proto: 'kube',
    request_path: '/api/v1/namespaces/teletest/pods/test-pod',
    resource_api_group: 'core/v1',
    resource_kind: 'pods',
    resource_name: 'test-pod',
    resource_namespace: 'teletest',
    response_code: 200,
    server_id: '9b67377e-d61e-4865-96d6-fa71989fd9e9',
    time: '2020-11-12T20:35:44.978Z',
    uid: '8c1459a8-9199-4d25-bc5d-38e000ddd9ab',
    user: 'alex',
    verb: 'GET',
  },
  {
    cluster_name: 'localhost',
    code: 'T1006I',
    mfa_device_name: 'usb-c',
    mfa_device_type: 'U2F',
    mfa_device_uuid: '7a6fbf23-d75c-4c62-8215-e962d0f2a1f3',
    ei: 0,
    event: 'mfa.delete',
    time: '2021-03-03T22:58:34.737Z',
    uid: '9be91d9e-79ec-422b-b6ae-ccf7235476d4',
    user: 'awly',
  },
  {
    cluster_name: 'localhost',
    code: 'T1007I',
    mfa_device_name: 'usb-c',
    mfa_device_type: 'U2F',
    mfa_device_uuid: '7a6fbf23-d75c-4c62-8215-e962d0f2a1f3',
    ei: 0,
    event: 'mfa.delete',
    time: '2021-03-03T22:58:44.737Z',
    uid: 'c6afe861-d53c-42ce-837c-7920d2398b44',
    user: 'awly',
  },
  {
    cluster_name: 'some-name',
    code: 'TBL03I',
    ei: 0,
    event: 'billing.update_info',
    time: '2021-03-18T16:29:15.719Z',
    uid: '95344b33-d25c-4875-896e-f21abc911547',
    user: 'root',
  },
  {
    cluster_name: 'some-name',
    code: 'TBL00I',
    ei: 0,
    event: 'billing.create_card',
    time: '2021-03-18T16:29:05.044Z',
    uid: '5c40b62a-4ddd-466c-87a0-fa2922f743d0',
    user: 'root',
  },
  {
    cluster_name: 'some-name',
    code: 'TBL01I',
    ei: 0,
    event: 'billing.delete_card',
    time: '2021-03-18T16:28:51.219Z',
    uid: '056517e0-f7e1-4286-b437-c75f3a865af4',
    user: 'root',
  },
  {
    cluster_name: 'some-name',
    code: 'TBL02I',
    ei: 0,
    event: 'billing.update_card',
    time: '2021-03-18T16:28:49.067Z',
    uid: '0a06aba1-b87c-4d58-8922-e173f6b9729f',
    user: 'root',
  },
  {
    cluster_name: 'root',
    code: 'TDB00I',
    db_name: '',
    db_protocol: 'mongodb',
    db_service: 'mongo-primary',
    db_uri: 'mongodb://mongo-1:27017,mongo-2:27018/?replicaSet=rs0',
    db_user: 'alice',
    ei: 0,
    event: 'db.session.start',
    namespace: 'default',
    server_id: '05ff66c9-a948-42f4-af0e-a1b6ba62561e',
    sid: '13c04d4b-2e94-4106-a3a1-5ab8aae10465',
    success: true,
    time: '2021-07-14T07:01:31.958Z',
    uid: '4a613b84-7315-41f4-9219-1afd6b08d4da',
    user: 'alice@example.com',
  },
  {
    cluster_name: 'root',
    code: 'TDB02I',
    db_name: 'test',
    db_protocol: 'mongodb',
    db_query:
      '{"find": "test","filter": {},"lsid": {"id": {"$binary":{"base64":"2KMk23/TTCKUtiAVU0fbgg==","subType":"04"}}},"$clusterTime": {"clusterTime": {"$timestamp":{"t":"1626246087","i":"1"}},"signature": {"hash": {"$binary":{"base64":"8X7BlnDAUxKgUo5lpI3XoKoNF54=","subType":"00"}},"keyId": {"$numberLong":"6969719000615878659"}}},"$db": "test"}',
    db_service: 'mongo-primary',
    db_uri: 'mongodb://mongo-1:27017,mongo-2:27018/?replicaSet=rs0',
    db_user: 'alice',
    ei: 11,
    event: 'db.session.query',
    sid: '13c04d4b-2e94-4106-a3a1-5ab8aae10465',
    success: true,
    time: '2021-07-14T07:03:49.783Z',
    uid: 'c4550623-0538-452d-912b-1242715666c4',
    user: 'alice@example.com',
  },
  {
    cluster_name: 'root',
    code: 'TDB02W',
    db_name: 'houston',
    db_protocol: 'mongodb',
    db_query:
      '{"find": "test","filter": {},"lsid": {"id": {"$binary":{"base64":"2KMk23/TTCKUtiAVU0fbgg==","subType":"04"}}},"$clusterTime": {"clusterTime": {"$timestamp":{"t":"1626246227","i":"1"}},"signature": {"hash": {"$binary":{"base64":"zBJKAl6VcjwQrr05N0O4qrQ92PY=","subType":"00"}},"keyId": {"$numberLong":"6969719000615878659"}}},"$db": "houston"}',
    db_service: 'mongo-primary',
    db_uri: 'mongodb://mongo-1:27017,mongo-2:27018/?replicaSet=rs0',
    db_user: 'alice',
    ei: 13,
    error: 'access to database denied',
    event: 'db.session.query.failed',
    message: 'access to database denied',
    sid: '13c04d4b-2e94-4106-a3a1-5ab8aae10465',
    success: false,
    time: '2021-07-14T07:05:22.32Z',
    uid: '21796ef9-a5dc-4595-a833-b893ac620488',
    user: 'alice@example.com',
  },
  {
    cluster_name: 'root',
    code: 'TDB01I',
    db_name: '',
    db_protocol: 'mongodb',
    db_service: 'mongo-primary',
    db_uri: 'mongodb://mongo-1:27017,mongo-2:27018/?replicaSet=rs0',
    db_user: 'alice',
    ei: 16,
    event: 'db.session.end',
    sid: '13c04d4b-2e94-4106-a3a1-5ab8aae10465',
    time: '2021-07-14T07:06:25.608Z',
    uid: '0a2387cd-3fa2-4424-9c14-e33af17e4ab1',
    user: 'alice@example.com',
  },
  {
    cluster_name: 'root',
    code: 'TDB03I',
    db_labels: {
      env: 'local',
      'teleport.dev/origin': 'dynamic',
    },
    db_protocol: 'postgres',
    db_uri: 'localhost:5432',
    ei: 0,
    event: 'db.create',
    expires: '0001-01-01T00:00:00Z',
    name: 'postgres-local',
    time: '2021-10-08T15:42:15.39Z',
    uid: '9d37514f-aef5-426f-9fda-31fd35d070f5',
    user: '05ff66c9-a948-42f4-af0e-a1b6ba62561e.root',
  },
  {
    cluster_name: 'root',
    code: 'TDB04I',
    db_labels: {
      env: 'local',
      'teleport.dev/origin': 'dynamic',
    },
    db_protocol: 'postgres',
    db_uri: 'localhost:5432',
    ei: 0,
    event: 'db.update',
    expires: '0001-01-01T00:00:00Z',
    name: 'postgres-local',
    time: '2021-10-08T15:42:24.581Z',
    uid: 'fe631a5a-6418-49d6-99e7-5280654663ec',
    user: '05ff66c9-a948-42f4-af0e-a1b6ba62561e.root',
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
    user: '05ff66c9-a948-42f4-af0e-a1b6ba62561e.root',
  },
  {
    cluster_name: 'im-a-cluster-name',
    code: 'TLK00I',
    ei: 0,
    event: 'lock.created',
    expires: '0001-01-01T00:00:00Z',
    name: 'lock-name',
    time: '2021-08-06T18:47:19.75Z',
    uid: '070fcb2a-e1cf-5b84-8190-14448cc63c76',
    user: 'df83fda8-1111-5567-8bcc-c282dec3290e.im-a-cluster-name',
  },
  {
    cluster_name: 'im-a-cluster-name',
    code: 'TLK01I',
    ei: 0,
    event: 'lock.deleted',
    expires: '0001-01-01T00:00:00Z',
    name: 'lock-name',
    time: '2021-08-06T18:49:51.626Z',
    uid: 'e4630384-ac85-5a43-9ba9-3355b8d5cae4',
    user: 'df83fda8-1111-5567-8bcc-c282dec3290e.im-a-cluster-name',
  },
  {
    'addr.remote': '100.104.52.89:3389',
    cluster_name: 'im-a-cluster-name',
    code: 'TDP00I',
    desktop_addr: '100.104.52.89:3389',
    desktop_labels: {
      env: 'prod',
      foo: 'bar',
    },
    ei: 0,
    event: 'windows.desktop.session.start',
    proto: 'tdp',
    sid: 'b7f734d8-bdc2-4996-8959-0b42a11708e7',
    success: true,
    time: '2021-10-18T23:18:29.144Z',
    uid: 'cf15cc08-f818-4f09-91c5-238e1326b22b',
    user: 'joe',
    windows_desktop_service: 'ba17ae92-5519-476a-954e-c225cf751de1',
    windows_domain: 'desktopaccess.com',
    windows_user: 'Administrator',
  },
  {
    cluster_name: 'im-a-cluster-name',
    code: 'TDP01I',
    desktop_addr: '100.104.52.89:3389',
    desktop_labels: {
      env: 'prod',
      foo: 'bar',
    },
    ei: 0,
    event: 'windows.desktop.session.end',
    sid: 'b7f734d8-bdc2-4996-8959-0b42a11708e7',
    time: '2021-10-18T23:19:13.105Z',
    uid: '84d408d1-3314-4a30-b7b7-35970633c9de',
    user: 'joe',
    windows_desktop_service: 'ba17ae92-5519-476a-954e-c225cf751de1',
    windows_domain: 'desktopaccess.com',
    windows_user: 'Administrator',
  },
  {
    cluster_name: 'im-a-cluster-name',
    code: 'TDP00W',
    desktop_addr: '100.104.52.89:3389',
    desktop_labels: {
      env: 'prod',
      foo: 'bar',
    },
    ei: 0,
    event: 'windows.desktop.session.start',
    sid: 'b7f734d8-bdc2-4996-8959-0b42a11708e7',
    time: '2021-10-18T23:39:13.105Z',
    uid: '84d408d1-3314-4a30-b7b7-35970633c9de',
    user: 'joe',
    windows_desktop_service: 'ba17ae92-5519-476a-954e-c225cf751de1',
    windows_domain: 'desktopaccess.com',
    windows_user: 'Administrator',
  },
  {
    'addr.local': '192.000.0.000:3022',
    'addr.remote': '127.0.0.1:50000',
    cluster_name: 'im-a-cluster-name',
    code: 'T3008I',
    ei: 0,
    event: 'x11-forward',
    login: 'root',
    success: true,
    time: '2022-01-20T18:31:45.012Z',
    uid: '6333-37a7-4c3c-9180-f3abc8e2b',
    user: 'lisa',
  },
  {
    'addr.local': '192.000.0.000:3022',
    'addr.remote': '127.0.0.1:60000',
    cluster_name: 'im-a-cluster-name',
    code: 'T3008W',
    ei: 0,
    error: 'lisa was here',
    event: 'x11-forward',
    login: 'root',
    success: false,
    time: '2022-01-20T19:49:02.307Z',
    uid: '0629c7-3d98-4451-ac90-dc5330',
    user: 'lisa',
  },
].map(makeEvent);

export const eventsSample = [
  {
    code: 'T1004I',
    uid: 'b121fc4c-e419-56a2-a760-19cd746c0650',
    time: '2020-06-05T16:24:05Z',
    event: 'user.delete',
    name: 'bob',
    user: 'benarent',
  },
  {
    code: 'T1003I',
    event: 'user.update',
    name: 'bob',
    time: '2020-06-05T16:24:05Z',
    uid: '3a8cd55b5-bce9-5a4c-882d-8e0a5ae10008',
    expires: 111111,
    roles: ['root'],
  },
  {
    code: 'T4002I',
    event: 'session.network',
    namespace: 'default',
    sid: '44c6cea8-362f-11ea-83aa-125400432324',
    server_id: '96f2bed2',
    login: 'root',
    user: 'benarent',
    pid: 2653,
    cgroup_id: 4294968064,
    program: 'bash',
    src_addr: '10.217.136.161',
    dst_addr: '190.58.129.4',
    dst_port: '3000',
    version: 4,
    time: '2019-04-22T19:39:26.676Z',
  },
  {
    code: 'T4001I',
    event: 'session.disk',
    namespace: 'default',
    sid: '44c6cea8-362f-11ea-83aa-125400432324',
    server_id: '96f2bed2',
    login: 'root',
    user: 'benarent',
    pid: 2653,
    cgroup_id: 4294968064,
    program: 'bash',
    path: '/etc/profile.d/',
    flags: 2100000,
    return_code: 0,
    time: '2019-04-22T19:39:26.676Z',
  },
].map(makeEvent);
