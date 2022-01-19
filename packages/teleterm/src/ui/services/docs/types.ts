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

export type Kind =
  | 'doc.cluster'
  | 'doc.blank'
  | 'doc.home'
  | 'doc.gateway'
  | 'doc.terminal_shell'
  | 'doc.terminal_tsh_node';

interface DocumentBase {
  uri: string;
  title: string;
  kind: Kind;
}

export interface DocumentHome extends DocumentBase {
  kind: 'doc.home';
}

export interface DocumentBlank extends DocumentBase {
  kind: 'doc.blank';
}

export interface DocumentTshNode extends DocumentBase {
  kind: 'doc.terminal_tsh_node';
  status: 'connecting' | 'connected' | 'disconnected';
  serverId: string;
  serverUri: string;
  rootClusterId: string;
  leafClusterId?: string;
  login: string;
}

export interface DocumentGateway extends DocumentBase {
  kind: 'doc.gateway';
}

export interface DocumentCluster extends DocumentBase {
  kind: 'doc.cluster';
}

export interface DocumentPtySession extends DocumentBase {
  kind: 'doc.terminal_shell';
  cwd?: string;
}

export type DocumentTerminal = DocumentPtySession | DocumentTshNode;

export type Document =
  | DocumentHome
  | DocumentBlank
  | DocumentGateway
  | DocumentTshNode
  | DocumentPtySession
  | DocumentCluster;
