/**
 * Copyright 2021 Gravitational, Inc.
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
import { MemoryRouter } from 'react-router';
import FilterableList, { Props } from './FilterByLabelList';
import { makeNode } from 'teleport/services/nodes';
import NodeList from 'teleport/components/NodeList';

export default {
  title: 'Teleport/FilterByLabelList',
};

export const Nodes = () => (
  <MemoryRouter initialEntries={[`nodes?labels=env%3A%20prod`]}>
    <FilterableList {...props} />
  </MemoryRouter>
);

const nodes = [
  {
    tunnel: false,
    id: '61078',
    clusterId: 'cluster-teleport-cloud-10',
    hostname: 'ip-69.200.131.10',
    addr: '69.200.131.10',
    tags: [
      { name: 'os', value: ' centOS' },
      {
        name: 'autoscaling-group',
        value:
          'teleport-cloud-prod-us-west-2-worker-20201211102915999300000000003',
      },
      { name: 'zone', value: 'us-west-2a' },
      { name: 'country', value: 'Italy' },
      { name: 'owner', value: 'username05' },
      { name: 'env', value: 'prod' },
      { name: 'tag-Name', value: 'teleport-cloud-prod-us-west-2a-worker' },
      { name: 'role', value: 'worker' },
    ],
  },
  {
    tunnel: true,
    id: '14824',
    clusterId: 'cluster-teleport-cloud-90',
    hostname: 'ip-125.6.17.37',
    addr: '125.6.17.37',
    tags: [
      { name: 'os', value: ' windows' },
      {
        name: 'autoscaling-group',
        value:
          'teleport-cloud-prod-us-west-2-worker-20201211102915999300000000002',
      },
      { name: 'zone', value: 'us-east-2a' },
      { name: 'country', value: 'South Korea' },
      { name: 'owner', value: 'username10' },
      { name: 'env', value: 'dev' },
      { name: 'tag-Name', value: 'teleport-cloud-dev-us-east-2a-worker' },
      { name: 'role', value: 'worker' },
    ],
  },
  {
    tunnel: true,
    id: '33162',
    clusterId: 'cluster-teleport-cloud-18',
    hostname: 'ip-48.15.222.201',
    addr: '48.15.222.201',
    tags: [
      { name: 'os', value: ' windows' },
      {
        name: 'autoscaling-group',
        value:
          'teleport-cloud-prod-us-west-2-worker-20201211102915999300000000001',
      },
      { name: 'zone', value: 'ap-northeast-1' },
      { name: 'country', value: 'France' },
      { name: 'owner', value: 'username07' },
      { name: 'env', value: 'prod' },
      { name: 'tag-Name', value: 'teleport-cloud-prod-ap-northeast-1-worker' },
      { name: 'role', value: 'worker' },
    ],
  },
  {
    tunnel: true,
    id: '12709',
    clusterId: 'cluster-teleport-cloud-37',
    hostname: 'ip-123.25.182.110',
    addr: '123.25.182.110',
    tags: [
      { name: 'os', value: ' ubuntu' },
      {
        name: 'autoscaling-group',
        value:
          'teleport-cloud-prod-us-west-2-worker-20201211102915999300000000001',
      },
      { name: 'zone', value: 'us-east-2a' },
      { name: 'country', value: 'United States of America' },
      { name: 'owner', value: 'username03' },
      { name: 'env', value: 'dev' },
      { name: 'tag-Name', value: 'teleport-cloud-dev-us-east-2a-worker' },
      { name: 'role', value: 'worker' },
    ],
  },
];

const props: Props = {
  data: nodes.map(makeNode),
  TableComponent: NodeList,
};
