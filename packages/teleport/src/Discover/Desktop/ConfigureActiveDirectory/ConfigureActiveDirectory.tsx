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

import { Text, Box } from 'design';

import cfg from 'teleport/config';


import { ActionButtons, Header, Step } from 'teleport/Discover/Shared';

import { State } from 'teleport/Discover/useDiscover';

import { ToggleAnswer } from './ToggleAnswer';

function generateCommand(url: string) {
  return `(Invoke-WebRequest -Uri ${url}).Content | Invoke-Expression`;
}

const installActiveDirectorySteps = [
  {
    title: 'Install Active Directory',
    command: generateCommand(cfg.getInstallADDSPath()),
  },
  {
    title: 'Install AD Certificate Services',
    command: generateCommand(cfg.getInstallADCSPath()),
  },
];

const configureDesktopAccessStep = {
  title: 'Configure Desktop Access',
  command: generateCommand(cfg.getConfigureADUrl()),
};

export function ConfigureActiveDirectory(props: State) {
  const [hasActiveDirectory, setHasActiveDirectory] = useState<boolean>(null);

  return (
    <Box>
      <Header>Configure Active Directory</Header>

      <Text>
        Install and configure the Teleport SSH Service on the server you want to
        add.
      </Text>

      <ActiveDirectoryQuestionContainer>
        <Text>
          Have you already set up an Active Directory domain and Certificate
          Services?
        </Text>

        <ToggleAnswer
          value={hasActiveDirectory}
          onSelect={setHasActiveDirectory}
        />
      </ActiveDirectoryQuestionContainer>

      {getSteps(hasActiveDirectory)}

      <ActionButtons
        onProceed={() => props.nextStep()}
        disableProceed={hasActiveDirectory === null}
      />
    </Box>
  );
}

function getSteps(hasActiveDirectory: boolean) {
  if (hasActiveDirectory === null) {
    return [];
  }

  const steps = [configureDesktopAccessStep];
  if (!hasActiveDirectory) {
    steps.unshift(...installActiveDirectorySteps);
  }

  return steps.map((step, index) => (
    <Step
      key={index}
      stepNumber={index + 1}
      title={step.title}
      text={step.command}
    />
  ));
}

const ActiveDirectoryQuestionContainer = styled.div`
  background: ${p => p.theme.colors.primary.light};
  display: flex;
  justify-content: space-between;
  padding: 16px 24px;
  border-radius: 8px;
  margin: 32px 0;
  align-items: center;
`;
