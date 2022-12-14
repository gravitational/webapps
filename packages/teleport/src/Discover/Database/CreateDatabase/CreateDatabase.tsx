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
import { Text, Box, Flex, AnimatedProgressBar } from 'design';
import Dialog, { DialogContent } from 'design/DialogConfirmation';
import { Danger } from 'design/Alert';
import Validation, { Validator } from 'shared/components/Validation';
import FieldInput from 'shared/components/FieldInput';
import { requiredField } from 'shared/components/Validation/rules';
import TextEditor from 'shared/components/TextEditor';

import {
  ActionButtons,
  HeaderSubtitle,
  Header,
  LabelsCreater,
  Mark,
} from '../../Shared';
import { dbCU } from '../../yamlTemplates';
import { getDatabaseProtocol } from '../resources';

import { useCreateDatabase, State } from './useCreateDatabase';

import type { AgentStepProps } from '../../types';
import type { AgentLabel } from 'teleport/services/agents';

export function CreateDatabase(props: AgentStepProps) {
  const state = useCreateDatabase(props);
  return <CreateDatabaseView {...state} />;
}

export function CreateDatabaseView({
  attempt,
  registerDatabase,
  canCreateDatabase,
  engine,
}: State) {
  const [dbName, setDbName] = useState('');
  const [dbUri, setDbUri] = useState('');
  const [labels, setLabels] = useState<AgentLabel[]>([]);

  // TODO (lisa or ryan): these depend on if user chose AWS options:
  // const [awsAccountId, setAwsAccountId] = useState('')
  // const [awsResourceId, setAwsResourceId] = useState('')

  function handleOnProceed(validator: Validator) {
    if (!validator.validate()) {
      return;
    }

    // TODO (lisa or ryan): preserve "self hosted" or "aws"
    // and protocol on first step, and use it here.
    registerDatabase({
      labels,
      name: dbName,
      uri: dbUri,
      protocol: getDatabaseProtocol(engine),
      // TODO (lisa or ryan) add AWS fields
    });
  }

  return (
    <Validation>
      {({ validator }) => (
        <Box maxWidth="800px">
          <Header>Register a Database</Header>
          <HeaderSubtitle>
            Create a new database resource for the database server.
          </HeaderSubtitle>
          {attempt.status === 'failed' && (
            <Danger children={attempt.statusText} />
          )}
          {!canCreateDatabase && (
            <Box>
              <Text>
                You don't have permission to register a database.
                <br />
                Please ask your Teleport administrator to update your role and
                add the <Mark>db</Mark> rule:
              </Text>
              <Flex minHeight="195px" mt={3}>
                <TextEditor
                  readOnly={true}
                  data={[{ content: dbCU, type: 'yaml' }]}
                />
              </Flex>
            </Box>
          )}
          {canCreateDatabase && (
            <>
              <Box width="500px" mb={2}>
                <FieldInput
                  label="Database Name"
                  rule={requiredField('database name is required')}
                  autoFocus
                  value={dbName}
                  placeholder="Enter database name"
                  onChange={e => setDbName(e.target.value)}
                />
              </Box>
              <Box width="500px" mb={6}>
                <FieldInput
                  label="Database Connection Endpoint"
                  rule={requiredField(
                    'database connection endpoint is required'
                  )}
                  value={dbUri}
                  placeholder="db.example.com:1234"
                  onChange={e => setDbUri(e.target.value)}
                />
              </Box>
              {/* TODO (lisa or ryan): add AWS input fields */}
              <Box>
                <Text bold>Labels (optional)</Text>
                <Text mb={2}>
                  Labels make this new database discoverable by the database
                  server. <br />
                  Not defining labels is equivalent to asteriks (any database
                  server can discover this database).
                </Text>
                <LabelsCreater
                  labels={labels}
                  setLabels={setLabels}
                  isLabelOptional={true}
                  disableBtns={attempt.status === 'processing'}
                />
              </Box>
            </>
          )}
          <ActionButtons
            onProceed={() => handleOnProceed(validator)}
            // On failure, allow user to attempt again.
            disableProceed={
              attempt.status === 'processing' || !canCreateDatabase
            }
          />
          {attempt.status === 'processing' && <CreateDatabaseDialog />}
        </Box>
      )}
    </Validation>
  );
}

const CreateDatabaseDialog = () => {
  return (
    <Dialog disableEscapeKeyDown={false} open={true}>
      <DialogContent
        width="400px"
        alignItems="center"
        mb={0}
        textAlign="center"
      >
        <Text bold caps>
          Register Database
        </Text>
        <Text mb={2} mt={3}>
          In Progress...
        </Text>
        <AnimatedProgressBar />
      </DialogContent>
    </Dialog>
  );
};
