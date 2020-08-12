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
import TeleportContextProvider from 'teleport/teleportContextProvider';
import TeleportContext from 'teleport/teleportContext';

export default {
  title: 'Teleport/Users/CreateInviteDialog',
};

export const Initial = () => {
  const ctx = new TeleportContext();
  const save = () => new Promise(() => null);
  const state = useUserDialog(save);

  return render(ctx, <UserDialog {...sample.props} state={state} />);
};

export const Processing = () => {
  const ctx = new TeleportContext();
  const save = () => new Promise(() => null);

  const state = useUserDialog(save);
  state.attempt.isProcessing = true;
  state.name = 'Lester';
  state.selectedRoles = sample.selectedRoles;

  return render(ctx, <UserDialog {...sample.props} state={state} />);
};

export const Failed = () => {
  const ctx = new TeleportContext();
  const save = () => new Promise(() => null);

  const state = useUserDialog(save);
  state.attempt.isFailed = true;
  state.attempt.message = 'Some error message';
  state.name = 'Lester';
  state.selectedRoles = sample.selectedRoles;

  return render(ctx, <UserDialog {...sample.props} state={state} />);
};

export const Success = () => {
  const ctx = new TeleportContext();
  const save = () => new Promise(() => null);

  const state = useUserDialog(save);
  state.attempt.isSuccess = true;
  state.token = {
    value: '0c536179038b386728dfee6602ca297f',
    expires: '24h30m0s',
    username: 'Lester',
  };
  return render(ctx, <UserDialog {...sample.props} state={state} />);
};

const sample = {
  props: {
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
    user: undefined,
  },
  selectedRoles: [
    { value: 'admin', label: 'admin' },
    { value: 'testrole', label: 'testrole' },
  ],
  user: {
    name: 'lester',
    roles: undefined,
  },
};

function render(ctx: TeleportContext, children: JSX.Element) {
  return (
    <TeleportContextProvider value={ctx}>{children}</TeleportContextProvider>
  );
}
