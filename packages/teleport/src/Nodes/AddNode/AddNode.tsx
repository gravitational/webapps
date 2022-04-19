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
import { Flex } from 'design';
import { TabIcon } from 'teleport/components/Tabs';
import useTeleport from 'teleport/useTeleport';
import * as Icons from 'design/Icon';
import Dialog, { DialogTitle } from 'design/Dialog';
import Manually from './Manually';
import Automatically from './Automatically';
import Iam from './Iam';
import useAddNode, { State } from './useAddNode';

export default function Container(props: Props) {
  const ctx = useTeleport();
  const state = useAddNode(ctx);
  return <AddNode {...state} {...props} />;
}

export function AddNode({
  user,
  isEnterprise,
  onClose,
  createJoinToken,
  method,
  setMethod,
  version,
  attempt,
  isAuthTypeLocal,
  token,
  iamJoinToken,
  createIamJoinToken,
}: Props & State) {
  return (
    <Dialog
      dialogCss={() => ({
        maxWidth: '600px',
        width: '100%',
        minHeight: '328px',
      })}
      disableEscapeKeyDown={false}
      onClose={onClose}
      open={true}
    >
      <Flex flex="1" flexDirection="column">
        <Flex alignItems="center" justifyContent="space-between" mb="4">
          <DialogTitle mr="auto">Add Server</DialogTitle>
          <TabIcon
            Icon={Icons.Server}
            title="AWS"
            active={method === 'iam'}
            onClick={() => setMethod('iam')}
          />
          <TabIcon
            Icon={Icons.Wand}
            title="Automatically"
            active={method === 'automatic'}
            onClick={() => setMethod('automatic')}
          />
          <TabIcon
            Icon={Icons.Cog}
            title="Manually"
            active={method === 'manual'}
            onClick={() => setMethod('manual')}
          />
        </Flex>
        {method === 'automatic' && (
          <Automatically
            joinToken={token}
            createJoinToken={createJoinToken}
            attempt={attempt}
            onClose={onClose}
          />
        )}
        {method === 'manual' && (
          <Manually
            isEnterprise={isEnterprise}
            user={user}
            version={version}
            isAuthTypeLocal={isAuthTypeLocal}
            joinToken={token}
            createJoinToken={createJoinToken}
            attempt={attempt}
            onClose={onClose}
          />
        )}
        {method === 'iam' && (
          <Iam
            onGenerate={createIamJoinToken}
            attempt={attempt}
            token={iamJoinToken}
            isEnterprise={isEnterprise}
            version={version}
            onClose={onClose}
          />
        )}
      </Flex>
    </Dialog>
  );
}

type Props = {
  onClose(): void;
};
