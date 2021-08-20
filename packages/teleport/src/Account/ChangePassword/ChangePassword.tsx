import React from 'react';
import { Text } from 'design';
import PasswordForm from 'shared/components/FormPassword';
import useChangePassword, { State } from './useChangePassword';

export default function Container() {
  const state = useChangePassword();
  return <ChangePassword {...state} />;
}

export function ChangePassword({
  changePassword,
  changePasswordWithU2f,
  changePasswordWithWebauthn,
  preferredMfaType,
  auth2faType,
}: State) {
  return (
    <>
      <Text typography="h3" mb={3}>
        Change Password
      </Text>
      <PasswordForm
        auth2faType={auth2faType}
        preferredMfaType={preferredMfaType}
        onChangePass={changePassword}
        onChangePassWithU2f={changePasswordWithU2f}
        onChangePassWithWebauthn={changePasswordWithWebauthn}
      />
    </>
  );
}
