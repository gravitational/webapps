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
    name: 'jenkinsOne',
    uri: '',
    publicAddr: 'jenkins-address',
    labels: ['kernal: 4.15.0-51-generic', 'env: prod'],
    clusterId: 'one',
    fqdn: 'jenkins.one',
  },
  {
    name: 'jenkinsTwo',
    uri: '',
    publicAddr: 'second-jenkins-address',
    labels: ['env: staging', 'cluster-name: some-cluster-name'],
    clusterId: 'two',
    fqdn: 'jenkins.two',
  },
  {
    name: 'jenkinsThree',
    uri: '',
    publicAddr: 'third-jenkins-address',
    labels: ['env: idk', 'cluster-name: cluster-three'],
    clusterId: 'three',
    fqdn: 'jenkins.three',
  },
].map(makeApp);
