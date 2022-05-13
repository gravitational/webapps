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

import React, { useState } from 'react';
import { Text, ButtonPrimary, ButtonText, Box } from 'design';
import { Danger } from 'design/Alert';
import FieldInput from 'shared/components/FieldInput';
import Validation, { Validator } from 'shared/components/Validation';
import {
  requiredPassword,
  requiredConfirmedPassword,
} from 'shared/components/Validation/rules';
import { SliderProps } from 'teleport/components/StepSlider';
import { Props as CredentialsProps, LoginFlow } from './NewCredentials';

export function NewPassword(props: Props) {
  const {
    submitAttempt,
    resetToken,
    isPasswordlessEnabled,
    onSubmit,
    auth2faType,
    primaryAuthType,
    password,
    updatePassword,
    switchFlow,
    next,
    refCallback,
    willTransition,
  } = props;
  const [passwordConfirmed, setPasswordConfirmed] = useState('');
  const mfaEnabled = auth2faType !== 'off';

  function handleOnSubmit(
    e: React.MouseEvent<HTMLButtonElement>,
    validator: Validator
  ) {
    e.preventDefault(); // prevent form submit default

    if (!validator.validate()) {
      return;
    }

    if (mfaEnabled) {
      next();
      return;
    }

    onSubmit(password);
  }

  function switchToPasswordlessFlow(e, applyNextAnimation = false) {
    e.preventDefault();
    switchFlow('passwordless', applyNextAnimation);
  }

  return (
    <Validation>
      {({ validator }) => (
        <Box p={5} ref={refCallback} data-testid="password">
          {mfaEnabled && <Text color="text.secondary">Step 1 of 2</Text>}
          <Text typography="h4" bold mb={3} color="light">
            Set A Password
          </Text>
          {submitAttempt.status === 'failed' && (
            <Danger children={submitAttempt.statusText} />
          )}
          <FieldInput
            label="Username"
            value={resetToken.user}
            onChange={() => null}
            readonly
          />
          <FieldInput
            rule={requiredPassword}
            autoFocus
            transitionPropertyName={willTransition ? 'height' : ''}
            autoComplete="off"
            label="Password"
            value={password}
            onChange={e => updatePassword(e.target.value)}
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
            disabled={submitAttempt.status === 'processing'}
          >
            {mfaEnabled ? 'Next' : 'Submit'}
          </ButtonPrimary>
          {primaryAuthType !== 'passwordless' && isPasswordlessEnabled && (
            <Box mt={3} textAlign="center">
              <ButtonText
                onClick={e => switchToPasswordlessFlow(e)}
                disabled={submitAttempt.status === 'processing'}
              >
                Go Passwordless
              </ButtonText>
            </Box>
          )}
          {primaryAuthType === 'passwordless' && (
            <Box mt={3} textAlign="center">
              <ButtonText
                onClick={e => switchToPasswordlessFlow(e, true)}
                disabled={submitAttempt.status === 'processing'}
              >
                Back
              </ButtonText>
            </Box>
          )}
        </Box>
      )}
    </Validation>
  );
}

type Props = CredentialsProps &
  SliderProps<LoginFlow> & {
    password: string;
    updatePassword(pwd: string): void;
  };
