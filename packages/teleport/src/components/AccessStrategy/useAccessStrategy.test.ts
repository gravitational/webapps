/**
 * Copyright 2020 Gravitational, Inc.
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

import useAccessStrategy from './useAccessStrategy';
import userService, {
  makeUser,
  makeAccessRequest,
} from 'teleport/services/user';
import sessionStorage from 'teleport/services/localStorage';
import renderHook, { act } from 'design/utils/renderHook';

beforeEach(() => {
  jest.resetAllMocks();
  sessionStorage.clear();
});

test('useEffect, when access request is empty, only strategy "always" creates request', async () => {
  const userContext = makeUser(sample.userContext);

  let request = makeAccessRequest({
    id: '',
    state: 'PENDING',
    reason: '',
  });
  jest.spyOn(userService, 'createAccessRequest').mockResolvedValue(request);
  jest.spyOn(userService, 'fetchUser').mockResolvedValue(userContext);

  let accessRequest;
  let strategy;
  let results;

  // When "optional", just fetch user.
  await act(async () => {
    results = renderHook(() => useAccessStrategy());
  });

  ({ accessRequest, strategy } = results.current);

  expect(userService.createAccessRequest).not.toHaveBeenCalled();
  expect(userService.fetchUser).toHaveBeenCalledTimes(1);
  expect(strategy.type).toEqual('optional');
  expect(accessRequest.state).toEqual('');
  expect(sessionStorage.getAccessRequestResult()).toBeNull();
  jest.clearAllMocks();

  // When "reason", just fetch user.
  userContext.accessStrategy.type = 'reason';
  await act(async () => {
    results = renderHook(() => useAccessStrategy());
  });

  ({ accessRequest, strategy } = results.current);

  expect(userService.fetchUser).toHaveBeenCalledTimes(1);
  expect(userService.createAccessRequest).not.toHaveBeenCalled();
  expect(strategy.type).toEqual('reason');
  expect(accessRequest.state).toEqual('');
  expect(sessionStorage.getAccessRequestResult()).toBeNull();
  jest.clearAllMocks();

  // When "always", fetch user and create request.
  userContext.accessStrategy.type = 'always';
  await act(async () => {
    results = renderHook(() => useAccessStrategy());
  });

  ({ accessRequest, strategy } = results.current);

  expect(userService.fetchUser).toHaveBeenCalledTimes(1);
  expect(userService.createAccessRequest).toHaveBeenCalledTimes(1);
  expect(strategy.type).toEqual('always');
  expect(accessRequest).toStrictEqual(request);
  expect(sessionStorage.getAccessRequestResult()).toStrictEqual(accessRequest);
});

test('updateState, apply permission only on APPROVED state', async () => {
  const userContext = makeUser(sample.userContext);

  const request = makeAccessRequest({
    id: '',
    state: 'PENDING',
    reason: '',
  });

  jest.spyOn(userService, 'applyPermission').mockResolvedValue(request);
  jest.spyOn(userService, 'fetchAccessRequest').mockResolvedValue(request);
  jest.spyOn(userService, 'fetchUser').mockResolvedValue(userContext);
  Object.defineProperty(window, 'location', {
    writable: true,
    value: { reload: jest.fn() },
  });

  let results;
  let refresh;

  await act(async () => {
    results = renderHook(() => useAccessStrategy());
  });

  ({ refresh } = results.current);

  await act(() => refresh());
  expect(sessionStorage.getAccessRequestResult().state).toEqual('PENDING');
  expect(userService.applyPermission).not.toHaveBeenCalled();

  request.state = 'DENIED';
  await act(() => refresh());
  expect(sessionStorage.getAccessRequestResult().state).toEqual('DENIED');
  expect(userService.applyPermission).not.toHaveBeenCalled();

  request.state = 'APPLIED';
  await act(() => refresh());
  expect(sessionStorage.getAccessRequestResult().state).toEqual('APPLIED');
  expect(userService.applyPermission).not.toHaveBeenCalled();

  request.state = 'APPROVED';
  await act(() => refresh());
  expect(sessionStorage.getAccessRequestResult().state).toEqual('APPLIED');
  expect(userService.applyPermission).toHaveBeenCalledTimes(1);
  expect(window.location.reload).toHaveBeenCalledTimes(1);
});

const sample = {
  userContext: {
    accessStrategy: {
      type: 'optional',
      prompt: '',
    },
    username: 'alice',
    authType: 'local',
    acl: {
      logins: ['root'],
      authConnectors: {
        list: true,
        read: true,
        edit: true,
        create: true,
        remove: true,
      },
      trustedClusters: {
        list: true,
        read: true,
        edit: true,
        create: true,
        remove: true,
      },
      roles: {
        list: true,
        read: true,
        edit: true,
        create: true,
        remove: true,
      },
      sessions: {
        list: true,
        read: true,
        edit: false,
        create: false,
        remove: false,
      },
      events: {
        list: true,
        read: true,
        edit: false,
        create: false,
        remove: false,
      },
    },
    cluster: {
      clusterId: 'im-a-cluster-name',
      lastConnected: '2020-11-04T19:07:50.693Z',
      connectedText: '2020-11-04 11:07:50',
      status: 'online',
      url: '/web/cluster/im-a-cluster-name',
      authVersion: '5.0.0-dev',
      nodeCount: 1,
      publicURL: 'localhost:3080',
      proxyVersion: '5.0.0-dev',
    },
  },
};
