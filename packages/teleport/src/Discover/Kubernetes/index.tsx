import React from 'react';

import { Kubernetes } from 'design/Icon';

import { ResourceKind } from 'teleport/Discover/Shared';
import { Resource } from 'teleport/Discover/flow';

export const KubernetesResource: Resource = {
  kind: ResourceKind.Kubernetes,
  icon: <Kubernetes />,
  views: [
    {
      title: 'Select Resource',
    },
  ],
};
