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
import { storiesOf } from '@storybook/react';
import { ClusterSideNav } from './SideNav';
import * as Icons from 'design/Icon';
import { Box } from 'design';
import communityLogoSvg from 'design/assets/images/gravity-community-logo.svg';

storiesOf('Gravity', module).add('SideNav', () => {
  const props = {
    ...defaultProps,
  };
  return (
    <Box
      mt={-3}
      height="100%"
      style={{ position: 'absolute', overflow: 'hidden' }}
    >
      <Router history={inMemoryHistory}>
        <ClusterSideNav {...props} />
      </Router>
    </Box>
  );
});

const defaultProps = {
  navItems: [
    {
      title: 'Apartment',
      Icon: Icons.Apartment,
      exact: true,
      to: '/web/site/apartment',
    },
    {
      title: 'Apple',
      Icon: Icons.Apple,
      exact: true,
      to: '/web/site/apple',
    },
    {
      title: 'Camera',
      Icon: Icons.Camera,
      exact: true,
      to: '/web/site/camera',
    },
  ],
  version: '6.0.0-rc.2.6',
  logoSrc: communityLogoSvg,
};

const inMemoryHistory = createMemoryHistory({});
