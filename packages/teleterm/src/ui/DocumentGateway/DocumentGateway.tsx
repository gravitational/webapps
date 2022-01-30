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
import { Text, Flex, Box, ButtonPrimary, ButtonSecondary } from 'design';
import Document from 'teleterm/ui/Document';
import TextSelectCopy from 'teleport/components/TextSelectCopy';
import * as Alerts from 'design/Alert';
import * as types from 'teleterm/ui/services/docs/types';
import LinearProgress from 'teleterm/ui/components/LinearProgress';
import useDocumentGateway, { State } from './useDocumentGateway';

type Props = {
  visible: boolean;
  doc: types.DocumentGateway;
};

export default function Container(props: Props) {
  const { doc, visible } = props;
  const state = useDocumentGateway(doc);
  return (
    <Document visible={visible}>
      <DocumentGateway {...state} />
    </Document>
  );
}

export function DocumentGateway(props: State) {
  const {
    doc,
    gateway,
    connected,
    removeGateway,
    reconnect,
    reconnectAttempt,
  } = props;

  if (!connected) {
    return (
      <Flex flexDirection="column" mx="auto" alignItems="center" mt={100}>
        <Text
          typography="h5"
          color="text.primary"
          style={{ position: 'relative' }}
        >
          The Database Proxy connection is currently offline
          {reconnectAttempt.status === 'processing' && <LinearProgress />}
        </Text>
        {reconnectAttempt.status === 'error' && (
          <Alerts.Danger>{reconnectAttempt.statusText}</Alerts.Danger>
        )}
        <ButtonPrimary
          mt={4}
          width="100px"
          onClick={reconnect}
          disabled={reconnectAttempt.status === 'processing'}
        >
          Reconnect
        </ButtonPrimary>
      </Flex>
    );
  }

  return (
    <Box maxWidth="1024px" mx="auto" mt="4" px="5">
      <Flex justifyContent="space-between" mb="4">
        <Text typography="h3" color="text.secondary">
          DB Proxy Connection
        </Text>
        <ButtonSecondary size="small" onClick={removeGateway}>
          Close Connection
        </ButtonSecondary>
      </Flex>
      <Text bold>Database</Text>
      <Flex
        bg={'primary.dark'}
        p="2"
        alignItems="center"
        justifyContent="space-between"
        borderRadius={2}
        mb={3}
      >
        <Text>{gateway.protocol}</Text>
      </Flex>
      <Text bold>Host Name</Text>
      <Flex
        bg={'primary.dark'}
        p="2"
        alignItems="center"
        justifyContent="space-between"
        borderRadius={2}
        mb={3}
      >
        <Text>{doc.title}</Text>
      </Flex>

      <Text bold>Local Address</Text>
      <TextSelectCopy
        bash={false}
        bg={'primary.dark'}
        mb={4}
        text={`https://${gateway.localAddress}:${gateway.localPort}`}
      />
      <Text bold>Psql</Text>
      <TextSelectCopy
        bash={false}
        bg={'primary.dark'}
        mb={6}
        text={`psql "${gateway.nativeClientArgs}"`}
      />
      <Text typography="h4" bold mb={3}>
        Access Keys
      </Text>
      <Text bold>CA certificate path</Text>
      <TextSelectCopy
        bash={false}
        bg={'primary.dark'}
        mb={3}
        text={gateway.caCertPath}
      />
      <Text bold>Database access certificate path</Text>
      <TextSelectCopy
        bash={false}
        bg={'primary.dark'}
        mb={3}
        text={gateway.certPath}
      />
      <Text bold>Private Key Path</Text>
      <TextSelectCopy
        bash={false}
        bg={'primary.dark'}
        mb={3}
        text={gateway.keyPath}
      />
    </Box>
  );
}
