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

import { Text, Box, Flex, ButtonPrimary } from 'design';
import Card from 'design/Card';
import Image from 'design/Image';
import * as Icons from 'design/Icon';
import empty from './assets';

export default function Empty(props: Props) {
  const {
    isLeafCluster,
    canCreate,
    isEnterprise,
    onClick,
    clusterId,
    emptyStateInfo,
  } = props;

  const {
    title,
    description,
    buttonText,
    videoLink,
    readOnly,
  } = emptyStateInfo;

  // always show the welcome for enterprise users who have access to create an app
  if (isLeafCluster || !canCreate || !isEnterprise) {
    return (
      <Box
        p={8}
        mt={4}
        mx="auto"
        width="600px"
        textAlign="center"
        color="text.primary"
        bg="primary.light"
        borderRadius="12px"
      >
        <Text typography="h2" mb="3">
          {readOnly.title}
        </Text>
        <Text>
          {readOnly.message}
          <Text as="span" bold>
            {clusterId}
          </Text>
          " cluster.
        </Text>
      </Box>
    );
  }

  return (
    <Card
      as={Flex}
      width="879px"
      height="232px"
      mt={4}
      mx="auto"
      bg="primary.main"
      alignItems="center"
    >
      <Flex
        mx="16px"
        width="296px"
        height="200px"
        bg="#01172c"
        borderRadius={8}
        alignItems="center"
        justifyContent="center"
        style={{ cursor: 'pointer' }}
        onClick={() => window.open(videoLink)}
      >
        <Image width="265px" src={empty} />
        <Flex
          style={{ position: 'absolute' }}
          flexDirection="column"
          alignItems="center"
          mt={4}
        >
          <Icons.CirclePlay mb={4} fontSize="70px" />
          <Text fontWeight={700}>WATCH THE QUICKSTART</Text>
        </Flex>
      </Flex>
      <Box m="auto" mt={4}>
        <Box width="500px" mb={4}>
          <Text typography="h3" mb={2} fontWeight={700} fontSize={14}>
            {title}
          </Text>
          {description}
        </Box>
        <ButtonPrimary onClick={onClick} width="224px" height="40px">
          {buttonText}
        </ButtonPrimary>
      </Box>
    </Card>
  );
}

export type EmptyStateInfo = {
  title: string;
  description: JSX.Element;
  buttonText: string;
  videoLink: string;
  readOnly: {
    title: string;
    message: string;
  };
};

export type Props = {
  isLeafCluster: boolean;
  isEnterprise: boolean;
  canCreate: boolean;
  onClick(): void;
  clusterId: string;
  emptyStateInfo: EmptyStateInfo;
};
