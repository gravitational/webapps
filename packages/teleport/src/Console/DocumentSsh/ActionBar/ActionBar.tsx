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
import * as Icons from 'design/Icon';
import { Flex, ButtonIcon } from 'design';

export default function ActionBar({
  isConnected,
  isDownloadOpen,
  isUploadOpen,
  onOpenDownload,
  onOpenUpload,
  onOpenShareSession,
}: Props) {
  const isScpDisabled = isDownloadOpen || isUploadOpen || !isConnected;

  return (
    <Flex flex="none" alignItems="center" height="24px">
      <ButtonIcon
        disabled={isScpDisabled}
        size={0}
        title="Download files"
        onClick={onOpenDownload}
      >
        <Icons.Download fontSize="16px" />
      </ButtonIcon>
      <ButtonIcon
        disabled={isScpDisabled}
        size={0}
        title="Upload files"
        onClick={onOpenUpload}
      >
        <Icons.Upload fontSize="16px" />
      </ButtonIcon>
      <ButtonIcon
        disabled={!isConnected}
        size={0}
        title="Share Session"
        onClick={onOpenShareSession}
      >
        <Icons.Share fontSize="13px" ml={1} />
      </ButtonIcon>
    </Flex>
  );
}

type Props = {
  isConnected: boolean;
  isDownloadOpen: boolean;
  isUploadOpen: boolean;
  onOpenDownload: () => void;
  onOpenUpload: () => void;
  onOpenShareSession: () => void;
};
