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
  const { name, desc, protocol, type, uri, labels = [] } = json;

  return {
    name,
    desc,
    uri,
    protocol: formatProtocolAndType(protocol),
    type: formatProtocolAndType(type),
    tags: labels.map(label => `${label.name}: ${label.value}`),
  };
}

const formatProtocolAndType = (input: string) => {
  switch (input) {
    case 'postgres':
      return 'PostgreSQL';
    case 'mysql':
      return 'MySQL';
    case 'self-hosted':
      return 'Self-hosted';
    case 'rds':
      return 'RDS';
    case 'gcp':
      return 'GCP';
    case 'redshift':
      return 'Redshift';
  }
};
