import React from 'react';

import { Server } from 'design/Icon';

import { Resource } from 'teleport/Discover/flow';
import { DownloadScript } from 'teleport/Discover/Server/DownloadScript';
import { LoginTrait } from 'teleport/Discover/Server/LoginTrait';
import { TestConnection } from 'teleport/Discover/Server/TestConnection';
import { ResourceKind, Finished } from 'teleport/Discover/Shared';

export const ServerResource: Resource = {
  kind: ResourceKind.Server,
  icon: <Server />,
  views: [
    {
      title: 'Select Resource',
    },
    {
      title: 'Configure Resource',
      component: DownloadScript,
    },
    {
      title: 'Set Up Access',
      component: LoginTrait,
    },
    {
      title: 'Test Connection',
      component: TestConnection,
    },
    {
      title: 'Finished',
      component: Finished,
      hide: true,
    },
  ],
};
