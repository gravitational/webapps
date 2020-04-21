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
import { Card } from 'design';
import {
  FeatureBox,
  FeatureHeader,
  FeatureHeaderTitle,
} from 'teleport/components/Layout';
import theme from 'design/theme/theme';
import { useTeleport } from 'teleport/teleportContextProvider';

const Support = () => {
  const teleportCtx = useTeleport();
  const cluster = teleportCtx.storeUser.state.cluster;

  return (
    <SupportBox>
      <FeatureHeader>
        <FeatureHeaderTitle>Help & Support</FeatureHeaderTitle>
      </FeatureHeader>
      <CardWrapper>
        <MiniCard>
          <h4>
            <Icons.Stars />
            Support
          </h4>
          <ul>
            <Link
              title="Create a Support Ticket"
              url="https://github.com/gravitational/teleport/issues/new?labels=type%3A+question&template=question.md"
            />
            <Link
              title="Ask the Community Questions"
              url="https://community.gravitational.com/"
            />
            <Link
              title="Request a New Feature"
              url="https://github.com/gravitational/teleport/issues/new?labels=type%3A+feature+request&template=feature_request.md"
            />
            <Link title="Send Product Feedback" url="" />
          </ul>
        </MiniCard>
        <MiniCard>
          <h4>
            <Icons.Stars />
            Resources
          </h4>
          <ul>
            <Link
              title="Quickstart Guide"
              url="https://gravitational.com/teleport/docs/quickstart/"
            />
            <Link
              title="tsh User Guide"
              url="https://gravitational.com/teleport/docs/user-manual/"
            />
            <Link
              title="Admin Guide"
              url="https://gravitational.com/teleport/docs/admin-guide/"
            />
            <Link
              title="Download Page"
              url="https://gravitational.com/teleport/download"
            />
            <Link
              title="FAQ"
              url="https://gravitational.com/teleport/docs/faq/"
            />
          </ul>
        </MiniCard>
        <MiniCard>
          <h4>
            <Icons.Stars />
            Troubleshooting
          </h4>
          <ul>
            <Link title="Monitoring Teleport" url="" />
            <Link title="Collecting Debug Data" url="" />
            <Link title="Troubleshooting FAQ" url="" />
          </ul>
        </MiniCard>
        <MiniCard>
          <h4>
            <Icons.Stars />
            Updates
          </h4>
          <ul>
            <Link title="Product Changelog" url="" />
            <Link
              title="Gravitational Blog"
              url="https://gravitational.com/blog/"
            />
          </ul>
        </MiniCard>
      </CardWrapper>
      <ClusterInfo>
        <h4>Cluster Information</h4>
        <ul>
          <ClusterData title="Cluster Name" data={cluster.clusterId} />
          <ClusterData title="Teleport Version" data={cluster.authVersion} />
          <ClusterData title="Public Address" data={cluster.publicURL} />
          <ClusterData title="Connected Nodes" data={cluster.nodeCount} />
        </ul>
      </ClusterInfo>
    </SupportBox>
  );
};

const Link = ({ title = '', url = '' }) => (
  <li>
    <a href={url} target="_blank">
      {title}
    </a>
  </li>
);

const ClusterData = ({ title = '', data }) => (
  <li>
    <span>{title}: </span>
    {data}
  </li>
);

const SupportBox = styled(FeatureBox)`
  h4 {
    text-transform: uppercase;
  }

  & > div:not(:first-child) {
    padding: 6px 30px 12px 30px;
  }

  ul {
    padding-left: 0;
    list-style-type: none;
  }

  li {
    margin-bottom: 15px;
  }
`;

const CardWrapper = styled(Card)`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const MiniCard = styled.div`
  width: 210px;

  .icon {
    font-size: 26px;
    padding-right: 8px;
    padding-bottom: 2px;
  }

  h4 {
    border-bottom: 1px solid ${theme.colors.primary.dark};
    line-height: 40px;
    display: flex;
    align-items: center;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const ClusterInfo = styled.div`
  border: 1px solid ${theme.colors.primary.light};
  margin: 60px 0;
  border-radius: 8px;

  span {
    display: inline-block;
    width: 130px;
  }
`;

export default Support;
