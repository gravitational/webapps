/**
 * Copyright 2022 Gravitational, Inc.
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
import {
  NoMessages,
  OneMessage,
  MultipleMessages,
} from './FeatureHeader.story';
import { render, waitFor } from 'design/utils/testing';

test('rendering of header without messages', async () => {
  const { container } = render(<NoMessages />);

  await waitFor(() => document.querySelector('div'));
  expect(container).toMatchSnapshot();
});

test('rendering of header without one message', async () => {
  const { container } = render(<OneMessage />);

  await waitFor(() => document.querySelector('div'));
  expect(container).toMatchSnapshot();
});

test('rendering of header with multiple messages', async () => {
  const { container } = render(<MultipleMessages />);

  await waitFor(() => document.querySelector('div'));
  expect(container).toMatchSnapshot();
});
