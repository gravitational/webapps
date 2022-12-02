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

import React, { useCallback, useState } from 'react';
import { Text, Box } from 'design';
import { Danger } from 'design/Alert';
import Validation, { Validator } from 'shared/components/Validation';
import FieldInput from 'shared/components/FieldInput';
import { requiredField } from 'shared/components/Validation/rules';

import {
  ActionButtons,
  HeaderSubtitle,
  Header,
  LabelsCreater,
} from '../../Shared';

import { useCreateDatabase, State } from './useCreateDatabase';

import type { AgentStepProps } from '../../types';
import type { AgentLabel } from 'teleport/services/agents';
import { FieldInputProps } from 'shared/components/FieldInput/FieldInput';
import { Attempt } from 'shared/hooks/useAttemptNext';

export function CreateDatabase(props: AgentStepProps) {
  const state = useCreateDatabase(props);
  return <CreateDatabaseView {...state} />;
}

function getInitialInputState<T>(children: React.ReactNode) {
  const values = {} as T;

  React.Children.forEach(children, (child: JSX.Element) => {
    values[child.props.name] = '';
  });

  return values;
}

export function RegisterDatabaseInput(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  props: Omit<FieldInputProps, 'onChange'> & { name: string }
) {
  return null;
}

interface RegisterDatabaseBaseProps<T> {
  disabled: boolean;
  onSubmit: (values: T) => void;
}

export interface RegisterDatabaseValues {
  labels: AgentLabel[];
}

export function RegisterDatabaseBase<T>(
  props: React.PropsWithChildren<RegisterDatabaseBaseProps<T>>
) {
  const [inputStates, setInputStates] = useState<T>(
    getInitialInputState<T>(props.children)
  );
  const [labels, setLabels] = useState<AgentLabel[]>([]);

  const setInputValue = useCallback((name: string, value: string) => {
    setInputStates(inputStates => ({ ...inputStates, [name]: value }));
  }, []);

  const inputs = React.Children.map(
    props.children,
    (child: JSX.Element, index) => (
      <Box width="500px" mb={2} key={index}>
        <FieldInput
          {...child.props}
          value={inputStates[child.props.name]}
          onChange={event =>
            setInputValue(child.props.name, event.target.value)
          }
        />
      </Box>
    )
  );

  function handleOnProceed(validator: Validator) {
    if (!validator.validate()) {
      return;
    }

    console.log('here');

    props.onSubmit({ ...inputStates, labels });
  }

  return (
    <Validation>
      {({ validator }) => (
        <Box>
          {inputs}

          <Box>
            <Text bold>Labels (optional)</Text>

            <LabelsCreater
              labels={labels}
              setLabels={setLabels}
              isLabelOptional={true}
              disableBtns={props.disabled}
            />
          </Box>

          <ActionButtons
            onProceed={() => handleOnProceed(validator)}
            disableProceed={props.disabled}
          />
        </Box>
      )}
    </Validation>
  );
}

export function CreateDatabaseView({ attempt, createDbAndQueryDb }: State) {
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
    createDbAndQueryDb({
      labels,
      name: dbName,
      uri: dbUri,
      // TODO (lisa or ryan) hard coded for now as example.
      protocol: 'postgres',
      // TODO (lisa or ryan) add AWS fields
    });
  }

  return (
    <Validation>
      {({ validator }) => (
        <Box>
          <Header>Register a Database</Header>
          <HeaderSubtitle>Lorem ipsum dolores</HeaderSubtitle>
          {attempt.status === 'failed' && (
            <Danger children={attempt.statusText} />
          )}
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
              rule={requiredField('database connection endpoint is required')}
              autoFocus
              value={dbUri}
              placeholder="Enter database connection endpoint"
              onChange={e => setDbUri(e.target.value)}
            />
          </Box>
          {/* TODO (lisa or ryan): add AWS input fields */}
          <Box>
            <Text bold>Labels (optional)</Text>
            <LabelsCreater
              labels={labels}
              setLabels={setLabels}
              isLabelOptional={true}
              disableBtns={attempt.status === 'processing'}
            />
          </Box>
          <ActionButtons
            onProceed={() => handleOnProceed(validator)}
            // On failure, allow user to attempt again.
            disableProceed={attempt.status === 'processing'}
          />
        </Box>
      )}
    </Validation>
  );
}
