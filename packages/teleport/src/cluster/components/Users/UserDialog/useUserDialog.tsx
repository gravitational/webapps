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

import { useState } from 'react';
import { useAttempt } from 'shared/hooks';
import { Option } from 'shared/components/Select';
import { ResetToken, User } from 'teleport/services/user';

/**
 * useUserDialog contains state for UserDialog component.
 */
export default function useUserDialog(save: Save, user = defaultUser) {
  const isNew = !user.created;
  const [attempt, attemptActions] = useAttempt({});
  const [name, setName] = useState(user.name);
  const [token, setToken] = useState<ResetToken>(null);
  const [selectedRoles, setSelectedRoles] = useState<Option[]>(
    user.roles.map(r => ({
      value: r,
      label: r,
    }))
  );

  function onSave() {
    const roles = selectedRoles.map(r => r.value);

    return attemptActions.do(() =>
      save({ name, roles }, isNew).then(token => {
        if (isNew) {
          setToken(token);
        }
      })
    );
  }

  return {
    attempt,
    name,
    setName,
    selectedRoles,
    setSelectedRoles,
    token,
    onSave,
    isNew,
  };
}

const defaultUser: User = {
  name: '',
  roles: [],
  created: undefined,
};

type Save = (user: User, isNew: boolean) => Promise<any>;
