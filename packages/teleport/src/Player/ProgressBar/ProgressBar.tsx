/*
Copyright 2019 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from 'react';
import styled from 'styled-components';
import * as Icons from 'design/Icon';
import { colors } from 'teleport/Console/colors';
import Slider from './Slider';
import { useState } from 'shared/hooks';
import Dialog, {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'design/Dialog';
import TextSelectCopy from 'teleport/components/TextSelectCopy';
import { Text, ButtonSecondary } from 'design';

function ShareRecordingAtTime(props: {
  url: string;
  time: string;
  onOpen: () => void;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);
  const onDialogOpen = () => {
    setOpen(true);
    props.onOpen();
  };
  const onDialogClose = () => {
    setOpen(false);
    props.onClose();
  };
  return (
    <StyledShareRecording>
      <ActionButton onClick={onDialogOpen}>
        <Icons.Link />
      </ActionButton>
      <Dialog
        dialogCss={() => ({ maxWidth: '500px', width: '100%' })}
        disableEscapeKeyDown={false}
        onClose={onDialogClose}
        open={open}
      >
        <DialogHeader>
          <DialogTitle>Share Recording - {props.time}</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <Text mb={2} mt={1}>
            Share this URL with the person you want to share this session
            recording at current playback time. This person must have access to
            this recording to be able to view this session.
          </Text>
          <TextSelectCopy text={props.url} bash={false} />
        </DialogContent>
        <DialogFooter>
          <ButtonSecondary onClick={onDialogClose}>Close</ButtonSecondary>
        </DialogFooter>
      </Dialog>
    </StyledShareRecording>
  );
}

export default function ProgressBar(props: ProgressBarProps) {
  const Icon = props.isPlaying ? Icons.CirclePause : Icons.CirclePlay;
  return (
    <StyledProgressBar>
      <ActionButton onClick={props.toggle}>
        <Icon />
      </ActionButton>
      <TimeText>{props.time}</TimeText>
      <SliderContainer>
        <Slider
          min={props.min}
          max={props.max}
          value={props.current}
          onChange={props.move}
          defaultValue={1}
          withBars
          className="grv-slider"
        />
      </SliderContainer>
      <ShareRecordingAtTime
        time={props.time}
        url={props.url}
        onOpen={() => props.isPlaying && props.toggle()}
        onClose={() => !props.isPlaying && props.toggle()}
      />
    </StyledProgressBar>
  );
}

export type ProgressBarProps = {
  max: number;
  min: number;
  time: any;
  isPlaying: boolean;
  current: number;
  move: (value: any) => void;
  toggle: () => void;
  url: string;
};

const SliderContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const TimeText = styled.div(
  props => `
  text-align: center;
  font-family: ${props.theme.fonts.mono};
  font-size: ${props.theme.fontSizes[1]}px;
  line-height: 24px;
  width: 80px;
  opacity: 0.56;
`
);

const StyledShareRecording = styled.div`
  padding-left: 20px;
`;

const ActionButton = styled.button`
  background: ${colors.dark};
  border: none;
  color: ${colors.light};
  cursor: pointer;
  font-size: 24px;
  height: 24px;
  outline: none;
  opacity: 0.87;
  padding: 0;
  text-align: center;
  transition: all 0.3s;
  width: 24px;

  &:hover {
    opacity: 1;

    .icon {
      color: ${colors.progressBarColor};
    }
  }

  .icon {
    height: 24px;
    width: 24px;
  }
`;

const StyledProgressBar = styled.div`
  background-color: ${colors.dark};
  display: flex;
  color: ${colors.light};
  padding: 16px;

  .grv-slider {
    display: block;
    padding: 0;
    height: 24px;
  }

  .grv-slider .bar {
    border-radius: 200px;
    height: 8px;
    margin: 8px 0;
  }

  .grv-slider .handle {
    background-color: ${colors.light};
    border-radius: 200px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.12), 0 4px 4px rgba(0, 0, 0, 0.24);
    width: 16px;
    height: 16px;
    left: -8px;
    top: 4px;
  }

  .grv-slider .bar-0 {
    background-color: ${colors.success};
    box-shadow: none;
  }

  .grv-slider .bar-1 {
    background-color: ${colors.text};
  }
`;
