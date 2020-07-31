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

import api from 'teleport/services/api';
import cfg from 'teleport/config';
import makeUser from './makeUser';
import makeInviteToken from './makeInviteToken';
import makeStoredUser from './makeStoredUser';
import { NewUser } from './types';

const service = {
  fetchUser(clusterId?: string) {
    return api.get(cfg.getUserUrl(clusterId)).then(makeUser);
  },

  createUserInvite(clusterId: string, newUser: NewUser) {
    return api
      .post(cfg.getCreateUserInviteUrl(clusterId), newUser)
      .then(response => {
        const user = makeStoredUser(response.user);
        const token = makeInviteToken(response.token);

        return { user, token };
      });
  },
};

export default service;
