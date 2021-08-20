import React from 'react';
import cfg from 'teleport/config';
import auth from 'teleport/services/auth';
import useAttempt from 'shared/hooks/useAttemptNext';

export default function useReAuthenticate({ setToken, close }: Props) {
  const { attempt, setAttempt, handleError } = useAttempt('');

  function submitWithTotp(secondFactorToken: string) {
    setAttempt({ status: 'processing' });
    auth
      .createPrivilegeTokenWithTotp(secondFactorToken)
      .then(setToken)
      .catch(handleError);
  }

  function submitWithU2f() {
    setAttempt({ status: 'processing' });
    auth
      .createPrivilegeTokenWithU2f()
      .then(setToken)
      .catch(handleError);
  }

  function clearAttempt() {
    setAttempt({ status: '' });
  }

  return {
    attempt,
    clearAttempt,
    submitWithTotp,
    submitWithU2f,
    auth2faType: cfg.getAuth2faType(),
    preferredMfaType: cfg.getPreferredMfaType(),
    close,
  };
}

export type Props = {
  setToken: React.Dispatch<React.SetStateAction<string>>;
  close: () => void;
};

export type State = ReturnType<typeof useReAuthenticate>;
