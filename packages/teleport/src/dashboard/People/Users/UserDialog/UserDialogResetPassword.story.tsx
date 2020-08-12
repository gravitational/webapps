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
import { UserDialogResetPassword } from './UserDialogResetPassword';
import { useAttemptNext } from 'shared/hooks';

export default {
  title: 'Teleport/Users/ResetPasswordDialog',
};

export const Initial = () => {
  let { attempt, run } = useAttemptNext();
  run = () => null;
  return (
    <UserDialogResetPassword {...sample.props} attempt={attempt} run={run} />
  );
};

export const Processing = () => {
  const { attempt, run } = useAttemptNext('processing');
  return (
    <UserDialogResetPassword {...sample.props} attempt={attempt} run={run} />
  );
};

export const Failed = () => {
  const { attempt, run } = useAttemptNext('failed');
  attempt.statusText = 'some error message';
  return (
    <UserDialogResetPassword {...sample.props} attempt={attempt} run={run} />
  );
};

export const Success = () => {
  let { attempt, run } = useAttemptNext('success');
  return (
    <UserDialogResetPassword
      {...sample.props}
      attempt={attempt}
      run={run}
      token={sample.token}
    />
  );
};

const sample = {
  props: {
    username: 'somename',
    token: null,
    onResetPassword: () => null,
    onClose: () => null,
    setToken: () => null,
  },
  token: {
    username: 'somename',
    value: 'esmurwulvaltapinziuvvofurcuruforaucomececoifw',
    expires: '2h35m34s',
  },
};
