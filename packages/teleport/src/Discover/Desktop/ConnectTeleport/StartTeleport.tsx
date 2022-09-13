import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import logoSrc from 'design/assets/images/teleport-medallion.svg';

import { Text } from 'design';
import {
  StepContent,
  StepInstructions,
  StepTitle,
  StepTitleIcon,
} from 'teleport/Discover/Desktop/ConnectTeleport/Step';
import { ButtonPrimary } from 'design/Button';

interface StartTeleportProps {
  onNext: () => void;
  connected: boolean;
}

export function StartTeleport(
  props: React.PropsWithChildren<StartTeleportProps>
) {
  return (
    <StepContent>
      <StepTitle>
        <StepTitleIcon>
          <TeleportIcon />
        </StepTitleIcon>
        4. Start Teleport
      </StepTitle>

      <StepInstructions>
        <Text mb={4}>Once you've started Teleport, we'll detect it here.</Text>

        <ButtonPrimary
          disabled={!props.connected}
          onClick={() => props.onNext()}
        >
          Next
        </ButtonPrimary>
      </StepInstructions>
    </StepContent>
  );
}

const TeleportIcon = styled.div`
  width: 30px;
  height: 30px;
  background: url(${logoSrc}) no-repeat;
  background-size: contain;
  top: 1px;
  position: relative;
`;
