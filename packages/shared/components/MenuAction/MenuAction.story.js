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
import { Flex } from 'design';
import { Edit, Trash } from 'design/Icon';
import { MenuIcon, MenuButton, MenuItem, MenuItemIcon } from '.';

export default {
  title: 'Shared/MenuAction',
};

export const Menu = () => (
  <Flex
    mx="auto"
    width="200px"
    height="100px"
    justifyContent="space-around"
    alignItems="center"
  >
    <MenuIcon>
      <MenuItem><MenuItemIcon as={Edit} />Edit...</MenuItem>
      <MenuItem><MenuItemIcon as={Trash} />Delete...</MenuItem>
    </MenuIcon>
    <MenuButton>
      <MenuItem><MenuItemIcon as={Edit} />Edit...</MenuItem>
      <MenuItem><MenuItemIcon as={Trash} />Delete...</MenuItem>
    </MenuButton>
  </Flex>
);
