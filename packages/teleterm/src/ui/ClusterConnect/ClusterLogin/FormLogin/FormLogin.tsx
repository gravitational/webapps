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
import {
  Text,
  Flex,
  ButtonLink,
  ButtonPrimary,
  ButtonText,
  Box,
  Card,
} from 'design';
import * as Alerts from 'design/Alert';
import { Key, ArrowForward } from 'design/Icon';
import Validation, { Validator } from 'shared/components/Validation';
import FieldInput from 'shared/components/FieldInput';
import FieldSelect from 'shared/components/FieldSelect';
import {
  requiredToken,
  requiredField,
} from 'shared/components/Validation/rules';
import { Attempt } from 'shared/hooks/useAsync';
import createMfaOptions, { MfaOption } from 'shared/utils/createMfaOptions';
import * as types from 'teleterm/ui/services/clusters/types';
import SSOButtonList from './SsoButtons';
import PromptHardwareKey from './PromptHardwareKey';
import PromptHardwarePin from './PromptHardwarePin';
import PromptSsoStatus from './PromptSsoStatus';
import { PromptName } from './PromptName';

import Slider, { SliderProps } from 'teleport/components/StepSlider'; // TODO move to design

export default function LoginForm(props: Props) {
  const {
    title,
    loginAttempt,
    preferredMfa,
    onAbort,
    onLogin,
    onLoginWithSso,
    authProviders,
    auth2faType,
    isLocalAuthEnabled = true,
    shouldPromptSsoStatus,
    shouldPromptHardwareKey,
    shouldPromptHardwareKeyAgain,
    shouldPromptHardwarePin,
    setPromptName,
    shouldPromptName,
    pinCallback,
    onLoginWithPwdless,
  } = props;

  if (shouldPromptName) {
    return (
      <PromptName onCancel={onAbort} onLoginWithPwdless={onLoginWithPwdless} />
    );
  }
  if (shouldPromptHardwarePin) {
    return <PromptHardwarePin onCancel={onAbort} pinCallback={pinCallback} />;
  }

  if (shouldPromptHardwareKey) {
    return <PromptHardwareKey onCancel={onAbort} />;
  }

  if (shouldPromptHardwareKeyAgain) {
    return <PromptHardwareKey onCancel={onAbort} retap={true} />;
  }

  if (shouldPromptSsoStatus) {
    return <PromptSsoStatus onCancel={onAbort} />;
  }

  const ssoEnabled = authProviders?.length > 0;

  // If local auth was not enabled, disregard any primary auth type config
  // and display sso providers if any.
  if (!isLocalAuthEnabled && ssoEnabled) {
    return (
      <FlexBordered>
        <Text typography="h3" pt={5} textAlign="center" color="light">
          {title}
        </Text>
        {loginAttempt.status === 'error' && (
          <Alerts.Danger m={5} mb={0}>
            {loginAttempt.statusText}
          </Alerts.Danger>
        )}
        <SsoList {...props} />
      </FlexBordered>
    );
  }

  if (!isLocalAuthEnabled) {
    return (
      <FlexBordered>
        <Text typography="h3" pt={5} textAlign="center" color="light">
          {title}
        </Text>
        <Alerts.Danger my={5}>Login has not been enabled</Alerts.Danger>
        <Text mb={2} typography="paragraph2" width="100%">
          The ability to login has not been enabled. Please contact your system
          administrator for more information.
        </Text>
      </FlexBordered>
    );
  }

  // Everything below requires local auth to be enabled.
  return (
    <FlexBordered>
      {loginAttempt.status === 'error' && (
        <Alerts.Danger m={5} mb={0}>
          {loginAttempt.statusText}
        </Alerts.Danger>
      )}
      <Slider<typeof loginViews>
        flows={loginViews}
        currFlow={'default'}
        {...props}
      />
    </FlexBordered>
  );
}

const FlexBordered = props => (
  <Flex justifyContent="center" flexDirection="column" {...props} />
);

const SsoList = ({ loginAttempt, authProviders, onLoginWithSso }: Props) => {
  return (
    <Box>
      <SSOButtonList
        prefixText="Login with"
        isDisabled={loginAttempt.status === 'processing'}
        providers={authProviders}
        onClick={onLoginWithSso}
      />
    </Box>
  );
};

const Passwordless = ({
  onLoginWithPwdless,
  loginAttempt,
  setPromptName,
}: Props) => (
  <Box data-testid="passwordless">
    <StyledPaswordlessBtn
      mt={3}
      py={2}
      px={3}
      border={1}
      borderRadius={2}
      borderColor="text.placeholder"
      width="100%"
      onClick={() => setPromptName(true)}
      disabled={loginAttempt.status === 'processing'}
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Key mr={3} fontSize={16} />
          <Box>
            <Text typography="h6">Passwordless</Text>
            <Text fontSize={1} color="text.secondary">
              Follow the prompts
            </Text>
          </Box>
        </Flex>
        <ArrowForward fontSize={16} />
      </Flex>
    </StyledPaswordlessBtn>
  </Box>
);

const LocalForm = ({
  auth2faType,
  loginAttempt,
  onLogin,
  clearLoginAttempt,
  autoFocusOnTransitionEnd = false,
}: Props & { autoFocusOnTransitionEnd?: boolean }) => {
  const [pass, setPass] = useState('');
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');

  const mfaOptions = useMemo(
    () => createMfaOptions({ auth2faType: auth2faType }),
    []
  );

  const [mfaType, setMfaType] = useState(mfaOptions[0]);

  function onSetMfaOption(option: MfaOption, validator: Validator) {
    setToken('');
    // clearLoginAttempt();
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

    onLogin(user, pass, token, mfaType?.value);
  }

  return (
    <Validation>
      {({ validator }) => (
        <Box>
          <FieldInput
            rule={requiredField('Username is required')}
            label="Username"
            autoFocus
            transitionPropertyName={autoFocusOnTransitionEnd ? 'height' : ''}
            value={user}
            onChange={e => setUser(e.target.value)}
            placeholder="Username"
          />
          <Box mb={4}>
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
          </Box>
          {auth2faType !== 'off' && (
            <Box mb={4}>
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
                  isDisabled={loginAttempt.status === 'processing'}
                  menuIsOpen={true}
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
            </Box>
          )}
          <ButtonPrimary
            width="100%"
            mt={3}
            type="submit"
            size="large"
            onClick={e => onLoginClick(e, validator)}
            disabled={loginAttempt.status === 'processing'}
          >
            Sign In
          </ButtonPrimary>
        </Box>
      )}
    </Validation>
  );
};

const Primary = ({
  next,
  refCallback,
  willTransition,
  ...otherProps
}: Props & SliderProps<'default'>) => {
  const {
    loginAttempt,
    isPasswordlessEnabled,
    authType,
    localConnectorName,
    authProviders,
  } = otherProps;
  const ssoEnabled = authProviders?.length > 0;
  let otherOptionsAvailable = true;
  let $primary;

  if (localConnectorName === 'passwordless') {
    $primary = <Passwordless {...otherProps} />;
  }

  if (localConnectorName !== 'passwordless' && authType === 'local') {
    otherOptionsAvailable = isPasswordlessEnabled || ssoEnabled;
    $primary = (
      <LocalForm {...otherProps} autoFocusOnTransitionEnd={willTransition} />
    );
  }

  if (
    (localConnectorName !== 'passwordless' && authType === 'github') ||
    authType === 'saml' ||
    authType === 'oidc'
  ) {
    $primary = <SsoList {...otherProps} />;
  }

  return (
    <Box ref={refCallback}>
      {$primary}
      {otherOptionsAvailable && (
        <Box mt={3} textAlign="center">
          <ButtonText
            onClick={e => {
              e.preventDefault();
              // otherProps.clearLoginAttempt();

              next();
            }}
            disabled={loginAttempt.status === 'processing'}
          >
            Other sign-in options
          </ButtonText>
        </Box>
      )}
    </Box>
  );
};

const Secondary = ({
  prev,
  refCallback,
  ...otherProps
}: Props & SliderProps<'default'>) => {
  const ssoEnabled = otherProps.authProviders?.length > 0;
  const {
    authType,
    localConnectorName,
    isPasswordlessEnabled,
    clearLoginAttempt,
    loginAttempt,
  } = otherProps;

  const $local = <LocalForm {...otherProps} autoFocusOnTransitionEnd={true} />;
  const $sso = <SsoList {...otherProps} />;
  const $passwordless = <Passwordless {...otherProps} />;

  let $secondary;

  if (localConnectorName === 'passwordless') {
    $secondary = (
      <>
        {ssoEnabled && (
          <>
            {$sso}
            <Divider />
          </>
        )}
        {$local}
      </>
    );
  }

  if (localConnectorName !== 'passwordless' && authType === 'local') {
    $secondary = (
      <>
        {isPasswordlessEnabled && $passwordless}
        {isPasswordlessEnabled && ssoEnabled && <Divider />}
        {ssoEnabled && $sso}
      </>
    );
  }

  if (
    (localConnectorName !== 'passwordless' && authType === 'github') ||
    authType === 'saml' ||
    authType === 'oidc'
  ) {
    $secondary = (
      <>
        {isPasswordlessEnabled && (
          <>
            {$passwordless}
            <Divider />
          </>
        )}
        {$local}
      </>
    );
  }

  return (
    <Box ref={refCallback}>
      {$secondary}
      <Box mt={3} textAlign="center">
        <ButtonText
          onClick={e => {
            e.preventDefault();
            // otherProps.clearLoginAttempt();

            prev();
          }}
          disabled={loginAttempt.status === 'processing'}
        >
          Back
        </ButtonText>
      </Box>
    </Box>
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
    mb={2}
  >
    <StyledOr>Or</StyledOr>
  </Flex>
);

const StyledPaswordlessBtn = styled(Box)`
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.action.active};
  }

  &[disabled] {
    pointer-events: none;
    opacity: 0.7;
  }
`;

const StyledOr = styled.div`
  background: ${props => props.theme.colors.primary.main};
  display: flex;
  align-items: center;
  font-size: 10px;
  height: 32px;
  width: 32px;
  justify-content: center;
  position: absolute;
  z-index: 1;
`;

const loginViews = { default: [Primary, Secondary] };

type LoginAttempt = Attempt<void>;

type Props = {
  shouldPromptSsoStatus: boolean;
  shouldPromptHardwareKey: boolean;
  shouldPromptHardwareKeyAgain: boolean;
  shouldPromptHardwarePin: boolean;
  loginAttempt: LoginAttempt;
  clearLoginAttempt(): void;
  title?: string;
  preferredMfa: types.PreferredMfaType;
  auth2faType?: types.Auth2faType;
  authProviders: types.AuthProvider[];
  isLocalAuthEnabled?: boolean;
  isPasswordlessEnabled: boolean;
  localConnectorName: string;
  authType: types.AuthType;
  onAbort(): void;
  onLoginWithSso(provider: types.AuthProvider): void;
  onLoginWithPwdless(username: string): void;
  onLogin(
    username: string,
    password: string,
    token: string,
    auth2fa: types.Auth2faType
  ): void;
  pinCallback(text: string): void;
};
