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

import createClient from './createClient';
import { TerminalServiceClient } from './v1/service_grpc_pb';
import * as grpc from '@grpc/grpc-js';
import { tsh } from 'teleterm/ui/services/clusters/types';

//let grpcClient = new TerminalServiceClient(
//  'unix:///tmp/tshd/socket',
//  grpc.credentials.createInsecure()
//);

process.env.GRPC_VERBOSITY = 'DEBUG';

test.skip('fetchClusters', async () => {
  let tshClient = createClient(
    'unix:///home/alexey/.config/Electron/tsh.socket'
  );

  //const tsh = new Tsh(tshClient);
  //

  await tshClient.listRootClusters();

  const roots = await tshClient.listRootClusters();
  console.log('AAAAAAAAAAAAAAAAAAAAAA:', roots[0].uri);

  const leaves = await tshClient.listLeafClusters('/clusters/localhost');

  console.log('BBBBBBBBBBBBBBBBBBB:', leaves[0].uri);

  const servers = await tshClient.listServers(leaves[0].uri);

  console.log('Servers:', servers);

  //  await tsh.addCluster('localhost:4080');

  // console.log(clusters);
});
