/**
 * @jest-environment node
 */

/*
Copyright 2021 Gravitational, Inc.

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

import Tsh from './tsh';
import TshClient from './tshClient';
import { TerminalServiceClient } from './v1/service_grpc_pb';
import * as grpc from '@grpc/grpc-js';

const client = new TerminalServiceClient(
  'unix:///tmp/tshd/socket',
  grpc.credentials.createInsecure()
);

test('fetchClusters', async () => {
  const tshClient = new TshClient(client);
  const tsh = new Tsh(tshClient);
  //

  // await tsh.addCluster('localhost:4080');

  //await tsh.fetchClusters();
  //await tsh.fetchServers('/clusters/localhost');
  //await tsh.fetchDatabases('/clusters/localhost');
  await tsh.login('/clusters/localhost', 'papa', '123123');
  await tsh.fetchServers('/clusters/localhost');

  console.log(tsh.state);
});
