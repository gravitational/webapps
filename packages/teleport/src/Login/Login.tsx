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
import LoginForm from 'shared/components/FormLogin';
import Logo from 'teleport/components/LogoHero';
import useLogin, { State } from './useLogin';

const logoSrc = require('design/assets/images/teleport-medallion.svg');

export default function Container() {
  const state = useLogin();
  return <Login {...state} />;
}

export function Login({
  attempt,
  onLogin,
  onLoginWithU2f,
  onLoginWithSso,
  authProviders,
  auth2faType,
  isLocalAuthEnabled,
  clearAttempt,
}: State) {
  return (
    <>
      <Logo src={logoSrc} />
      <LoginForm
        title={'Sign into Teleport'}
        authProviders={authProviders}
        auth2faType={auth2faType}
        isLocalAuthEnabled={isLocalAuthEnabled}
        onLoginWithSso={onLoginWithSso}
        onLoginWithU2f={onLoginWithU2f}
        onLogin={onLogin}
        attempt={attempt}
        clearAttempt={clearAttempt}
      />
    </>
  );
}
