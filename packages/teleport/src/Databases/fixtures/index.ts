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

import { Database } from 'teleport/services/database';

export const databases: Database[] = [
  {
    name: 'aurora',
    desc: 'PostgreSQL 11.6: AWS Aurora ',
    type: 'RDS/PostgreSQL',
    uri:
      'postgres-aurora-instance-1.c1xpjrob56xs.us-west-1.rds.amazonaws.com:5432',
    tags: ['cluster: root', 'env: aws'],
  },
  {
    name: 'postgres-gcp',
    desc: 'MPostgreSQL 9.6: Google Cloud SQL',
    type: 'GCP/PostgreSQL',
    uri: '35.193.70.43:5432 ',
    tags: ['cluster: env', 'value: gcp'],
  },
  {
    name: 'mysql-aurora-56',
    desc: 'MySQL 5.6: AWS Aurora Longname For SQL',
    type: 'MySQL',
    uri:
      'mysql-aurora-56.cluster-c1xpjrob56xsadckjUkjk.us-west-1.rds.amazonaws.com:3306',
    tags: ['cluster: root', 'env: aws'],
  },
];
