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
import { fireEvent, render, screen } from 'design/utils/testing';
import { Props, AddDatabase } from './AddDatabase';
import { State } from './useAddDatabase';

describe('correct database add command generated with given input', () => {
  test.each`
    input                     | atemptStatus | output
    ${'self-hosted mysql'}    | ${'failed'}  | ${'teleport db start --token=[generated-join-token] --auth-server=localhost:443 --name=[db-name] --protocol=mysql --uri=[uri]'}
    ${'self-hosted mysql'}    | ${'success'} | ${'teleport db start --token=some-token --auth-server=localhost:443 --name=[db-name] --protocol=mysql --uri=[uri]'}
    ${'rds mysql'}            | ${'failed'}  | ${'teleport db start --token=[generated-join-token] --auth-server=localhost:443 --name=[db-name] --protocol=mysql --uri=[uri] --aws-region=[region]'}
    ${'rds mysql'}            | ${'success'} | ${'teleport db start --token=some-token --auth-server=localhost:443 --name=[db-name] --protocol=mysql --uri=[uri] --aws-region=[region]'}
    ${'cloud sql mysql'}      | ${'failed'}  | ${'teleport db start --token=[generated-join-token] --auth-server=localhost:443 --name=[db-name] --protocol=mysql --uri=[uri] --ca-cert=[instance-ca-filepath] --gcp-project-id=[project-id] --gcp-instance-id=[instance-id]'}
    ${'cloud sql mysql'}      | ${'success'} | ${'teleport db start --token=some-token --auth-server=localhost:443 --name=[db-name] --protocol=mysql --uri=[uri] --ca-cert=[instance-ca-filepath] --gcp-project-id=[project-id] --gcp-instance-id=[instance-id]'}
    ${'self-hosted postgres'} | ${'failed'}  | ${'teleport db start --token=[generated-join-token] --auth-server=localhost:443 --name=[db-name] --protocol=postgres --uri=[uri]'}
    ${'self-hosted postgres'} | ${'success'} | ${'teleport db start --token=some-token --auth-server=localhost:443 --name=[db-name] --protocol=postgres --uri=[uri]'}
    ${'rds postgres'}         | ${'failed'}  | ${'teleport db start --token=[generated-join-token] --auth-server=localhost:443 --name=[db-name] --protocol=postgres --uri=[uri] --aws-region=[region]'}
    ${'rds postgres'}         | ${'success'} | ${'teleport db start --token=some-token --auth-server=localhost:443 --name=[db-name] --protocol=postgres --uri=[uri] --aws-region=[region]'}
    ${'cloud sql postgres'}   | ${'failed'}  | ${'teleport db start --token=[generated-join-token] --auth-server=localhost:443 --name=[db-name] --protocol=postgres --uri=[uri] --ca-cert=[instance-ca-filepath] --gcp-project-id=[project-id] --gcp-instance-id=[instance-id]'}
    ${'cloud sql postgres'}   | ${'success'} | ${'teleport db start --token=some-token --auth-server=localhost:443 --name=[db-name] --protocol=postgres --uri=[uri] --ca-cert=[instance-ca-filepath] --gcp-project-id=[project-id] --gcp-instance-id=[instance-id]'}
    ${'redshift'}             | ${'failed'}  | ${'teleport db start --token=[generated-join-token] --auth-server=localhost:443 --name=[db-name] --protocol=postgres --uri=[uri] --aws-region=[region] --aws-redshift-cluster-id=[cluster-id]'}
    ${'redshift'}             | ${'success'} | ${'teleport db start --token=some-token --auth-server=localhost:443 --name=[db-name] --protocol=postgres --uri=[uri] --aws-region=[region] --aws-redshift-cluster-id=[cluster-id]'}
    ${'self-hosted mongodb'}  | ${'failed'}  | ${'teleport db start --token=[generated-join-token] --auth-server=localhost:443 --name=[db-name] --protocol=mongodb --uri=[uri]'}
    ${'self-hosted mongodb'}  | ${'success'} | ${'teleport db start --token=some-token --auth-server=localhost:443 --name=[db-name] --protocol=mongodb --uri=[uri]'}
  `(
    'should generate correct command for input: $input with atempt $atemptStatus',
    ({ input, atemptStatus, output }) => {
      render(<AddDatabase {...props} attempt={{ status: atemptStatus }} />);

      const dropDownInputEl = document.querySelector('input');

      fireEvent.change(dropDownInputEl, { target: { value: input } });
      fireEvent.focus(dropDownInputEl);
      fireEvent.keyDown(dropDownInputEl, { key: 'Enter', keyCode: 13 });

      expect(screen.queryByText(output)).not.toBeNull();
    }
  );
});

test('correct tsh login command generated with local authType', () => {
  render(<AddDatabase {...props} />);
  const output = 'tsh login --proxy=localhost:443 --auth=local --user=yassine';

  expect(screen.queryByText(output)).not.toBeNull();
});

test('correct tsh login command generated with sso authType', () => {
  render(<AddDatabase {...props} authType="sso" />);
  const output = 'tsh login --proxy=localhost:443';

  expect(screen.queryByText(output)).not.toBeNull();
});

test('render instructions dialog for adding database', () => {
  render(<AddDatabase {...props} />);
  expect(screen.getByTestId('Modal')).toMatchSnapshot();
});

const props: Props & State = {
  isEnterprise: false,
  username: 'yassine',
  version: '6.1.3',
  onClose: () => null,
  authType: 'local',
  attempt: {
    status: 'failed',
    statusText: '',
  } as any,
  token: 'some-token',
  createJoinToken() {
    return Promise.resolve(null);
  },
  expiry: '4 hours',
};
