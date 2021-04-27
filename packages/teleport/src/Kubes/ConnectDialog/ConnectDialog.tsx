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
import Dialog, {
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from 'design/Dialog';
import { Text, Box, ButtonSecondary } from 'design';
import cfg from 'teleport/config';
import TextSelectCopy from 'teleport/components/TextSelectCopy';

function ConnectDialog(props: Props) {
  const { onClose, user, kubeConnectName } = props;
  const { hostname, port } = window.document.location;
  const host = `${hostname}:${port || '443'}`;

  return (
    <Dialog
      dialogCss={dialogCss}
      disableEscapeKeyDown={false}
      onClose={onClose}
      open={true}
    >
      <DialogHeader>
        <DialogTitle>connect to kubernetes cluster</DialogTitle>
      </DialogHeader>
      <DialogContent>
        <Box mb={4}>
          <Text bold as="span">
            Step 1
          </Text>
          {' - Login to Teleport'}
          <TextSelectCopy
            mt="2"
            text={`tsh login --proxy=${host} --auth=${cfg.getAuthType()} --user=${user}`}
          />
        </Box>
        <Box mb={4}>
          <Text bold as="span">
            *Step 2
          </Text>
          {' - Select the kubernetes cluster'}
          <TextSelectCopy mt="2" text={`tsh kube login ${kubeConnectName}`} />
        </Box>
        <Box mb={4}>
          <Text bold as="span">
            Step 3
          </Text>
          {' - Connect to the kubernetes cluster'}
          <TextSelectCopy mt="2" text={`kubectl get pods`} />
        </Box>
        <Box>
          * Note: To write kubectl configuration to a separate file instead of
          having your global kubectl configuration modified, run the following
          command, before running step 2:
          <TextSelectCopy
            mt="2"
            text="export KUBECONFIG=${HOME?}/teleport-kubeconfig.yaml"
          />
        </Box>
      </DialogContent>
      <DialogFooter>
        <ButtonSecondary onClick={onClose}>Close</ButtonSecondary>
      </DialogFooter>
    </Dialog>
  );
}

type Props = {
  onClose: () => void;
  user: string;
  kubeConnectName: string;
};

const dialogCss = () => `
  min-height: 400px;
  max-width: 600px;
  width: 100%;
`;

export default ConnectDialog;
