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
import { Basic } from './Dialog.story';
import { render } from 'design/utils/testing';

describe('design/Dialog', () => {
  it('renders parent and its children', () => {
    const { getByTestId } = render(<Basic />);

    const parent = getByTestId('Modal');
    const header = getByTestId('header');
    const title = getByTestId('title');
    const content = getByTestId('content');
    const footer = getByTestId('footer');

    expect(parent).not.toBeNull();
    expect(header).not.toBeNull();
    expect(title).not.toBeNull();
    expect(content).not.toBeNull();
    expect(footer).not.toBeNull();
  });
});
