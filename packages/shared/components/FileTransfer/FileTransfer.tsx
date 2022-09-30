/**
 * Copyright 2022 Gravitational, Inc.
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

import { useFileTransferContext } from './FileTransferContextProvider';
import { useFilesStore } from './useFilesStore';
import {
  FileTransferDialogDirection,
  FileTransferStateless,
  RunFileTransfer,
} from './FileTransferStateless';

interface FileTransferProps {
  backgroundColor?: string;
  transferHandlers: TransferHandlers;

  /**
   * `beforeClose` is called when an attempt to close the dialog was made
   * and there is a file transfer in progress.
   * Returning `true` will close the dialog, returning `false` will not.
   */
  beforeClose?(): Promise<boolean> | boolean;

  afterClose?(): void;
}

export interface TransferHandlers {
  getDownloader: (sourcePath: string) => Promise<RunFileTransfer | undefined>;
  getUploader: (
    destinationPath: string,
    file: File
  ) => Promise<RunFileTransfer | undefined>;
}

export function FileTransfer(props: FileTransferProps) {
  const { openedDialog, closeDialog } = useFileTransferContext();

  async function handleCloseDialog(
    isAnyTransferInProgress: boolean
  ): Promise<void> {
    const runCloseCallbacks = () => {
      closeDialog();
      props.afterClose?.();
    };

    if (!isAnyTransferInProgress) {
      runCloseCallbacks();
      return;
    }

    if (props.beforeClose ? await props.beforeClose() : true) {
      runCloseCallbacks();
    }
  }

  if (!openedDialog) {
    return null;
  }

  return (
    <FileTransferDialog
      openedDialog={openedDialog}
      backgroundColor={props.backgroundColor}
      transferHandlers={props.transferHandlers}
      onCloseDialog={handleCloseDialog}
    />
  );
}

export function FileTransferDialog(
  props: Pick<FileTransferProps, 'transferHandlers' | 'backgroundColor'> & {
    openedDialog: FileTransferDialogDirection;
    onCloseDialog(isAnyTransferInProgress: boolean): void;
  }
) {
  const filesStore = useFilesStore();

  async function handleAddDownload(sourcePath: string): Promise<void> {
    const runFileTransfer = await props.transferHandlers.getDownloader(
      sourcePath
    );
    if (runFileTransfer) {
      filesStore.add({
        name: sourcePath,
        runFileTransfer,
      });
    }
  }

  async function handleAddUpload(
    destinationPath: string,
    file: File
  ): Promise<void> {
    const runFileTransfer = await props.transferHandlers.getUploader(
      destinationPath,
      file
    );
    if (runFileTransfer) {
      filesStore.add({
        name: file.name,
        runFileTransfer,
      });
    }
  }

  function handleClose(): void {
    props.onCloseDialog(filesStore.isAnyTransferInProgress());
  }

  return (
    <FileTransferStateless
      openedDialog={props.openedDialog}
      files={filesStore.files}
      onStart={filesStore.start}
      onCancel={filesStore.cancel}
      backgroundColor={props.backgroundColor}
      onClose={handleClose}
      onAddUpload={handleAddUpload}
      onAddDownload={handleAddDownload}
    />
  );
}
