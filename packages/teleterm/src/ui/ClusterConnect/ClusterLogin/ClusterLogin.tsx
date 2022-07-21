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

import React from 'react';
import * as Alerts from 'design/Alert';
import { ButtonIcon, Text } from 'design';
import * as Icons from 'design/Icon';
import { AuthSettings } from 'teleterm/ui/services/clusters/types';
import { PrimaryAuthType } from 'shared/services';
import LoginForm from './FormLogin';
import useClusterLogin, { State, Props } from './useClusterLogin';
import { DialogHeader, DialogContent } from 'design/Dialog';

export function ClusterLogin(props: Props) {
  const state = useClusterLogin(props);
  return <ClusterLoginPresentation {...state} />;
}

export function ClusterLoginPresentation({
  title,
  initAttempt,
  loginAttempt,
  clearLoginAttempt,
  onLoginWithLocal,
  onLoginWithPwdless,
  onLoginWithSso,
  onCloseDialog,
  onAbort,
  loggedInUserName,
  shouldPromptSsoStatus,
  webauthnLogin,
}: State) {
  return (
    <>
      <DialogHeader px={4} pt={4} mb={0}>
        <Text typography="h4">
          Login to <b>{title}</b>
        </Text>
        <ButtonIcon ml="auto" p={3} onClick={onCloseDialog}>
          <Icons.Close fontSize="20px" />
        </ButtonIcon>
      </DialogHeader>
      <DialogContent mb={0}>
        {initAttempt.status === 'error' && (
          <Alerts.Danger>
            Unable to retrieve cluster auth preferences,{' '}
            {initAttempt.statusText}
          </Alerts.Danger>
        )}
        {initAttempt.status === 'success' && (
          <LoginForm
            title={'Sign into Teleport'}
            authProviders={initAttempt.data.authProvidersList}
            auth2faType={initAttempt.data.secondFactor}
            isLocalAuthEnabled={initAttempt.data.localAuthEnabled}
            isPasswordlessEnabled={initAttempt.data.allowPasswordless}
            localConnectorName={initAttempt.data.localConnectorName}
            primaryAuthType={getPrimaryAuthType(initAttempt.data)}
            preferredMfa={initAttempt.data.preferredMfa}
            loggedInUserName={loggedInUserName}
            onLoginWithSso={onLoginWithSso}
            onLoginWithPwdless={onLoginWithPwdless}
            onLogin={onLoginWithLocal}
            onAbort={onAbort}
            loginAttempt={loginAttempt}
            clearLoginAttempt={clearLoginAttempt}
            shouldPromptSsoStatus={shouldPromptSsoStatus}
            webauthnLogin={webauthnLogin}
          />
        )}
      </DialogContent>
    </>
  );
}

function getPrimaryAuthType(auth: AuthSettings): PrimaryAuthType {
  if (auth.localConnectorName === 'passwordless') {
    return 'passwordless';
  }

  const { authType } = auth;
  if (authType === 'github' || authType === 'oidc' || authType === 'saml') {
    return 'sso';
  }

  return 'local';
}
