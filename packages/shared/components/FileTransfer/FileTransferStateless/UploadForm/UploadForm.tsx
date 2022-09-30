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

import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Text } from 'design';
import { NoteAdded } from 'design/Icon';

import { PathInput, Form } from '../CommonElements';

interface UploadFormProps {
  onAddUpload(destinationPath: string, file: File): void;
}

export function UploadForm(props: UploadFormProps) {
  const dropzoneRef = useRef<HTMLDivElement>();
  const fileSelectorRef = useRef<HTMLInputElement>();
  const [destinationPath, setDestinationPath] = useState('~/');

  function onFileSelected(e: React.ChangeEvent<HTMLInputElement>): void {
    upload(extractFilesFromFileList(e.target.files));
  }

  function extractFilesFromFileList(fileList: FileList): File[] {
    const filesAsArray: File[] = [];
    for (let i = 0; i < fileList.length; i++) {
      filesAsArray.push(fileList[i]);
    }
    return filesAsArray;
  }

  function upload(files: File[]): void {
    files.forEach(file => {
      props.onAddUpload(destinationPath, file);
    });
  }

  function handleOpenFilePicker(): void {
    // reset all selected files
    fileSelectorRef.current.value = '';
    fileSelectorRef.current.click();
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>): void {
    removeDropzoneStyle(e);

    const { files } = e.dataTransfer;
    e.preventDefault();
    e.stopPropagation();
    upload(extractFilesFromFileList(files));
  }

  function handleKeyDown(event: React.KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      handleOpenFilePicker();
    }
  }

  function addDropzoneStyle(e: React.DragEvent<HTMLDivElement>): void {
    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
  }

  function removeDropzoneStyle(e: React.DragEvent<HTMLDivElement>): void {
    e.currentTarget.style.removeProperty('background-color');
  }

  const isUploadDisabled = !destinationPath;

  return (
    <Form>
      <PathInput
        label="Upload destination"
        value={destinationPath}
        autoFocus
        onChange={e => setDestinationPath(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <input
        ref={fileSelectorRef}
        disabled={isUploadDisabled}
        type="file"
        data-testid="file-input"
        multiple
        css={`
          display: none;
        `}
        accept="*.*"
        onChange={onFileSelected}
      />
      <Dropzone
        disabled={isUploadDisabled}
        ref={dropzoneRef}
        onDragOver={e => {
          addDropzoneStyle(e);
          e.preventDefault();
        }}
        onDragLeave={e => {
          removeDropzoneStyle(e);
        }}
        onDrop={handleDrop}
        onClick={handleOpenFilePicker}
      >
        <NoteAdded fontSize={10} mb={2} />
        <Text typography="h6">Drag your files here</Text>
        <Text typography="body2">
          or Browse your computer to start uploading
        </Text>
      </Dropzone>
    </Form>
  );
}

const Dropzone = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.05);
  margin-top: ${props => props.theme.space[3]}px;
  border: 1px dashed rgba(255, 255, 255, 0.1);
  height: 128px;
  text-align: center;
  cursor: pointer;
  opacity: ${props => (props.disabled ? 0.7 : 1)};
  pointer-events: ${props => (props.disabled ? 'none' : 'unset')};
  border-radius: ${props => props.theme.radii[2]}px;
`;