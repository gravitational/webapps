/*
Copyright 2021-2022 Gravitational, Inc.

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
import cfg, { UrlResourcesParams } from 'teleport/config';
import { AgentResponse } from 'teleport/services/agents';

import makeDatabase from './makeDatabase';

import type {
  CreateDatabaseRequest,
  Database,
  UpdateDatabaseRequest,
} from './types';

class DatabaseService {
  fetchDatabases(
    clusterId: string,
    params: UrlResourcesParams,
    signal?: AbortSignal
  ): Promise<AgentResponse<Database>> {
    return api
      .get(cfg.getDatabasesUrl(clusterId, params), signal)
      .then(json => {
        const items = json?.items || [];

        return {
          agents: items.map(makeDatabase),
          startKey: json?.startKey,
          totalCount: json?.totalCount,
        };
      });
  }

  fetchDatabase(clusterId: string, dbName: string): Promise<Database> {
    return api.get(cfg.getDatabaseUrl(clusterId, dbName)).then(makeDatabase);
  }

  updateDatabase(
    clusterId: string,
    req: UpdateDatabaseRequest
  ): Promise<Database> {
    return api
      .put(cfg.getDatabaseUrl(clusterId, req.name), { ca_cert: req.caCert })
      .then(makeDatabase);
  }

  createDatabase(
    clusterId: string,
    req: CreateDatabaseRequest
  ): Promise<Database> {
    return api.post(cfg.getDatabasesUrl(clusterId), req).then(makeDatabase);
  }
}

export default DatabaseService;
