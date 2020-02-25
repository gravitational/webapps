/**
 * Copyright 2020 Gravitational, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import FormLogin from './FormLogin';
import { render, fireEvent } from 'design/utils/testing';
import theme from '../../../design/src/theme';
import { Auth2faTypeEnum, AuthProviderTypeEnum } from '../../services/enums';
import { TypeEnum as Type } from '../ButtonSso/';

const ssoProvider = [
  { type: AuthProviderTypeEnum.OIDC, url: '', name: Type.GITHUB },
  { type: AuthProviderTypeEnum.OIDC, url: '', name: Type.GOOGLE },
];

test.each`
  auth2faType                 | isProcessing | authProviders  | expTexts
  ${Auth2faTypeEnum.DISABLED} | ${false}     | ${ssoProvider} | ${[Type.GITHUB, Type.GOOGLE]}
  ${Auth2faTypeEnum.DISABLED} | ${false}     | ${[]}          | ${[]}
  ${Auth2faTypeEnum.OTP}      | ${false}     | ${[]}          | ${['two factor token', 'download google authenticator']}
  ${Auth2faTypeEnum.UTF}      | ${true}      | ${[]}          | ${['insert your U2F key and press the button on the key']}
`(
  'test render and error states w/ auth2faType: $auth2faType, w/ authProviders: $authProviders',
  ({ auth2faType, isProcessing, authProviders, expTexts }) => {
    const onLogin = jest.fn();
    const onLoginWithSso = jest.fn();
    const onLoginWithU2f = jest.fn();
    const errorColor = theme.colors.error.main;

    const { getByText } = render(
      <FormLogin
        title="titleText"
        auth2faType={auth2faType}
        authProviders={authProviders}
        attempt={{ isFailed: false, isProcessing, message: '' }}
        onLogin={onLogin}
        onLoginWithSso={onLoginWithSso}
        onLoginWithU2f={onLoginWithU2f}
      />
    );

    // test basics are rendered
    expect(getByText('titleText')).toBeInTheDocument();
    expect(getByText(/username/i)).toBeInTheDocument();
    expect(getByText(/password/i)).toBeInTheDocument();

    // test prop specifics are rendered
    expTexts.forEach(text => {
      const re = new RegExp(text, 'i');
      expect(getByText(re)).toBeInTheDocument();
    });

    if (isProcessing) {
      expect(getByText(/login/i)).toBeDisabled();
      return;
    }

    // test input element validation error states
    fireEvent.click(getByText(/login/i));

    if (auth2faType == Auth2faTypeEnum.OTP) {
      const tokenLabel = getByText(/token is required/i);
      expect(tokenLabel).toHaveStyle({ color: errorColor });
      expect(tokenLabel.nextElementSibling).toHaveStyle({
        'border-color': errorColor,
      });
    }

    let usernameLabel = getByText(/username is required/i);
    expect(usernameLabel).toHaveStyle({ color: errorColor });
    expect(usernameLabel.nextElementSibling).toHaveStyle({
      'border-color': errorColor,
    });

    const passwordLabel = getByText(/password is required/i);
    expect(passwordLabel).toHaveStyle({ color: errorColor });
    expect(passwordLabel.nextElementSibling).toHaveStyle({
      'border-color': errorColor,
    });

    // test changing input value removes error state
    fireEvent.change(usernameLabel.nextElementSibling, {
      target: { value: 'a' },
    });
    expect(getByText(/username/i)).toHaveStyle({ color: theme.colors.light });

    // test deleting input value triggers back error state
    fireEvent.change(getByText(/username/i).nextElementSibling, {
      target: { value: '' },
    });
    usernameLabel = getByText(/username is required/i);
    expect(usernameLabel).toHaveStyle({ color: errorColor });
    expect(usernameLabel.nextElementSibling).toHaveStyle({
      'border-color': errorColor,
    });
  }
);

test.each`
  auth2faType                 | authProviders  | testPurpose
  ${Auth2faTypeEnum.DISABLED} | ${ssoProvider} | ${'onLoginWithSso'}
  ${Auth2faTypeEnum.DISABLED} | ${[]}          | ${'onLogin'}
  ${Auth2faTypeEnum.OTP}      | ${[]}          | ${'onLogin'}
  ${Auth2faTypeEnum.UTF}      | ${[]}          | ${'onLoginWithU2f'}
`(
  'test prop $testPurpose is respected with auth2faType: $auth2faType',
  ({ auth2faType, authProviders }) => {
    const onLogin = jest.fn();
    const onLoginWithSso = jest.fn();
    const onLoginWithU2f = jest.fn();

    const { getByText } = render(
      <FormLogin
        auth2faType={auth2faType}
        authProviders={authProviders}
        attempt={{ isFailed: false, isProcessing: false, message: '' }}
        onLogin={onLogin}
        onLoginWithSso={onLoginWithSso}
        onLoginWithU2f={onLoginWithU2f}
      />
    );

    // fill out form
    const usernameInput = getByText(/username/i).nextElementSibling;
    fireEvent.change(usernameInput, { target: { value: 'a' } });

    const passwordInput = getByText(/password/i).nextElementSibling;
    fireEvent.change(passwordInput, { target: { value: 'a' } });

    if (auth2faType == Auth2faTypeEnum.OTP) {
      const tokenInput = getByText(/two factor token/i).nextElementSibling;
      fireEvent.change(tokenInput, { target: { value: 'a' } });
    }

    // test login clicks calls the correct cb's
    if (authProviders.length > 0) {
      const re = new RegExp(Type.GITHUB, 'i');
      fireEvent.click(getByText(re));
      expect(onLoginWithSso).toHaveBeenCalledTimes(1);
    }

    fireEvent.click(getByText(/login/i));

    if (auth2faType == Auth2faTypeEnum.UTF) {
      expect(onLoginWithU2f).toHaveBeenCalledTimes(1);
      return;
    }

    expect(onLogin).toHaveBeenCalledTimes(1);
  }
);
