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
import { Text, Box, ButtonSecondary, Link } from 'design';
import { DialogContent, DialogFooter } from 'design/Dialog';
import cfg from 'teleport/config';
import TextSelectCopy from 'teleport/components/TextSelectCopy';
import * as links from 'teleport/services/links';

export default function Manually({ user, version, onClose }: Props) {
  const { hostname, port } = window.document.location;
  const host = `${hostname}:${port || '443'}`;

  return (
    <>
      <DialogContent minHeight="240px" flex="0 0 auto">
        <Box>
          <Box mb={4}>
            <Text bold as="span">
              Step 1
            </Text>{' '}
            - Download Teleport package to your computer
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
            <TextSelectCopy mt="2" text="tctl tokens add --type=app" />
          </Box>
          <Box mb="4">
            <Text bold as="span">
              Step 4
            </Text>
            {` - Start the Teleport agent with the following parameters`}
            <TextSelectCopy
              mt="2"
              text={`teleport start --roles=app --app-name=[example-app] --app-uri=http://localhost/ --token=[generated-join-token] --auth-server=${host}`}
            />
          </Box>
          <Box>
            <Text bold as="span"></Text>
            {`* Note: For a self-hosted Teleport version, you may need to update DNS and obtain a TLS certificate for this application.
            Learn more about application access `}
            <Link
              href={
                'https://goteleport.com/teleport/docs/application-access/'
              }
              target="_blank"
              mr="2"
            >
              here
            </Link>
          </Box>
        </Box>
      </DialogContent>
      <DialogFooter>
        <ButtonSecondary onClick={onClose}>Close</ButtonSecondary>
      </DialogFooter>
    </>
  );
}

type Props = {
  onClose(): void;
  version: string;
  user: string;
};
