/**
 * Copyright 2020 Gravitational, Inc.
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
import { Box, ButtonPrimary, Flex, Text } from 'design';
import useTeleport from 'teleport/useTeleport';
import Dialog, { DialogHeader } from 'design/Dialog';
import StepSlider, { SliderProps } from 'teleport/components/StepSlider';
import Manually from './Manually';
import Automatically from './Automatically';
import { Aws } from './Aws';
import SlideTabs from 'design/SlideTabs';
import useAddNode, { State, JoinMethod } from './useAddNode';
import { LabelSelector } from 'teleport/components/LabelSelector';
import NextButton from './NextButton';

export default function Container(props: Props) {
  const ctx = useTeleport();
  const state = useAddNode(ctx);
  return <AddNode {...state} {...props} />;
}

export function AddNode({
  isEnterprise,
  user,
  onClose,
  createJoinToken,
  method,
  setMethod,
  version,
  attempt,
  isAuthTypeLocal,
  token,
}: Props & State) {
  function IAMRoles({ next, refCallback }: SliderProps) {
    return <Aws refCallback={refCallback} next={next} />;
  }

  function AssignLabels({ next, refCallback }: SliderProps) {
    return (
      <Box ref={refCallback}>
        <LabelSelector onChange={() => {}} />
        <NextButton next={next} />
      </Box>
    );
  }

  const flows = {
    aws: [IAMRoles, AssignLabels, ScriptDisplay],
    automatically: [AssignLabels, ScriptDisplay],
    manually: [ChooseBinary, AssignLabels, ManualCommands],
  };

  const slideTabs = ['AWS', 'Automatically', 'Manually'];

  return (
    <Dialog
      dialogCss={() => ({
        maxWidth: '600px',
        width: '100%',
      })}
      disableEscapeKeyDown={false}
      onClose={onClose}
      open={true}
    >
      <DialogHeader onClose={onClose}>
        <Text typography="h4" color="text.primary">
          Add Server
        </Text>
      </DialogHeader>
      <Flex flex="1" flexDirection="column">
        <Box mb={4}>
          <SlideTabs
            tabs={slideTabs}
            onChange={index => {
              setMethod(slideTabs[index].toLowerCase() as JoinMethod);
            }}
          />
        </Box>
        <StepSlider<typeof flows>
          flows={flows}
          currFlow={method}
          onSwitchFlow={setMethod}
        />
      </Flex>
    </Dialog>
  );
}

type Props = {
  onClose(): void;
};

function ScriptDisplay({ refCallback }: SliderProps) {
  return <Box ref={refCallback}>Script Display</Box>;
}

function ChooseBinary({ next, refCallback }: SliderProps) {
  return (
    <Box ref={refCallback}>
      Choose Binary
      <ButtonPrimary
        onClick={e => {
          e.preventDefault();
          next();
        }}
      >
        Next
      </ButtonPrimary>
    </Box>
  );
}

function ManualCommands({ refCallback }: SliderProps) {
  return <Box ref={refCallback}>Manual Commands</Box>;
}
