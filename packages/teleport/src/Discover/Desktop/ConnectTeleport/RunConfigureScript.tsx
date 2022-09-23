import React from 'react';
import styled from 'styled-components';

import * as Icons from 'design/Icon';

import { ButtonPrimary } from 'design/Button';
import { Text } from 'design';

import {
  StepContent,
  StepInstructions,
  StepTitle,
  StepTitleIcon,
} from 'teleport/Discover/Desktop/ConnectTeleport/Step';
import TextSelectCopy from 'teleport/components/TextSelectCopy';
import { generateCommand } from 'teleport/Discover/Shared/generateCommand';

import cfg from 'teleport/config';
import { Timeout } from 'teleport/Discover/Desktop/ConnectTeleport/Timeout';
import { useJoinToken } from 'teleport/Discover/Desktop/ConnectTeleport/JoinTokenContext';

import loading from './run-configure-script-loading.svg';

interface RunConfigureScriptProps {
  onNext: () => void;
}

export function RunConfigureScript(
  props: React.PropsWithChildren<RunConfigureScriptProps>
) {
  const { joinToken, reloadJoinToken, timeout, timedOut } = useJoinToken();

  let content;
  if (timedOut) {
    content = (
      <StepInstructions>
        <Text>That script expired.</Text>

        <ButtonPrimary onClick={reloadJoinToken}>
          Generate another
        </ButtonPrimary>
      </StepInstructions>
    );
  } else {
    const command = generateCommand(cfg.getConfigureADUrl(joinToken.id));

    content = (
      <StepInstructions>
        <TextSelectCopy text={command} mt={2} mb={5} bash allowMultiline />

        <ButtonPrimary onClick={() => props.onNext()}>
          I've ran it
        </ButtonPrimary>

        <Timeout timeout={timeout} />
      </StepInstructions>
    );
  }

  return (
    <StepContent>
      <StepTitle>
        <StepTitleIcon>
          <Icons.Terminal />
        </StepTitleIcon>
        1. Run the configure Active Directory script
      </StepTitle>

      {content}
    </StepContent>
  );
}

export function RunConfigureScriptLoading() {
  return (
    <StepContent>
      <StepTitle>
        <StepTitleIcon>
          <Icons.Terminal />
        </StepTitleIcon>
        1. Run the configure Active Directory script
      </StepTitle>

      <StepInstructions>
        <LoadingBox />
      </StepInstructions>
    </StepContent>
  );
}

const LoadingBox = styled.div`
  width: 340px;
  height: 84px;
  background: url(${loading}) no-repeat;
`;
