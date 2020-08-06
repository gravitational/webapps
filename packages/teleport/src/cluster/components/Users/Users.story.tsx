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
import Users from './Users';
import resourceService from 'e-teleport/services/resources';
import userServices from 'teleport/services/user';
import StoryContextProvider, {
  dummyCtx,
} from 'design/utils/StoryTeleportContextProvider';

export default {
  title: 'Teleport/Users/UsersView',
};

export const Success = () => {
  resourceService.fetchRoles = () =>
    Promise.resolve([
      {
        content: '',
        displayName: '',
        id: '',
        kind: 'role',
        name: 'admin',
      },
      {
        content: '',
        displayName: '',
        id: '',
        kind: 'role',
        name: 'testrole',
      },
    ]);
  userServices.fetchUsers = () => Promise.resolve([]);
  return (
    <StoryContextProvider ctx={dummyCtx}>
      <Users />
    </StoryContextProvider>
  );
};

export const Processing = () => {
  resourceService.fetchRoles = () => new Promise(() => null);
  userServices.fetchUsers = () => new Promise(() => null);
  return (
    <StoryContextProvider ctx={dummyCtx}>
      <Users />
    </StoryContextProvider>
  );
};

export const Failed = () => {
  resourceService.fetchRoles = () =>
    Promise.reject(new Error('some error message'));
  return (
    <StoryContextProvider ctx={dummyCtx}>
      <Users />
    </StoryContextProvider>
  );
};

userServices.createUser = () => new Promise(() => null);
