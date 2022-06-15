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

import React, { useRef } from 'react';
import { Box, ButtonPrimary, Flex, Link, Text } from 'design';
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
import TextSelectCopy from 'teleport/components/TextSelectCopy';
import { ChooseBinary } from './ChooseBinary';

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
  const [newFlow, setNewFlow] =
    React.useState<{ flow: JoinMethod; applyNextAnimation?: boolean }>();
  const [flow, setFlow] = React.useState<JoinMethod>(method);
  const labelsRef = React.useRef<string[]>([]);

  function onSwitchFlow(flow: JoinMethod) {
    setFlow(flow);
  }

  const flows = {
    aws: [IAMRoles, AssignLabelsWrap, ScriptDisplayWrap],
    automatically: [AssignLabelsWrap, ScriptDisplayWrap],
    manually: [ChooseBinaryWrap, AssignLabelsWrap, ManualCommandsWrap],
  };
  const slideTabs = ['AWS', 'Automatically', 'Manually'];

  function AssignLabelsWrap({ next, refCallback }: SliderProps<JoinMethod>) {
    return (
      <AssignLabels
        next={() => {
          next();
        }}
        refCallback={refCallback}
        onChange={labels => {
          labelsRef.current = labels;
        }}
      />
    );
  }

  function ChooseBinaryWrap({ next, refCallback }: SliderProps<JoinMethod>) {
    return (
      <ChooseBinary
        next={next}
        refCallback={refCallback}
        isEnterprise={isEnterprise}
        version={version}
      />
    );
  }

  function ScriptDisplayWrap({ refCallback }: SliderProps<JoinMethod>) {
    return <ScriptDisplay onClose={onClose} refCallback={refCallback} />;
  }

  function ManualCommandsWrap({ refCallback }: SliderProps<JoinMethod>) {
    return <ManualCommands onClose={onClose} refCallback={refCallback} />;
  }

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
              setNewFlow({
                flow: slideTabs[index].toLowerCase() as JoinMethod,
              });
            }}
          />
        </Box>
        <StepSlider<typeof flows>
          flows={flows}
          currFlow={flow}
          onSwitchFlow={onSwitchFlow}
          newFlow={newFlow}
        />
      </Flex>
    </Dialog>
  );
}

type Props = {
  onClose(): void;
};

function ScriptDisplay({ refCallback, onClose }: ScriptDisplayProps) {
  return (
    <Box ref={refCallback}>
      <Text>
        Use the script below to add a server to your cluster. This script will
        install the Teleport agent to provide secure access to your server.
      </Text>
      <Text bold mt={3}>
        The script will be valid for 4 hours.
      </Text>
      <TextSelectCopy mt={2} mb={3} text={'Some command text'} />
      <NextButton next={onClose} label="Back to servers" />
    </Box>
  );
}

type ScriptDisplayProps = {
  refCallback(node: HTMLElement): void;
  onClose(): void;
};

function ManualCommands({ onClose, refCallback }: ManualCommandsProps) {
  return (
    <Box ref={refCallback}>
      <Text bold as="span">
        Step 3
      </Text>{' '}
      <Text as="span">- Teleport Configure</Text>
      <TextSelectCopy text="Some teleport configure command" mt={2} mb={3} />
      <Text bold as="span">
        Step 4
      </Text>{' '}
      <Text as="span">- Teleport Start</Text>
      <TextSelectCopy text="Some teleport start command" mt={2} mb={3} />
      <NextButton next={onClose} label="Back to Servers" />
    </Box>
  );
}

type ManualCommandsProps = {
  refCallback(node: HTMLElement): void;
  onClose(): void;
};

function IAMRoles({ next, refCallback }: SliderProps<JoinMethod>) {
  return <Aws refCallback={refCallback} next={next} />;
}

function AssignLabels({ next, refCallback, onChange }: AssignLabelProps) {
  return (
    <Box ref={refCallback}>
      <Box mb={3}>
        <LabelSelector onChange={onChange} />
      </Box>
      <NextButton next={next} label="Generate Script" />
    </Box>
  );
}

type AssignLabelProps = {
  next(): void;
  refCallback(node: HTMLElement): void;
  onChange(labels: string[]): void;
};
