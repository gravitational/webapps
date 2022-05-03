/*
Copyright 2019-2022 Gravitational, Inc.

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

import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { Card, Text, Flex, ButtonLink, ButtonPrimary, Box } from 'design';
import { Key, ArrowForward } from 'design/Icon';
import * as Alerts from 'design/Alert';
import {
  AuthProvider,
  Auth2faType,
  PreferredMfaType,
  PrimaryAuthType,
} from 'shared/services';
import { useAttempt } from 'shared/hooks';
import Validation, {
  Validator,
  useValidation,
} from 'shared/components/Validation';
import FieldInput from 'shared/components/FieldInput';
import FieldSelect from 'shared/components/FieldSelect';
import {
  requiredToken,
  requiredField,
} from 'shared/components/Validation/rules';
import createMfaOptions, { MfaOption } from 'shared/utils/createMfaOptions';
import { UserCredentials } from 'teleport/services/auth';
import SSOButtonList from './SsoButtons';

export default function LoginForm(props: Props) {
  const {
    title,
    attempt,
    onLoginWithSso,
    isLocalAuthEnabled = true,
    primaryAuthType,
    authProviders = [],
  } = props;

  const ssoEnabled = authProviders?.length > 0;

  if (!isLocalAuthEnabled && !ssoEnabled) {
    return <LoginDisabled title={title} />;
  }

  if (!isLocalAuthEnabled && ssoEnabled) {
    return (
      <CardLogin title={title} attempt={attempt}>
        <SsoList
          authProviders={authProviders}
          isProcessing={attempt.isProcessing}
          onLoginWithSso={onLoginWithSso}
        />
      </CardLogin>
    );
  }

  // Everything below requires local auth to be enabled.
  if (!isLocalAuthEnabled) {
    return <LoginDisabled title={title} />;
  }

  if (primaryAuthType === 'sso') {
    return <PrimarySso {...props} />;
  }

  if (primaryAuthType === 'pwdless') {
    return <PrimaryPwdless {...props} />;
  }

  return <PrimaryLocal {...props} />;
}

const LoginDisabled = ({ title = '' }) => (
  <CardLogin title={title} px={5} pb={5}>
    <Alerts.Danger my={5}>Login has not been enabled</Alerts.Danger>
    <Text mb={2} typography="paragraph2" width="100%">
      The ability to login has not been enabled. Please contact your system
      administrator for more information.
    </Text>
  </CardLogin>
);

const CardLogin = ({
  title = '',
  attempt,
  children,
  ...styles
}: {
  title?: string;
  attempt?: AttemptState;
  children: React.ReactNode;
  // TS: temp handling of styled-system
  [key: string]: any;
}) => (
  <Card bg="primary.light" my="5" mx="auto" width="464px" {...styles}>
    <Text typography="h3" pt={5} textAlign="center" color="light">
      {title}
    </Text>
    {attempt && attempt.isFailed && (
      <Alerts.Danger m={5} mb={0}>
        {attempt.message}
      </Alerts.Danger>
    )}
    {children}
  </Card>
);

const SsoList = ({ isProcessing, authProviders, onLoginWithSso }) => (
  <SSOButtonList
    prefixText="Login with"
    isDisabled={isProcessing}
    providers={authProviders}
    onClick={onLoginWithSso}
  />
);

const Passwordless = ({ onLoginWithPasswordless }) => (
  <Box px={5} pb={5} pt={3}>
    <StyledPwdlessBtn
      mt={3}
      py={2}
      px={3}
      border={1}
      borderRadius={2}
      borderColor="text.placeholder"
      width="100%"
      onClick={() => onLoginWithPasswordless()}
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Key mr={3} fontSize={16} />
          <Box>
            <Text typography="h6">Passwordless</Text>
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

const LocalForm = ({
  isRecoveryEnabled,
  onRecover,
  auth2faType,
  isProcessing,
  onLogin,
  onLoginWithWebauthn,
  clearAttempt,
}) => {
  const [pass, setPass] = useState('');
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');

  const mfaOptions = useMemo(
    () =>
      createMfaOptions({
        auth2faType: auth2faType,
      }),
    []
  );

  const [mfaType, setMfaType] = useState(mfaOptions[0]);

  function onSetMfaOption(option: MfaOption, validator: Validator) {
    setToken('');
    clearAttempt();
    validator.reset();
    setMfaType(option);
  }

  function onLoginClick(
    e: React.MouseEvent<HTMLButtonElement>,
    validator: Validator
  ) {
    e.preventDefault();
    if (!validator.validate()) {
      return;
    }

    switch (mfaType?.value) {
      case 'webauthn':
        onLoginWithWebauthn({ username: user, password: pass });
        break;
      default:
        onLogin(user, pass, token);
    }
  }

  return (
    <Validation>
      {({ validator }) => (
        <FlexBordered as="form">
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
                <FieldSelect
                  maxWidth="50%"
                  width="100%"
                  data-testid="mfa-select"
                  label="Two-factor type"
                  value={mfaType}
                  options={mfaOptions}
                  onChange={opt => onSetMfaOption(opt as MfaOption, validator)}
                  mr={3}
                  mb={0}
                  isDisabled={isProcessing}
                />
                {mfaType.value === 'otp' && (
                  <FieldInput
                    width="50%"
                    label="Authenticator code"
                    rule={requiredToken}
                    autoComplete="one-time-code"
                    inputMode="numeric"
                    value={token}
                    onChange={e => setToken(e.target.value)}
                    placeholder="123 456"
                    mb={0}
                  />
                )}
              </Flex>
              {isRecoveryEnabled && (
                <ButtonLink
                  style={{ padding: '0px', minHeight: 0 }}
                  onClick={() => onRecover(false)}
                >
                  Lost Two-Factor Device?
                </ButtonLink>
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
            Sign In
          </ButtonPrimary>
        </FlexBordered>
      )}
    </Validation>
  );
};

const PrimaryLocal = ({
  title,
  attempt,
  clearAttempt,
  onLogin,
  onLoginWithWebauthn,
  onLoginWithSso,
  onRecover,
  isRecoveryEnabled,
  auth2faType,
  authProviders,
  isPwdlessEnabled,
}: Props) => {
  const { isProcessing } = attempt;
  const ssoEnabled = authProviders?.length > 0;

  const otherOptionsAvailable = isPwdlessEnabled || ssoEnabled;
  const [wantOtherOption, setWantOtherOption] = useState(false);

  function toggleOption() {
    clearAttempt();
    setWantOtherOption(!wantOtherOption);
  }

  if (wantOtherOption) {
    return (
      <CardLogin title={title} attempt={attempt}>
        {/* {isPwdlessEnabled && (
          <Passwordless onLoginWithPasswordless={onLoginWithWebauthn} />
        )} */}

        <Passwordless onLoginWithPasswordless={onLoginWithWebauthn} />

        {isPwdlessEnabled && ssoEnabled && <Divider />}
        {ssoEnabled && (
          <SsoList
            authProviders={authProviders}
            isProcessing={isProcessing}
            onLoginWithSso={onLoginWithSso}
          />
        )}
        <OtherOptionBtn
          wantOtherOption={wantOtherOption}
          toggleOption={toggleOption}
        />
      </CardLogin>
    );
  }

  return (
    <CardLogin title={title} attempt={attempt}>
      <LocalForm
        isRecoveryEnabled={isRecoveryEnabled}
        onRecover={onRecover}
        auth2faType={auth2faType}
        isProcessing={isProcessing}
        onLogin={onLogin}
        onLoginWithWebauthn={onLoginWithWebauthn}
        clearAttempt={clearAttempt}
      />
      {otherOptionsAvailable && (
        <OtherOptionBtn
          wantOtherOption={wantOtherOption}
          toggleOption={toggleOption}
        />
      )}
    </CardLogin>
  );
};

const PrimarySso = ({
  title,
  attempt,
  clearAttempt,
  onLogin,
  onLoginWithWebauthn,
  onLoginWithSso,
  onRecover,
  isRecoveryEnabled,
  auth2faType,
  authProviders,
  isPwdlessEnabled,
}: Props) => {
  const { isProcessing } = attempt;
  const [wantOtherOption, setWantOtherOption] = useState(false);

  function toggleOption() {
    clearAttempt();
    setWantOtherOption(!wantOtherOption);
  }

  if (wantOtherOption) {
    return (
      <CardLogin title={title} attempt={attempt}>
        {isPwdlessEnabled && (
          <>
            <Passwordless onLoginWithPasswordless={onLoginWithWebauthn} />
            <Divider />
          </>
        )}
        <LocalForm
          isRecoveryEnabled={isRecoveryEnabled}
          onRecover={onRecover}
          auth2faType={auth2faType}
          isProcessing={isProcessing}
          onLogin={onLogin}
          onLoginWithWebauthn={onLoginWithWebauthn}
          clearAttempt={clearAttempt}
        />
        <OtherOptionBtn
          wantOtherOption={wantOtherOption}
          toggleOption={toggleOption}
        />
      </CardLogin>
    );
  }

  return (
    <CardLogin title={title} attempt={attempt}>
      <SsoList
        authProviders={authProviders}
        isProcessing={isProcessing}
        onLoginWithSso={onLoginWithSso}
      />
      <OtherOptionBtn
        wantOtherOption={wantOtherOption}
        toggleOption={toggleOption}
      />
    </CardLogin>
  );
};

const PrimaryPwdless = ({
  title,
  attempt,
  clearAttempt,
  onLogin,
  onLoginWithWebauthn,
  onLoginWithSso,
  onRecover,
  isRecoveryEnabled,
  auth2faType,
  authProviders,
}: Props) => {
  const { isProcessing } = attempt;
  const ssoEnabled = authProviders?.length > 0;
  const [wantOtherOption, setWantOtherOption] = useState(false);

  function toggleOption() {
    clearAttempt();
    setWantOtherOption(!wantOtherOption);
  }

  if (wantOtherOption) {
    return (
      <CardLogin title={title} attempt={attempt}>
        {ssoEnabled && (
          <>
            <SsoList
              authProviders={authProviders}
              isProcessing={isProcessing}
              onLoginWithSso={onLoginWithSso}
            />
            <Divider />
          </>
        )}
        <LocalForm
          isRecoveryEnabled={isRecoveryEnabled}
          onRecover={onRecover}
          auth2faType={auth2faType}
          isProcessing={isProcessing}
          onLogin={onLogin}
          onLoginWithWebauthn={onLoginWithWebauthn}
          clearAttempt={clearAttempt}
        />
        <OtherOptionBtn
          wantOtherOption={wantOtherOption}
          toggleOption={toggleOption}
        />
      </CardLogin>
    );
  }

  return (
    <CardLogin title={title} attempt={attempt}>
      <Passwordless onLoginWithPasswordless={onLoginWithWebauthn} />
      <OtherOptionBtn
        wantOtherOption={wantOtherOption}
        toggleOption={toggleOption}
      />
    </CardLogin>
  );
};

const Divider = () => (
  <Flex
    alignItems="center"
    justifyContent="center"
    flexDirection="column"
    borderBottom={1}
    borderColor="text.placeholder"
    mx={5}
    mt={2}
    mb={3}
  >
    <StyledOr>Or</StyledOr>
  </Flex>
);

const OtherOptionBtn = ({ wantOtherOption, toggleOption }) => {
  if (wantOtherOption) {
    return (
      <Box pb={3}>
        <StyledOptionBtn onClick={toggleOption}>Back</StyledOptionBtn>
      </Box>
    );
  }

  return (
    <Box pb={3} mt={-1}>
      <StyledOptionBtn onClick={toggleOption}>
        Other sign-in options
      </StyledOptionBtn>
    </Box>
  );
};

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

const StyledOr = styled.div`
  background: ${props => props.theme.colors.primary.light};
  display: flex;
  align-items: center;
  font-size: 10px;
  height: 32px;
  width: 32px;
  justify-content: center;
  position: absolute;
  z-index: 1;
`;

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

export type Props = {
  title?: string;
  isLocalAuthEnabled?: boolean;
  isPwdlessEnabled: boolean;
  authProviders?: AuthProvider[];
  auth2faType?: Auth2faType;
  primaryAuthType: PrimaryAuthType;
  preferredMfaType?: PreferredMfaType;
  attempt: AttemptState;
  isRecoveryEnabled?: boolean;
  onRecover?: (isRecoverPassword: boolean) => void;
  clearAttempt?: () => void;
  onLoginWithSso(provider: AuthProvider): void;
  onLoginWithWebauthn(creds?: UserCredentials): void;
  onLogin(username: string, password: string, token: string): void;
};

type AttemptState = ReturnType<typeof useAttempt>[0];
