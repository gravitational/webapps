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
import makeUserContext from './makeUserContext';
import makeResetToken from './makeResetToken';
import makeUser from './makeUser';
import { User } from './types';

const service = {
  fetchUserContext(clusterId?: string) {
    return api.get(cfg.getUserUrl(clusterId)).then(makeUserContext);
  },

  createUser(clusterId: string, newUser: User) {
    return api
      .post(cfg.getCreateUserInviteUrl(clusterId), newUser)
      .then(response => {
        const user = makeUser(response.user);
        const token = makeResetToken(response.token);

        return { user, token };
      });
  },
};

export default service;
