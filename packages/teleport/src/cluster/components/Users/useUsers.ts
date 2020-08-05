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
import resourceService, { Resource } from 'e-teleport/services/resources';
import { useAttempt } from 'shared/hooks';
import userServices, { User } from 'teleport/services/user';

/**
 * useUsers contains state for Users view component.
 */
export default function useUsers() {
  const [attempt, attemptActions] = useAttempt({ isProcessing: true });
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [action, setAction] = useState<Action>({
    type: 'none',
  });

  function startCreate() {
    setAction({ type: 'create' });
  }

  function startEdit(user: User) {
    setAction({ type: 'edit', user });
  }

  function fetchUsers() {
    return attemptActions.do(() =>
      userServices.fetchUsers().then(users => setUsers(users))
    );
  }

  function onClose() {
    setAction({ type: 'none' });
  }

  useEffect(() => {
    attemptActions.do(() =>
      Promise.all([
        resourceService.fetchRoles(),
        userServices.fetchUsers(),
      ]).then(values => {
        setRoles(values[0].map(role => role.name));
        setUsers(values[1]);
      })
    );
  }, []);

  return {
    attempt,
    users,
    roles,
    action,
    fetchUsers,
    startCreate,
    startEdit,
    onClose,
  };
}

type Action = {
  type: 'create' | 'edit' | 'none';
  user?: User;
};
