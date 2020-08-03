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
import copyToClipboard from 'design/utils/copyToClipboard';
import selectElementContent from 'design/utils/selectElementContent';
import { ButtonPrimary, ButtonSecondary, Alert, Text, Flex } from 'design';
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
import { ResetToken } from 'teleport/services/user';
import useUserDialog from './useUserDialog';
import { DialogState } from '../useUsers';

export default function Container(props: Omit<Props, 'state'>) {
  const state = useUserDialog(props.dialog.user);

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
  onCreateInvite,
  state,
  dialog,
}: Props) {
  const {
    attempt,
    attemptActions,
    username,
    setUsername,
    selectedRoles,
    setSelectedRoles,
    token,
    setToken,
  } = state;

  const selectOptions: Option[] = roles.map(r => ({
    value: r,
    label: r,
  }));

  function handleOnCreate(validator) {
    if (!validator.validate()) {
      return;
    }

    const roles = selectedRoles.map(r => r.value);
    attemptActions.do(() =>
      onCreateInvite(username, roles).then(token => {
        setToken(token);
      })
    );
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
            {attempt.isSuccess && <DialogTitle>Share Invite Link</DialogTitle>}
            {!attempt.isSuccess && (
              <DialogTitle>
                {dialog.state === 'create'
                  ? 'Create User Invite Link'
                  : 'Viewing'}
              </DialogTitle>
            )}
          </DialogHeader>
          <DialogContent>
            {attempt.isFailed && (
              <Alert kind="danger" children={attempt.message} />
            )}
            {attempt.isSuccess && <InviteLinkInfo token={token} />}
            {!attempt.isSuccess && (
              <>
                <FieldInput
                  label="User Name"
                  rule={requiredField('User name is required')}
                  autoFocus
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  readonly={dialog.state === 'view' ? true : false}
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
                  isDisabled={dialog.state === 'view' ? true : false}
                />
              </>
            )}
          </DialogContent>
          <DialogFooter>
            {(attempt.isSuccess || dialog.state === 'view') && (
              <ButtonSecondary onClick={onClose}>Close</ButtonSecondary>
            )}
            {!attempt.isSuccess && dialog.state === 'create' && (
              <>
                <ButtonPrimary
                  mr="3"
                  disabled={attempt.isProcessing}
                  onClick={() => handleOnCreate(validator)}
                >
                  {'Create User Invite Link'}
                </ButtonPrimary>
                <ButtonSecondary
                  disabled={attempt.isProcessing}
                  onClick={onClose}
                >
                  Cancel
                </ButtonSecondary>
              </>
            )}
          </DialogFooter>
        </Dialog>
      )}
    </Validation>
  );
}

const InviteLinkInfo = ({ token }: { token: ResetToken }) => {
  const ref = React.useRef();
  const [copyCmd, setCopyCmd] = React.useState(() => 'Copy');

  function onCopyClick() {
    copyToClipboard(token.url).then(() => setCopyCmd('Copied'));
    selectElementContent(ref.current);
  }

  return (
    <>
      <Text mb={4} mt={1}>
        User '{token.username}' has been created but requires a password. Share
        this URL with the user to complete user setup, link is valid for{' '}
        {token.expires}:
      </Text>
      <Flex
        bg="bgTerminal"
        p="2"
        mb={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Text ref={ref} style={{ wordBreak: 'break-all' }} mr="3">
          {token.url}
        </Text>
        <ButtonPrimary onClick={onCopyClick} size="small">
          {copyCmd}
        </ButtonPrimary>
      </Flex>
    </>
  );
};

type Props = {
  roles: string[];
  onClose(): void;
  onCreateInvite(username: string, roles: string[]): Promise<any>;
  state: ReturnType<typeof useUserDialog>;
  dialog: DialogState;
};
