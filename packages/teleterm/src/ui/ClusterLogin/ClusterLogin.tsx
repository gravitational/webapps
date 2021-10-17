/*
Copyright 2019-2021 Gravitational, Inc.

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
import LoginForm from 'teleport/components/FormLogin';
import useClusterLogin, { State, Props } from './useClusterLogin';
import Dialog from 'design/Dialog';

export default function Container(props: Props) {
  const state = useClusterLogin(props);
  return <Login {...state} />;
}

export function Login({
  settingsResults,
  loginResult,
  login,
  loginWithU2f,
  loginWithSso,
}: State) {
  return (
    <Dialog
      dialogCss={() => ({
        maxWidth: '800px',
        width: '100%',
        padding: '0',
      })}
      disableEscapeKeyDown={false}
      onClose={close}
      open={true}
    >
      <LoginForm
        title={'Sign into Teleport'}
        authProviders={authProviders}
        auth2faType={auth2faType}
        isLocalAuthEnabled={isLocalAuthEnabled}
        onLoginWithSso={loginWithSso}
        onLoginWithU2f={loginWithU2f}
        onLogin={login}
        attempt={attempt}
        clearAttempt={clearAttempt}
      />
    </Dialog>
  );
}
