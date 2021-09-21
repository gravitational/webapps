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
import InputSearch from 'teleport/components/InputSearch';
import Document from './../Document';
import DatabaseList from './DatabaseList';
import useDatabases from './useDatabases';
import { ThemeProviderTabs } from './../ThemeProvider';
import * as types from '../types';

type Props = {
  visible: boolean;
  doc: types.DocumentDatabases;
};

export default function DocumentDbs(props: Props) {
  const { doc, visible } = props;
  const { results, setSearchValue, searchValue } = useDatabases(doc);

  return (
    <ThemeProviderTabs>
      <Document visible={visible}>
        <Container mx="auto" mt="4" px="5">
          <Flex justifyContent="space-between" mb="4">
            <Text typography="h3" color="text.secondary">
              Databases
            </Text>
          </Flex>
          <Flex mb="4" justifyContent="space-between" alignItems="center">
            <InputSearch height="30px" mr="3" onChange={setSearchValue} />
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
            <DatabaseList searchValue={searchValue} databases={results.data} />
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
