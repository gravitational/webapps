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
import styled from 'styled-components';
import copyToClipboard from 'design/utils/copyToClipboard';
import selectElementContent from 'design/utils/selectElementContent';
import Dialog, {
  DialogFooter,
  DialogTitle,
  DialogContent,
  DialogHeader,
} from 'design/DialogConfirmation';
import {
  Text,
  Box,
  Flex,
  LabelInput,
  ButtonSecondary,
  ButtonPrimary,
} from 'design';

type ClusterInfoDialogProps = {
  onClose: () => void;
  clusterId: string;
  publicURL: string;
  authVersion: string;
  proxyVersion: string;
};

const ClusterInfoDialog: React.FC<ClusterInfoDialogProps> = ({
  onClose,
  clusterId,
  publicURL,
  authVersion,
  proxyVersion,
}) => {
  return (
    <Dialog disableEscapeKeyDown={false} onClose={onClose} open={true}>
      <Box width="600px">
        <DialogHeader>
          <DialogTitle>Cluster Information</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <LabelInput>Public URL</LabelInput>
          <BoxUrl url={publicURL} />
          <StyledInfoRows>
            <dt>Cluster Name:</dt><dd>{clusterId}</dd>
            <dt>Auth Service Version:</dt><dd>{authVersion}</dd>
            <dt>Proxy Service Version:</dt><dd>{proxyVersion}</dd>
          </StyledInfoRows>
        </DialogContent>
        <DialogFooter>
          <ButtonPrimary onClick={onClose}>Done</ButtonPrimary>
        </DialogFooter>
      </Box>
    </Dialog>
  );
};


const StyledInfoRows = styled.dl`
  margin: 0;
  padding: 0; 
  font-size: 12px; 

  dt, dd{
    font-size: 12px; 
    display: block;
    margin-bottom: 8px; 
    line-height: 24px; 
  }

  dt {
    font-weight: bold; 
    float: left;
    margin-right: 16px; 
  }
`

const BoxUrl = ({ url = '' }) => {
  const ref = React.useRef();
  const [copyCmd, setCopyCmd] = React.useState(() => 'Copy');

  function onCopyClick() {
    copyToClipboard(url).then(() => setCopyCmd('Copied'));
    selectElementContent(ref.current);
  }

  return (
    <Flex
      bg="primary.light"
      p="2"
      mb="5"
      alignItems="center"
      justifyContent="space-between"
    >
      <Text ref={ref} style={{ wordBreak: 'break-all' }} mr="3">
        {url}
      </Text>
      <ButtonPrimary onClick={onCopyClick} size="small">
        {copyCmd}
      </ButtonPrimary>
    </Flex>
  );
};



export default ClusterInfoDialog;
