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
import Login from './Login';
import { render, fireEvent, wait } from 'design/utils/testing';
import mockAuth from '../../services/auth/auth';
import { Auth2faTypeEnum, AuthProviderTypeEnum } from '../../services/enums';
import mockCfg from 'teleport/config';
import mockHistory from '../../services/history';

jest.mock('../../services/history');
jest.mock('teleport/config');
jest.mock('../../services/auth/auth', () => {
  return {
    login: jest.fn().mockResolvedValue(),
    loginWithU2f: jest.fn().mockResolvedValue(),
    onLoginWithSso: jest.fn().mockResolvedValue(),
  };
});

test('basic login', async () => {
  const { container, getByPlaceholderText, getByText } = render(<Login />);

  // test rendering of logo and title
  expect(container.querySelector('img')).toBeInTheDocument();
  expect(getByText(/sign into teleport/i)).toBeInTheDocument();

  // test validation errors
  fireEvent.click(getByText(/login/i));
  expect(mockAuth.login).not.toHaveBeenCalled();
  expect(mockAuth.loginWithU2f).not.toHaveBeenCalled();

  // fill form
  const username = getByPlaceholderText(/user name/i);
  const password = getByPlaceholderText(/password/i);
  fireEvent.change(username, { target: { value: 'username' } });
  fireEvent.change(password, { target: { value: '123' } });

  // test login pathways
  await wait(() => fireEvent.click(getByText(/login/i)));
  expect(mockAuth.login).toHaveBeenCalledWith('username', '123', '');
  expect(mockHistory.ensureBaseUrl).toHaveBeenCalledTimes(1);
  expect(mockHistory.push).toHaveBeenCalledTimes(1);

  jest.clearAllMocks();
});

test('login with U2F', async () => {
  mockCfg.getAuth2faType.mockImplementation(() => Auth2faTypeEnum.UTF);

  const { container, getByPlaceholderText, getByText } = render(<Login />);

  // test rendering of logo and title
  expect(container.querySelector('img')).toBeInTheDocument();
  expect(getByText(/sign into teleport/i)).toBeInTheDocument();

  // test validation errors
  fireEvent.click(getByText(/login/i));
  expect(mockAuth.loginWithU2f).not.toHaveBeenCalled();
  expect(mockAuth.login).not.toHaveBeenCalled();

  // fill form
  const username = getByPlaceholderText(/user name/i);
  const password = getByPlaceholderText(/password/i);
  fireEvent.change(username, { target: { value: 'username' } });
  fireEvent.change(password, { target: { value: '123' } });

  // test login pathways
  await wait(() => fireEvent.click(getByText(/login/i)));
  expect(mockAuth.loginWithU2f).toHaveBeenCalledWith('username', '123');
  expect(mockHistory.ensureBaseUrl).toHaveBeenCalledTimes(1);
  expect(mockHistory.push).toHaveBeenCalledTimes(1);

  jest.clearAllMocks();
});

test('login with SSO', async () => {
  mockCfg.getAuth2faType.mockImplementation(() => Auth2faTypeEnum.OTP);
  mockCfg.getAuthProviders.mockImplementation(() => [
    {
      type: AuthProviderTypeEnum.OIDC,
      url: '',
      name: AuthProviderTypeEnum.GITHUB,
    },
  ]);

  const { container, getByText } = render(<Login />);

  // test rendering of logo and title
  expect(container.querySelector('img')).toBeInTheDocument();
  expect(getByText(/sign into teleport/i)).toBeInTheDocument();

  // test validation errors
  fireEvent.click(getByText(/login/i));
  expect(mockAuth.loginWithU2f).not.toHaveBeenCalled();
  expect(mockAuth.login).not.toHaveBeenCalled();

  // test login pathways
  fireEvent.click(getByText(AuthProviderTypeEnum.GITHUB));
  expect(mockAuth.login).not.toHaveBeenCalled();
  expect(mockAuth.loginWithU2f).not.toHaveBeenCalled();
  expect(mockCfg.getSsoUrl).toHaveBeenCalledWith(
    '',
    AuthProviderTypeEnum.GITHUB,
    undefined
  );
  expect(mockHistory.ensureBaseUrl).toHaveBeenCalledTimes(1);
  expect(mockHistory.push).toHaveBeenCalledTimes(1);

  jest.clearAllMocks();
});
