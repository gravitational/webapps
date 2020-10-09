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
  createJoinToken,
  canCreateToken,
  version,
  isEnterprise,
  attempt,
}: Parameters<typeof NodeAdd>[0]) {
  const [activeTab, setActiveTab] = React.useState(TABS[0]);
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
      onClose={onClose}
      open={true}
    >
      <DialogTitle mb={5}>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          flex="0 0 auto"
        >
          <Text>Add a Server</Text>
          <Flex>
            {TABS.map(tab => (
              <StyledTab
                ml="4"
                typography="h5"
                key={tab.title}
                active={activeTab.title === tab.title}
                onClick={() => setActiveTab(tab)}
              >
                <tab.Icon mr="2" />
                {tab.title}
              </StyledTab>
            ))}
          </Flex>
        </Flex>
      </DialogTitle>
      <DialogContent>
        {activeTab.title === 'Automatically' ? (
          <NodeAddByScript
            script={script}
            expires={expires}
            getJoinToken={createJoinToken}
            attempt={attempt}
            mb={3}
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

const TABS = [
  {
    title: 'Automatically',
    Icon: Icons.Wand,
  },
  {
    title: 'Manually',
    Icon: Icons.Cog,
  },
];

const StyledTab = styled(Text)`
  align-items: center;
  display: flex;
  padding: 4px 8px;
  cursor: pointer;
  border-bottom: 4px solid transparent;

  ${({ active, theme }) =>
    active &&
    `
    font-weight: 500;
    border-bottom: 4px solid ${theme.colors.accent};

  `}
`;
