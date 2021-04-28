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

describe('correct processed fetch response', () => {
  test('fetch response labels is stringified', async () => {
    jest.spyOn(api, 'get').mockResolvedValue(mockApiResponse);

    const kubeService = new KubeService();
    const response = await kubeService.fetchKubernetes('clusterId');

    expect(response).toEqual([
      {
        name: 'tele.logicoma.dev-prod',
        tags: ['kernal: 4.15.0-51-generic', 'env: prod'],
      },
    ]);
  });

  test('undefined or null response replaced with empty array', async () => {
    jest.spyOn(api, 'get').mockResolvedValue(undefined || null);

    const kubeService = new KubeService();
    const response = await kubeService.fetchKubernetes('clusterId');

    expect(response).toEqual([]);
  });

  test('undefined or null labels replaced with empty array', async () => {
    jest.spyOn(api, 'get').mockResolvedValue(mockUndefinedRes);

    const kubeService = new KubeService();
    const response = await kubeService.fetchKubernetes('clusterId');

    expect(response).toEqual([
      {
        name: 'tele.logicoma.dev-prod',
        tags: [],
      },
    ]);
  });
});

const mockApiResponse = [
  {
    name: 'tele.logicoma.dev-prod',
    labels: [
      { name: 'kernal', value: '4.15.0-51-generic' },
      { name: 'env', value: 'prod' },
    ],
  },
];

const mockUndefinedRes = [
  {
    name: 'tele.logicoma.dev-prod',
    labels: undefined || null,
  },
];
