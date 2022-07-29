/*
Copyright 2019 Gravitational, Inc.

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

import { map, sortBy } from 'lodash';

import api from 'teleport/services/api';
import cfg from 'teleport/config';

import makeCluster from './makeCluster';

const service = {
  fetchClusters() {
    return api
      .get(cfg.api.clustersPath)
      .then(json => map(json, makeCluster))
      .then(clusters => sortBy(clusters, 'clusterId'));
  },
};

export default service;
