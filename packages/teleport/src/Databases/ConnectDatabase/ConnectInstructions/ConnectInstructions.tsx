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
import { Text, Box, ButtonSecondary, Link } from 'design';
import { DialogContent, DialogFooter } from 'design/Dialog';
import cfg from 'teleport/config';
import TextSelectCopy from 'teleport/components/TextSelectCopy';

export default function ConnectInstructions({
  user,
  clusterId,
  onClose,
  dbInfo,
}) {
  const { name, protocol } = dbInfo;
  const { hostname, port } = window.document.location;
  const host = `${hostname}:${port || '443'}`;

  return (
    <>
      <DialogContent minHeight="240px" flex="0 0 auto">
        <Box mb={4}>
          <Text bold as="span">
            Step 1
          </Text>
          {' - Login to Teleport'}
          <TextSelectCopy
            mt="2"
            text={`tsh login --proxy=${host} --auth=${cfg.getAuthType()} --user=${user}`}
          />
        </Box>
        <Box mb={4}>
          <Text bold as="span">
            Step 2
          </Text>
          {' - Retrieve credentials for the database'}
          <TextSelectCopy mt="2" text={`tsh db login ${name}`} />
        </Box>
        <Box mb={4}>
          <Text bold as="span">
            Step 3
          </Text>
          {' - Connect to the database'}
          <TextSelectCopy
            mt="2"
            text={`${generateDbConnectCmd(name, clusterId, protocol)}`}
          />
        </Box>
        <Box>
          {`* Note: To connect with a GUI database client, see our `}
          <Link
            href={
              'https://goteleport.com/docs/database-access/guides/gui-clients/'
            }
            target="_blank"
          >
            documentation
          </Link>
          {` for instructions `}
        </Box>
      </DialogContent>
      <DialogFooter>
        <ButtonSecondary onClick={onClose}>Close</ButtonSecondary>
      </DialogFooter>
    </>
  );
}

export function generateDbConnectCmd(dbName, clusterId, protocol) {
  if (protocol === 'postgres') {
    return `psql "service=${clusterId}-${dbName} user=[user] dbname=[dbname]"`;
  } else if (protocol === 'mysql') {
    return `mysql --defaults-group-suffix=_${clusterId}-${dbName} --user=[user] --database=[database]`;
  }
}
