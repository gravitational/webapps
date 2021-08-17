/*
Copyright 2019 Gravitational, Inc.

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

import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, Text, Flex, ButtonLink, ButtonPrimary, Box } from 'design';
import * as Alerts from 'design/Alert';
import { AuthProvider, Auth2faType } from 'shared/services';
import { Option } from 'shared/components/Select';
import { useAttempt } from 'shared/hooks';
import Validation, { Validator } from '../Validation';
import FieldInput from '../FieldInput';
import FieldSelect from '../FieldSelect';
import { requiredToken, requiredField } from '../Validation/rules';
import SSOButtonList from './SsoButtons';

export default function LoginForm(props: Props) {
  const {
    title,
    attempt,
    onLoginWithU2f,
    onLogin,
    onLoginWithSso,
    authProviders,
    auth2faType = 'off',
    isLocalAuthEnabled = true,
    isRecoveryEnabled = false,
    onRecover,
    clearAttempt,
  } = props;

  const mfaEnabled = auth2faType === 'on' || auth2faType === 'optional';
  const u2fEnabled = auth2faType === 'u2f';
  const otpEnabled = auth2faType === 'otp';
  const ssoEnabled = authProviders && authProviders.length > 0;

  const [pass, setPass] = useState('');
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');
  const [mfaOptions] = useState<MFAOption[]>(() => {
    const mfaOptions: MFAOption[] = [];

    if (auth2faType === 'optional') {
      mfaOptions.push({ value: 'optional', label: 'None' });
    }

    if (mfaEnabled || u2fEnabled) {
      mfaOptions.push({ value: 'u2f', label: 'Hardware Key' });
    }

    if (mfaEnabled || otpEnabled) {
      mfaOptions.push({ value: 'otp', label: 'Authenticator App' });
    }

    return mfaOptions;
  });

  const [mfaType, setMfaType] = useState<MFAOption>(mfaOptions[0]);
  const [isExpanded, toggleExpander] = useState(
    !(isLocalAuthEnabled && ssoEnabled)
  );
  const { isFailed, isProcessing, message } = attempt;

  function onLoginClick(
    e: React.MouseEvent<HTMLButtonElement>,
    validator: Validator
  ) {
    e.preventDefault();
    if (!validator.validate()) {
      return;
    }

    if (mfaType?.value === 'u2f') {
      onLoginWithU2f(user, pass);
    } else {
      onLogin(user, pass, token);
    }
  }

  function onSetMfaOption(option: MFAOption, validator: Validator) {
    setToken('');
    clearAttempt();
    validator.reset();
    setMfaType(option);
  }

  if (!ssoEnabled && !isLocalAuthEnabled) {
    return <CardLoginEmpty title={title} />;
  }

  const bgColor =
    ssoEnabled && isLocalAuthEnabled ? 'primary.main' : 'primary.light';

  return (
    <Validation>
      {({ validator }) => (
        <CardLogin title={title}>
          {isFailed && (
            <Alerts.Danger mx={5} mb={0} mt={5}>
              {message}
            </Alerts.Danger>
          )}
          {ssoEnabled && (
            <SSOButtonList
              prefixText="Login with"
              isDisabled={isProcessing}
              providers={authProviders}
              onClick={onLoginWithSso}
            />
          )}
          {ssoEnabled && isLocalAuthEnabled && (
            <Flex
              height="1px"
              alignItems="center"
              justifyContent="center"
              style={{ position: 'relative' }}
              flexDirection="column"
            >
              <StyledOr>Or</StyledOr>
            </Flex>
          )}
          {ssoEnabled && isLocalAuthEnabled && !isExpanded && (
            <FlexBordered bg={bgColor} flexDirection="row">
              <ButtonLink autoFocus onClick={() => toggleExpander(!isExpanded)}>
                Sign in with your Username and Password
              </ButtonLink>
            </FlexBordered>
          )}
          {isLocalAuthEnabled && isExpanded && (
            <FlexBordered as="form" bg={bgColor}>
              <FieldInput
                rule={requiredField('Username is required')}
                label="Username"
                autoFocus
                value={user}
                onChange={e => setUser(e.target.value)}
                placeholder="Username"
              />
              <Box mb={isRecoveryEnabled ? 2 : 4}>
                <FieldInput
                  rule={requiredField('Password is required')}
                  label="Password"
                  value={pass}
                  onChange={e => setPass(e.target.value)}
                  type="password"
                  placeholder="Password"
                  mb={0}
                  width="100%"
                />
                {isRecoveryEnabled && (
                  <Box textAlign="right">
                    <ButtonLink
                      style={{ padding: '0px', minHeight: 0 }}
                      onClick={() => onRecover(true)}
                    >
                      Forgot Password?
                    </ButtonLink>
                  </Box>
                )}
              </Box>
              {auth2faType !== 'off' && (
                <Box mb={isRecoveryEnabled ? 3 : 4}>
                  <Flex alignItems="flex-end">
                    <Box width="50%" data-testid="mfa-select">
                      <FieldSelect
                        label="Two-factor type"
                        value={mfaType}
                        options={mfaOptions}
                        onChange={opt =>
                          onSetMfaOption(opt as MFAOption, validator)
                        }
                        mr={3}
                        mb={0}
                        isDisabled={isProcessing}
                      />
                    </Box>
                    <Box width="50%">
                      {mfaType.value === 'otp' && (
                        <FieldInput
                          label="Authenticator code"
                          rule={requiredToken}
                          autoComplete="off"
                          value={token}
                          onChange={e => setToken(e.target.value)}
                          placeholder="123 456"
                          mb={0}
                        />
                      )}
                      {mfaType.value === 'u2f' && isProcessing && (
                        <Text typography="body2" mb={1}>
                          Insert your hardware key and press the button on the
                          key.
                        </Text>
                      )}
                    </Box>
                  </Flex>
                  {isRecoveryEnabled && (
                    <Box>
                      <ButtonLink
                        style={{ padding: '0px', minHeight: 0 }}
                        onClick={() => onRecover(false)}
                      >
                        Lost Two-Factor Device?
                      </ButtonLink>
                    </Box>
                  )}
                </Box>
              )}
              <ButtonPrimary
                width="100%"
                mt={3}
                type="submit"
                size="large"
                onClick={e => onLoginClick(e, validator)}
                disabled={isProcessing}
              >
                LOGIN
              </ButtonPrimary>
            </FlexBordered>
          )}
        </CardLogin>
      )}
    </Validation>
  );
}

const FlexBordered = props => (
  <Flex
    p="5"
    justifyContent="center"
    flexDirection="column"
    borderBottomLeftRadius="3"
    borderBottomRightRadius="3"
    {...props}
  />
);

const CardLogin = ({ title = '', children, ...styles }) => (
  <Card bg="primary.light" my="5" mx="auto" width="464px" {...styles}>
    <Text typography="h3" pt={5} textAlign="center" color="light">
      {title}
    </Text>
    {children}
  </Card>
);

const CardLoginEmpty = ({ title = '' }) => (
  <CardLogin title={title} px={5} pb={5}>
    <Alerts.Danger my={5}>Login has not been enabled</Alerts.Danger>
    <Text mb={2} typography="paragraph2" width="100%">
      The ability to login has not been enabled. Please contact your system
      administrator for more information.
    </Text>
  </CardLogin>
);

const StyledOr = styled.div`
  background: ${props => props.theme.colors.primary.light};
  display: flex;
  align-items: center;
  font-size: 10px;
  height: 32px;
  width: 32px;
  top: -16px;
  justify-content: center;
  border-radius: 50%;
  position: absolute;
  z-index: 1;
`;

type Props = {
  title?: string;
  isLocalAuthEnabled?: boolean;
  authProviders?: AuthProvider[];
  auth2faType?: Auth2faType;
  attempt: ReturnType<typeof useAttempt>[0];
  isRecoveryEnabled?: boolean;
  onRecover?: (isRecoverPassword: boolean) => void;
  clearAttempt?: () => void;
  onLoginWithSso(provider: AuthProvider): void;
  onLoginWithU2f(username: string, password: string): void;
  onLogin(username: string, password: string, token: string): void;
};

type MFAOption = Option<Auth2faType>;
