import React from 'react';
import styled from 'styled-components';

import { Text } from 'design';
import TextSelectCopy from 'teleport/components/TextSelectCopy';

interface StepProps {
  stepNumber?: number;
  title: string;
  text: string;
  isBash?: boolean;
}

export function Step(props: StepProps) {
  let prefix;
  if (props.stepNumber) {
    prefix = `Step ${props.stepNumber}: `;
  }

  return (
    <StepContainer>
      <Text bold>
        {prefix}
        {props.title}
      </Text>

      <TextSelectCopy text={props.text} mt={2} mb={1} bash={props.isBash} />
    </StepContainer>
  );
}

const StepContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
`;
