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
import { Text, Flex, ButtonLink, ButtonPrimary, Box } from 'design';
import * as Alerts from 'design/Alert';
import { Auth2faType } from 'shared/services';
import Validation from 'shared/components/Validation';
import FieldInput from 'shared/components/FieldInput';
import { requiredField } from 'shared/components/Validation/rules';
import SSOButtonList from './SsoButtons';
import { Attempt } from 'teleterm/ui/useAsync';
import * as types from 'teleterm/services/tshd/types';

export default function LoginForm(props: Props) {
  const {
    title,
    loginAttempt,
    onLogin,
    onLoginWithSso,
    authProviders,
    isLocalAuthEnabled = true,
  } = props;

  const ssoEnabled = authProviders && authProviders.length > 0;
  const [pass, setPass] = useState('');
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');
  const [isExpanded, toggleExpander] = useState(
    !(isLocalAuthEnabled && ssoEnabled)
  );

  function handleLoginClick() {
    onLogin(user, pass, token);
  }

  if (!ssoEnabled && !isLocalAuthEnabled) {
    return <CardLoginEmpty title={title} />;
  }

  const isProcessing = loginAttempt.status === 'processing';

  return (
    <Validation>
      {({ validator }) => (
        <>
          {loginAttempt.status === 'error' && (
            <Alerts.Danger>{loginAttempt.statusText}</Alerts.Danger>
          )}
          {ssoEnabled && (
            <SSOButtonList
              prefixText="Login with"
              isDisabled={loginAttempt.status === 'processing'}
              providers={authProviders}
              onClick={onLoginWithSso}
            />
          )}
          {ssoEnabled && isLocalAuthEnabled && (
            <Flex
              alignItems="center"
              justifyContent="center"
              style={{ position: 'relative' }}
              flexDirection="column"
              mb={1}
            >
              <StyledOr>Or</StyledOr>
            </Flex>
          )}
          {ssoEnabled && isLocalAuthEnabled && !isExpanded && (
            <FlexBordered flexDirection="row">
              <ButtonLink autoFocus onClick={() => toggleExpander(!isExpanded)}>
                Sign in with your Username and Password
              </ButtonLink>
            </FlexBordered>
          )}
          {isLocalAuthEnabled && isExpanded && (
            <FlexBordered>
              <FieldInput
                rule={requiredField('Username is required')}
                label="Username"
                autoFocus
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
              <ButtonPrimary
                width="100%"
                mt={3}
                type="submit"
                size="large"
                onClick={() => validator.validate() && handleLoginClick()}
                disabled={isProcessing}
              >
                LOGIN
              </ButtonPrimary>
            </FlexBordered>
          )}
        </>
      )}
    </Validation>
  );
}

const FlexBordered = props => (
  <Flex justifyContent="center" flexDirection="column" {...props} />
);

const CardLoginEmpty = ({ title = '' }) => (
  <>
    <Alerts.Danger my={5}>Login has not been enabled</Alerts.Danger>
    <Text mb={2} typography="paragraph2" width="100%">
      The ability to login has not been enabled. Please contact your system
      administrator for more information.
    </Text>
  </>
);

const StyledOr = styled.div`
  background: ${props => props.theme.colors.primary.light};
  display: flex;
  align-items: center;
  font-size: 10px;
  height: 32px;
  width: 32px;
  justify-content: center;
  border-radius: 50%;
`;

export type LoginAttempt = Attempt<void>;
export type initAttempt = Attempt<types.AuthSettings>;

type Props = {
  loginAttempt: LoginAttempt;
  initAttempt: initAttempt;
  title?: string;
  isLocalAuthEnabled?: boolean;
  authProviders?: types.AuthProvider[];
  auth2faType?: Auth2faType;
  onLoginWithSso(provider: types.AuthProvider): void;
  onLogin(username: string, password: string, token: string): void;
};
