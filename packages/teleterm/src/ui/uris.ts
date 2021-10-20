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

// eslint-disable-next-line import/named
import { RouteProps, matchPath, generatePath } from 'react-router';
import { UriParams } from 'teleterm/ui/types';

const routes = {
  root: '/',
  home: '/home',
  gateways: '/gateways',
  cluster: '/clusters/:clusterId',
  clusterServers: '/clusters/:clusterId/servers',
  clusterApps: '/clusters/:clusterId/apps',
  clusterDbs: '/clusters/:clusterId/dbs',
  clusterDb: '/clusters/:clusterId/dbs/:dbId',
  clusterGateway: '/clusters/:clusterId/dbs/:dbId/gateway/:gatewayId?',
};

const uris = {
  routes,

  match(path: string, route: string | RouteProps) {
    return matchPath<UriParams>(path, route);
  },

  getUriCluster(params: UriParams) {
    return generatePath(routes.cluster, { ...params });
  },

  getUriServer(params: UriParams) {
    return generatePath(routes.clusterServers, { ...params });
  },

  getUriDbs(params: UriParams) {
    return generatePath(routes.clusterDbs, { ...params });
  },

  getUriDb(params: UriParams) {
    return generatePath(routes.clusterDb, { ...params });
  },

  getUriGateway(params: UriParams) {
    return generatePath(routes.clusterGateway, { ...params });
  },

  getUriApps(params: UriParams) {
    return generatePath(routes.clusterApps, { ...params });
  },
};

export default uris;
