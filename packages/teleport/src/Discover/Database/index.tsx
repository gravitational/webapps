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

import { Database as DatabaseIcon } from 'design/Icon';

import { ResourceKind } from 'teleport/Discover/Shared';
import { Resource } from 'teleport/Discover/flow';
import { InstallActiveDirectory } from 'teleport/Discover/Desktop/InstallActiveDirectory';
import { DatabaseWrapper } from 'teleport/Discover/Database/DatabaseWrapper';
import {
  Database,
  DatabaseLocation,
} from 'teleport/Discover/Database/resources';

export const DatabaseResource: Resource<Database> = {
  kind: ResourceKind.Database,
  icon: <DatabaseIcon />,
  wrapper(component: React.ReactNode) {
    return <DatabaseWrapper>{component}</DatabaseWrapper>;
  },
  shouldPrompt(currentStep) {
    // do not prompt on exit if they're selecting a resource
    return currentStep !== 0;
  },
  views(database) {
    let configureResourceViews;
    if (database) {
      switch (database.location) {
        case DatabaseLocation.AWS:
          configureResourceViews = [
            {
              title: 'Deploy Database Agent',
              component: InstallActiveDirectory,
            },
            {
              title: 'Register a Database',
              component: InstallActiveDirectory,
            },
            {
              title: 'Configure IAM Policy',
              component: InstallActiveDirectory,
            },
          ];

          break;

        case DatabaseLocation.SelfHosted:
          configureResourceViews = [
            {
              title: 'Deploy Database Agent',
              component: InstallActiveDirectory,
            },
            {
              title: 'Register a Database',
              component: InstallActiveDirectory,
            },
            {
              title: 'Configure mTLS',
              component: InstallActiveDirectory,
            },
          ];

          break;
      }
    }

    return [
      {
        title: 'Select Resource',
      },
      {
        title: 'Configure Resource',
        component: InstallActiveDirectory,
        views: configureResourceViews,
      },
      {
        title: 'Setup Access',
        component: InstallActiveDirectory,
      },
      {
        title: 'Test Connection',
        component: InstallActiveDirectory,
      },
    ];
  },
};
