/*
Copyright 2020-2022 Gravitational, Inc.

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

import React from 'react';
import { render } from 'design/utils/testing';
import * as story from './NewCredentials.story';

test('story.PasswordOnlyError', () => {
  const { container } = render(<story.PasswordOnlyError />);
  expect(container.firstChild).toMatchSnapshot();
});

test('story.PrimaryPasswordlessError', () => {
  const { container } = render(<story.PrimaryPasswordlessError />);
  expect(container.firstChild).toMatchSnapshot();
});

test('story.MfaDeviceError', () => {
  const { container } = render(<story.MfaDeviceError />);
  expect(container.firstChild).toMatchSnapshot();
});

test('story.MfaDeviceOtp', () => {
  const { container } = render(<story.MfaDeviceOtp />);
  expect(container.firstChild).toMatchSnapshot();
});

test('story.MfaDeviceWebauthn', () => {
  const { container } = render(<story.MfaDeviceWebauthn />);
  expect(container.firstChild).toMatchSnapshot();
});

test('story.MfaDeviceOn', () => {
  const { container } = render(<story.MfaDeviceOn />);
  expect(container.firstChild).toMatchSnapshot();
});
