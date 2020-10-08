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
import { NodeAdd } from './NodeAdd';

export default {
  title: 'Teleport/Nodes/Add',
};

export const Loaded = () => <NodeAdd {...sample.props} />;

export const Processing = () => (
  <NodeAdd {...sample.props} attempt={{ status: 'processing' }} />
);

export const Failed = () => (
  <NodeAdd
    {...sample.props}
    attempt={{ status: 'failed', statusText: 'some error message' }}
  />
);

export const NoTokenPermission = () => (
  <NodeAdd {...sample.props} canCreateToken={false} />
);

const sample = {
  props: {
    onClose() {
      return null;
    },
    createJoinToken() {
      return Promise.resolve(null);
    },
    version: '5.0.0-dev',
    isEnterprise: true,
    canCreateToken: true,
    script: 'some bash script',
    expires: '4h0m0s',
    attempt: {
      status: 'success',
      statusText: '',
    } as any,
  },
};
