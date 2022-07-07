/**
 * Copyright 2021-2022 Gravitational, Inc.
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
import { Box, ButtonSecondary, ButtonPrimary, Text, Image, Flex } from 'design';
import FieldInput from 'shared/components/FieldInput';
import FieldSelect from 'shared/components/FieldSelect';
import type { Option } from 'shared/components/Select';
import Validation from 'shared/components/Validation';
import { requiredField } from 'shared/components/Validation/rules';
import {
  PasswordlessPrompt,
  PasswordlessPromptEnum,
  LoginPasswordlessResponse,
  StreamLoginPasswordlessRequest,
} from 'teleterm/ui/services/clusters/types';
import LinearProgress from 'teleterm/ui/components/LinearProgress';

const svg = require('./hardware.svg');

export function PromptWebauthn(props: Props) {
  const { passwordlessResponse } = props;
  const { prompt } = passwordlessResponse;
  return (
    <Flex
      minHeight="40px"
      p={4}
      flexDirection="column"
      justifyContent="space-between"
      alignItems={
        prompt === PasswordlessPrompt.PASSWORDLESS_PROMPT_TAP ? 'center' : ''
      }
    >
      {prompt === PasswordlessPrompt.PASSWORDLESS_PROMPT_CREDENTIAL && (
        <PromptCredential {...props} />
      )}
      {prompt === PasswordlessPrompt.PASSWORDLESS_PROMPT_TAP ||
        (prompt === PasswordlessPrompt.PASSWORDLESS_PROMPT_RETAP && (
          <PromptTouch {...props} />
        ))}
      {prompt === PasswordlessPrompt.PASSWORDLESS_PROMPT_PIN && (
        <PromptPin {...props} />
      )}
    </Flex>
  );
}

function PromptTouch({ passwordlessResponse, onCancel }: Props) {
  const { prompt } = passwordlessResponse;
  return (
    <>
      <Image mb={4} width="200px" src={svg} />
      <Box mb={4} style={{ position: 'relative' }}>
        {prompt === PasswordlessPrompt.PASSWORDLESS_PROMPT_RETAP ? (
          <Text bold>Touch your security key again to complete login</Text>
        ) : (
          <Text bold>Insert your security key and touch it</Text>
        )}
        <LinearProgress />
      </Box>
      <ButtonSecondary width={120} size="small" onClick={onCancel}>
        Cancel
      </ButtonSecondary>
    </>
  );
}

function PromptCredential({
  passwordlessResponse,
  onCancel,
  writeRequestToStream,
  promptProcessing,
}: Props) {
  const { usernamesList = [] } = passwordlessResponse;

  const options: Option<number>[] = usernamesList.map((username, index) => ({
    value: index,
    label: username,
  }));

  const [selectedOpt, setSelectedOpt] = React.useState<Option<number>>(
    options[0]
  );

  return (
    <Validation>
      {({ validator }) => (
        <>
          <Box mb={4}>
            {/* <FieldInput
          width="100%"
          label="Optional"
          labelTip="Enter a username registered with your device"
          value={nameIndex}
          onChange={e => setName(e.target.value.trim())}
          placeholder="username"
          autoFocus
        /> */}
            <FieldSelect
              width="100%"
              label="Select a user for login"
              placeholder="hoola hoola"
              value={selectedOpt}
              options={options}
              rule={requiredField}
              onChange={(o: Option<number>) => {
                validator.reset();
                setSelectedOpt(o);
              }}
              isDisabled={promptProcessing}
            />
          </Box>
          <Flex justifyContent="flex-end">
            <ButtonSecondary width={80} size="small" onClick={onCancel} mr={3}>
              Cancel
            </ButtonSecondary>
            <ButtonPrimary
              width={80}
              size="small"
              onClick={() => {
                if (!validator.validate()) return;
                writeRequestToStream({ usernameindex: selectedOpt.value });
              }}
              disabled={promptProcessing || !selectedOpt}
            >
              Next
            </ButtonPrimary>
          </Flex>
        </>
      )}
    </Validation>
  );
}

function PromptPin({
  onCancel,
  writeRequestToStream,
  promptProcessing,
}: Props) {
  const [pin, setPin] = React.useState('');

  return (
    <Validation>
      {({ validator }) => (
        <>
          <Box mb={4}>
            <FieldInput
              width="220px"
              label="Enter the PIN for your security key"
              rule={requiredField('PIN is required')}
              type="password"
              value={pin}
              onChange={e => setPin(e.target.value.trim())}
              placeholder="1234"
              autoFocus
            />
          </Box>
          <Flex justifyContent="flex-end">
            <ButtonSecondary width={80} size="small" onClick={onCancel} mr={3}>
              Cancel
            </ButtonSecondary>
            <ButtonPrimary
              width={80}
              size="small"
              onClick={() => {
                if (!validator.validate()) return;
                writeRequestToStream({ pin });
              }}
              disabled={promptProcessing}
            >
              Next
            </ButtonPrimary>
          </Flex>
        </>
      )}
    </Validation>
  );
}

export type Props = {
  onCancel(): void;
  promptProcessing: boolean;
  passwordlessResponse: LoginPasswordlessResponse;
  writeRequestToStream: StreamLoginPasswordlessRequest;
};
