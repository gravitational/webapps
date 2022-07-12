/*
Copyright 2019-2022 Gravitational, Inc.

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

import { formatDistanceStrict } from 'date-fns';
import { Session, Participant } from './types';

export default function makeSession(json): Session {
  const {
    kind,
    id,
    namespace,
    login,
    created,
    server_id,
    server_hostname,
    cluster_name,
    kubernetes_cluster_name,
    server_addr,
    parties,
  } = json;

  const createdDate = created ? new Date(created) : null;
  const durationText = createdDate
    ? formatDistanceStrict(new Date(), createdDate)
    : '';

  return {
    kind,
    sid: id,
    namespace,
    login,
    created: createdDate,
    durationText,
    serverId: server_id,
    resourceName: kind === 'k8s' ? kubernetes_cluster_name : server_hostname,
    clusterId: cluster_name,
    parties: parties ? parties.map(p => makeParticipant(p)) : [],
    addr: server_addr ? server_addr.replace(PORT_REGEX, '') : '',
  };
}

export function makeParticipant(json): Participant {
  return {
    user: json.user,
  };
}

const PORT_REGEX = /:\d+$/;
