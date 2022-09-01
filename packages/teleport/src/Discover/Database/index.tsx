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

import { Database } from 'design/Icon';

import { ResourceKind } from 'teleport/Discover/Shared';
import { Resource } from 'teleport/Discover/flow';
import { ConfigureActiveDirectory } from 'teleport/Discover/Desktop/ConfigureActiveDirectory';

export const DatabaseResource: Resource = {
  kind: ResourceKind.Database,
  icon: <Database />,
  views: [
    {
      title: 'Select Resource',
    },
    {
      title: 'Configure Resource',
      component: ConfigureActiveDirectory,
      views: [
        {
          title: 'Deploy Database Agent',
          component: ConfigureActiveDirectory,
        },
        {
          title: 'Register a Database',
          component: ConfigureActiveDirectory,
        },
        {
          title: 'Configure mTLS',
          component: ConfigureActiveDirectory,
        },
      ],
    },
    {
      title: 'Setup Access',
      component: ConfigureActiveDirectory,
    },
    {
      title: 'Test Connection',
      component: ConfigureActiveDirectory,
    },
  ],
};
