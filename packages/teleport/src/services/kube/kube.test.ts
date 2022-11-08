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

import KubeService from './kube';
import api from 'teleport/services/api';

test('correct processed fetch response formatting', async () => {
  jest.spyOn(api, 'get').mockResolvedValue(mockApiResponse);

  const kubeService = new KubeService();
  const response = await kubeService.fetchKubernetes('clusterId', {
    search: 'does-not-matter',
  });

  expect(response).toEqual({
    kubes: [
      {
        name: 'tele.logicoma.dev-prod',
        labels: [
          { name: 'kernal', value: '4.15.0-51-generic' },
          { name: 'env', value: 'prod' },
        ],
      },
    ],
    startKey: mockApiResponse.startKey,
    totalCount: mockApiResponse.totalCount,
    paginationUnsupported: false,
  });
});

test('handling of null (empty) fetch response', async () => {
  jest.spyOn(api, 'get').mockResolvedValue(null);

  const kubeService = new KubeService();
  const response = await kubeService.fetchKubernetes('clusterId', {
    search: 'does-not-matter',
  });

  expect(response).toEqual({
    kubes: [],
    startKey: undefined,
    totalCount: undefined,
    paginationUnsupported: false,
  });
});

test('handling of null fields response', async () => {
  jest
    .spyOn(api, 'get')
    .mockResolvedValue({ startKey: null, totalCount: null });

  const kubeService = new KubeService();
  const response = await kubeService.fetchKubernetes('clusterId', {
    search: 'does-not-matter',
  });

  expect(response).toEqual({
    kubes: [],
    startKey: null,
    totalCount: null,
    paginationUnsupported: true,
  });
});

test('handling of null labels', async () => {
  jest
    .spyOn(api, 'get')
    .mockResolvedValue({ items: [{ name: 'test', labels: null }] });

  const kubeService = new KubeService();
  const response = await kubeService.fetchKubernetes('clusterId', {
    search: 'does-not-matter',
  });

  expect(response.kubes).toEqual([{ name: 'test', labels: [] }]);
});

const mockApiResponse = {
  items: [
    {
      name: 'tele.logicoma.dev-prod',
      labels: [
        { name: 'kernal', value: '4.15.0-51-generic' },
        { name: 'env', value: 'prod' },
      ],
    },
  ],
  startKey: 'mockKey',
  totalCount: 100,
};
