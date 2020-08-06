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
import { UserDialog } from './UserDialog';
import useUserDialog from './useUserDialog';
import userServices from 'teleport/services/user';

export default {
  title: 'Teleport/Users/CreateInviteDialog',
};

export const Initial = () => {
  const state = useUserDialog();
  return <UserDialog {...props} state={state} refresh={() => null} />;
};

export const Processing = () => {
  const state = useUserDialog();
  state.attempt.isProcessing = true;
  state.name = 'Lester';
  state.selectedRoles = selectedRoles;
  return <UserDialog {...props} state={state} refresh={() => null} />;
};

export const Failed = () => {
  const state = useUserDialog();
  state.attempt.isFailed = true;
  state.attempt.message = 'Some error message';
  state.name = 'Lester';
  state.selectedRoles = selectedRoles;
  return <UserDialog {...props} state={state} refresh={() => null} />;
};

export const Success = () => {
  const state = useUserDialog();
  state.attempt.isSuccess = true;
  state.token = {
    value: '0c536179038b386728dfee6602ca297f',
    expires: '24h30m0s',
    username: 'Lester',
  };
  return <UserDialog {...props} state={state} refresh={() => null} />;
};

const props = {
  roles: [
    'Relupba',
    'B',
    'Vamheoze',
    'Bawmipnan',
    'Nevumja',
    'Pihvujve',
    'Hiw',
    'Pilhibokadfasdfadsfasdf',
  ],
  onClose: () => null,
  updateUserList: () => Promise.resolve(),
  user: undefined,
};

const selectedRoles = [
  { value: 'admin', label: 'admin' },
  { value: 'testrole', label: 'testrole' },
];
