/*
Copyright 2022 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React, { ReactNode } from 'react';
import styled from 'styled-components';

import { Box, Flex, Text } from 'design';
import { Cross, Info, Warning } from 'design/Icon';

type Props = {
  message: string;
  // The backend defines the severity as an integer value with the current
  // pre-defined values: LOW: 0; MEDIUM: 5; HIGH: 10
  severity: number;
  id: string;
  onClose: (id: string) => void;
};

export function Banner({ id, message = '', severity = 0, onClose }: Props) {
  return (
    <Box bg={getBackgroundColor(severity)} p={3}>
      <Flex alignItems="center">
        {generateIcon(severity)}
        <Text bold>{message}</Text>
        <Close
          onClick={() => {
            onClose(id);
          }}
        >
          <Cross />
        </Close>
      </Flex>
    </Box>
  );
}

function generateIcon(severity: number): ReactNode {
  // severity is checked using ranges to allow additional severities to be added
  // on the backend without requiring an update to the client.
  if (severity < 5) {
    return <Info mr={3} fontSize="3" role="icon" />;
  }
  if (severity < 10) {
    return <Info mr={3} fontSize="3" role="icon" />;
  }
  if (severity >= 10) {
    return <Warning mr={3} fontSize="3" role="icon" />;
  }
  return null;
}

function getBackgroundColor(severity: number): string {
  // severity is checked using ranges to allow additional severities to be added
  // on the backend without requiring an update to the client.
  if (severity < 5) {
    return 'info';
  }
  if (severity < 10) {
    return 'warning';
  }
  if (severity >= 10) {
    return 'danger';
  }
  return 'secondary.light';
}

const Close = styled.button`
  background: none;
  border: 1px solid transparent;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  margin-left: auto;
  padding: 0.5rem;

  :hover {
    background-color: rgb(255, 255, 255, 0.1);
  }
  :focus {
    border: 1px solid rgb(255, 255, 255, 0.1);
  }
`;
