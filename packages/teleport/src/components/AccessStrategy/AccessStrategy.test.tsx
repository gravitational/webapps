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
import { AccessStrategy } from './AccessStrategy';
import { render, screen, wait } from 'design/utils/testing';

test('access request state', async () => {
  const request = { state: 'PENDING' } as any;
  const { rerender } = render(
    <AccessStrategy {...sample} accessRequest={request} />
  );
  expect(screen.getByText(/please wait/i)).toBeInTheDocument();
  await wait(() => expect(sample.getRequest).toHaveBeenCalled());
  sample.getRequest.mockClear();

  request.state = 'DENIED';
  rerender(<AccessStrategy {...sample} accessRequest={request} />);
  expect(screen.getByText(/request denied/i)).toBeInTheDocument();

  request.state = 'APPROVED';
  request.renewedSession = true;
  rerender(<AccessStrategy {...sample} accessRequest={request} />);
  expect(screen.getByText(/hello world/i)).toBeInTheDocument();
});

test('access strategy state', () => {
  // Require reason.
  const strategy = { type: 'reason' as any, prompt: 'some custom prompt' };
  const { rerender } = render(
    <AccessStrategy {...sample} strategy={strategy} />
  );
  expect(screen.getByText(/some custom prompt/i)).toBeInTheDocument();

  // Require approval, but not the reason.
  strategy.type = 'always';
  rerender(<AccessStrategy {...sample} strategy={strategy} />);
  expect(screen.getByText(/being authorized/i)).toBeInTheDocument();
  expect(sample.createRequest).toHaveBeenCalledTimes(1);
  sample.createRequest.mockClear();

  // Default optional.
  strategy.type = 'optional';
  rerender(<AccessStrategy {...sample} strategy={strategy} />);
  expect(screen.getByText(/hello world/i)).toBeInTheDocument();
});

test('when only requestID is available, render pending', () => {
  render(<AccessStrategy {...sample} requestId={'1234'} />);
  expect(screen.getByText(/being authorized/i)).toBeInTheDocument();
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
  strategy: null,
  accessRequest: null,
  requestId: null,
  children: <div>hello world</div>,
  createRequest: jest.fn().mockResolvedValue({}),
  getRequest: jest.fn().mockResolvedValue({}),
  checkerInterval: 0,
};
