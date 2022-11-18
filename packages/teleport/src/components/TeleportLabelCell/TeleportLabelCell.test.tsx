/**
 * Copyright 2020-2021 Gravitational, Inc.
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

import { render, screen } from 'design/utils/testing';

import { TeleportLabelCell } from './TeleportLabelCell';

describe('teleport/components/TeleportLabelCell', () => {
  it('should not render teleport.internal labels', () => {
    const labels = [
      {
        name: 'test',
        value: 'value1',
      },
      {
        name: 'teleport.internal',
        value: 'value2',
      },
      {
        name: 'teleport.internal/other',
        value: 'value3',
      },
    ];

    render(<TeleportLabelCell labels={labels} onClick={jest.fn()} />);

    expect(screen.getByText('test: value1')).toBeInTheDocument();
    expect(screen).not.toContain('teleport.internal');
  });
});
