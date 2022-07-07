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
import { Text, Flex, ButtonPrimary, ButtonText, Box } from 'design';
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
import PromptSsoStatus from './PromptSsoStatus';
import { PromptWebauthn } from './PromptWebauthn';

import Slider, { SliderProps } from 'teleport/components/StepSlider'; // TODO move to design
import { PrimaryAuthType } from 'shared/services';

export default function LoginForm(props: Props) {
  const {
    title,
    loggedInUserName,
    loginAttempt,
    onAbort,
    authProviders,
    isLocalAuthEnabled = true,
    shouldPromptSsoStatus,
    webauthnPrompt,
    writePinToStream,
    onLoginWithPwdless,
    webauthnPromptProcessing,
  } = props;

  if (webauthnPrompt !== '') {
    return (
      <PromptWebauthn
        onCancel={onAbort}
        onLoginWithPwdless={onLoginWithPwdless}
        prompt={webauthnPrompt}
        writeRequestToStream={writePinToStream}
        promptProcessing={webauthnPromptProcessing}
      />
    );
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
        <Alerts.Danger m={4} mb={0}>
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

const Passwordless = ({ loginAttempt, promptUsername }: Props) => (
  <Box data-testid="passwordless">
    <StyledPaswordlessBtn
      py={2}
      px={3}
      border={1}
      borderRadius={2}
      borderColor="text.placeholder"
      width="100%"
      onClick={() => promptUsername()}
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
    clearLoginAttempt();
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
          <FieldInput
            rule={requiredField('Password is required')}
            label="Password"
            value={pass}
            onChange={e => setPass(e.target.value)}
            type="password"
            placeholder="Password"
            mb={4}
            width="100%"
          />
          {auth2faType !== 'off' && (
            <Flex alignItems="flex-end" mb={4}>
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
  const ssoEnabled = otherProps.authProviders?.length > 0;
  let otherOptionsAvailable = true;
  let $primary;

  if (otherProps.primaryAuthType === 'passwordless') {
    $primary = <Passwordless {...otherProps} />;
  }

  if (otherProps.primaryAuthType === 'local') {
    otherOptionsAvailable = otherProps.isPasswordlessEnabled || ssoEnabled;
    $primary = (
      <LocalForm {...otherProps} autoFocusOnTransitionEnd={willTransition} />
    );
  }

  if (otherProps.primaryAuthType === 'sso') {
    $primary = <SsoList {...otherProps} />;
  }

  return (
    <Box ref={refCallback} p={4}>
      {$primary}
      {otherOptionsAvailable && (
        <Box mt={3} textAlign="center">
          <ButtonText
            disabled={otherProps.loginAttempt.status === 'processing'}
            onClick={e => {
              e.preventDefault();
              otherProps.clearLoginAttempt();

              next();
            }}
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

  const $local = <LocalForm {...otherProps} autoFocusOnTransitionEnd={true} />;
  const $sso = <SsoList {...otherProps} />;
  const $passwordless = <Passwordless {...otherProps} />;

  let $secondary;

  if (otherProps.primaryAuthType === 'passwordless') {
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

  if (otherProps.primaryAuthType === 'local') {
    $secondary = (
      <>
        {otherProps.isPasswordlessEnabled && $passwordless}
        {otherProps.isPasswordlessEnabled && ssoEnabled && <Divider />}
        {ssoEnabled && $sso}
      </>
    );
  }

  if (otherProps.primaryAuthType === 'sso') {
    $secondary = (
      <>
        {otherProps.isPasswordlessEnabled && (
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
    <Box ref={refCallback} p={4}>
      {$secondary}
      <Box pt={3} textAlign="center">
        <ButtonText
          disabled={otherProps.loginAttempt.status === 'processing'}
          onClick={() => {
            otherProps.clearLoginAttempt();
            prev();
          }}
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
    mt={5}
    mb={5}
  >
    <StyledOr>Or</StyledOr>
  </Flex>
);

const StyledPaswordlessBtn = styled(ButtonText)`
  display: block;
  text-align: left;
  border: 1px solid ${({ theme }) => theme.colors.text.placeholder};

  &:hover,
  &:active,
  &:focus {
    border-color: ${({ theme }) => theme.colors.action.active};
    text-decoration: none;
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
  webauthnPrompt: types.WebauthnLoginPrompt;
  loginAttempt: LoginAttempt;
  clearLoginAttempt(): void;
  title?: string;
  preferredMfa: types.PreferredMfaType;
  auth2faType?: types.Auth2faType;
  authProviders: types.AuthProvider[];
  isLocalAuthEnabled?: boolean;
  isPasswordlessEnabled: boolean;
  localConnectorName: string;
  primaryAuthType: PrimaryAuthType;
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
  writeToStream: types.LoginPasswordlessWriteToStream;
  webauthnPromptProcessing: boolean;
};
