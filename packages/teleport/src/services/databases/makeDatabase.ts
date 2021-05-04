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
    displayText: formatDatabaseInfo(type, protocol).text,
    protocol,
    tags: labels.map(label => `${label.name}: ${label.value}`),
  };
}

export const formatDatabaseInfo = (type: DbType, protocol: DbProtocol) => {
  const output = { type, protocol, text: '' };

  switch (type) {
    case 'rds':
      output.text = `RDS ${formatProtocol(protocol)}`;
      return output;
    case 'redshift':
      output.text = 'Redshift';
      return output;
    case 'self-hosted':
      output.text = `Self-hosted ${formatProtocol(protocol)}`;
      return output;
    case 'gcp':
      output.text = `Cloud SQL ${formatProtocol(protocol)}`;
      return output;
    default:
      output.text = type + ' ' + formatProtocol(protocol);
      return output;
  }
};

const formatProtocol = (input: DbProtocol) => {
  switch (input) {
    case 'postgres':
      return 'PostgreSQL';
    case 'mysql':
      return 'MySQL';
    default:
      return input;
  }
};

type DbType = 'redshift' | 'rds' | 'gcp' | 'self-hosted';
type DbProtocol = 'postgres' | 'mysql';
