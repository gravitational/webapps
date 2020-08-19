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

import { map } from 'lodash';
import api from 'teleport/services/api';
import cfg from 'teleport/config';
import makeSession, { makeParticipant } from './makeSession';
import { ParticipantList } from './types';
import { SshNode } from 'teleport/services/nodes';

const service = {
  create({ serverId, clusterId, login, hostname }: SshNode) {
    const request = {
      session: {
        login,
        server_hostname: hostname,
        server_id: serverId,
        cluster_name: clusterId,
      },
    };

    return api
      .post(cfg.getTerminalSessionUrl({ clusterId }), request)
      .then(response => {
        const session = makeSession(response.session);
        return {
          ...session,
          hostname: hostname ? hostname : serverId,
        };
      });
  },

  fetchSession({ clusterId, sid }: FetchSessionParams) {
    return api
      .get(cfg.getTerminalSessionUrl({ sid, clusterId }))
      .then(makeSession);
  },

  fetchSessions(clusterId = cfg.clusterName) {
    return api.get(cfg.getTerminalSessionUrl({ clusterId })).then(response => {
      if (response && response.sessions) {
        return map(response.sessions, makeSession);
      }

      return [];
    });
  },

  fetchParticipants({ clusterId }: { clusterId: string }) {
    // Because given session might not be available right away,
    // we query for all active session to find this session participants.
    // This is to avoid 404 errors.
    return api.get(cfg.getTerminalSessionUrl({ clusterId })).then(json => {
      if (!json && !json.sessions) {
        return {};
      }

      const parties: ParticipantList = {};
      json.sessions.forEach(s => {
        parties[s.id] = map(s.parties, makeParticipant);
      });

      return parties;
    });
  },
};
export default service;

type FetchSessionParams = {
  sid: string;
  clusterId: string;
};
