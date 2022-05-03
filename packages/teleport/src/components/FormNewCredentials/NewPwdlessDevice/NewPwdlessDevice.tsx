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

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Text, Card, Flex, Box, Indicator, ButtonLink } from 'design';
import { Key, ArrowForward } from 'design/Icon';
import * as Alerts from 'design/Alert';
import FieldInput from 'shared/components/FieldInput';
import Validation, { Validator } from 'shared/components/Validation';
import { requiredField } from 'shared/components/Validation/rules';

export default function NewPwdlessDevice(props) {
  const { onSubmit, attempt, onPassword } = props;
  const [deviceName, setDeviceName] = useState(''); // need to be self generated

  function onBtnClick(
    e: React.MouseEvent<HTMLButtonElement>,
    validator: Validator
  ) {
    e.preventDefault(); // TODO required?

    // if (!validator.validate()) {
    //   return;
    // }

    onSubmit(deviceName);
  }

  return (
    <Validation>
      {({ validator }) => (
        <Card as="form" bg="primary.light" my={6} mx="auto" width={464}>
          <Flex>
            <Box flex="3" p="6">
              <Text typography="h4" mb={5} color="light" bold>
                Set Passwordless Device
              </Text>
              {/* {attempt.status === 'processing' && (
            <Box textAlign="center" m={10}>
              <Indicator />
            </Box>
          )} */}
              {attempt.status === 'failed' && (
                <Alerts.Danger children={attempt.statusText} />
              )}
              <FieldInput
                rule={requiredField('Device name is required')}
                label="Device name"
                placeholder="Name"
                width="100%"
                autoFocus
                value={deviceName}
                type="text"
                onChange={e => setDeviceName(e.target.value)}
                readonly={attempt.status === 'processing'}
              />
              <Passwordless
                onClick={onBtnClick}
                disabled={attempt.status === 'processing'}
              />
              {onPassword && (
                <Box>
                  <StyledOptionBtn onClick={onPassword}>Back</StyledOptionBtn>
                </Box>
              )}
            </Box>
          </Flex>
        </Card>
      )}
    </Validation>
  );
}

const Passwordless = ({ onClick, disabled }) => (
  <Box pb={5}>
    <StyledPwdlessBtn
      mt={3}
      py={2}
      px={3}
      border={1}
      borderRadius={2}
      borderColor="text.placeholder"
      width="100%"
      onClick={onClick}
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Key mr={3} fontSize={16} />
          <Box>
            <Text typography="h6">Go Passwordless</Text>
            <Text fontSize={1} color="text.secondary">
              Follow the prompt from your browser
            </Text>
          </Box>
        </Flex>
        <ArrowForward fontSize={16} />
      </Flex>
    </StyledPwdlessBtn>
  </Box>
);

const StyledPwdlessBtn = styled(Box)`
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.action.active};
  }
`;

const StyledOptionBtn = styled(ButtonLink)`
  display: inherit;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: bold;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export type Props = {
  title?: string;
  submitBtnText?: string;
  accountToken: AccountToken;
  onSubmit(password: string): void;
};

type AccountToken = {
  tokenId: string;
  qrCode: string;
  user: string;
};
