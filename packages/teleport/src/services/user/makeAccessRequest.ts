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

import { AccessRequest } from './types';
import { displayDateTime } from 'shared/services/loc';

export default function makeAccessRequest(json?: AccessRequest): AccessRequest {
  json = json || {
    id: '',
    state: '',
    user: '',
    roles: [],
    created: '',
    resolveReason: '',
    requestReason: '',
  };

  // Teleport 4.4/5.0 proxy sends back "json.reason" as the resolve reason and
  // will be phased out for "json.resolveReason" three versions from 5.0.0.
  const resolveReason =
    json['reason'] != null ? json['reason'] : json.resolveReason;

  return {
    id: json.id,
    state: json.state,
    user: json.user,
    roles: json.roles,
    created: json.created ? displayDateTime(json.created) : '',
    requestReason: json.requestReason,
    resolveReason,
  };
}
