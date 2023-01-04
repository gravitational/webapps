/**
 * Copyright 2022 Gravitational, Inc.
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

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Box, Text, Flex, Link } from 'design';
import { InfoFilled } from 'design/Icon';

import {
  SelectCreatable,
  Option,
} from 'teleport/Discover/Shared/SelectCreatable';
import {
  useUserTraits,
  SetupAccessWrapper,
} from 'teleport/Discover/Shared/SetupAccess';
import { Mark } from 'teleport/Discover/Shared';
import { TextSelectCopyMulti } from 'teleport/components/TextSelectCopy';

import type { AgentStepProps } from '../../types';
import type { State } from 'teleport/Discover/Shared/SetupAccess';

export default function Container(props: AgentStepProps) {
  const state = useUserTraits(props);
  return <SetupAccess {...state} />;
}

export function SetupAccess(props: State) {
  const {
    onProceed,
    initSelectedOptions,
    getFixedOptions,
    getSelectableOptions,
    ...restOfProps
  } = props;
  const [nameInputValue, setNameInputValue] = useState('');
  const [selectedNames, setSelectedNames] = useState<Option[]>([]);

  const [userInputValue, setUserInputValue] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<Option[]>([]);

  useEffect(() => {
    if (props.attempt.status === 'success') {
      setSelectedNames(initSelectedOptions('databaseNames'));
      setSelectedUsers(initSelectedOptions('databaseUsers'));
    }
  }, [props.attempt.status, initSelectedOptions]);

  function handleNameKeyDown(event: React.KeyboardEvent) {
    if (!nameInputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        setSelectedNames([
          ...selectedNames,
          { value: nameInputValue, label: nameInputValue },
        ]);
        setNameInputValue('');
        event.preventDefault();
    }
  }

  function handleUserKeyDown(event: React.KeyboardEvent) {
    if (!userInputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        setSelectedUsers([
          ...selectedUsers,
          { value: userInputValue, label: userInputValue },
        ]);
        setUserInputValue('');
        event.preventDefault();
    }
  }

  function handleOnProceed() {
    onProceed({ databaseNames: selectedNames, databaseUsers: selectedUsers });
  }

  // Both db names and users are required.
  const hasTraits = selectedNames.length > 0 && selectedUsers.length > 0;

  const canAddTraits = !props.isSsoUser && props.canEditUser;
  const headerSubtitle =
    'Allow access from your Database names and users to interact with your Database.';

  return (
    <SetupAccessWrapper
      {...restOfProps}
      headerSubtitle={headerSubtitle}
      traitKind="Database"
      traitDescription="names and users"
      hasTraits={hasTraits}
      onProceed={handleOnProceed}
      infoContent={<Info />}
    >
      <Box mb={4}>
        Database Users
        <SelectCreatable
          inputValue={userInputValue}
          isClearable={selectedUsers.some(v => !v.isFixed)}
          onInputChange={setUserInputValue}
          onKeyDown={handleUserKeyDown}
          placeholder="Start typing database users and press enter"
          value={selectedUsers}
          isDisabled={!canAddTraits}
          onChange={(value, action) => {
            if (action.action === 'clear') {
              setSelectedUsers(getFixedOptions('databaseUsers'));
            } else {
              setSelectedUsers(value || []);
            }
          }}
          options={getSelectableOptions('databaseUsers')}
          autoFocus
        />
      </Box>
      <Box mb={2}>
        Database Names
        <SelectCreatable
          inputValue={nameInputValue}
          isClearable={selectedNames.some(v => !v.isFixed)}
          onInputChange={setNameInputValue}
          onKeyDown={handleNameKeyDown}
          placeholder="Start typing database names and press enter"
          value={selectedNames}
          isDisabled={!canAddTraits}
          onChange={(value, action) => {
            if (action.action === 'clear') {
              setSelectedNames(getFixedOptions('databaseNames'));
            } else {
              setSelectedNames(value || []);
            }
          }}
          options={getSelectableOptions('databaseNames')}
        />
      </Box>
    </SetupAccessWrapper>
  );
}

const Info = () => (
  <StyledBox mt={5}>
    <Flex mb={2}>
      <InfoFilled fontSize={18} mr={1} mt="2px" />
      <Text bold>To allow access using your Database Users</Text>
    </Flex>
    <Box mb={3}>
      <Text mb={1}>
        Add the following entries to PostgreSQL's{' '}
        <Link
          href="https://www.postgresql.org/docs/current/auth-pg-hba-conf.html"
          target="_blank"
        >
          host-based authentication
        </Link>{' '}
        file named <Mark>pg_hba.conf</Mark>, so that PostgreSQL require's client
        CA from clients connecting over TLS:
      </Text>
      <TextSelectCopyMulti
        bash={false}
        lines={[
          {
            text:
              `hostssl all             all             ::/0                    cert\n` +
              `hostssl all             all             0.0.0.0/0               cert\n`,
          },
        ]}
      />
      <Text mt={2}>
        Note: Ensure that you have no higher-priority md5 authentication rules
        that will match, otherwise PostgreSQL will offer them first, and the
        certificate-based Teleport login will fail.
      </Text>
    </Box>
    <Box>
      <Text bold>Access Definition</Text>
      <ul
        css={`
          margin-bottom: 0;
        `}
      >
        <li>
          <Mark>Database User</Mark> is the name of a user that is allowed to
          connect to a database. A wildcard allows any user.
        </li>
        <li>
          <Mark>Database Name</Mark> is the name of a logical database (aka
          schemas) that a <Mark>Database User</Mark> will be allowed to connect
          to within a database server. A wildcard allows any database.
        </li>
      </ul>
    </Box>
  </StyledBox>
);

const StyledBox = styled(Box)`
  max-width: 800px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 20px;
`;
