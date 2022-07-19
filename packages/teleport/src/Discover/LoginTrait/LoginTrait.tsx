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
import { Flex, ButtonPrimary, ButtonText, Text, Box, Indicator } from 'design';
import { Danger } from 'design/Alert';
import * as Icons from 'design/Icon';
import FieldInput from 'shared/components/FieldInput';
import Validation from 'shared/components/Validation';
import { Header, CancelButton } from '../Shared';
import type { AgentStepProps } from '../Shared';
import { useDiscoverContext } from '../discoverContextProvider';
import { useLoginTrait, State } from './useLoginTrait';

export default function Container(props: AgentStepProps) {
  const ctx = useDiscoverContext();
  const state = useLoginTrait({ ctx, props });

  return <LoginTrait {...state} />;
}

export function LoginTrait({
  attempt,
  nextStep,
  loginMap,
  toggleLoginSelect,
  addLogin,
}: State) {
  const [newLogin, setNewLogin] = useState('');
  const [showInputBox, setShowInputBox] = useState(false);

  return (
    <Box>
      <Header>Set Up Access</Header>
      {attempt.status === 'processing' && (
        <Box textAlign="center" m={10}>
          <Indicator />
        </Box>
      )}
      {attempt.status === 'failed' && <Danger>{attempt.statusText}</Danger>}
      {attempt.status === 'success' && (
        <>
          <Text bold mb={2}>
            Select or Add Linux Principles
          </Text>
          <Box mb={6}>
            {Object.keys(loginMap).map((login, index) => {
              return (
                <Flex
                  key={index}
                  p={2}
                  mb={1}
                  borderRadius={2}
                  width="300px"
                  alignItems="center"
                  borderColor="colors.primary.light"
                  css={`
                    border: 1px solid
                      ${props => props.theme.colors.primary.light};
                  `}
                >
                  <input
                    type="checkbox"
                    name={login}
                    checked={loginMap[login]}
                    css={`
                      margin-right: 10px;
                      accent-color: ${props =>
                        props.theme.colors.secondary.main};
                      &:hover {
                        cursor: pointer;
                      }
                    `}
                    onChange={() => toggleLoginSelect(login)}
                  />
                  <label
                    htmlFor={login}
                    css={`
                      width: 250px;
                      overflow: hidden;
                      text-overflow: ellipsis;
                    `}
                  >
                    {login}
                  </label>
                </Flex>
              );
            })}
            {showInputBox && (
              <Flex alignItems="end" mt={3}>
                <Validation>
                  <FieldInput
                    placeholder="name"
                    autoFocus
                    width="200px"
                    value={newLogin}
                    type="text"
                    onChange={e => setNewLogin(e.target.value.trim())}
                    mr={3}
                    mb={0}
                  />
                  <ButtonPrimary
                    size="small"
                    mb={2}
                    disabled={newLogin.length === 0}
                    onClick={() => {
                      addLogin(newLogin);
                      setNewLogin('');
                      setShowInputBox(false);
                    }}
                  >
                    Add
                  </ButtonPrimary>
                </Validation>
              </Flex>
            )}
            {!showInputBox && (
              <ButtonText
                mt={2}
                onClick={() => setShowInputBox(true)}
                css={`
                  line-height: normal;
                  padding-left: 4px;
                `}
              >
                <Icons.Add
                  css={`
                    font-weight: bold;
                    letter-spacing: 4px;
                    &:after {
                      content: ' ';
                    }
                  `}
                />
                Add New Principle
              </ButtonText>
            )}
          </Box>
          <ButtonPrimary
            width="165px"
            onClick={() => {
              let checkedLogins = Object.keys(loginMap).filter(login =>
                loginMap[login] ? login : false
              );
              nextStep(checkedLogins);
            }}
            mr={3}
          >
            Proceed
          </ButtonPrimary>
          <CancelButton />
        </>
      )}
    </Box>
  );
}
