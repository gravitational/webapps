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
import FormLogin, { Props } from './FormLogin';

const props: Props = {
  title: 'Custom Title',
  attempt: {
    isFailed: false,
    isSuccess: false,
    isProcessing: false,
    message: '',
  },
  authProviders: [],
  onLoginWithSso: () => null,
  onLoginWithU2f: () => null,
  onLoginWithWebauthn: () => null,
  onLogin: () => null,
  clearAttempt: () => null,
  auth2faType: 'off',
  preferredMfaType: 'webauthn',
};

export default {
  title: 'Teleport/FormLogin',
};

export const Off = () => <FormLogin {...props} />;

export const Otp = () => <FormLogin {...props} auth2faType="otp" />;

export const Webauthn = () => <FormLogin {...props} auth2faType="webauthn" />;

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

export const Optional = () => <FormLogin {...props} auth2faType="optional" />;

export const Cloud = () => (
  <FormLogin
    {...props}
    title="Teleport Cloud"
    auth2faType="on"
    isRecoveryEnabled={true}
    onRecover={() => null}
  />
);

export const ServerError = () => {
  const attempt = {
    ...props.attempt,
    isFailed: true,
    message:
      'invalid credentials with looooooooooooooooooooooooooooooooong text',
  };

  return <FormLogin {...props} title="Sign in to Teleport" attempt={attempt} />;
};

// authType: local
// auth2faType: webauthn
export const LocalWithWebauthn = () => {
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
      name: 'Mission Control',
      type: 'oidc',
      url: '',
    } as const,
  ];

  return (
    <FormLogin
      {...props}
      title="Sign in to Teleport"
      authProviders={ssoProvider}
      auth2faType="webauthn"
    />
  );
};

// authType: local
// auth2faType: otp
export const LocalWithOtp = () => {
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
      name: 'Mission Control',
      type: 'oidc',
      url: '',
    } as const,
  ];

  return (
    <FormLogin
      {...props}
      title="Sign in to Teleport"
      authProviders={ssoProvider}
      auth2faType="otp"
    />
  );
};

// authType: local
// auth2faType: on
export const LocalWithOn = () => {
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
      name: 'Mission Control',
      type: 'oidc',
      url: '',
    } as const,
  ];

  return (
    <FormLogin
      {...props}
      title="Sign in to Teleport"
      authProviders={ssoProvider}
      auth2faType="on"
    />
  );
};

// authType: local
// auth2faType: optional
export const LocalWithOptional = () => {
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
      name: 'Mission Control',
      type: 'oidc',
      url: '',
    } as const,
  ];

  return (
    <FormLogin
      {...props}
      title="Sign in to Teleport"
      authProviders={ssoProvider}
      auth2faType="optional"
    />
  );
};

// authType: local
// auth2faType: off
export const LocalWithOff = () => {
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
      name: 'Mission Control',
      type: 'oidc',
      url: '',
    } as const,
  ];

  return (
    <FormLogin
      {...props}
      title="Sign in to Teleport"
      authProviders={ssoProvider}
      auth2faType="off"
    />
  );
};

// authType: pwdless
// auth2faType: webauthn
export const PwdlessWithWebauthn = () => {
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
      name: 'Mission Control',
      type: 'oidc',
      url: '',
    } as const,
  ];

  return (
    <FormLogin
      {...props}
      title="Sign in to Teleport"
      authProviders={ssoProvider}
      authType="pwdless"
      auth2faType="webauthn"
      isLocalAuthEnabled={true}
    />
  );
};

// authtype: github|oidc|saml
// 2fatype: webauthn
export const SsoWithWebauthn = () => {
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
      name: 'Mission Control',
      type: 'oidc',
      url: '',
    } as const,
  ];

  return (
    <FormLogin
      {...props}
      title="Sign in to Teleport"
      authProviders={ssoProvider}
      authType="github"
      auth2faType="webauthn"
      isLocalAuthEnabled={true}
    />
  );
};

// authtype: github|oidc|saml
// 2fatype: otp
export const SsoWithOtp = () => {
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
      name: 'Mission Control',
      type: 'oidc',
      url: '',
    } as const,
  ];

  return (
    <FormLogin
      {...props}
      title="Sign in to Teleport"
      authProviders={ssoProvider}
      authType="github"
      auth2faType="otp"
      isLocalAuthEnabled={true}
    />
  );
};

// authtype: github|oidc|saml
// 2fatype: optional
export const SsoWithOptional = () => {
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
      name: 'Mission Control',
      type: 'oidc',
      url: '',
    } as const,
  ];

  return (
    <FormLogin
      {...props}
      title="Sign in to Teleport"
      authProviders={ssoProvider}
      authType="github"
      auth2faType="optional"
      isLocalAuthEnabled={true}
    />
  );
};

// authtype: github|oidc|saml
// 2fatype: webauthn
export const SsoWithOn = () => {
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
      name: 'Mission Control',
      type: 'oidc',
      url: '',
    } as const,
  ];

  return (
    <FormLogin
      {...props}
      title="Sign in to Teleport"
      authProviders={ssoProvider}
      authType="github"
      auth2faType="on"
      isLocalAuthEnabled={true}
    />
  );
};

// authtype: github|oidc|saml
// 2fatype: off
export const SsoWithOff = () => {
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
      name: 'Mission Control',
      type: 'oidc',
      url: '',
    } as const,
  ];

  return (
    <FormLogin
      {...props}
      title="Sign in to Teleport"
      authProviders={ssoProvider}
      authType="github"
      auth2faType="off"
      isLocalAuthEnabled={true}
    />
  );
};

// authtype: github|oidc|saml
// 2fatype: webauthn
export const SsoWithLocalDisabled = () => {
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
      name: 'Mission Control Washington Apple',
      type: 'oidc',
      url: '',
    } as const,
  ];

  return (
    <FormLogin
      {...props}
      title="Sign in to Teleport"
      authProviders={ssoProvider}
      authType="github"
      auth2faType="webauthn"
      isLocalAuthEnabled={false}
    />
  );
};

// authtype: github|oidc|saml
// 2fatype: webauthn
// localEnabled: false
export const SsoWithLocalDisabledAndNoProviders = () => {
  return (
    <FormLogin
      {...props}
      title="Sign in to Teleport"
      authProviders={[]}
      authType="github"
      auth2faType="webauthn"
      isLocalAuthEnabled={false}
    />
  );
};

// authType: github
// 2fatype: webauthn
export const SsoWithLocalAndNoProviders = () => {
  return (
    <FormLogin
      {...props}
      title="Sign in to Teleport"
      authProviders={[]}
      authType="github"
      auth2faType="webauthn"
      isLocalAuthEnabled={true}
    />
  );
};

// authType: github
// 2fatype: off
export const SsoWithLocalWith2faOffAndNoProviders = () => {
  return (
    <FormLogin
      {...props}
      title="Sign in to Teleport"
      authProviders={[]}
      authType="github"
      auth2faType="off"
      isLocalAuthEnabled={true}
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
      title="Sign in to Teleport"
      authType="pwdless"
      isLocalAuthEnabled={true}
      auth2faType="webauthn"
      authProviders={ssoProvider}
    />
  );
};

export const LocalAuthDisabledNoSSO = () => (
  <FormLogin {...props} title="Welcome!" isLocalAuthEnabled={false} />
);
