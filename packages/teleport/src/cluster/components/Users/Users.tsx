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
import {
  FeatureBox,
  FeatureHeader,
  FeatureHeaderTitle,
} from 'teleport/components/Layout';
import { Indicator, Box, ButtonPrimary, Alert } from 'design';
import UserList from './UserList';
import UserDialog from './UserDialog/UserDialog';
import useUsers from './useUsers';
import { useTeleport } from 'teleport/teleportContextProvider';

export default function Container() {
  const state = useUsers();

  return <Users state={state} />;
}

/**
 * Users is a view component that:
 * - Displays list of users stored in a backend.
 * - Provide user related actions: edit/view, delete, reset
 *   based on permissions.
 */
export function Users({ state }: Props) {
  const {
    attempt,
    users,
    roles,
    action,
    startCreate,
    startEdit,
    onClose,
    fetchUsers,
  } = state;

  const ctx = useTeleport().storeUser;

  return (
    <FeatureBox>
      <FeatureHeader>
        <FeatureHeaderTitle>Users</FeatureHeaderTitle>
        {attempt.isSuccess &&
          ctx.getUserAccess().create &&
          ctx.getRoleAccess().read && (
            <ButtonPrimary ml="auto" width="240px" onClick={startCreate}>
              Add User
            </ButtonPrimary>
          )}
      </FeatureHeader>
      {attempt.isProcessing && (
        <Box textAlign="center" m={10}>
          <Indicator />
        </Box>
      )}
      {attempt.isFailed && <Alert kind="danger" children={attempt.message} />}
      {attempt.isSuccess && (
        <UserList
          users={users}
          pageSize={20}
          onEdit={startEdit}
          access={ctx.getUserAccess()}
        />
      )}
      {(action.type === 'create' || action.type === 'edit') && (
        <UserDialog
          roles={roles}
          onClose={onClose}
          updateUserList={fetchUsers}
          user={action.user}
        />
      )}
    </FeatureBox>
  );
}

type Props = {
  state: ReturnType<typeof useUsers>;
};
