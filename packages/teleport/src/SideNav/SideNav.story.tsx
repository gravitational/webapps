/*
Copyright 2019 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from 'react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import * as Icons from 'design/Icon';
import { Box } from 'design';
import { SideNav } from './SideNav';
import { Item } from './useSideNav';

export default {
  title: 'Teleport/SideNav',
};

export const Story = () => {
  const props = {
    ...defaultProps,
  };

  const inMemoryHistory = createMemoryHistory({});
  return (
    <Box
      mt={-3}
      height="100%"
      style={{ position: 'absolute', overflow: 'hidden' }}
    >
      <Router history={inMemoryHistory}>
        <SideNav {...props} />
      </Router>
    </Box>
  );
};

const defaultProps = {
  path: '/web/cluster/one/nodes',
  items: [
    {
      items: [],
      route: '/web/cluster/one/nodes',
      Icon: Icons.User,
      exact: true,
      title: 'Servers',
    },
    {
      items: [],
      route: '/web/cluster/one/apps',
      Icon: Icons.User,
      exact: true,
      title: 'Applications',
    },
    {
      title: 'Activity',
      items: [
        {
          items: [],
          route: '/web/cluster/one/sessions',
          Icon: Icons.User,
          exact: true,
          title: 'Active Sessions',
        },
        {
          items: [],
          route: '/web/cluster/one/recordings',
          Icon: Icons.User,
          exact: true,
          title: 'Session Recordings',
        },
        {
          items: [],
          route: '/web/cluster/one/audit',
          Icon: Icons.User,
          title: 'Audit Log',
        },
      ],
      route: '',
    },
    {
      title: 'Team',
      items: [
        {
          items: [],
          route: '/web/users',
          Icon: Icons.User,
          exact: true,
          title: 'Users',
        },
        {
          items: [],
          route: '/web/roles',
          Icon: Icons.User,
          exact: true,
          title: 'Roles',
        },
        {
          items: [],
          route: '/web/sso',
          Icon: Icons.User,
          exact: false,
          title: 'Auth. Connectors',
        },
      ],
      route: '',
    },
    {
      title: 'Clusters',
      items: [
        {
          items: [],
          route: '/web/clusters',
          Icon: Icons.User,
          exact: false,
          title: 'All Clusters',
        },
        {
          items: [],
          route: '/web/trust',
          Icon: Icons.User,
          title: 'Trust',
        },
      ],
      route: '',
    },
  ] as Item[],
};
