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

import moment from 'moment';
import { map } from 'lodash';
import { Session, Participant } from './types';
import cfg from 'teleport/config';

export default function makeSession(json): Session {
  const clusterId = json.cluster_name || getClusterIDFromURL();
  const created = new Date(json.created);
  const duration = moment(new Date()).diff(created);
  const durationText = moment.duration(duration).humanize();
  const login = json.login;
  const namespace = json.namespace;
  const parties = map(json.parties, makeParticipant);
  const serverId = json.server_id;
  const sid = json.id;
  const hostname = json.server_hostname;
  const addr = json.server_addr.replace(PORT_REGEX, '');

  return {
    sid,
    namespace,
    login,
    created,
    durationText,
    serverId,
    hostname,
    clusterId,
    parties,
    addr,
  };
}

export function makeParticipant(json): Participant {
  const remoteAddr = json.remote_addr || '';
  return {
    user: json.user,
    remoteAddr: remoteAddr.replace(PORT_REGEX, ''),
  };
}

/**
 * getClusterIDFromURL solves empty clusterID result with Teleport
 * Node's using versions < 4.3 (clusterId is not set for older versions).
 */
const getClusterIDFromURL = () => {
  const index = cfg.routes.clusterSessions.split('/').indexOf(':clusterId');
  return window.location.pathname.split('/')[index];
};

const PORT_REGEX = /:\d+$/;
