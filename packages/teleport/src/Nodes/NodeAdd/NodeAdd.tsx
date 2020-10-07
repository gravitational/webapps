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
import NodeAddEnterprise from 'teleport/Nodes/NodeAdd/NodeAddEnterprise';
import NodeAddOSS from 'teleport/Nodes/NodeAdd/NodeAddOSS';

export default function Container({ onCloseDialog }: Props) {
  const state = useNodeAdd(onCloseDialog);
  return <NodeAdd {...state} />;
}

export function NodeAdd(props: ReturnType<typeof useNodeAdd>) {
  const {
    canCreateToken,
    version,
    isEnterprise,
    onClose,
    getJoinToken,
    token,
  } = props;

  if (isEnterprise) {
    return (
      <NodeAddEnterprise
        canCreateToken={canCreateToken}
        version={version}
        isEnterprise={isEnterprise}
        onClose={onClose}
        token={token}
        getJoinToken={getJoinToken}
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
  onCloseDialog(): void;
};
