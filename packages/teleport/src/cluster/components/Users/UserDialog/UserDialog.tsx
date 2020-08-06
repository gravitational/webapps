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
import { ButtonPrimary, ButtonSecondary, Alert } from 'design';
import Dialog, {
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from 'design/Dialog';
import Validation from 'shared/components/Validation';
import FieldInput from 'shared/components/FieldInput';
import FieldSelect from 'shared/components/FieldSelect';
import { Option } from 'shared/components/Select';
import { requiredField } from 'shared/components/Validation/rules';
import { User } from 'teleport/services/user';
import useUserDialog from './useUserDialog';
import UserDialogInvite from './UserDialogInvite';

export default function Container(props: Omit<Props, 'state'>) {
  const state = useUserDialog(props.onSave, props.user);

  return <UserDialog {...props} state={state} />;
}

/**
 * UserDialog is a popup that is used for two actions, create and edit.
 *  - Create inserts new users and generates invite link
 *  - Edit for updating existing users
 */
export function UserDialog({
  roles,
  onClose,
  state,
}: Omit<Props, 'user' | 'onSave'>) {
  const {
    attempt,
    name,
    setName,
    selectedRoles,
    setSelectedRoles,
    onSave,
    isNew,
    token,
  } = state;

  if (attempt.isSuccess && isNew) {
    return <UserDialogInvite onClose={onClose} token={token} />;
  }

  const selectOptions: Option[] = roles.map(r => ({
    value: r,
    label: r,
  }));

  function handleOnSave(validator) {
    if (!validator.validate()) {
      return;
    }

    onSave();
  }

  return (
    <Validation>
      {({ validator }) => (
        <Dialog
          dialogCss={() => ({ maxWidth: '500px', width: '100%' })}
          disableEscapeKeyDown={false}
          onClose={onClose}
          open={true}
        >
          <DialogHeader>
            <DialogTitle>{isNew ? 'Create User' : 'Edit User'}</DialogTitle>
          </DialogHeader>
          <DialogContent>
            {attempt.isFailed && (
              <Alert kind="danger" children={attempt.message} />
            )}
            <FieldInput
              label="User Name"
              rule={requiredField('User name is required')}
              autoFocus
              value={name}
              onChange={e => setName(e.target.value)}
              readonly={isNew ? false : true}
            />
            <FieldSelect
              label="Assign Role/s"
              rule={requiredField('At least one role is required')}
              maxMenuHeight={110}
              placeholder="Click to select a role"
              isSearchable
              isMulti
              isSimpleValue
              clearable={false}
              value={selectedRoles}
              onChange={values => setSelectedRoles(values as Option[])}
              options={selectOptions}
            />
          </DialogContent>
          <DialogFooter>
            <ButtonPrimary
              mr="3"
              disabled={attempt.isProcessing}
              onClick={() => handleOnSave(validator)}
            >
              Save
            </ButtonPrimary>
            <ButtonSecondary disabled={attempt.isProcessing} onClick={onClose}>
              Cancel
            </ButtonSecondary>
          </DialogFooter>
        </Dialog>
      )}
    </Validation>
  );
}

type Props = {
  roles: string[];
  onClose(): void;
  onSave(user: User, isNew: boolean): Promise<any>;
  user: User;
  state: ReturnType<typeof useUserDialog>;
};
