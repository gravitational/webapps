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
import { Indicator, Text, Flex, Box } from 'design';
import * as Alerts from 'design/Alert';
import NodeList from 'teleport/components/NodeList';
import QuickLaunch from 'teleport/components/QuickLaunch';
import InputSearch from 'teleport/components/InputSearch';
import Document from './../Document';
import useServers from './useServers';
import { ThemeProviderTabs } from './../ThemeProvider';
import * as types from '../types';

type Props = {
  visible: boolean;
  doc: types.DocumentServers;
};

export default function DocumentNodes(props: Props) {
  const { doc, visible } = props;
  const { results, setSearchValue, searchValue } = useServers(doc);

  function onLoginMenuSelect(
    e: React.MouseEvent,
    login: string,
    serverId: string
  ) {
    // allow to open a new browser tab (not the console one) when requested
    const newBrowserTabRequested = e.ctrlKey || e.metaKey;
    if (!newBrowserTabRequested) {
      e.preventDefault();
    }
  }

  function onQuickLaunchEnter(login: string, serverId: string) {}

  function onLoginMenuOpen(serverId: string) {
    return [];
  }

  return (
    <ThemeProviderTabs>
      <Document visible={visible}>
        <Container mx="auto" mt="4" px="5">
          <Flex justifyContent="space-between" mb="4">
            <Text typography="h3" color="text.secondary">
              Servers
            </Text>
          </Flex>
          <Flex mb="4" justifyContent="space-between" alignItems="center">
            <InputSearch height="30px" mr="3" onChange={setSearchValue} />
            <QuickLaunch width="240px" onPress={onQuickLaunchEnter} />
          </Flex>
          {results.status === 'processing' && (
            <Box textAlign="center" m={10}>
              <Indicator />
            </Box>
          )}
          {results.status === 'error' && (
            <Alerts.Danger>{results.statusText}</Alerts.Danger>
          )}
          {results.status === 'success' && (
            <NodeList
              searchValue={searchValue}
              onLoginMenuOpen={onLoginMenuOpen}
              onLoginSelect={onLoginMenuSelect}
              nodes={results.data}
            />
          )}
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
