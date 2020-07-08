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

export const AuthProviderTypeEnum = {
  OIDC: 'oidc' as 'oidc',
  SAML: 'saml' as 'saml',
  GITHUB: 'github' as 'github',
};

export const RestRespCodeEnum = {
  FORBIDDEN: 403 as 403,
};

export const Auth2faTypeEnum = {
  UTF: 'u2f' as 'u2f',
  OTP: 'otp' as 'otp',
  DISABLED: 'off' as 'off',
};

export const AuthTypeEnum = {
  LOCAL: 'local' as 'local',
  SSO: 'sso' as 'sso',
};

export function isU2f(auth2faType: Auth2faTypeEnum) {
  return auth2faType === Auth2faTypeEnum.UTF;
}
export function isOtp(auth2fType: Auth2faTypeEnum) {
  return auth2fType === Auth2faTypeEnum.OTP;
}

export type AuthProviderTypeEnum = typeof AuthProviderTypeEnum[keyof typeof AuthProviderTypeEnum];
export type RestRespCodeEnum = typeof RestRespCodeEnum[keyof typeof RestRespCodeEnum];
export type Auth2faTypeEnum = typeof Auth2faTypeEnum[keyof typeof Auth2faTypeEnum];
export type AuthTypeEnum = typeof AuthTypeEnum[keyof typeof AuthTypeEnum];
