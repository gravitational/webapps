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
import useUserDialog from './useUserDialog';
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
import { ResetToken, User } from 'teleport/services/user';
import cfg from 'teleport/config';

export default function Container(props: Omit<Props, 'state'>) {
  const state = useUserDialog(props.user);

  return <UserDialog {...props} state={state} />;
}

/**
 * UserDialog is a popup that is used for two actions, create and edit.
 *  - Create inserts new users and generates invite link
 *  - Edit for updating existing users
 */
export function UserDialog({ roles, onClose, refresh, user, state }: Props) {
  const {
    attempt,
    name,
    token,
    upsertUser,
    setName,
    selectedRoles,
    setSelectedRoles,
  } = state;

  const isNew = user == undefined;
  const selectOptions: Option[] = roles.map(r => ({
    value: r,
    label: r,
  }));

  function handleOnCreate(validator) {
    if (!validator.validate()) {
      return;
    }

    upsertUser();
  }

  function handleOnClose() {
    if (token) {
      refresh();
    }
    onClose();
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
                {isNew ? 'Create User Invite Link' : 'Edit User'}
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
              </>
            )}
          </DialogContent>
          <DialogFooter>
            {(attempt.isSuccess || !isNew) && (
              <ButtonSecondary onClick={handleOnClose}>Close</ButtonSecondary>
            )}
            {!attempt.isSuccess && isNew && (
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

/**
 * InviteLinkInfo is rendered after new users are created.
 */
const InviteLinkInfo = ({ token }: { token: ResetToken }) => {
  const ref = React.useRef();
  const [copyCmd, setCopyCmd] = React.useState(() => 'Copy');
  const tokenUrl = `${cfg.baseUrl}${cfg.getUserInviteRoute(token.value)}`;

  function onCopyClick() {
    copyToClipboard(tokenUrl).then(() => setCopyCmd('Copied'));
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
          {tokenUrl}
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
  refresh(): void;
  user: User;
  state: ReturnType<typeof useUserDialog>;
};
