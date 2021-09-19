import { useState } from 'shared/hooks';
import * as Icons from 'design/Icon';
import Dialog, {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'design/Dialog';
import TextSelectCopy from 'teleport/components/TextSelectCopy';
import React from 'react';
import { ActionButton } from 'teleport/Player/ProgressBar/ActionButton';
import { ButtonSecondary, Text } from 'design';
import styled from 'styled-components';

export function ShareRecordingAtTime(props: {
  url: string;
  time: string;
  isPlaying: boolean;
  toggle: () => void;
}) {
  const [wasPlaying, setWasPlaying] = useState(false);
  const [open, setOpen] = useState(false);
  const onDialogOpen = () => {
    setWasPlaying(props.isPlaying);
    if (props.isPlaying) {
      props.toggle();
    }

    setOpen(true);
  };
  const onDialogClose = () => {
    setOpen(false);
    if (wasPlaying) {
      props.toggle();
    }
  };
  return (
    <StyledShareRecording className="ShareRecordingAtTime">
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
          <ButtonSecondary
            style={{ marginLeft: '10px' }}
            onClick={() => window.open(props.url)}
          >
            Open in new Tab
          </ButtonSecondary>
        </DialogFooter>
      </Dialog>
    </StyledShareRecording>
  );
}

const StyledShareRecording = styled.div``;
