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

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as Alerts from 'design/Alert';
import { Text, Flex, Box, ButtonSecondary } from 'design';
import Document from 'teleterm/ui/Document';
import TextSelectCopy from 'teleport/components/TextSelectCopy';
import * as types from 'teleterm/ui/services/docs/types';
import useGateway from './useGateway';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import { ResourceReconnect } from '../ResourceReconnect';

type Props = {
  visible: boolean;
  doc: types.DocumentGateway;
};

export default function DocumentGatewayContainer(props: Props) {
  const ctx = useAppContext();
  const { doc } = props;
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (ctx.clustersService.findGateway(doc.uri)) {
      setConnected(true);
    }
  }, []);

  return (
    <ResourceReconnect
      visible={props.visible}
      connected={connected}
      afterReconnect={() => setConnected(true)}
    >
      <DocumentGateway visible={props.visible} doc={doc} />
    </ResourceReconnect>
  );
}

export function DocumentGateway(props: Props) {
  const { doc, visible } = props;
  const { gateway, status, statusText, removeGateway } = useGateway(doc);

  return (
    <Document visible={visible}>
      <Container mx="auto" mt="4" px="5">
        <Flex justifyContent="space-between" mb="4">
          <Text typography="h3" color="text.secondary">
            DB Proxy Connection
          </Text>
          <ButtonSecondary size="small" onClick={removeGateway}>
            Close Connection
          </ButtonSecondary>
        </Flex>
        {status === 'error' && <Alerts.Danger mb={5} children={statusText} />}
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
          <Text>{gateway.resourceName}</Text>
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
          text={gateway.dbCertPath}
        />
        <Text bold>Private Key Path</Text>
        <TextSelectCopy
          bash={false}
          bg={'primary.dark'}
          mb={3}
          text={gateway.keyPath}
        />
      </Container>
    </Document>
  );
}

const Container = styled(Box)`
  max-width: 1024px;
`;
