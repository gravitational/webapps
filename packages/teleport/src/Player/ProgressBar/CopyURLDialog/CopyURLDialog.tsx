import Dialog, {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'design/Dialog';
import TextSelectCopy from 'teleport/components/TextSelectCopy';
import React from 'react';
import { ButtonSecondary, Text } from 'design';

export type CopyURLDialogParams = {
  onClose: () => void;
  open: boolean;
  dialogTitle?: React.ReactNode;
  contentText?: React.ReactNode;
  url: string;
};

export function CopyURLDialog(props: CopyURLDialogParams) {
  return (
    <Dialog
      onClose={props.onClose}
      open={props.open}
      dialogCss={() => ({ maxWidth: '500px', width: '100%' })}
    >
      <DialogHeader>
        <DialogTitle>{props.dialogTitle}</DialogTitle>
      </DialogHeader>
      <DialogContent>
        <Text mb={2} mt={1}>
          {props.contentText}
        </Text>
        <TextSelectCopy text={props.url} bash={false} />
      </DialogContent>
      <DialogFooter>
        {/* eslint-disable-next-line react/jsx-no-undef */}
        <ButtonSecondary onClick={props.onClose}>Close</ButtonSecondary>
        <ButtonSecondary
          style={{ marginLeft: '10px' }}
          onClick={() => window.open(props.url)}
        >
          Open in new Tab
        </ButtonSecondary>
      </DialogFooter>
    </Dialog>
  );
}
