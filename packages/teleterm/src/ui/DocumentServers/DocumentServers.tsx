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
import { Text, Flex, Box } from 'design';
import QuickLaunch from 'teleport/components/QuickLaunch';
import Document from './../Document';
import useServers from './useServers';
import ServerList from './ServerList';
import * as types from '../types';

export default function DocumentNodes(props: Props) {
  const { doc, visible } = props;
  const { servers, connect, searchValue } = useServers(doc);

  function onQuickLaunchEnter() {}

  return (
    <Document visible={visible}>
      <Container mx="auto" mt="4" px="5">
        <Flex justifyContent="space-between" mb="4">
          <Text typography="h3" color="text.secondary">
            Servers
          </Text>
          <QuickLaunch width="240px" onPress={onQuickLaunchEnter} />
        </Flex>
        <ServerList
          searchValue={searchValue}
          onLogin={connect}
          servers={servers}
        />
      </Container>
    </Document>
  );
}

type Props = {
  visible: boolean;
  doc: types.DocumentServers;
};

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
