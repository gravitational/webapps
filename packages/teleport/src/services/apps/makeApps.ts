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

import { at } from 'lodash';
import { App } from './types';
import cfg from 'teleport/config';

export default function makeApp(json): App {
  const [name, uri, publicAddr, labels, clusterId, fqdn] = at(json, [
    'name',
    'uri',
    'publicAddr',
    'labels',
    'clusterId',
    'fqdn',
  ]);

  const id = `${clusterId}-${name}-${publicAddr}`;
  const launchUrl = cfg.getAppLauncherRoute({ fqdn, clusterId, publicAddr });

  return {
    id,
    name,
    uri,
    publicAddr,
    labels,
    clusterId,
    fqdn,
    launchUrl,
  };
}
