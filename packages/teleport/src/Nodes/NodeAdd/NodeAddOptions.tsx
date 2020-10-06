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
import useTeleport from 'teleport/useTeleport';
import NodeAddByManual from './NodeAddByManual';
import NodeAddByAuto from './NodeAddByAuto';
import { ButtonSecondary, Text, Flex } from 'design';
import * as Icons from 'design/Icon';
import Dialog, {
  DialogContent,
  DialogFooter,
  DialogTitle,
} from 'design/Dialog';
import NodeAddDefault from './NodeAddDefault';
import { NodeJoinToken } from 'teleport/services/nodes';

export default function NodeAddOptions({
  onClose,
  token,
  getJoinToken,
}: Props) {
  const canCreateToken = useTeleport().storeUser.getTokenAccess().create;

  if (!canCreateToken) {
    return <NodeAddDefault onClose={onClose} />;
  }

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
          <NodeAddByAuto token={token} getJoinToken={getJoinToken} mb={4} />
        ) : (
          <NodeAddByManual mb={4} />
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

type Props = {
  onClose(): void;
  getJoinToken(): Promise<void>;
  token: NodeJoinToken;
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
