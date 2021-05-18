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

import React from 'react';
import FormLogin from './FormLogin';

const props = {
  title: 'Custom Title',
  attempt: {
    isFailed: false,
    isSuccess: undefined,
    isProcessing: undefined,
    message: undefined,
  },
  authProviders: [],
  onLoginWithSso: () => null,
  onLoginWithU2f: () => null,
  onLogin: () => null,
  clearAttempt: () => null,
};

export default {
  title: 'Shared/FormLogin',
};

export const Basic = () => <FormLogin {...props} auth2faType="otp" />;

export const Multi = () => <FormLogin {...props} auth2faType="optional" />;

export const ServerError = () => {
  const attempt = {
    ...props.attempt,
    isFailed: true,
    message:
      'invalid credentials with looooooooooooooooooooooooooooooooong text',
  };

  return <FormLogin {...props} title="Welcome!" attempt={attempt} />;
};

export const SSOProviders = () => {
  const ssoProvider = [
    {
      displayName: 'github',
      name: 'github',
      type: 'oidc',
      url: '',
    } as const,
    {
      displayName: 'google',
      name: 'google',
      type: 'oidc',
      url: '',
    } as const,
    {
      displayName: 'bitbucket',
      name: 'bitbucket',
      type: 'oidc',
      url: '',
    } as const,
    {
      name: 'Mission Control',
      type: 'oidc',
      url: '',
    } as const,
    {
      displayName: 'Microsoft',
      name: 'microsoft',
      type: 'oidc',
      url: '',
    } as const,
  ];

  return <FormLogin {...props} title="Welcome!" authProviders={ssoProvider} />;
};

export const Universal2ndFactor = () => {
  const attempt = {
    ...props.attempt,
    isProcessing: true,
  };

  return (
    <FormLogin
      {...props}
      title="Welcome!"
      auth2faType="u2f"
      attempt={attempt}
    />
  );
};

export const LocalAuthDisabled = () => {
  const ssoProvider = [
    { name: 'github', type: 'oidc', url: '' } as const,
    { name: 'google', type: 'oidc', url: '' } as const,
  ];

  return (
    <FormLogin
      {...props}
      title="Welcome!"
      authProviders={ssoProvider}
      isLocalAuthEnabled={false}
    />
  );
};

export const LocalAuthDisabledNoSSO = () => (
  <FormLogin {...props} title="Welcome!" isLocalAuthEnabled={false} />
);
