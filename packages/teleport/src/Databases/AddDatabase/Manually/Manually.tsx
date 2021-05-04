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

import React, { useState } from 'react';
import { Text, Box, ButtonSecondary, Link } from 'design';
import { DialogContent, DialogFooter } from 'design/Dialog';
import Select, { Option } from 'shared/components/Select';
import cfg from 'teleport/config';
import TextSelectCopy from 'teleport/components/TextSelectCopy';
import * as links from 'teleport/services/links';
import { formatDatabaseInfo } from 'teleport/services/databases/makeDatabase';

export default function Manually({ user, version, onClose }) {
  const { hostname, port } = window.document.location;
  const host = `${hostname}:${port || '443'}`;

  const [dbOptions] = useState<Option<DbOption>[]>(() =>
    options.map(dbOption => {
      return {
        value: dbOption,
        label: dbOption.text,
      };
    })
  );

  const [selectedDbOption, setSelectedDpOption] = useState<Option<DbOption>>(
    dbOptions[0]
  );

  return (
    <>
      <DialogContent minHeight="240px" flex="0 0 auto">
        <Box mb={4}>
          <Text bold as="span">
            Step 1
          </Text>
          {' - Download Teleport package to your computer '}
          <Box>
            <Link href={links.getMacOS(version)} target="_blank" mr="2">
              MacOS
            </Link>
            <Link href={links.getLinux64(version)} target="_blank" mr="2">
              Linux 64-bit
            </Link>
            <Link href={links.getLinux32(version)} target="_blank">
              Linux 32-bit
            </Link>
          </Box>
        </Box>
        <Box mb={4}>
          <Text bold as="span">
            Step 2
          </Text>
          {' - Login to Teleport'}
          <TextSelectCopy
            mt="2"
            text={`tsh login --proxy=${host} --auth=${cfg.getAuthType()} --user=${user}`}
          />
        </Box>
        <Box mb={4}>
          <Text bold as="span">
            Step 3
          </Text>
          {' - Generate a join token'}
          <TextSelectCopy mt="2" text="tctl tokens add --type=db" />
        </Box>
        <Box mb={4}>
          <Text bold as="span">
            Step 4
          </Text>
          {` - Select the database type and protocol to use`}
          <Box mt={2}>
            <Select
              value={selectedDbOption}
              onChange={(o: Option<DbOption>) => setSelectedDpOption(o)}
              options={dbOptions}
              isSearchable={true}
            />
          </Box>
        </Box>
        <Box mb={4}>
          <Text bold as="span">
            Step 5
          </Text>
          {' - Start the Teleport agent with the following parameters'}
          <TextSelectCopy
            mt="2"
            text={`${generateDbStartCmd({ ...selectedDbOption.value }, host)}`}
          />
        </Box>
        <Box>
          {`* Note: For a self-hosted Teleport version, you may need to update DNS and obtain a TLS certificate for this application.
            Learn more about database access `}
          <Link
            href={'https://goteleport.com/docs/database-access/'}
            target="_blank"
            mr="2"
          >
            here
          </Link>
        </Box>
      </DialogContent>
      <DialogFooter>
        <ButtonSecondary onClick={onClose}>Close</ButtonSecondary>
      </DialogFooter>
    </>
  );
}

export const generateDbStartCmd = ({ type, protocol }, host) => {
  const baseCommand = `teleport start --roles=db --token=[generated-join-token] --auth-server=${host} --db-name=[db-name] --db-protocol=${protocol} --db-uri=[uri]`;
  switch (type) {
    case 'self-hosted':
      return baseCommand;
    case 'rds':
      return baseCommand + ' --db-aws-region=[region]';
    case 'redshift':
      return (
        baseCommand +
        ' --db-aws-region=[region] --db-aws-redshift-cluster-id=[cluster-id]'
      );
    case 'gcp':
      return (
        baseCommand +
        ' --db-ca-cert=[instance-ca-filepath] --db-gcp-project-id=[project-id] --db-gcp-instance-id=[instance-id]'
      );
  }
};

const options: DbOption[] = [
  formatDatabaseInfo('rds', 'postgres'),
  formatDatabaseInfo('rds', 'mysql'),
  formatDatabaseInfo('redshift', 'postgres'),
  formatDatabaseInfo('gcp', 'postgres'),
  formatDatabaseInfo('self-hosted', 'postgres'),
  formatDatabaseInfo('self-hosted', 'mysql'),
];

type DbOption = {
  type: string;
  protocol: string;
  text: string;
};
