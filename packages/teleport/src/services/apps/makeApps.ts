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

import { App } from './types';
import cfg from 'teleport/config';

export default function makeApp(json: any): App {
  json = json || {};
  const {
    name,
    description,
    uri,
    publicAddr,
    clusterId,
    fqdn,
    awsConsole = false,
  } = json;

  const id = `${clusterId}-${name}-${publicAddr}`;
  const launchUrl = cfg.getAppLauncherRoute({ fqdn, clusterId, publicAddr });
  const labels = json.labels || [];
  const awsRoles = json.awsRoles || [];

  return {
    id,
    name,
    description,
    uri,
    publicAddr,
    tags: labels.map(label => `${label.name}: ${label.value}`),
    clusterId,
    fqdn,
    launchUrl,
    awsRoles,
    awsConsole,
  };
}
