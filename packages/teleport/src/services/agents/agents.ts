/**
 * Copyright 2022 Gravitational, Inc.
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
import { AgentConnectionDiagnostic } from './types';
import { makeAgentConnectionDiagnostics } from './make';

class AgentService {
  fetchConnectionDiagnostic(
    connectionId: string,
    clusterId?: string
  ): Promise<AgentConnectionDiagnostic> {
    return api
      .get(cfg.getClusterConnectionDiagnosticUrl(clusterId, connectionId))
      .then(makeAgentConnectionDiagnostics);
  }
}

export default AgentService;
