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

import { useState, useEffect } from 'react';
import { useAttempt } from 'shared/hooks';
import { User } from 'teleport/services/user';
import { useTeleport } from 'teleport/teleportContextProvider';

/**
 * useUsers contains state for Users view component.
 */
export default function useUsers() {
  const ctx = useTeleport();
  const [attempt, attemptActions] = useAttempt({ isProcessing: true });
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [operation, setOperation] = useState<Operation>({
    type: 'none',
  });

  function onStartCreate() {
    setOperation({ type: 'create' });
  }

  function onStartEdit(user: User) {
    setOperation({ type: 'edit', user });
  }

  function onClose() {
    setOperation({ type: 'none' });
  }

  function updateUser(updatedUser: User) {
    const updatedUsers = users.map(user => {
      if (user.name === updatedUser.name) {
        return updatedUser;
      }
      return user;
    });
    setUsers(updatedUsers);
  }

  function onSave(user: User) {
    return ctx.userService.saveUser(user).then(response => {
      if (user.isNew) {
        setUsers(users => [...users, response.user]);
      } else {
        updateUser(response.user);
      }
      return response.token;
    });
  }

  function fetchRoles() {
    if (ctx.isRolesEnabled()) {
      return ctx.resourceService
        .fetchRoles()
        .then(resources => resources.map(role => role.name));
    }

    return Promise.resolve([]);
  }

  useEffect(() => {
    attemptActions.do(() =>
      Promise.all([fetchRoles(), ctx.userService.fetchUsers()]).then(values => {
        setRoles(values[0]);
        setUsers(values[1]);
      })
    );
  }, []);

  return {
    attempt,
    users,
    roles,
    operation,
    onStartCreate,
    onStartEdit,
    onClose,
    onSave,
  };
}

type Operation = {
  type: 'create' | 'edit' | 'none';
  user?: User;
};
