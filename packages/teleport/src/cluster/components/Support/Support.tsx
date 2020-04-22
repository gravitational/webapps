/**
 * Copyright 2020 Gravitational, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import * as Icons from 'design/Icon';
import styled from 'styled-components';
import { Card, Box, Text, Flex, Link } from 'design';
import {
  FeatureBox,
  FeatureHeader,
  FeatureHeaderTitle,
} from 'teleport/components/Layout';
import { useTeleport } from 'teleport/teleportContextProvider';

const Support = () => {
  const teleportCtx = useTeleport();
  const cluster = teleportCtx.storeUser.state.cluster;

  return (
    <FeatureBox>
      <FeatureHeader>
        <FeatureHeaderTitle>Help & Support</FeatureHeaderTitle>
      </FeatureHeader>
      <Card px={5} pt={1} pb={6}>
        <Flex justifyContent="space-between" flexWrap="wrap">
          <MiniBox>
            <Header title="Support" icon={<Icons.Stars />} />
            <SupportLink
              title="Create a Support Ticket"
              url="https://gravitational.zendesk.com/hc/en-us/requests/new"
            />
            <SupportLink
              title="Ask the Community Questions"
              url="https://community.gravitational.com/"
            />
            <SupportLink
              title="Request a New Feature"
              url="https://github.com/gravitational/teleport/issues/new/choose"
            />
            <SupportLink
              title="Send Product Feedback"
              url="mailto:teleport-feedback@gravitational.com"
            />
          </MiniBox>
          <MiniBox>
            <Header title="Resources" icon={<Icons.Stars />} />
            <SupportLink
              title="Quickstart Guide"
              url="https://gravitational.com/teleport/docs/quickstart/"
            />
            <SupportLink
              title="tsh User Guide"
              url="https://gravitational.com/teleport/docs/user-manual/"
            />
            <SupportLink
              title="Admin Guide"
              url="https://gravitational.com/teleport/docs/admin-guide/"
            />
            <SupportLink
              title="Download Page"
              url="https://gravitational.com/teleport/download"
            />
            <SupportLink
              title="FAQ"
              url="https://gravitational.com/teleport/docs/faq/"
            />
          </MiniBox>
          <MiniBox>
            <Header title="Troubleshooting" icon={<Icons.Stars />} />
            <SupportLink title="Monitoring Teleport" url="" />
            <SupportLink title="Collecting Debug Data" url="" />
            <SupportLink title="Troubleshooting FAQ" url="" />
          </MiniBox>
          <MiniBox>
            <Header title="Updates" icon={<Icons.Stars />} />
            <SupportLink
              title="Product Changelog"
              url="https://github.com/gravitational/teleport/blob/master/CHANGELOG.md"
            />
            <SupportLink
              title="Gravitational Blog"
              url="https://gravitational.com/blog/"
            />
          </MiniBox>
        </Flex>
      </Card>
      <ClusterBox
        border="1px solid"
        borderColor="primary.light"
        mt={8}
        mb={10}
        borderRadius={3}
        p={5}
      >
        <Text as="h5" typography="h5" mb={4} fontWeight="bold">
          Cluster Information
        </Text>
        <ClusterData title="Cluster Name" data={cluster.clusterId} />
        <ClusterData title="Teleport Version" data={cluster.authVersion} />
        <ClusterData title="Public Address" data={cluster.publicURL} />
        <ClusterData title="Connected Nodes" data={cluster.nodeCount} />
      </ClusterBox>
    </FeatureBox>
  );
};

const SupportLink = ({ title = '', url = '' }) => (
  <Text mb={3}>
    <Link href={url} target="_blank" mb={2}>
      {title}
    </Link>
  </Text>
);

const ClusterData = ({ title = '', data = null }) => (
  <Flex mb={3}>
    <Box width={130}>{title}: </Box>
    {data}
  </Flex>
);

const Header = ({ title = '', icon = null }) => (
  <Box
    borderBottom="1px solid"
    borderColor="primary.dark"
    mb={3}
    width={210}
    mt={4}
    pb={2}
  >
    <Flex alignItems="center">
      <Text pr={2} fontSize={30}>
        {icon}
      </Text>
      <Text as="h5" typography="h5" fontWeight="bold">
        {title}
      </Text>
    </Flex>
  </Box>
);

const MiniBox = styled(Box)`
  h5 {
    text-transform: uppercase;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const ClusterBox = styled(Box)`
  h5 {
    text-transform: uppercase;
  }
`;

export default Support;
