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

import * as types from './../types';

export default class Service {
  async listDatabases(clusterId: string) {
    return [
      {
        name: 'aurora',
        desc: 'PostgreSQL 11.6: AWS Aurora ',
        title: 'RDS PostgreSQL',
        protocol: 'postgres',
        tags: ['cluster: root', 'env: aws'],
      },
      {
        name: 'postgres-gcp',
        desc: 'PostgreSQL 9.6: Google Cloud SQL',
        title: 'Cloud SQL PostgreSQL',
        protocol: 'postgres',
        tags: ['cluster: env', 'value: gcp'],
      },
      {
        name: 'mysql-aurora-56',
        desc: 'MySQL 5.6: AWS Aurora Longname For SQL',
        title: 'Self-hosted MySQL',
        protocol: 'mysql',
        tags: ['cluster: root', 'env: aws'],
      },
    ] as types.Database[];
  }

  async listServers(clusterId: string) {
    return [
      {
        tunnel: false,
        id: '104',
        clusterId,
        hostname: 'fujedu',
        addr: '172.10.1.20:3022',
        tags: ['cluster: one', 'kernel: 4.15.0-51-generic'],
      },
      {
        tunnel: false,
        id: '170',
        clusterId,
        hostname: 'facuzguv',
        addr: '172.10.1.42:3022',
        tags: ['cluster: one', 'kernel: 4.15.0-51-generic'],
      },
      {
        tunnel: true,
        id: '192',
        clusterId,
        hostname: 'duzsevkig',
        addr: '172.10.1.156:3022',
        tags: ['cluster: one', 'kernel: 4.15.0-51-generic'],
      },
      {
        tunnel: true,
        id: '64',
        clusterId,
        hostname: 'kuhinur',
        addr: '172.10.1.145:3022',
        tags: ['cluster: one', 'kernel: 4.15.0-51-generic'],
      },
      {
        tunnel: false,
        id: '81',
        clusterId,
        hostname: 'zebpecda',
        addr: '172.10.1.24:3022',
        tags: [
          'cluster: one',
          'kernel: 4.15.0-51-generic',
          'lortavma: one',
          'lenisret: 4.15.0-51-generic',
          'lofdevod: one',
          'llhurlaz: 4.15.0-51-generic',
        ],
      },
    ] as types.Server[];
  }

  async listClusters() {
    return apiCall(async () => [
      {
        uri: 'platform.teleport.sh/',
        name: 'platform.teleport.sh',
        connected: true,
        auth: {
          providers: [],
          secondFactor: 'off',
        },
      } as types.Cluster,
    ]);
  }

  async addCluster(addr: string) {
    return {
      uri: addr,
      name: addr,
      connected: false,
      auth: {
        providers: [],
        secondFactor: 'off',
      },
    } as types.Cluster;
  }
}

function apiCall<T>(cb: () => Promise<T>): Promise<[T, Error]> {
  return new Promise(resolve => {
    try {
      cb()
        .then(result => {
          resolve([result, null]);
        })
        .catch((err: Error) => {
          resolve([null, err]);
        });
    } catch (err) {
      resolve([null, err]);
    }
  });
}
