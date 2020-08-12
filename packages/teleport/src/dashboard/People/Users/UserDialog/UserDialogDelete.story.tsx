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
import { UserDialogDelete } from './UserDialogDelete';
import { useAttemptNext } from 'shared/hooks';

export default {
  title: 'Teleport/Users/DeleteDialog',
};

export const Initial = () => {
  let { attempt, run } = useAttemptNext();
  run = () => null;
  return <UserDialogDelete {...sample.props} attempt={attempt} run={run} />;
};

export const Processing = () => {
  const { attempt, run } = useAttemptNext('processing');
  return <UserDialogDelete {...sample.props} attempt={attempt} run={run} />;
};

export const Failed = () => {
  const { attempt, run } = useAttemptNext('failed');
  attempt.statusText = 'some error message';
  return <UserDialogDelete {...sample.props} attempt={attempt} run={run} />;
};

const sample = {
  props: {
    username: 'somename',
    onDelete: () => null,
    onClose: () => null,
  },
};
