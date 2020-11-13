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
import Dialog, { DialogTitle } from 'design/Dialog';
import useTeleport from 'teleport/useTeleport';
import Manually from './Manually';
import * as Icons from 'design/Icon';
import { TabIcon } from 'teleport/components/Tabs';
import Automatically from './Automatically';
import useAddApp, { State } from './useAddApp';

export default function Container(props: Props) {
  const ctx = useTeleport();
  const state = useAddApp(ctx);
  return <AddApp {...state} {...props} />;
}

export function AddApp({
  cmd,
  expires,
  onClose,
  createToken,
  version,
  attempt,
  automatic,
  setAutomatic,
}: State & Props) {
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
      <Flex flex="1" flexDirection="column">
        <Flex alignItems="center" justifyContent="space-between" mb="4">
          <DialogTitle mr="auto">Add Application</DialogTitle>
          <TabIcon
            Icon={Icons.Wand}
            title="Automatically"
            active={automatic}
            onClick={() => setAutomatic(true)}
          />
          <TabIcon
            Icon={Icons.Cog}
            title="Manually"
            active={!automatic}
            onClick={() => setAutomatic(false)}
          />
        </Flex>
        {automatic && (
          <Automatically
            cmd={cmd}
            expires={expires}
            onClose={onClose}
            onCreate={createToken}
            attempt={attempt}
          />
        )}
        {!automatic && <Manually onClose={onClose} version={version} />}
      </Flex>
    </Dialog>
  );
}

type Props = {
  onClose(): void;
};
