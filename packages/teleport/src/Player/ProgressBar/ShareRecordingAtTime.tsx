import { useState } from 'shared/hooks';
import * as Icons from 'design/Icon';
import React from 'react';
import { ActionButton } from 'teleport/Player/ProgressBar/ActionButton';
import styled from 'styled-components';
import { CopyURLDialog } from 'teleport/Player/ProgressBar/CopyURLDialog/CopyURLDialog';

type ShareRecordingAtTimeParams = {
  url: string;
  displayTime: string;
  isPlaying: boolean;
  toggle: () => void;
};

export function ShareRecordingAtTime(props: ShareRecordingAtTimeParams) {
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
    if (wasPlaying && !props.isPlaying) {
      props.toggle();
    }
  };
  return (
    <StyledShareRecording className="ShareRecordingAtTime">
      <ActionButton
        onClick={onDialogOpen}
        className="open-share-recording-dialog"
      >
        <Icons.Link />
      </ActionButton>
      <CopyURLDialog
        url={props.url}
        onClose={onDialogClose}
        open={open}
        dialogTitle={<>Share Recording - {props.displayTime}</>}
        contentText="
            Share this URL with the person you want to share this session
            recording at current playback time. This person must have access to
            this recording to be able to view this session.
          "
      />
    </StyledShareRecording>
  );
}

const StyledShareRecording = styled.div``;
