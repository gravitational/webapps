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
