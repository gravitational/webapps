import React from 'react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { storiesOf } from '@storybook/react';
import * as Icons from 'design/Icon';
import { DashboardTopNav } from './TopBar';

storiesOf('TeleportDashboard', module).add('TopBar', () => {
  const history = createMemoryHistory({
    initialEntries: ['/web/page1'],
    initialIndex: 0,
  });

  const props = {
    ...defaultProps,
  };
  return (
    <Router history={history}>
      <DashboardTopNav height="40px" {...props} />
    </Router>
  );
});

const defaultProps = {
  version: '1.1.1',
  username: 'john@example.com',
  items: [
    {
      to: '/web/page1',
      title: 'CLUSTERS',
    },
    {
      to: '/web/page2',
      title: 'SETTINGS',
    },
    {
      to: '/web/page3',
      title: 'HELP & SUPPORT',
    },
  ],

  topMenuItems: [
    {
      Icon: Icons.User,
      to: '/web/page1',
      title: 'Page1',
    },
  ],
};
