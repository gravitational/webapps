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

function ShareRecordingElement(props: {
  onClick: () => void;
  url: string;
  onClose: () => void;
  open: boolean;
  dialogTitle: string;
}) {
  return (
    <StyledShareRecording className="ShareRecordingAtTime">
      <ActionButton
        onClick={props.onClick}
        className="open-share-recording-dialog"
      >
        <Icons.Link />
      </ActionButton>
      <CopyURLDialog
        url={props.url}
        onClose={props.onClose}
        open={props.open}
        dialogTitle={<>Share Recording - {props.dialogTitle}</>}
        contentText="
            Share this URL with the person you want to share this session
            recording at current playback time. This person must have access to
            this recording to be able to view this session.
          "
      />
    </StyledShareRecording>
  );
}

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
    <ShareRecordingElement
      onClick={onDialogOpen}
      url={props.url}
      onClose={onDialogClose}
      open={open}
      dialogTitle={props.displayTime}
    />
  );
}

const StyledShareRecording = styled.div``;
