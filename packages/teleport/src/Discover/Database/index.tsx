import React from 'react';

import { Database } from 'design/Icon';

import { ResourceKind } from 'teleport/Discover/Shared';
import { Resource } from 'teleport/Discover/flow';

export const DatabaseResource: Resource = {
  kind: ResourceKind.Database,
  icon: <Database />,
  views: [
    {
      title: 'Select Resource',
    },
  ],
};
