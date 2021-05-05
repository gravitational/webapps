/*
Copyright 2021 Gravitational, Inc.

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
import { Flex } from 'design';
import Dialog, { DialogTitle } from 'design/Dialog';
import { DbInfo } from '../DatabaseList/DatabaseList';
import ConnectInstructions from './ConnectInstructions';

export default function ConnectDatabase({
  user,
  clusterId,
  dbConnectInfo,
  onClose,
}: Props) {
  return (
    <Dialog
      dialogCss={() => ({
        maxWidth: '600px',
        width: '100%',
        minHeight: '330px',
      })}
      disableEscapeKeyDown={false}
      onClose={onClose}
      open={true}
    >
      <Flex flex="1" flexDirection="column">
        <Flex alignItems="center" justifyContent="space-between" mb="4">
          <DialogTitle mr="auto">Connect To Database</DialogTitle>
        </Flex>
        <ConnectInstructions
          user={user}
          clusterId={clusterId}
          dbInfo={dbConnectInfo}
          onClose={onClose}
        />
      </Flex>
    </Dialog>
  );
}

type Props = {
  dbConnectInfo: DbInfo;
  onClose: () => void;
  user: string;
  clusterId: string;
};
