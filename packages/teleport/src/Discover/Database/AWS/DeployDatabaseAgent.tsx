import React, { useState } from 'react';

import { Box, Text } from 'design';

import {
  ActionButtons,
  Header,
  HeaderSubtitle,
  LabelsCreater,
} from 'teleport/Discover/Shared';
import TextSelectCopy from 'teleport/components/TextSelectCopy';
import { AgentLabel } from 'teleport/services/agents';
import Validation from 'shared/components/Validation';
import styled from 'styled-components';

interface DeployDatabaseAgentProps {
  nextStep(): void;
}

const command = `sudo bash -c "$(curl https://go.teleport/script)"`;

const ScriptBox = styled(Box)`
  border-radius: 8px;
  background: rgb(12, 20, 61);
  margin-top: 20px;
  padding: 18px 25px 1px;
`;

export function DeployDatabaseAgent(props: DeployDatabaseAgentProps) {
  const [labels, setLabels] = useState<AgentLabel[]>([
    { name: '"*"', value: '"*"' },
  ]);

  return (
    <Validation>
      {({ validator }) => (
        <Box>
          <Header>Deploy a Database Agent</Header>
          <HeaderSubtitle>Sub-title text goes here</HeaderSubtitle>

          <Box>
            <Text bold>Labels (optional)</Text>
            <LabelsCreater
              labels={labels}
              setLabels={setLabels}
              isLabelOptional={true}
            />
          </Box>

          <ScriptBox>
            <Text bold>Script Title Goes Here</Text>

            <TextSelectCopy text={command} mt={2} mb={5} bash />
          </ScriptBox>

          <ActionButtons onProceed={() => props.nextStep()} />
        </Box>
      )}
    </Validation>
  );
}
