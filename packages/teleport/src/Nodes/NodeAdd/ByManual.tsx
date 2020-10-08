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
import { useTheme } from 'styled-components';
import { Text, ButtonLink, Box } from 'design';
import TextSelectCopy from 'teleport/components/TextSelectCopy';

export default function ByManual({ version, isEnterprise, ...styles }: Props) {
  const monoFont = useTheme().fonts.mono;
  const linux64Link = getDownloadLink('linux64', version, isEnterprise);
  const linux32Link = getDownloadLink('linux32', version, isEnterprise);
  const macLink = getDownloadLink('mac', version, isEnterprise);

  return (
    <>
      <Box {...styles}>
        <Text>Step 1: Download and Install tctl</Text>
        <ButtonLink href={macLink} target="_blank">
          Mac
        </ButtonLink>{' '}
        |
        <ButtonLink href={linux64Link} target="_blank">
          Linux 64-bit
        </ButtonLink>{' '}
        |
        <ButtonLink href={linux32Link} target="_blank">
          Linux 32-bit
        </ButtonLink>
      </Box>
      <Box>
        <Text>Step 2: Generate a new node invite token</Text>
        <TextSelectCopy
          text="tctl nodes add"
          style={{ fontFamily: monoFont }}
          mb={2}
        />
      </Box>
    </>
  );
}

function getDownloadLink(type: Arch, version: string, isEnterprise: boolean) {
  const prefix = isEnterprise ? 'teleport-ent' : 'teleport';

  let infix = 'linux-amd64';
  if (type === 'mac') {
    infix = 'darwin-amd64';
  } else if (type === 'linux32') {
    infix = 'linux-386';
  }

  return `https://get.gravitational.com/${prefix}-v${version}-${infix}-bin.tar.gz`;
}

type Props = {
  version: string;
  isEnterprise: boolean;
  // handles styles
  [key: string]: any;
};

type Arch = 'mac' | 'linux32' | 'linux64';
