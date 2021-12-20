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
import { Danger } from 'design/Alert';
import Document from 'teleterm/ui/Document';
import * as types from 'teleterm/ui/types';
import useKubes from './useKubes';
import KubeList from './KubeList';

export default function DocumentKubes(props: Props) {
  const { doc, visible } = props;
  const { kubes, syncStatus, searchValue } = useKubes(doc);

  return (
    <Document visible={visible}>
      <Container mx="auto" mt="4" px="5">
        <Flex
          justifyContent="space-between"
          mb="4"
          typography="h3"
          color="text.secondary"
        >
          <Text typography="h3" color="text.secondary">
            Kubernetes Clusters
          </Text>
        </Flex>
        {syncStatus.status === 'failed' && (
          <Danger>{syncStatus.statusText}</Danger>
        )}
        <KubeList searchValue={searchValue} kubes={kubes} />
      </Container>
    </Document>
  );
}

type Props = {
  visible: boolean;
  doc: types.DocumentKubes;
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
