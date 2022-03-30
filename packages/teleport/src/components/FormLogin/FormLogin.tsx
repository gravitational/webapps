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
import * as Alerts from 'design/Alert';
import {
  AuthProvider,
  Auth2faType,
  PreferredMfaType,
  AuthType,
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
import { getMfaOptions, MfaOption } from 'teleport/services/mfa/utils';
import SSOButtonList from './SsoButtons';
import { Key, ArrowForward } from 'design/Icon';

export default function LoginForm(props: Props) {
  const {
    title,
    attempt,
    onLoginWithU2f,
    onLoginWithWebauthn,
    onLoginWithPasswordless,
    onLogin,
    onLoginWithSso,
    authProviders,
    auth2faType = 'off',
    preferredMfaType = '',
    isLocalAuthEnabled = true,
    isRecoveryEnabled = false,
    onRecover,
    clearAttempt,
    authType,
  } = props;

  const ssoEnabled = authProviders && authProviders.length > 0;
  const webauthnEnabled =
    auth2faType === 'on' ||
    auth2faType === 'optional' ||
    auth2faType === 'webauthn';

  const preferSso =
    authType === 'github' || authType === 'oidc' || authType === 'saml';
  const preferPwdless = authType === 'pwdless';

  if (!ssoEnabled && !isLocalAuthEnabled) {
    return (
      <CardLogin title={title} px={5} pb={5}>
        <Alerts.Danger my={5}>Login has not been enabled</Alerts.Danger>
        <Text mb={2} typography="paragraph2" width="100%">
          The ability to login has not been enabled. Please contact your system
          administrator for more information.
        </Text>
      </CardLogin>
    );
  }

  if (preferSso && ssoEnabled) {
    return (
      <SsoLogin
        title={title}
        webauthnEnabled={webauthnEnabled}
        ssoEnabled={ssoEnabled}
        isLocalAuthEnabled={isLocalAuthEnabled}
        isRecoveryEnabled={isRecoveryEnabled}
        onRecover={onRecover}
        auth2faType={auth2faType}
        authProviders={authProviders}
        preferredMfaType={preferredMfaType}
        attempt={attempt}
        clearAttempt={clearAttempt}
        onLogin={onLogin}
        onLoginWithU2f={onLoginWithU2f}
        onLoginWithWebauthn={onLoginWithWebauthn}
        onLoginWithPasswordless={onLoginWithPasswordless}
        onLoginWithSso={onLoginWithSso}
      />
    );
  }

  if (preferPwdless && isLocalAuthEnabled) {
    return (
      <PwdlessLogin
        title={title}
        webauthnEnabled={webauthnEnabled}
        ssoEnabled={ssoEnabled}
        isLocalAuthEnabled={isLocalAuthEnabled}
        isRecoveryEnabled={isRecoveryEnabled}
        onRecover={onRecover}
        auth2faType={auth2faType}
        authProviders={authProviders}
        preferredMfaType={preferredMfaType}
        attempt={attempt}
        clearAttempt={clearAttempt}
        onLogin={onLogin}
        onLoginWithU2f={onLoginWithU2f}
        onLoginWithWebauthn={onLoginWithWebauthn}
        onLoginWithPasswordless={onLoginWithPasswordless}
        onLoginWithSso={onLoginWithSso}
      />
    );
  }

  return (
    <LocalLogin
      webauthnEnabled={webauthnEnabled}
      ssoEnabled={ssoEnabled}
      title={title}
      isRecoveryEnabled={isRecoveryEnabled}
      onRecover={onRecover}
      auth2faType={auth2faType}
      authProviders={authProviders}
      preferredMfaType={preferredMfaType}
      attempt={attempt}
      clearAttempt={clearAttempt}
      onLogin={onLogin}
      onLoginWithU2f={onLoginWithU2f}
      onLoginWithWebauthn={onLoginWithWebauthn}
      onLoginWithPasswordless={onLoginWithPasswordless}
      onLoginWithSso={onLoginWithSso}
    />
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

const CardLogin = ({
  title = '',
  attempt,
  children,
  ...styles
}: {
  title?: string;
  attempt: Attempt;
}) => (
  <Validation>
    <Card bg="primary.light" my="5" mx="auto" width="464px" {...styles}>
      <Text typography="h3" pt={5} textAlign="center" color="light">
        {title}
      </Text>
      {attempt.isFailed && (
        <Alerts.Danger m={5} mb={0}>
          {attempt.message}
        </Alerts.Danger>
      )}
      {children}
    </Card>
  </Validation>
);

const SsoList = ({ isProcessing, authProviders, onLoginWithSso }) => (
  <SSOButtonList
    prefixText="Login with"
    isDisabled={isProcessing}
    providers={authProviders}
    onClick={onLoginWithSso}
  />
);

// auth2fatype can't be off
const PwdlessField = ({ onLoginWithPasswordless }) => (
  <PwdlessBtn
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
  </PwdlessBtn>
);

const LocalLoginForm = ({
  isRecoveryEnabled,
  onRecover,
  auth2faType,
  preferredMfaType,
  isProcessing,
  onLogin,
  onLoginWithU2f,
  onLoginWithWebauthn,
  clearAttempt,
}) => {
  const validator = useValidation() as Validator;
  const [pass, setPass] = useState('');
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');

  const mfaOptions = useMemo<MfaOption[]>(
    () => getMfaOptions(auth2faType, preferredMfaType),
    []
  );
  const [mfaType, setMfaType] = useState<MfaOption>(mfaOptions[0]);

  function onSetMfaOption(option: MfaOption) {
    setToken('');
    clearAttempt();
    validator.reset();
    setMfaType(option);
  }

  function onLoginClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!validator.validate()) {
      return;
    }

    switch (mfaType?.value) {
      case 'u2f':
        onLoginWithU2f(user, pass);
        break;
      case 'webauthn':
        onLoginWithWebauthn(user, pass);
        break;
      default:
        onLogin(user, pass, token);
    }
  }

  return (
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
              onChange={opt => onSetMfaOption(opt as MfaOption)}
              mr={3}
              mb={0}
              isDisabled={isProcessing}
            />
            {mfaType.value === 'otp' && (
              <FieldInput
                width="50%"
                label="Authenticator code"
                rule={requiredToken}
                autoComplete="off"
                value={token}
                onChange={e => setToken(e.target.value)}
                type="tel"
                placeholder="123 456"
                mb={0}
              />
            )}
            {mfaType.value === 'u2f' && isProcessing && (
              <Text typography="body2" mb={1}>
                Insert your hardware key and press the button on the key.
              </Text>
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
        onClick={e => onLoginClick(e)}
        disabled={isProcessing}
      >
        Sign In
      </ButtonPrimary>
    </FlexBordered>
  );
};

const LocalLogin = ({
  title,
  ssoEnabled,
  webauthnEnabled,
  isRecoveryEnabled,
  onRecover,
  auth2faType,
  authProviders,
  preferredMfaType,
  attempt,
  clearAttempt,
  onLogin,
  onLoginWithU2f,
  onLoginWithWebauthn,
  onLoginWithPasswordless,
  onLoginWithSso,
}) => {
  const { isFailed, isProcessing, message } = attempt;
  const otherOptionsAvailable = ssoEnabled || webauthnEnabled;
  const [wantOtherOptions, setWantOtherOptions] = useState(false);

  if (wantOtherOptions) {
    return (
      <Validation>
        <CardLogin title={title}>
          {isFailed && (
            <Alerts.Danger m={5} mb={0}>
              {message}
            </Alerts.Danger>
          )}
          {webauthnEnabled && (
            <Box px={5} pb={5} pt={3}>
              <PwdlessField onLoginWithPasswordless={onLoginWithPasswordless} />
            </Box>
          )}
          {webauthnEnabled && ssoEnabled && (
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
          )}
          {ssoEnabled && (
            <SsoList
              authProviders={authProviders}
              isProcessing={isProcessing}
              onLoginWithSso={onLoginWithSso}
            />
          )}
          <Box pb={3}>
            <OtherOptionBtn onClick={() => setWantOtherOptions(false)}>
              Sign-in with Username and Password
            </OtherOptionBtn>
          </Box>
        </CardLogin>
      </Validation>
    );
  }

  return (
    <Validation>
      <CardLogin title={title}>
        {isFailed && (
          <Alerts.Danger m={5} mb={0}>
            {message}
          </Alerts.Danger>
        )}
        <LocalLoginForm
          isRecoveryEnabled={isRecoveryEnabled}
          onRecover={onRecover}
          auth2faType={auth2faType}
          preferredMfaType={preferredMfaType}
          isProcessing={isProcessing}
          onLogin={onLogin}
          onLoginWithU2f={onLoginWithU2f}
          onLoginWithWebauthn={onLoginWithWebauthn}
          clearAttempt={clearAttempt}
        />
        {otherOptionsAvailable && (
          <Box pb={3} mt={-1}>
            <OtherOptionBtn onClick={() => setWantOtherOptions(true)}>
              Other sign-in options
            </OtherOptionBtn>
          </Box>
        )}
      </CardLogin>
    </Validation>
  );
};

const PwdlessLogin = ({
  title,
  ssoEnabled,
  webauthnEnabled,
  isLocalAuthEnabled,
  isRecoveryEnabled,
  onRecover,
  auth2faType,
  authProviders,
  preferredMfaType,
  attempt,
  clearAttempt,
  onLogin,
  onLoginWithU2f,
  onLoginWithWebauthn,
  onLoginWithPasswordless,
  onLoginWithSso,
}) => {
  const { isFailed, isProcessing, message } = attempt;
  const otherOptionsAvailable = ssoEnabled || webauthnEnabled;
  const [wantOtherOptions, setWantOtherOptions] = useState(false);

  if (wantOtherOptions) {
    return (
      <Validation>
        <CardLogin title={title}>
          {isFailed && (
            <Alerts.Danger m={5} mb={0}>
              {message}
            </Alerts.Danger>
          )}
          {isLocalAuthEnabled && (
            <LocalLoginForm
              isRecoveryEnabled={isRecoveryEnabled}
              onRecover={onRecover}
              auth2faType={auth2faType}
              preferredMfaType={preferredMfaType}
              isProcessing={isProcessing}
              onLogin={onLogin}
              onLoginWithU2f={onLoginWithU2f}
              onLoginWithWebauthn={onLoginWithWebauthn}
              clearAttempt={clearAttempt}
            />
          )}
          {isLocalAuthEnabled && ssoEnabled && (
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
          )}
          {ssoEnabled && (
            <SsoList
              authProviders={authProviders}
              isProcessing={isProcessing}
              onLoginWithSso={onLoginWithSso}
            />
          )}
          <Box pb={3}>
            <OtherOptionBtn onClick={() => setWantOtherOptions(false)}>
              Sign-in passwordless
            </OtherOptionBtn>
          </Box>
        </CardLogin>
      </Validation>
    );
  }

  return (
    <Validation>
      <CardLogin title={title}>
        {isFailed && (
          <Alerts.Danger m={5} mb={0}>
            {message}
          </Alerts.Danger>
        )}
        <Box px={5} pb={5} pt={3}>
          <PwdlessField onLoginWithPasswordless={onLoginWithPasswordless} />
        </Box>
        {otherOptionsAvailable && (
          <Box pb={3} mt={-1}>
            <OtherOptionBtn onClick={() => setWantOtherOptions(true)}>
              Other sign-in options
            </OtherOptionBtn>
          </Box>
        )}
      </CardLogin>
    </Validation>
  );
};

const SsoLogin = ({
  title,
  ssoEnabled,
  webauthnEnabled,
  isLocalAuthEnabled,
  isRecoveryEnabled,
  onRecover,
  auth2faType,
  authProviders,
  preferredMfaType,
  attempt,
  clearAttempt,
  onLogin,
  onLoginWithU2f,
  onLoginWithWebauthn,
  onLoginWithPasswordless,
  onLoginWithSso,
}) => {
  const { isFailed, isProcessing, message } = attempt;
  const [wantOtherOptions, setWantOtherOptions] = useState(false);

  if (wantOtherOptions) {
    return (
      <Validation>
        <CardLogin title={title}>
          {isFailed && (
            <Alerts.Danger m={5} mb={0}>
              {message}
            </Alerts.Danger>
          )}
          {webauthnEnabled && (
            <Box px={5} pb={5} pt={3}>
              <PwdlessField onLoginWithPasswordless={onLoginWithPasswordless} />
            </Box>
          )}
          {webauthnEnabled && ssoEnabled && isLocalAuthEnabled && (
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
          )}
          {ssoEnabled && (
            <LocalLoginForm
              isRecoveryEnabled={isRecoveryEnabled}
              onRecover={onRecover}
              auth2faType={auth2faType}
              preferredMfaType={preferredMfaType}
              isProcessing={isProcessing}
              onLogin={onLogin}
              onLoginWithU2f={onLoginWithU2f}
              onLoginWithWebauthn={onLoginWithWebauthn}
              clearAttempt={clearAttempt}
            />
          )}
          <Box pb={3}>
            <OtherOptionBtn onClick={() => setWantOtherOptions(false)}>
              Sign-in with SSO
            </OtherOptionBtn>
          </Box>
        </CardLogin>
      </Validation>
    );
  }

  return (
    <Validation>
      <CardLogin title={title}>
        {isFailed && (
          <Alerts.Danger m={5} mb={0}>
            {message}
          </Alerts.Danger>
        )}
        {ssoEnabled && (
          <SsoList
            authProviders={authProviders}
            isProcessing={isProcessing}
            onLoginWithSso={onLoginWithSso}
          />
        )}
        {!ssoEnabled && isLocalAuthEnabled && (
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
        )}
        {isLocalAuthEnabled && (
          <Box pb={3} mt={-1}>
            <OtherOptionBtn onClick={() => setWantOtherOptions(true)}>
              Other sign-in options
            </OtherOptionBtn>
          </Box>
        )}
      </CardLogin>
    </Validation>
  );
};

const PwdlessBtn = styled(Box)`
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.action.active};
  }
`;

const OtherOptionBtn = styled(ButtonLink)`
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

export type Props = {
  title?: string;
  isLocalAuthEnabled?: boolean;
  authProviders?: AuthProvider[];
  auth2faType?: Auth2faType;
  preferredMfaType?: PreferredMfaType;
  attempt: ReturnType<typeof useAttempt>[0];
  isRecoveryEnabled?: boolean;
  authType: AuthType;
  onRecover?: (isRecoverPassword: boolean) => void;
  clearAttempt?: () => void;
  onLoginWithSso(provider: AuthProvider): void;
  onLoginWithU2f(username: string, password: string): void;
  onLoginWithWebauthn(username: string, password: string): void;
  onLoginWithPasswordless(): void;
  onLogin(username: string, password: string, token: string): void;
};
