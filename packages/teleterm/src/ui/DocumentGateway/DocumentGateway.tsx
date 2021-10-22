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
import { Text, Flex, Box, ButtonSecondary } from 'design';
import InputSearch from 'teleport/components/InputSearch';
import Document from './../Document';
import useGateway from './useGateway';
import { ThemeProviderTabs } from './../ThemeProvider';
import * as types from '../types';
import TextSelectCopy from 'teleport/components/TextSelectCopy';
import { textAlign } from 'design/system';

type Props = {
  visible: boolean;
  doc: types.DocumentGateway;
};

export default function DocumentGateway(props: Props) {
  const { doc, visible } = props;
  const { gateway, removeGateway } = useGateway(doc);

  return (
    <ThemeProviderTabs>
      <Document visible={visible}>
        <Container mx="auto" mt="4" px="5">
          <Flex justifyContent="space-between" mb="4">
            <Text typography="h3" color="text.secondary">
              Gateway
            </Text>
            <ButtonSecondary size="small" onClick={removeGateway}>
              Close Gateway
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
            <Text>{gateway.resourceName}</Text>
          </Flex>

          <Text bold>Local Address</Text>
          <TextSelectCopy
            bash={false}
            bg={'primary.dark'}
            mb={4}
            text={`https://${gateway.localAddress}`}
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
    </ThemeProviderTabs>
  );
}

const Container = styled(Box)`
  flex-direction: column;
  display: flex;
  flex: 1;
  max-width: 1024px;
  ::after {
    content: ' ';
    padding-bottom: 24px;
  }
`;

/*
clusterId: "localhost"
hostId: "5546a2f0-fc51-416b-a44d-1ef8747c3341"
localAddress: "127.0.0.1:43293"
localPort: ""
protocol: "postgres"
resourceName: "mydb"
status: 0

*/
