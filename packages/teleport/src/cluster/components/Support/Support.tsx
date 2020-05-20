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
import { Card, Box, Text, Flex, Link } from 'design';
import {
  FeatureBox,
  FeatureHeader,
  FeatureHeaderTitle,
} from 'teleport/components/Layout';
import { useTeleport } from 'teleport/teleportContextProvider';
import cfg from 'teleport/config';
import styled from 'styled-components';

/**
 * Support component lists links to teleport's documentation
 * and other helpful resources. Also displays an overview of the
 * current cluster information.
 */
const Support = () => {
  const teleportCtx = useTeleport();
  const cluster = teleportCtx.storeUser.state.cluster;
  const docs = getDocURLs(cluster.authVersion);

  return (
    <FeatureBox>
      <FeatureHeader>
        <FeatureHeaderTitle>Help & Support</FeatureHeaderTitle>
      </FeatureHeader>
      <Card px={5} pt={1} pb={6}>
        <Flex justifyContent="space-between" flexWrap="wrap">
          <Box>
            <Header title="Support" icon={<Icons.LocalPlay />} />
            {cfg.isEnterprise && (
              <SupportLink
                title="Create a Support Ticket"
                url="https://gravitational.zendesk.com/hc/en-us/requests/new"
              />
            )}
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
          </Box>
          <Box>
            <Header title="Resources" icon={<Icons.ListCheck />} />
            <SupportLink title="Quickstart Guide" url={docs.quickstart} />
            <SupportLink title="tsh User Guide" url={docs.userManual} />
            <SupportLink title="Admin Guide" url={docs.adminGuide} />
            <SupportLink
              title="Download Page"
              url={
                cfg.isEnterprise
                  ? 'https://dashboard.gravitational.com/web/downloads '
                  : 'https://gravitational.com/teleport/download'
              }
            />
            <SupportLink title="FAQ" url={docs.faq} />
          </Box>
          <Box>
            <Header title="Troubleshooting" icon={<Icons.Graph />} />
            <SupportLink
              title="Monitoring Teleport"
              url={docs.troubleshooting}
            />
            <SupportLink
              title="Collecting Debug Data"
              url={docs.troubleshooting}
            />
            <SupportLink
              title="Troubleshooting FAQ"
              url={docs.troubleshooting}
            />
          </Box>
          <Box>
            <Header title="Updates" icon={<Icons.NotificationsActive />} />
            <SupportLink
              title="Product Changelog"
              url="https://github.com/gravitational/teleport/blob/master/CHANGELOG.md"
            />
            <SupportLink
              title="Gravitational Blog"
              url="https://gravitational.com/blog/"
            />
          </Box>
        </Flex>
      </Card>
      <Box
        border="1px solid"
        borderColor="primary.light"
        mt={8}
        mb={10}
        borderRadius={3}
        p={5}
      >
        <Text as="h5" typography="p" mb={3} fontWeight="bold" caps>
          Cluster Information
        </Text>
        <ClusterData title="Cluster Name" data={cluster.clusterId} />
        <ClusterData title="Teleport Version" data={cluster.authVersion} />
        <ClusterData title="Public Address" data={cluster.publicURL} />
        <ClusterData title="Connected Nodes" data={cluster.nodeCount} />
      </Box>
    </FeatureBox>
  );
};

/**
 * getDocURLs returns an object of URL's appended with
 * UTM, version, and type of teleport.
 *
 * @param version teleport version retrieved from cluster info.
 */
const getDocURLs = (version = '') => {
  const verPrefix = cfg.isEnterprise ? 'e' : 'oss';

  /**
   * withUTM appends URL with UTM parameters.
   * anchor hashes must be appended at end of URL otherwise it is ignored.
   *
   * @param url the full link to the specific documentation.
   * @param anchorHash the hash in URL that predefines scroll location in the page.
   */
  const withUTM = (url = '', anchorHash = '') =>
    `${url}?utm_source=teleport&utm_medium=${verPrefix}_${version}${anchorHash}`;

  return {
    quickstart: withUTM('https://gravitational.com/teleport/docs/quickstart'),
    userManual: withUTM('https://gravitational.com/teleport/docs/user-manual'),
    adminGuide: withUTM('https://gravitational.com/teleport/docs/admin-guide'),
    troubleshooting: withUTM(
      'https://gravitational.com/teleport/docs/admin-guide',
      '#troubleshooting'
    ),
    faq: withUTM('https://gravitational.com/teleport/docs/faq'),
  };
};

const SupportLink = ({ title = '', url = '' }) => (
  <StyledSupportLink href={url}>{title}</StyledSupportLink>
);

const StyledSupportLink = styled.a`
  display: block; 
  color: ${props => props.theme.colors.light};
  border-radius: 4px; 
  text-decoration: none;
  line-height: 24px; 
  margin-bottom: 8px; 
  font-size: 12px; 
  padding: 0 8px;
  transition: all .3s;

  &:hover {
    background: ${props => props.theme.colors.primary.lighter};
  }
`

const ClusterData = ({ title = '', data = null }) => (
  <StyleClusterData>
    <dt>{title}:</dt>
    <dd>{data}</dd>
  </StyleClusterData>
);

const StyleClusterData = styled.dl`
  margin: 0;
  padding: 0; 
  font-size: 12px; 

  dt, dd{
    font-size: 12px; 
    display: inline-block;
    margin-bottom: 8px; 
    line-height: 24px; 
  }

  dt {
    font-weight: bold; 
  }
  dd {
    margin-left: 16px; 
  }
`

const Header = ({ title = '', icon = null }) => (
  <Flex
    alignItems="center"
    borderBottom="1px solid"
    borderColor="primary.dark"
    mb={3}
    width={210}
    mt={4}
    pb={2}
  >
    <Text pr={2} fontSize={18}>
      {icon}
    </Text>
    <Text as="h5" typography="p"  caps>
      {title}
    </Text>
  </Flex>
);

export default Support;
