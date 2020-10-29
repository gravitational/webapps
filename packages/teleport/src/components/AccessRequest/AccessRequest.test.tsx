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

import React from 'react';
import { AccessRequest } from './AccessRequest';
import { render, screen, wait } from 'design/utils/testing';

test('request state', () => {
  const request = { state: 'PENDING' } as any;
  const { rerender } = render(<AccessRequest {...sample} request={request} />);
  expect(screen.getByText(/please wait/i)).toBeInTheDocument();
  wait(() => expect(sample.getRequest).toHaveBeenCalled());
  sample.getRequest.mockClear();

  request.state = 'DENIED';
  rerender(<AccessRequest {...sample} request={request} />);
  expect(screen.getByText(/request denied/i)).toBeInTheDocument();

  // Approved but not renewedSession.
  request.state = 'APPROVED';
  rerender(<AccessRequest {...sample} request={request} />);
  expect(screen.getByText(/please wait/i)).toBeInTheDocument();
  expect(sample.removeUrlRequestParam).not.toHaveBeenCalled();
  expect(sample.renewSession).toHaveBeenCalledTimes(1);
  sample.renewSession.mockClear();

  // Approved and renewedSession.
  request.state = 'APPROVED';
  request.renewedSession = true;
  rerender(<AccessRequest {...sample} request={request} />);
  expect(screen.getByText(/hello world/i)).toBeInTheDocument();
  expect(sample.renewSession).not.toHaveBeenCalled();
  expect(sample.removeUrlRequestParam).toHaveBeenCalledTimes(1);
  sample.removeUrlRequestParam.mockClear();
});

test('access state', () => {
  const access = { requestStrategy: 'reason' as any, requestPrompt: '' };
  const { rerender } = render(<AccessRequest {...sample} access={access} />);
  expect(screen.getByText(/send request/i)).toBeInTheDocument();

  // Require approval, but not the reason.
  access.requestStrategy = 'always';
  rerender(<AccessRequest {...sample} access={access} />);
  expect(screen.getByText(/being authorized/i)).toBeInTheDocument();
  expect(sample.createRequest).toHaveBeenCalledTimes(1);
  sample.createRequest.mockClear();

  // Default optional.
  access.requestStrategy = 'optional';
  rerender(<AccessRequest {...sample} access={access} />);
  expect(screen.getByText(/hello world/i)).toBeInTheDocument();
});

test('when only requestID is available, render pending', () => {
  render(<AccessRequest {...sample} requestId={'1234'} />);
  expect(screen.getByText(/being authorized/i)).toBeInTheDocument();
  expect(sample.createRequest).not.toHaveBeenCalled();
  expect(sample.renewSession).not.toHaveBeenCalled();
  wait(() => expect(sample.getRequest).toHaveBeenCalled());
  sample.getRequest.mockClear();
});

const sample = {
  attempt: {
    isProcessing: false,
    isFailed: false,
    isSuccess: false,
    message: '',
  },
  access: null,
  request: null,
  requestId: null,
  children: <div>hello world</div>,
  createRequest: jest.fn().mockResolvedValue({}),
  getRequest: jest.fn().mockResolvedValue({}),
  renewSession: jest.fn().mockResolvedValue({}),
  removeUrlRequestParam: jest.fn(),
  checkerInterval: 0,
};
