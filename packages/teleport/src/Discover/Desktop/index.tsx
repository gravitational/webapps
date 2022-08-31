import React from 'react';

import { Desktop } from 'design/Icon';

import { ConfigureActiveDirectory } from 'teleport/Discover/Desktop/ConfigureActiveDirectory';
import { ConfigureTeleport } from 'teleport/Discover/Desktop/ConfigureTeleport';
import { Finished, ResourceKind } from 'teleport/Discover/Shared';

import { Resource } from 'teleport/Discover/flow';

export const DesktopResource: Resource = {
  kind: ResourceKind.Desktop,
  icon: <Desktop />,
  views: [
    {
      title: 'Select Resource',
    },
    {
      title: 'Configure Active Directory',
      component: ConfigureActiveDirectory,
    },
    {
      title: 'Configure Teleport',
      component: ConfigureTeleport,
    },
    {
      title: 'Finished',
      component: Finished,
      hide: true,
    },
  ],
};
