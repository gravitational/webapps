/*
Copyright 2022 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from 'react';
import { ButtonPrimary } from 'design';

export default function AgentButtonAdd(props: Props) {
  const { canCreate, isLeafCluster, onClick, agent, beginsWithVowel } = props;
  const disabled = isLeafCluster || !canCreate;

  let title = '';
  if (!canCreate) {
    title = `You do not have access to add ${
      beginsWithVowel ? 'an' : 'a'
    } ${agent}`;
  }

  if (isLeafCluster) {
    title = `Adding ${
      beginsWithVowel ? 'an' : 'a'
    } ${agent} to a leaf cluster is not supported`;
  }

  return (
    <ButtonPrimary
      title={title}
      disabled={disabled}
      width="240px"
      onClick={onClick}
    >
      Add {agent}
    </ButtonPrimary>
  );
}

export type Props = {
  isLeafCluster: boolean;
  canCreate: boolean;
  onClick?: () => void;
  agent: string;
  beginsWithVowel: boolean;
};
