/*
Copyright 2020 Gravitational, Inc.

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
import { Text, Box, Flex } from 'design';
import Card from 'design/Card';
import Image from 'design/Image';
import AddButton from './../AddButton';
import { emptyPng } from './assets';

export function Empty(props: Props) {
  return (
    <Card maxWidth="700px" mx="auto" py={4} as={Flex} alignItems="center">
      <Box mx="4">
        <Image width="180px" src={emptyPng} />
      </Box>
      <Box>
        <Box pr={4} mb={6}>
          <Text typography="h6" mb={3}>
            SECURE YOUR FIRST APPLICATION
          </Text>
          <Text typography="subtitle1" mb={3}>
            Teleport Application Access provides secure access to internal
            applications without the need for a VPN but with the audibility and
            control of Teleport.
          </Text>
        </Box>
        <AddButton
          isAdmin={props.isAdmin}
          onClick={props.onCreate}
          mb="2"
          mx="auto"
          width="240px"
          kind="primary"
        />
      </Box>
    </Card>
  );
}

export default function Empty2(props: Props) {
  return (
    <Box
      p="8"
      m="0 auto"
      width="100%"
      maxWidth="600px"
      textAlign="center"
      color="text.primary"
      bg="primary.light"
      borderRadius="12px"
    >
      <Text typography="h2" mb="3">
        No Applications Found
      </Text>
      <Text>
        There are no applications found in "
        <Text as="span" bold>
          {props.clusterId}
        </Text>
        " cluster
      </Text>
    </Box>
  );
}

type Props = {
  clusterId: string;
  isAdmin: boolean;
  onCreate(): void;
};
