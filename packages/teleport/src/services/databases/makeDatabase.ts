/*
Copyright 2021 Gravitational, Inc.

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

import { Database } from './types';

export default function makeDatabase(json): Database {
  const { name, desc, protocol, type } = json;

  const labels = json.labels || [];

  return {
    name,
    desc,
    type: formatTypeAndProtocol(type, protocol).label,
    tags: labels.map(label => `${label.name}: ${label.value}`),
  };
}

export const formatTypeAndProtocol = (type: DbType, protocol: DbProtocol) => {
  const output = { type, protocol, label: '' };

  switch (type) {
    case 'rds':
      output.label = protocol === 'postgres' ? 'RDS PostgreSQL' : 'RDS MySQL';
      return output;
    case 'redshift':
      output.label = 'Redshift';
      return output;
    case 'self-hosted':
      output.label =
        protocol === 'postgres'
          ? 'Self-hosted PostgreSQL'
          : 'Self-hosted MySQL';
      return output;
    case 'gcp':
      output.label = 'Cloud SQL PostgreSQL';
      return output;
    default:
      output.label = type + ' ' + protocol;
      return output;
  }
};

type DbType = 'redshift' | 'rds' | 'gcp' | 'self-hosted';
type DbProtocol = 'postgres' | 'mysql';
