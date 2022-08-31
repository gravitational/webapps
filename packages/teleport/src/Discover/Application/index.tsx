import React from 'react';

import { AppInstalled } from 'design/Icon';

import { ResourceKind } from 'teleport/Discover/Shared';
import { Resource } from 'teleport/Discover/flow';

export const ApplicationResource: Resource = {
  kind: ResourceKind.Application,
  icon: <AppInstalled />,
  views: [
    {
      title: 'Select Resource',
    },
  ],
};
