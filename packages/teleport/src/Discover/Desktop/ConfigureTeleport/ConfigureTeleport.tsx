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

import { Box, Flex, Text } from 'design';

import styled from 'styled-components';

import { ActionButtons, Header } from 'teleport/Discover/Shared';
import { State } from 'teleport/Discover/useDiscover';

import { ConfigurationAnimation } from 'teleport/Discover/Desktop/ConfigureTeleport/ConfigurationAnimation';

export function ConfigureTeleport(props: State) {
  return (
    <Box>
      <Flex flexWrap="wrap" maxWidth="1500px">
        <Flex
          mr={5}
          flexShrink={1}
          minWidth={200}
          flexDirection="column"
          justifyContent="space-between"
          maxHeight={220}
        >
          <Header>Configure Active Directory</Header>

          <Text mt={4} mb={4}>
            Refer to the output from the command you just ran.
          </Text>

          <Text mb={4}>
            Copy and paste the YAML output to your Teleport configuration file
            (e.g. teleport.yaml).
          </Text>

          <Text mb={4}>
            Once that's done, you will have to restart your Teleport Cluster.
          </Text>
        </Flex>

        <TerminalContainer>
          <ConfigurationAnimation />
        </TerminalContainer>
      </Flex>

      <ActionButtons
        onProceed={() => props.nextStep()}
        disableProceed={false}
      />
    </Box>
  );
}

const TerminalContainer = styled.div`
  width: 650px;
  display: flex;
  flex-direction: column;
  flex: 1 0 650px;
  align-items: flex-end;
`;
