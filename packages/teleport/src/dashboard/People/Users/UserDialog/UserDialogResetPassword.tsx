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
import { ButtonPrimary, ButtonSecondary, Text, Alert } from 'design';
import Dialog, {
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from 'design/Dialog';
import { useAttemptNext } from 'shared/hooks';
import UserDialogInvite from './UserDialogInvite';
import { ResetToken } from 'teleport/services/user';

export default function Container(props: Omit<Props, 'attempt' | 'run'>) {
  const { attempt, run } = useAttemptNext();
  const [token, setToken] = React.useState<ResetToken>(null);

  function handleSetToken(token) {
    setToken(token);
  }

  return (
    <UserDialogResetPassword
      {...props}
      attempt={attempt}
      run={run}
      token={token}
      setToken={handleSetToken}
    />
  );
}

/**
 * UserDialogResetPassword require user in context to confirm before
 * resetting a user's password.
 *
 * A follow up comp. that displays reset link is rendered after confirm.
 */
export function UserDialogResetPassword({
  username,
  onResetPassword,
  onClose,
  attempt,
  run,
  token,
  setToken,
}: Props) {
  if (attempt.status === 'success') {
    return <UserDialogInvite onClose={onClose} token={token} reset={true} />;
  }

  function handleOnResetPassword() {
    run(() => onResetPassword(username).then(setToken));
  }
  return (
    <Dialog
      dialogCss={() => ({ maxWidth: '500px', width: '100%' })}
      disableEscapeKeyDown={false}
      onClose={close}
      open={true}
    >
      <DialogHeader>
        <DialogTitle>Reset User Password?</DialogTitle>
      </DialogHeader>
      <DialogContent>
        {attempt.status === 'failed' && (
          <Alert kind="danger" children={attempt.statusText} />
        )}
        <Text mb={4} mt={1}>
          You are about to reset password for user '{username}'. This will
          require the user to set up a new password.
        </Text>
      </DialogContent>
      <DialogFooter>
        <ButtonPrimary
          mr="3"
          disabled={attempt.status === 'processing'}
          onClick={handleOnResetPassword}
        >
          Genereate reset url
        </ButtonPrimary>
        <ButtonSecondary onClick={onClose}>Cancel</ButtonSecondary>
      </DialogFooter>
    </Dialog>
  );
}

type Props = {
  username: string;
  onClose(): void;
  onResetPassword(username: string): Promise<any>;
  attempt: ReturnType<typeof useAttemptNext>['attempt'];
  run: ReturnType<typeof useAttemptNext>['run'];
  token: ResetToken;
  setToken(token: ResetToken): void;
};
