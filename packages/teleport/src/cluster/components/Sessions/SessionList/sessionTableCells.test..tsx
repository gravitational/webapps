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
import NodeCell from './NodeCell';
import DescCell from './DescCell';
import cfg from 'teleport/config';
import { render, Router } from 'design/utils/testing';

const session = {
  sid: undefined,
  namespace: undefined,
  login: '',
  created: undefined,
  durationText: undefined,
  serverId: 'server-id',
  hostname: undefined,
  clusterId: undefined,
  parties: undefined,
  addr: undefined,
};
const data = [session];
const tableRow = document.createElement('tr');

test('empty hostname and addr check in NodeCell', () => {
  // test undefined hostname and addr
  const { queryByText, rerender } = render(
    <NodeCell rowIndex={0} data={data} />,
    {
      container: document.body.appendChild(tableRow),
    }
  );
  expect(queryByText('server-id')).not.toBeNull();
  expect(queryByText(/\[/)).toBeNull();

  // test defined hostname and addr
  session.hostname = 'abc';
  session.addr = '1234';
  rerender(<NodeCell rowIndex={0} data={data} />);
  expect(queryByText(session.serverId)).toBeNull();
  expect(queryByText(/abc/)).not.toBeNull();
  expect(queryByText(/\[1234\]/)).not.toBeNull();

  session.hostname = undefined;
  session.addr = undefined;
});

test('empty hostname check in DescCell', () => {
  jest.spyOn(cfg, 'getSshSessionRoute').mockReturnValue('bbb');

  // test undefined hostname
  const { queryByText, rerender } = render(
    <Router>
      <DescCell rowIndex={0} data={data} />
    </Router>,
    {
      container: document.body.appendChild(tableRow),
    }
  );

  expect(queryByText(/server-id/)).not.toBeNull();

  // test defined hostname
  session.hostname = 'abc';
  rerender(
    <Router>
      <DescCell rowIndex={0} data={data} />
    </Router>
  );
  expect(queryByText(/server-id/)).toBeNull();
  expect(queryByText(/abc/)).not.toBeNull();

  session.hostname = undefined;
});
