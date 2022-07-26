/**
 * Copyright 2021 Gravitational, Inc.
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

import React, { useState, Children, ReactElement } from 'react';
import styled, { css } from 'styled-components';
import { Text, Box, Flex } from 'design';
import { DOWNLOAD_BASE_URL } from 'teleport/services/links';

export default function InstructionTabs({ version }: { version: string }) {
  return (
    <Tabs>
      <TabContent title="Amazon Linux 2/RHEL (RPM)">
        {`sudo yum-config-manager --add-repo https://rpm.releases.teleport.dev/teleport.repo
             sudo yum install teleport`}
      </TabContent>
      <TabContent title="Debina/Ubuntu (DEB)">
        {`curl https://deb.releases.teleport.dev/teleport-pubkey.asc | sudo apt-key add -
             sudo add-apt-repository 'deb https://deb.releases.teleport.dev/ stable main'
             sudo apt-get update
             sudo apt-get install teleport`}
      </TabContent>
      <TabContent title="Linux">
        {`curl -O ${DOWNLOAD_BASE_URL}teleport-v${version}-linux-amd64-bin.tar.gz
             tar -xzf teleport-v${version}-linux-amd64-bin.tar.gz
             cd teleport
             sudo ./install`}
      </TabContent>
      <TabContent title="ARMv7 (32-bit)">
        {`curl -O ${DOWNLOAD_BASE_URL}teleport-v${version}-linux-arm-bin.tar.gz
             tar -xzf teleport-v${version}-linux-arm-bin.tar.gz
             cd teleport
             sudo ./install`}
      </TabContent>
      <TabContent title="ARMv8 (64-bit)">
        {`curl -O ${DOWNLOAD_BASE_URL}teleport-v${version}-linux-arm64-bin.tar.gz
             tar -xzf teleport-v${version}-linux-arm64-bin.tar.gz
             cd teleport
             sudo ./install`}
      </TabContent>
    </Tabs>
  );
}

const Tabs: React.FC = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Box bg="bgTerminal" mb="4" borderRadius={2} width="800px">
      <Flex
        borderTop="1px solid rgba(255,255,255,.1)"
        borderBottom="1px solid rgba(255,255,255,.1)"
      >
        {Children.map(children, (child: ReactElement, index) => {
          return (
            <TabTitle
              key={index}
              role="button"
              selected={index === selectedTab}
              onClick={() => setSelectedTab(index)}
            >
              {child.props.title}
            </TabTitle>
          );
        })}
      </Flex>
      <Box
        p={4}
        overflowX="auto"
        color="#fff"
        style={{ fontFamily: 'monospace', fontSize: '12px' }}
      >
        {children[selectedTab]}
      </Box>
    </Box>
  );
};

const TabTitle = styled(Box)(
  ({ theme, selected }) => `
    min-width: 0;
    font-size: 12px;
    background: transparent;
    padding: 8px 24px;
    border: none;
    font-weight: ${theme.bold};
    cursor: pointer;
    ${
      selected
        ? css`
            color: rgba(255, 255, 255, 0.87);
            border-bottom: 4px solid #651fff;
          `
        : css`
            color: rgba(255, 255, 255, 0.56);
            &:hover {
              color: rgba(255, 255, 255, 0.78);
            }
          `
    };
    `
);

const TabContent = styled(Text)`
  white-space: pre-line;
`;
