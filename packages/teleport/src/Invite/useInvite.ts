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

import { useState, useEffect } from 'react';
import useAttempt from 'shared/hooks/useAttemptNext';
import cfg from 'teleport/config';
import auth from 'teleport/services/auth';

export default function useInvite(tokenId: string) {
  const [passwordToken, setPswToken] = useState<ResetToken>(undefined);
  const [showRecoveryTokens, setShowRecoveryTokens] = useState(false);
  const [recoveryTokens, setRecoveryTokens] = useState([]);
  const fetchAttempt = useAttempt('');
  const submitAttempt = useAttempt('');
  const auth2faType = cfg.getAuth2faType();

  useEffect(() => {
    fetchAttempt.run(() =>
      auth
        .fetchPasswordToken(tokenId)
        .then(resetToken => setPswToken(resetToken))
    );
  }, []);

  function onSubmit(password: string, otpToken: string) {
    submitAttempt.run(() =>
      auth.resetPassword(tokenId, password, otpToken).then(res => {
        console.log(res);
        setRecoveryTokens(res);
        setShowRecoveryTokens(true);
      })
    );
  }

  function onSubmitWithU2f(password: string) {
    submitAttempt.run(() =>
      auth.resetPasswordWithU2f(tokenId, password).then(res => {
        console.log(res);
        setRecoveryTokens(res);
        setShowRecoveryTokens(true);
      })
    );
  }

  return {
    auth2faType,
    fetchAttempt: fetchAttempt.attempt,
    submitAttempt: submitAttempt.attempt,
    onSubmit,
    onSubmitWithU2f,
    passwordToken,
    recoveryTokens,
    showRecoveryTokens,
    setShowRecoveryTokens,
  };
}

type ResetToken = {
  tokenId: string;
  qrCode: string;
  user: string;
};

export type State = ReturnType<typeof useInvite>;
