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

import { map } from 'lodash';
import api from 'teleport/services/api';
import cfg from 'teleport/config';
import makeNode from './makeNode';
import makeNodeToken from './makeNodeToken';
import makeAppBashCmd from './makeAppBashCmd';
import makeNodeBashCmd from './makeNodeBashCmd';

const service = {
  fetchNodes(clusterId?: string) {
    return api.get(cfg.getClusterNodesUrl(clusterId)).then(json =>
      map(
        [
          {
            tunnel: false,
            id: '104',
            clusterId: 'one',
            hostname: 'fujedu',
            addr: '172.10.1.20:3022',
            tags: [
              { name: 'cluster', value: 'one' },
              { name: 'kernel', value: '4.15.0-51-generic' },
              { name: 'env', value: 'dev' },
              { name: 'country', value: 'South Korea' },
              { name: 'auto-scaling', value: 'C169806600-356040269900000000x' },
              { name: 'os', value: 'windows' },
            ],
          },
          {
            tunnel: false,
            id: '170',
            clusterId: 'one',
            hostname: 'facuzguv',
            addr: '172.10.1.1:3022',
            tags: [
              { name: 'cluster', value: 'one' },
              { name: 'kernel', value: '4.15.0-51-generic' },
              { name: 'env', value: 'dev' },
              { name: 'country', value: 'France' },
              {
                name: 'auto-scaling',
                value: 'C1909900699-364191671900000000x',
              },
              { name: 'os', value: 'ubuntu' },
            ],
          },
          {
            tunnel: false,
            id: '192',
            clusterId: 'one',
            hostname: 'duzsevkig',
            addr: '172.10.1.1:3022',
            tags: [
              { name: 'cluster', value: 'one' },
              { name: 'kernel', value: '4.15.0-51-generic' },
              { name: 'env', value: 'dev' },
              { name: 'country', value: 'Spain' },
              {
                name: 'auto-scaling',
                value: 'D3761902655-419789406800000000x',
              },
              { name: 'os', value: 'ubuntu' },
            ],
          },
          {
            tunnel: false,
            id: '64',
            clusterId: 'one',
            hostname: 'kuhinur',
            addr: '172.10.1.1:3022',
            tags: [
              { name: 'cluster', value: 'one' },
              { name: 'kernel', value: '4.15.0-51-generic' },
              { name: 'env', value: 'prod' },
              { name: 'country', value: 'France' },
              {
                name: 'auto-scaling',
                value: 'B1261967664-277726327900000000x',
              },
              { name: 'os', value: 'macOS' },
            ],
          },
          {
            tunnel: false,
            id: '81',
            clusterId: 'one',
            hostname: 'zebpecda',
            addr: '172.10.1.1:3022',
            tags: [
              { name: 'cluster', value: 'one' },
              { name: 'kernel', value: '4.15.0-51-generic' },
              { name: 'env', value: 'dev' },
              { name: 'country', value: 'Italy' },
              { name: 'auto-scaling', value: 'C332530774-338276715300000000x' },
              { name: 'os', value: 'windows' },
            ],
          },
          {
            tunnel: true,
            id: '81',
            clusterId: 'one',
            hostname: 'zebpecda',
            addr: '172.10.1.1:3022',
            tags: [
              { name: 'cluster', value: 'one' },
              { name: 'kernel', value: '4.15.0-51-generic' },
              { name: 'env', value: 'dev' },
              { name: 'country', value: 'France' },
              {
                name: 'auto-scaling',
                value: 'C1147467770-127442811700000000x',
              },
              { name: 'os', value: 'macOS' },
            ],
          },
          {
            tunnel: true,
            id: '81',
            clusterId: 'one',
            hostname: 'zebpecda',
            addr: '172.10.1.1:3022',
            tags: [
              { name: 'cluster', value: 'one' },
              { name: 'kernel', value: '4.15.0-51-generic' },
              { name: 'env', value: 'dev' },
              { name: 'country', value: 'Italy' },
              { name: 'auto-scaling', value: 'A3154447987-86890676600000000x' },
              { name: 'os', value: 'macOS' },
            ],
          },
        ],
        makeNode
      )
    );
  },

  createNodeBashCommand() {
    return api.post(cfg.getNodeJoinTokenUrl()).then(makeNodeBashCmd);
  },

  createAppBashCommand(appName: string, appUri: string) {
    return api
      .post(cfg.getNodeJoinTokenUrl())
      .then(makeNodeToken)
      .then(token => makeAppBashCmd(token, appName, appUri));
  },
};

export default service;
