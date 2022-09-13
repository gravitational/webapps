import React from 'react';

import * as Icons from 'design/Icon';

import { ButtonPrimary } from 'design/Button';

import {
  StepContent,
  StepInstructions,
  StepTitle,
  StepTitleIcon,
} from 'teleport/Discover/Desktop/ConnectTeleport/Step';
import TextSelectCopy from 'teleport/components/TextSelectCopy';
import { generateCommand } from 'teleport/Discover/Shared/generateCommand';

import cfg from 'teleport/config';

interface RunConfigureScriptProps {
  onNext: () => void;
  token: string;
}

export function RunConfigureScript(
  props: React.PropsWithChildren<RunConfigureScriptProps>
) {
  const command = generateCommand(cfg.getConfigureADUrl(props.token));

  return (
    <StepContent>
      <StepTitle>
        <StepTitleIcon>
          <Icons.Terminal />
        </StepTitleIcon>
        1. Run the configure Active Directory script
      </StepTitle>

      <StepInstructions>
        <TextSelectCopy text={command} mt={2} mb={5} bash allowMultiline />

        <ButtonPrimary onClick={() => props.onNext()}>
          I've ran it
        </ButtonPrimary>
      </StepInstructions>
    </StepContent>
  );
}
