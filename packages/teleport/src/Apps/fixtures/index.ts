/*
Copyright 2020 Gravitational, Inc.

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

import makeApp from 'teleport/services/apps/makeApps';

export const apps = [
  {
    name: 'Jenkins',
    uri: 'https://jenkins.teleport-proxy.com',
    publicAddr: 'jenkins.teleport-proxy.com',
    labels: [
      { name: 'env', value: 'idk' },
      { name: 'cluster', value: 'one' },
    ],
    clusterId: 'one',
    fqdn: 'jenkins.one',
  },
  {
    name: 'Mattermost1',
    uri: 'https://mattermost1.teleport-proxy.com',
    publicAddr: 'mattermost.teleport-proxy.com',
    labels: [
      { name: 'env', value: 'idk' },
      { name: 'cluster', value: 'one' },
    ],
    clusterId: 'one',
    fqdn: 'mattermost.one',
  },
  {
    name: 'Grafana',
    uri: 'https://grafana.teleport-proxy.com',
    publicAddr: 'grafana.teleport-proxy.com',
    labels: [
      { name: 'env', value: 'idk' },
      { name: 'cluster', value: 'one' },
    ],
    clusterId: 'one',
    fqdn: 'grafana.one',
  },
].map(makeApp);
