/*
Copyright 2020 Gravitational, Inc.

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
import { useParams, matchPath, useLocation } from 'react-router';
import { useAttempt, withState } from 'shared/hooks';
import cfg from 'teleport/config';
import auth from 'teleport/services/auth';
import history from 'teleport/services/history';
import Logger from 'shared/libs/logger';
import { Route, Switch } from 'teleport/components/Router';
import InviteForm, { Expired } from 'shared/components/FormInvite';
import LogoHero from 'teleport/components/LogoHero';
import CardWelcome from './CardWelcome';

const logger = Logger.create('components/Invite');

export function Invite(props) {
  const {
    passwordResetMode = false,
    auth2faType,
    fetchAttempt,
    onSubmit,
    onSubmitWithU2f,
    passwordToken,
    submitAttempt,
    tokenId,
  } = props;

  if (fetchAttempt.isFailed) {
    return (
      <>
        <LogoHero />
        <Expired />
      </>
    );
  }

  if (fetchAttempt.isProcessing) {
    return null;
  }

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
            user={passwordToken?.user}
            qr={passwordToken?.qrCode}
            auth2faType={auth2faType}
            attempt={submitAttempt}
            onSubmitWithU2f={onSubmitWithU2f}
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

function mapState() {
  const [fetchAttempt, fetchAttemptActions] = useAttempt();
  const [passwordToken, setPswToken] = React.useState();
  const [submitAttempt, submitAttemptActions] = useAttempt();
  const auth2faType = cfg.getAuth2faType();
  const { tokenId } = useParams();
  const { pathname } = useLocation();

  React.useEffect(() => {
    if (
      matchPath(pathname, {
        path: [cfg.routes.userInviteContinue, cfg.routes.userResetContinue],
      })
    ) {
      fetchAttemptActions.do(() => {
        return auth
          .fetchPasswordToken(tokenId)
          .then(resetToken => setPswToken(resetToken));
      });
    }
  }, [pathname]);

  function redirect() {
    history.push(cfg.routes.root, true);
  }

  function handleSubmitError(err) {
    logger.error(err);
    submitAttemptActions.error(err);
  }

  function onSubmit(password, otpToken) {
    submitAttemptActions.start();
    auth
      .resetPassword(tokenId, password, otpToken)
      .then(redirect)
      .catch(handleSubmitError);
  }

  function onSubmitWithU2f(password) {
    submitAttemptActions.start();
    auth
      .resetPasswordWithU2f(tokenId, password)
      .then(redirect)
      .catch(handleSubmitError);
  }

  return {
    auth2faType,
    fetchAttempt,
    onSubmit,
    onSubmitWithU2f,
    passwordToken,
    submitAttempt,
    tokenId,
  };
}

const InviteWithState = withState(mapState)(Invite);

export default InviteWithState;
export const ResetPassword = () => <InviteWithState passwordResetMode={true} />;
