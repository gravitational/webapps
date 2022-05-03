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
import {
  Text,
  Card,
  ButtonPrimary,
  Flex,
  Box,
  Indicator,
  ButtonLink,
} from 'design';
import FieldInput from 'shared/components/FieldInput';
import Validation, {
  Validator,
  useValidation,
} from 'shared/components/Validation';
import {
  requiredPassword,
  requiredConfirmedPassword,
} from 'shared/components/Validation/rules';
import * as Alerts from 'design/Alert';

export default function NewPassword(props) {
  const {
    attempt,
    username,
    mfaEnabled,
    onSubmit,
    onSubmitWithWebauthn,
    onPasswordless,
    password,
    setPassword,
  } = props;
  // const [password, setPassword] = useState('');
  const [passwordConfirmed, setPasswordConfirmed] = useState('');

  function handleOnSubmit(
    e: React.MouseEvent<HTMLButtonElement>,
    validator: Validator
  ) {
    e.preventDefault(); // needed? form enter

    if (!validator.validate()) {
      return;
    }

    onSubmit();
  }

  return (
    <Validation>
      {({ validator }) => (
        <Card as="form" bg="primary.light" my={6} mx="auto" width={464}>
          <Flex>
            <Box flex="3" p="6">
              {mfaEnabled && <Text color="text.secondary">Step 1 of 2</Text>}
              <Text typography="h4" bold mb={3} color="light">
                Set A Password
              </Text>
              {attempt.status === 'failed' && (
                <Alerts.Danger children={attempt.statusText} />
              )}
              <FieldInput
                label="Username"
                value={username}
                onChange={() => null}
                readonly
              />
              <FieldInput
                rule={requiredPassword}
                autoFocus
                autoComplete="off"
                label="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
              <FieldInput
                rule={requiredConfirmedPassword(password)}
                autoComplete="off"
                label="Confirm Password"
                value={passwordConfirmed}
                onChange={e => setPasswordConfirmed(e.target.value)}
                type="password"
                placeholder="Confirm Password"
              />
              <ButtonPrimary
                width="100%"
                mt={3}
                size="large"
                onClick={e => handleOnSubmit(e, validator)}
                disabled={attempt.status === 'processing'}
              >
                {mfaEnabled ? 'Next' : 'Submit'}
              </ButtonPrimary>
              {onPasswordless && (
                <Box mt={5}>
                  <StyledOptionBtn onClick={onPasswordless}>
                    Go Passwordless
                  </StyledOptionBtn>
                </Box>
              )}
            </Box>
          </Flex>
        </Card>
      )}
    </Validation>
  );
}

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
