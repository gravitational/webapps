/**
 * Copyright 2022 Gravitational, Inc.
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

import { Finished } from './Finished';

import type { AgentStepProps } from '../types';

export default {
  title: 'Teleport/Discover/Finished',
};

export const Loaded = () => <Finished {...props} />;

const props: AgentStepProps = {
  agentMeta: { resourceName: 'some-resource-name' } as any,
  updateAgentMeta: () => null,
  nextStep: () => null,
  selectedAgentKind: 'server',
  onSelectResource: () => null,
};
