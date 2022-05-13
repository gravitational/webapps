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

import React from 'react';
import { Box, ButtonSecondary, Text, Image, Flex } from 'design';
import FieldInput from 'shared/components/FieldInput';
import LinearProgress from 'teleterm/ui/components/LinearProgress';
import Validation, { Validator } from 'shared/components/Validation';
import {
  requiredToken,
  requiredField,
} from 'shared/components/Validation/rules';

export function PromptName(props: Props) {
  const [name, setName] = React.useState('');
  return (
    <Validation>
      {({ validator }) => (
        <Flex
          flex="1"
          minHeight="40px"
          px={3}
          py={3}
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box mb={4} style={{ position: 'relative' }}>
            <FieldInput
              width="60%"
              label="Enter your name"
              rule={requiredField}
              autoComplete="one-time-code"
              inputMode="numeric"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="name"
              mb={4}
              autoFocus
            />
            <LinearProgress />
          </Box>
          <Flex>
            <ButtonSecondary
              width={80}
              size="small"
              onClick={() => {
                console.log('---- pin: ', name);
                props.onLoginWithPwdless();
              }}
              mr={4}
            >
              Continue
            </ButtonSecondary>
            <ButtonSecondary width={80} size="small" onClick={props.onCancel}>
              Cancel
            </ButtonSecondary>
          </Flex>
        </Flex>
      )}
    </Validation>
  );
}

export type Props = {
  onCancel(): void;
  pinCallback(text: string): void;
};
