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

export interface App {
  id: string;
  name: string;
  description: string;
  uri: string;
  publicAddr: string;
  tags: string[];
  clusterId: string;
  launchUrl: string;
  fqdn: string;
  awsRoles: AwsRole[];
  awsConsole: boolean;
}

export interface AppsResponse {
  apps: App[];
  startKey?: string;
  totalCount?: number;
}

export type AwsRole = {
  arn: string;
  display: string;
};
