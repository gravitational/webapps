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

import React, { useState } from 'react';
import styled from 'styled-components';
import { Text, Box, LabelInput } from 'design';

import Select, { Option } from 'shared/components/Select';

import TextSelectCopy from 'teleport/components/TextSelectCopy';
import { generateTshLoginCommand } from 'teleport/lib/util';

import {
  ActionButtons,
  HeaderSubtitle,
  HeaderWithBackBtn,
  ConnectionDiagnosticResult,
} from '../../Shared';

import { useTestConnection, State } from './useTestConnection';

import type { AgentStepProps } from '../../types';

export function TestConnection(props: AgentStepProps) {
  const state = useTestConnection(props);

  return <TestConnectionView {...state} />;
}

export function TestConnectionView({
  attempt,
  testConnection,
  diagnosis,
  nextStep,
  prevStep,
  canTestConnection,
  db,
  authType,
  username,
  clusterId,
}: State) {
  const userOpts = db.users.map(l => ({ value: l, label: l }));
  const nameOpts = db.names.map(l => ({ value: l, label: l }));

  const [selectedUser, setSelectedUser] = useState(userOpts[0]);

  // Database User might be the more popular option so it takes
  // precedence.
  const [selectedName, setSelectedName] = useState(
    userOpts[0] ? null : nameOpts[0]
  );

  return (
    <Box>
      <HeaderWithBackBtn onPrev={prevStep}>Test Connection</HeaderWithBackBtn>
      <HeaderSubtitle>
        Optionally verify that you can successfully connect to the Database you
        just added.
      </HeaderSubtitle>
      <StyledBox mb={5}>
        <Text bold>Step 1</Text>
        <Text typography="subtitle1" mb={3}>
          Select a user and or a database name to test. At least one must be
          selected.
        </Text>
        <Box width="500px" mb={4}>
          <LabelInput htmlFor={'select'}>Database User</LabelInput>
          <Select
            placeholder={
              userOpts.length === 0
                ? 'No database users defined'
                : 'Click to select a database user'
            }
            isSearchable
            isClearable={true}
            value={selectedUser}
            onChange={(o: Option) => setSelectedUser(o)}
            options={userOpts}
            isDisabled={
              attempt.status === 'processing' || userOpts.length === 0
            }
          />
        </Box>
        <Box width="500px" mb={3}>
          <LabelInput htmlFor={'select'}>Database Name</LabelInput>
          <Select
            label="Database name"
            placeholder={
              nameOpts.length === 0
                ? 'No database names defined'
                : 'Click to select a database name'
            }
            isSearchable
            isClearable={true}
            value={selectedName}
            onChange={(o: Option) => setSelectedName(o)}
            options={nameOpts}
            isDisabled={
              attempt.status === 'processing' || nameOpts.length === 0
            }
          />
        </Box>
      </StyledBox>
      <ConnectionDiagnosticResult
        attempt={attempt}
        diagnosis={diagnosis}
        canTestConnection={canTestConnection}
        testConnection={() =>
          testConnection({ name: selectedName.value, user: selectedUser.value })
        }
        stepNumber={2}
        stepDescription="Verify that your database is accessible"
      />
      <StyledBox>
        <Text bold mb={3}>
          To Access your Database
        </Text>
        <Box mb={2}>
          Log into your Teleport cluster
          <TextSelectCopy
            mt="1"
            text={generateTshLoginCommand({
              authType,
              username,
              clusterId,
            })}
          />
        </Box>
        <Box mb={2}>
          Connect to your database
          <TextSelectCopy mt="1" text={`tsh db connect ${db.name}`} />
        </Box>
      </StyledBox>
      <ActionButtons onProceed={nextStep} lastStep={true} />
    </Box>
  );
}

const StyledBox = styled(Box)`
  max-width: 800px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 20px;
`;
