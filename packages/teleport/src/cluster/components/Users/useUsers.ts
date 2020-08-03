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
import { useTeleport } from 'teleport/teleportContextProvider';
import resourceService, { Resource } from 'e-teleport/services/resources';
import { useAttempt } from 'shared/hooks';
import userServices, { User } from 'teleport/services/user';

/**
 * useUsers contains state for Users view component.
 */
export default function useUsers() {
  const userCtx = useTeleport().storeUser;
  const clusterId = userCtx.state.cluster.clusterId;

  const [attempt, attemptActions] = useAttempt({ isProcessing: true });

  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [dialog, setDialog] = useState<DialogState>({
    state: 'create',
    user: undefined,
    show: false,
  });

  // access determines what kind of actions this user can perform on users.
  const access = userCtx.getUserAccess();

  function createUserInvite(name: string, roles: string[]) {
    return userServices
      .createUser(clusterId, { name, roles })
      .then(response => {
        setUsers(users => [...users, response.user]);
        return response.token;
      });
  }

  function extractSetRoles(resources: Resource[]) {
    const roleNames = resources
      .filter(resource => resource.kind === 'role')
      .map(role => role.name);

    setRoles(roleNames);
  }

  useEffect(() => {
    attemptActions.do(() => resourceService.fetchRoles().then(extractSetRoles));
  }, []);

  return {
    access,
    attempt,
    users,
    roles,
    createUserInvite,
    dialog,
    setDialog,
  };
}

export type DialogState = {
  state: 'create' | 'view';
  user: User;
  show: boolean;
};
