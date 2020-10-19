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
import useNodeAdd from './useNodeAdd';
import useTeleport from 'teleport/useTeleport';
import NodeAddEnterprise from 'teleport/Nodes/NodeAdd/NodeAddEnterprise';
import NodeAddOSS from 'teleport/Nodes/NodeAdd/NodeAddOSS';

export default function Container({ onClose }: Props) {
  const ctx = useTeleport();
  const state = useNodeAdd(ctx, onClose);
  return <NodeAdd {...state} />;
}

export function NodeAdd(props: ReturnType<typeof useNodeAdd>) {
  const {
    canCreateToken,
    version,
    isEnterprise,
    onClose,
    createJoinToken,
    script,
    expiry,
    attempt,
  } = props;

  if (isEnterprise) {
    return (
      <NodeAddEnterprise
        canCreateToken={canCreateToken}
        version={version}
        isEnterprise={isEnterprise}
        onClose={onClose}
        script={script}
        expiry={expiry}
        createJoinToken={createJoinToken}
        attempt={attempt}
      />
    );
  }

  return (
    <NodeAddOSS
      version={version}
      isEnterprise={isEnterprise}
      onClose={onClose}
    />
  );
}

type Props = {
  onClose(): void;
};
