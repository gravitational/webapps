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

import { FC } from 'react';

export type DocumentKind =
  | 'gateways'
  | 'terminal'
  | 'servers'
  | 'blank'
  | 'home'
  | 'apps'
  | 'clusters'
  | 'dbs'
  | 'gateway';

interface DocumentBase {
  uri: string;
  title: string;
  kind: DocumentKind;
  created: Date;
}

export interface DocumentHome extends DocumentBase {
  kind: 'home';
}

export interface DocumentBlank extends DocumentBase {
  kind: 'blank';
}

export interface DocumentSsh extends DocumentBase {
  status: 'connected' | 'disconnected';
  kind: 'terminal';
  sid?: string;
  serverId: string;
  clusterId?: string;
  login: string;
}
export interface DocumentServers extends DocumentBase {
  kind: 'servers';
  clusterUri: string;
}

export interface DocumentDatabases extends DocumentBase {
  kind: 'dbs';
  clusterUri: string;
}

export interface DocumentGateway extends DocumentBase {
  kind: 'gateway';
  clusterUri: string;
  gatewayId?: string;
}

export type Document =
  | DocumentServers
  | DocumentSsh
  | DocumentHome
  | DocumentBlank
  | DocumentDatabases
  | DocumentGateway;

export interface UriParams {
  clusterId?: string;
  serverId?: string;
  dbId?: string;
  gatewayId?: string;
  tabId?: string;
}

export interface NavItem {
  items: NavItem[];
  title: string;
  uri: string;
  Icon: FC;
  kind: DocumentKind;
  group: boolean;
}
