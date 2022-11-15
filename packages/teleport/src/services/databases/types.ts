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

import { AgentLabel } from 'teleport/services/agents';

export interface Database {
  name: string;
  description: string;
  type: string;
  protocol: DbProtocol;
  labels: AgentLabel[];
  names?: string[];
  users?: string[];
}

export type DbType = 'redshift' | 'rds' | 'gcp' | 'self-hosted';
export type DbProtocol =
  | 'postgres'
  | 'mysql'
  | 'mongodb'
  | 'sqlserver'
  | 'redis';

export type DatabasesResponse = {
  databases: Database[];
  startKey?: string;
  totalCount?: number;
};
