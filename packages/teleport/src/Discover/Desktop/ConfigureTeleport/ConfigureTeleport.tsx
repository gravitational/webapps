/**
 * Copyright 2022 Gravitational, Inc.
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

import { Box, Text } from 'design';

import { ActionButtons, Header, Step } from 'teleport/Discover/Shared';
import { State } from 'teleport/Discover/useDiscover';

export function ConfigureTeleport(props: State) {
  return (
    <Box>
      <Header>Configure Active Directory</Header>

      <Text mb={4}>
        Refer to the output from the command you just ran. Copy and paste the
        YAML output to your Teleport configuration file (e.g. teleport.yaml).
        Once that's done, you will have to restart your Teleport Cluster...
      </Text>

      <Step
        isBash={false}
        title="Copy the script's yaml output and add it to your teleport.yaml file"
        text="yaml output will be displayed here"
      />

      <ActionButtons
        onProceed={() => props.nextStep()}
        disableProceed={false}
      />
    </Box>
  );
}
