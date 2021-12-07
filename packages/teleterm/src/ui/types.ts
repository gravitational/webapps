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

export type ResourceKind =
  | 'gateways'
  | 'terminal'
  | 'servers'
  | 'server'
  | 'blank'
  | 'home'
  | 'apps'
  | 'clusters'
  | 'dbs'
  | 'db'
  | 'gateway'
  | 'terminal_shell'
  | 'terminal_tsh_session';

interface DocumentBase {
  uri: string;
  title: string;
  kind: ResourceKind;
}

export interface DocumentHome extends DocumentBase {
  kind: 'home';
}

export interface DocumentBlank extends DocumentBase {
  kind: 'blank';
}

export interface DocumentTshSession extends DocumentBase {
  status: 'connecting' | 'connected' | 'disconnected';
  kind: 'terminal_tsh_session';
  serverId: string;
  clusterId: string;
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
}

export interface DocumentPtySession extends DocumentBase {
  kind: 'terminal_shell';
  cwd?: string;
}

export type Document =
  | DocumentServers
  | DocumentHome
  | DocumentBlank
  | DocumentDatabases
  | DocumentGateway
  | DocumentTshSession
  | DocumentPtySession;

export interface UriParams {
  clusterId?: string;
  serverId?: string;
  dbId?: string;
  gatewayId?: string;
  tabId?: string;
  sid?: string;
}
