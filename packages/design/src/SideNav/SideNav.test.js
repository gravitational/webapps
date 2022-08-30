/**
 * Copyright 2020 Gravitational, Inc.
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

import { render } from 'design/utils/testing';

import * as Icons from '../Icon';

import SideNav, { SideNavItem, SideNavItemIcon } from './index';

test('renders: SideNav, SideNavItem, SideNavItemIcon', () => {
  const { getByTestId } = render(
    <SideNav data-testid="parent">
      <SideNavItem data-testid="item">
        <SideNavItemIcon data-testid="icon" as={Icons.Apple} />
        Item 1
      </SideNavItem>
    </SideNav>
  );

  expect(getByTestId('parent')).toBeInTheDocument();
  expect(getByTestId('item')).toBeInTheDocument();
  expect(getByTestId('icon')).toBeInTheDocument();
});
