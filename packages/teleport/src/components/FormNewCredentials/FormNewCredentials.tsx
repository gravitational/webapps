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
import { AuthType, Auth2faType, PreferredMfaType } from 'shared/services';
import { Attempt } from 'shared/hooks/useAttemptNext';

import NewPassword from './NewPassword';
import NewMfaDevice from './NewMfaDevice';
import NewPwdlessDevice from './NewPwdlessDevice';
import RegisterSuccess from './RegisterSuccess';

export default function FormNewCredentials(props: Props) {
  const {
    auth2faType,
    primaryAuthType,
    isPwdlessEnabled,
    onSubmitWithWebauthn,
    onSubmit,
    attempt,
    clearSubmitAttempt,
    user,
    qr,
    title = '',
    submitBtnText = 'Submit',
  } = props;
  const [showAddDevice, setShowAddDevice] = useState(false);
  const [password, setPassword] = useState('');
  const [authnOption, setAuthnOption] = useState<'pwdless' | 'local'>(() => {
    if (primaryAuthType === 'pwdless') {
      return primaryAuthType;
    }
    return 'local';
  });
  const mfaEnabled = auth2faType !== 'off';

  function handleOnSubmit(deviceName: string, otp: string) {
    if (mfaEnabled && !showAddDevice) {
      setShowAddDevice(true);
      return;
    }

    onSubmit(password, otp);
  }

  function handleOnSubmitWithWebauthn() {
    onSubmitWithWebauthn(password);
  }

  function onPasswordless() {
    setAuthnOption('pwdless');
    clearSubmitAttempt();
  }

  function onPassword() {
    setAuthnOption('local');
    setShowAddDevice(false);
    clearSubmitAttempt();
  }

  function OnPassword() {
    setAuthnOption('local');
    setShowAddDevice(false);
    clearSubmitAttempt();
  }

  if (authnOption === 'pwdless') {
    return (
      <NewPwdlessDevice
        attempt={attempt}
        onPassword={OnPassword}
        onSubmit={onSubmitWithWebauthn}
      />
    );
  }

  if (showAddDevice) {
    return (
      <NewMfaDevice
        qr={qr}
        attempt={attempt}
        auth2faType={auth2faType}
        onSubmitWithWebauthn={handleOnSubmitWithWebauthn}
        onSubmit={handleOnSubmit}
        onPassword={onPassword}
      />
    );
  }

  // Default is to render password form.
  return (
    <NewPassword
      attempt={attempt}
      username={user}
      mfaEnabled={mfaEnabled}
      onSubmit={handleOnSubmit}
      onPasswordless={onPasswordless}
      password={password}
      setPassword={setPassword}
    />
  );
}

export type Props = {
  title?: string;
  submitBtnText?: string;
  user: string;
  qr: string;
  authType: AuthType;
  auth2faType: Auth2faType;
  isPwdlessEnabled: boolean;
  isPwdlessAuthnPreferred: boolean;
  preferredMfaType: PreferredMfaType;
  attempt: Attempt;
  clearSubmitAttempt: () => void;
  onSubmitWithWebauthn(password?: string): void;
  onSubmit(password: string, optToken: string): void;
};
