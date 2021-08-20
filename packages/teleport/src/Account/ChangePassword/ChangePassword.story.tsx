import React from 'react';
import { State } from './useChangePassword';
import { ChangePassword } from './ChangePassword';

export default {
  title: 'Teleport/Account/Change Password',
};

export const Loaded = () => <ChangePassword {...props} />;

const props: State = {
  changePassword: () => null,
  changePasswordWithU2f: () => null,
  changePasswordWithWebauthn: () => null,
  preferredMfaType: 'webauthn',
  auth2faType: 'on',
};
