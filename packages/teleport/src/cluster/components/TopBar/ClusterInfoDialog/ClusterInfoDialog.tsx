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
import { Text, Flex, ButtonPrimary } from 'design';
import Dialog, {
  DialogFooter,
  DialogTitle,
  DialogContent,
  DialogHeader,
} from 'design/DialogConfirmation';

type Props = {
  onClose: () => void;
  clusterId: string;
  authVersion: string;
};

const ClusterInfoDialog = ({ onClose, clusterId, authVersion }: Props) => {
  return (
    <Dialog
      open={true}
      disableEscapeKeyDown={false}
      onClose={onClose}
      dialogCss={dialogCss}
    >
      <DialogHeader>
        <DialogTitle>Cluster Information</DialogTitle>
      </DialogHeader>
      <DialogContent mt={3}>
        <Attribute title="Cluster Name" value={clusterId} />
        <Attribute title="Auth Service Version" value={authVersion} />
      </DialogContent>
      <DialogFooter>
        <ButtonPrimary onClick={onClose}>Done</ButtonPrimary>
      </DialogFooter>
    </Dialog>
  );
};

const dialogCss = () => `
  max-width: 600px;
  minWidth: 400px;
  width: 100%;
`;

const Attribute = ({ title = '', value = null }) => (
  <Flex mb={3}>
    <Text typography="body2" bold style={{ width: '150px' }}>
      {title}:
    </Text>
    <Text typography="body2">{value}</Text>
  </Flex>
);

export default ClusterInfoDialog;
