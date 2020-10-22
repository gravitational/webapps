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

import api from 'teleport/services/api';
import cfg from 'teleport/config';
import makeAccessRequest from 'teleport/services/accessRequest/makeAccessRequest';
import localStorage, { BearerToken } from 'teleport/services/localStorage';

const service = {
  createAccessRequest(reason?: string) {
    return api
      .post(cfg.getRequestAccessUrl(), { reason })
      .then(makeAccessRequest);
  },

  getAccessRequest(requestId?: string) {
    return api.get(cfg.getRequestAccessUrl(requestId)).then(makeAccessRequest);
  },

  renewSession(requestId?: string) {
    return api.post(cfg.getRenewTokenUrl(requestId)).then(json => {
      const token = new BearerToken(json);
      localStorage.setBearerToken(token);
    });
  },
};

export default service;
