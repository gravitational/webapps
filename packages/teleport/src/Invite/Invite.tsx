/*
Copyright 2021 Gravitational, Inc.

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
import { useParams } from 'react-router';
import cfg from 'teleport/config';
import { Route, Switch } from 'teleport/components/Router';
import InviteForm, { Expired } from 'teleport/components/FormInvite';
import LogoHero from 'teleport/components/LogoHero';
import CardWelcome from './CardWelcome';
import useInvite, { State } from './useInvite';

export default function Container({ passwordResetMode = false }) {
  const { tokenId } = useParams<{ tokenId: string }>();
  const state = useInvite(tokenId);
  return <Invite {...state} passwordResetMode={passwordResetMode} />;
}

export function Invite(props: State & Props) {
  const {
    passwordResetMode,
    auth2faType,
    preferredMfaType,
    fetchAttempt,
    submitAttempt,
    clearSubmitAttempt,
    onSubmit,
    onSubmitWithU2f,
    onSubmitWithWebauthn,
    passwordToken,
  } = props;

  if (fetchAttempt.status === 'failed') {
    return (
      <>
        <LogoHero />
        <Expired />
      </>
    );
  }

  if (fetchAttempt.status !== 'success') {
    return null;
  }

  const { user, qrCode, tokenId } = passwordToken;

  const title = passwordResetMode ? 'Reset Password' : 'Welcome to Teleport';

  const submitBtnText = passwordResetMode
    ? 'Change Password'
    : 'Create Account';

  return (
    <>
      <LogoHero />
      <Switch>
        <Route
          path={[cfg.routes.userInviteContinue, cfg.routes.userResetContinue]}
        >
          <InviteForm
            submitBtnText={submitBtnText}
            title={title}
            user={user}
            qr={qrCode}
            auth2faType={auth2faType}
            preferredMfaType={preferredMfaType}
            attempt={submitAttempt}
            clearSubmitAttempt={clearSubmitAttempt}
            onSubmitWithU2f={onSubmitWithU2f}
            onSubmitWithWebauthn={onSubmitWithWebauthn}
            onSubmit={onSubmit}
          />
        </Route>
        <Route path={cfg.routes.userInvite}>
          <CardWelcome tokenId={tokenId} />
        </Route>
        <Route path={cfg.routes.userReset}>
          <CardWelcome tokenId={tokenId} inviteMode={false} />
        </Route>
      </Switch>
    </>
  );
}

export type Props = {
  passwordResetMode: boolean;
};

export const ResetPassword = () => <Container passwordResetMode={true} />;
