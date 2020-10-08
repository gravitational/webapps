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
import styled from 'styled-components';
import NodeAddByManual from './ByManual';
import NodeAddByScript from './ByScript';
import { NodeAdd } from './NodeAdd';
import { ButtonSecondary, Text, Flex } from 'design';
import * as Icons from 'design/Icon';
import Dialog, {
  DialogContent,
  DialogFooter,
  DialogTitle,
} from 'design/Dialog';
import NodeAddDefault from './NodeAddOSS';

export default function NodeAddEnterprise({
  onClose,
  script,
  expires,
  getJoinToken,
  canCreateToken,
  version,
  isEnterprise,
  attempt,
}: Parameters<typeof NodeAdd>[0]) {
  const tabs: TabProps[] = [
    {
      title: 'Automatic',
      // TODO use magic stick icon after icon library is updated.
      Icon: Icons.Cog,
    },
    {
      title: 'Manual',
      Icon: Icons.Cog,
    },
  ];

  const [activeTab, setActiveTab] = React.useState(tabs[0]);

  if (!canCreateToken) {
    return (
      <NodeAddDefault
        onClose={onClose}
        version={version}
        isEnterprise={isEnterprise}
      />
    );
  }

  return (
    <Dialog
      dialogCss={() => ({
        maxWidth: '600px',
        width: '100%',
        minHeight: '330px',
      })}
      disableEscapeKeyDown={false}
      onClose={close}
      open={true}
    >
      <DialogTitle mb={4}>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          flex="0 0 auto"
        >
          <Text>Add a Server</Text>
          <Flex>
            {tabs.map(tab => (
              <Tab
                key={tab.title}
                active={activeTab.title === tab.title}
                onClick={() => setActiveTab(tab)}
              >
                <tab.Icon />
                {tab.title}
              </Tab>
            ))}
          </Flex>
        </Flex>
      </DialogTitle>
      <DialogContent>
        {activeTab.title === 'Automatic' ? (
          <NodeAddByScript
            script={script}
            expires={expires}
            getJoinToken={getJoinToken}
            attempt={attempt}
            mb={4}
          />
        ) : (
          <NodeAddByManual
            mb={4}
            version={version}
            isEnterprise={isEnterprise}
          />
        )}
      </DialogContent>
      <DialogFooter>
        <ButtonSecondary onClick={onClose}>Close</ButtonSecondary>
      </DialogFooter>
    </Dialog>
  );
}

type TabProps = {
  title: string;
  Icon: any;
};

const Tab = styled(Flex)`
  align-items: center;
  font-size: 15px;
  font-weight: bold;
  padding: 5px 8px;
  cursor: pointer;
  margin-left: 15px;
  border-bottom: 4px solid transparent;

  ${({ active, theme }) =>
    active &&
    `
    border-bottom: 4px solid ${theme.colors.accent};
    opacity: 1;
  `}

  span {
    margin-right: 8px;
  }
`;
