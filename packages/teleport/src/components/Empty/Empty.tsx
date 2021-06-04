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
import styled from 'styled-components';
import { Text, Box, Flex, ButtonPrimary } from 'design';
import Card from 'design/Card';
import Image from 'design/Image';
import { emptyPng, nodesEmptyPng, playIcon } from './assets';

export default function Empty(props: Props) {
  const {
    isLeafCluster,
    canCreate,
    isEnterprise,
    onButtonClick,
    type,
    ...rest
  } = props;

  const { title, description, buttonText, videoLink, graphic } = emptyStateInfo[
    type
  ];

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
        {...rest}
      >
        <Text typography="h2" mb="3">
          {emptyStateInfo[type].readOnly.title}
        </Text>
        <Text>
          {emptyStateInfo[type].readOnly.message}
          <Text as="span" bold>
            {props.clusterId}
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
      <QuickstartContainer onClick={() => window.open(videoLink)}>
        <Image width="265px" src={graphic} />
        <Box style={{ position: 'absolute' }} mt={4}>
          <Image m="auto" mb={1} width="90px" src={playIcon} />
          <Text fontWeight={700}>WATCH THE QUICKSTART</Text>
        </Box>
      </QuickstartContainer>
      <Box m="auto" mt={4}>
        <Box width="500px" mb={4}>
          <Text typography="h3" mb={2} fontWeight={700} fontSize={14}>
            {title}
          </Text>
          <Text>{description}</Text>
        </Box>
        <ButtonPrimary onClick={onButtonClick} width="224px" height="40px">
          {buttonText}
        </ButtonPrimary>
      </Box>
    </Card>
  );
}

const emptyStateInfo = {
  nodes: {
    title: 'ADD YOUR FIRST SERVER',
    description:
      'Centralized control and access to Servers with Teleport Server Access. Add labels to nodes and get full visibility into access and behavior.',
    buttonText: 'ADD SERVER',
    videoLink: 'https://www.youtube.com/watch?v=tUXYtwP-Kvw',
    graphic: nodesEmptyPng,
    readOnly: {
      title: 'No Servers Found',
      message: 'There are no servers for the "',
    },
  },
  applications: {
    title: 'ADD YOUR FIRST APPLICATION',
    description:
      'Teleport Application Access provides secure access to internal applications without the need for a VPN but with the audibility and control of Teleport.',
    videoLink: 'https://www.youtube.com/watch?v=HkBQY-uWIbU',
    buttonText: 'ADD APPLICATION',
    graphic: emptyPng,
    readOnly: {
      title: 'No Applications Found',
      message: 'There are no applications for the "',
    },
  },
  kubernetes: {
    title: 'ADD YOUR FIRST KUBERNETES CLUSTER',
    description:
      'Teleport Application Access provides secure access to internal applications without the need for a VPN but with the audibility and control of Teleport.',
    videoLink: 'https://www.youtube.com/watch?v=2diX_UAmJ1c',
    buttonText: 'VIEW DOCUMENTATION',
    graphic: emptyPng,
    readOnly: {
      title: 'No Kubernetes Clusters Found',
      message: 'There are no kubernetes clusters for the "',
    },
  },
  databases: {
    title: 'ADD YOUR FIRST DATABASE',
    description:
      'Teleport Application Access provides secure access to internal applications without the need for a VPN but with the audibility and control of Teleport.',
    videoLink: 'https://www.youtube.com/watch?v=PCYyTecSzCY',
    buttonText: 'ADD DATABASE',
    graphic: emptyPng,
    readOnly: {
      title: 'No Databases Found',
      message: 'There are no databases for the "',
    },
  },
};

const QuickstartContainer = styled(Box)`
  cursor: pointer;
`;

QuickstartContainer.defaultProps = {
  as: Flex,
  mx: '16px',
  bg: '#01172c',
  width: '296px',
  height: '200px',
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
};

export type Props = {
  isLeafCluster: boolean;
  isEnterprise: boolean;
  canCreate: boolean;
  onButtonClick(): void;
  clusterId: string;
  type: 'nodes' | 'applications' | 'kubernetes' | 'databases';
};
