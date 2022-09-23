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

import { Desktop } from 'design/Icon';

import { Finished, ResourceKind } from 'teleport/Discover/Shared';

import { ConnectTeleport } from 'teleport/Discover/Desktop/ConnectTeleport';
import { DiscoverDesktops } from 'teleport/Discover/Desktop/DiscoverDesktops';
import { InstallActiveDirectory } from 'teleport/Discover/Desktop/InstallActiveDirectory';

import { Resource } from 'teleport/Discover/flow';

export const DesktopResource: Resource = {
  kind: ResourceKind.Desktop,
  icon: <Desktop />,
  views: [
    {
      title: 'Select Resource',
    },
    {
      title: 'Install Active Directory',
      component: InstallActiveDirectory,
    },
    {
      title: 'Connect Teleport',
      component: ConnectTeleport,
    },
    {
      title: 'Discover Desktops',
      component: DiscoverDesktops,
    },
    {
      title: 'Finished',
      component: Finished,
      hide: true,
    },
  ],
};
