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

import { generateDbStartCmd } from './Manually/Manually';

describe('correct start command for given protocol, type', () => {
  test.each`
    type             | protocol      | output
    ${'self-hosted'} | ${'mysql'}    | ${'teleport start --roles=db --token=[generated-join-token] --auth-server=proxy.example.com:443 --db-name=[db-name] --db-protocol=mysql --db-uri=[uri]'}
    ${'rds'}         | ${'mysql'}    | ${'teleport start --roles=db --token=[generated-join-token] --auth-server=proxy.example.com:443 --db-name=[db-name] --db-protocol=mysql --db-uri=[uri] --db-aws-region=[region]'}
    ${'gcp'}         | ${'mysql'}    | ${'teleport start --roles=db --token=[generated-join-token] --auth-server=proxy.example.com:443 --db-name=[db-name] --db-protocol=mysql --db-uri=[uri] --db-ca-cert=[instance-ca-filepath] --db-gcp-project-id=[project-id] --db-gcp-instance-id=[instance-id]'}
    ${'redshift'}    | ${'mysql'}    | ${'teleport start --roles=db --token=[generated-join-token] --auth-server=proxy.example.com:443 --db-name=[db-name] --db-protocol=mysql --db-uri=[uri] --db-aws-region=[region] --db-aws-redshift-cluster-id=[cluster-id]'}
    ${'self-hosted'} | ${'postgres'} | ${'teleport start --roles=db --token=[generated-join-token] --auth-server=proxy.example.com:443 --db-name=[db-name] --db-protocol=postgres --db-uri=[uri]'}
    ${'rds'}         | ${'postgres'} | ${'teleport start --roles=db --token=[generated-join-token] --auth-server=proxy.example.com:443 --db-name=[db-name] --db-protocol=postgres --db-uri=[uri] --db-aws-region=[region]'}
    ${'gcp'}         | ${'postgres'} | ${'teleport start --roles=db --token=[generated-join-token] --auth-server=proxy.example.com:443 --db-name=[db-name] --db-protocol=postgres --db-uri=[uri] --db-ca-cert=[instance-ca-filepath] --db-gcp-project-id=[project-id] --db-gcp-instance-id=[instance-id]'}
    ${'redshift'}    | ${'postgres'} | ${'teleport start --roles=db --token=[generated-join-token] --auth-server=proxy.example.com:443 --db-name=[db-name] --db-protocol=postgres --db-uri=[uri] --db-aws-region=[region] --db-aws-redshift-cluster-id=[cluster-id]'}
  `(
    'should generate correct command for type: $type and protocol: $protocol',
    async ({ type, protocol, output }) => {
      const host = 'proxy.example.com:443';

      const command = generateDbStartCmd({ type, protocol }, host);

      expect(command).toBe(output);
    }
  );
});
