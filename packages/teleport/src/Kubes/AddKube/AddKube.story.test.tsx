/*
Copyright 2022 Gravitational, Inc.

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
import { render, screen } from 'design/utils/testing';

import { Loaded, TokenGenerated, Processing, Failed } from './AddKube.story';

test('render loaded', () => {
  render(<Loaded />);
  expect(screen.getByTestId('Modal')).toMatchSnapshot();
});

test('render with token generated', () => {
  render(<TokenGenerated />);
  expect(screen.getByTestId('Modal')).toMatchSnapshot();
});

test('render processing', () => {
  render(<Processing />);
  expect(screen.getByTestId('Modal')).toMatchSnapshot();
});

test('render failed', () => {
  render(<Failed />);
  expect(screen.getByTestId('Modal')).toMatchSnapshot();
});
