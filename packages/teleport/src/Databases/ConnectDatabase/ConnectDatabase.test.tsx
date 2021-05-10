/**
 * Copyright 2021 Gravitational, Inc.
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
import { Dialog } from './ConnectDatabase.story';
import { generateDbConnectCmd } from './ConnectDatabase';

describe('correct connect command for given protocol, cluster, name', () => {
  test.each`
    protocol      | cluster           | name        | output
    ${'postgres'} | ${'im-a-cluster'} | ${'aurora'} | ${'psql "service=im-a-cluster-aurora user=[user] dbname=[dbname]"'}
    ${'mysql'}    | ${'test-cluster'} | ${'mydb'}   | ${'mysql --defaults-group-suffix=_test-cluster-mydb --user=[user] --database=[database]'}
  `(
    'should generate correct connect command for protocol: $protocol, cluster: $cluster, name: $name',
    async ({ protocol, cluster, name, output }) => {
      const command = generateDbConnectCmd(name, cluster, protocol);

      expect(command).toBe(output);
    }
  );
});

test('render dialog with instructions to connect to database', () => {
  render(<Dialog />);
  expect(screen.getByTestId('Modal')).toMatchSnapshot();
});
