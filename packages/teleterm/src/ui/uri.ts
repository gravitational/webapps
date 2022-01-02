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

import { RouteProps, matchPath, generatePath } from 'react-router';

const clusterPath = '/clusters/:rootClusterId/(leaves)?/:leafClusterId?';

const paths = {
  root: '/',
  home: '/home',
  ptys: '/ptys/:sid',
  rootCluster: '/clusters/:rootClusterId',
  leafCluster: '/clusters/:rootClusterId/leaves/:leafClusterId',
  server: `${clusterPath}/servers/:serverId`,
  gateway: '/gateways/:gatewayId',
};

export const routing = {
  matchCluster(uri: string) {
    const leafMatch = routing.match(uri, paths.leafCluster);
    const rootMatch = routing.match(uri, paths.rootCluster);
    return leafMatch || rootMatch;
  },

  matchHome(uri: string) {
    return routing.match(uri, paths.home);
  },

  matchGw(uri: string) {
    return routing.match(uri, paths.gateway);
  },

  matchPty(uri: string) {
    return routing.match(uri, paths.ptys);
  },

  matchServer(uri: string) {
    return routing.match(uri, paths.server);
  },

  match(path: string, route: string | RouteProps) {
    return matchPath<Params>(path, route);
  },

  getPtyUri(params: Params) {
    return generatePath(paths.ptys, params as any);
  },

  getClusterUri(params: Params) {
    if (params.leafClusterId) {
      return generatePath(paths.leafCluster, params as any);
    }

    return generatePath(paths.rootCluster, params as any);
  },

  isClusterServer(clusterUri: string, serverUri: string) {
    return serverUri.startsWith(`${clusterUri}/servers/`);
  },

  isClusterKube(clusterUri: string, kubeUri: string) {
    return kubeUri.startsWith(`${clusterUri}/kubes/`);
  },

  isClusterDb(clusterUri: string, dbUri: string) {
    return dbUri.startsWith(`${clusterUri}/dbs/`);
  },

  isClusterApp(clusterUri: string, appUri: string) {
    return appUri.startsWith(`${clusterUri}/apps/`);
  },
};

export type Params = {
  rootClusterId?: string;
  leafClusterId?: string;
  serverId?: string;
  dbId?: string;
  gatewayId?: string;
  tabId?: string;
  sid?: string;
};
