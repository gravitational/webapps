/*
Copyright 2019-2020 Gravitational, Inc.

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

import { Cluster } from 'teleport/services/clusters';

export type AuthType = 'local' | 'sso';

export interface AccessStrategy {
  type: 'optional' | 'always' | 'reason';
  prompt: string;
}

export interface AccessCapabilities {
  requestableRoles: string[];
  suggestedReviewers: string[];
}

export interface UserContext {
  authType: AuthType;
  acl: Acl;
  username: string;
  cluster: Cluster;
  accessStrategy: AccessStrategy;
  accessCapabilities: AccessCapabilities;
}

export interface Access {
  list: boolean;
  read: boolean;
  edit: boolean;
  create: boolean;
  remove: boolean;
}

export interface Acl {
  directorySharingEnabled: boolean;
  desktopSessionRecordingEnabled: boolean;
  clipboardSharingEnabled: boolean;
  windowsLogins: string[];
  authConnectors: Access;
  trustedClusters: Access;
  roles: Access;
  recordedSessions: Access;
  activeSessions: Access;
  events: Access;
  users: Access;
  tokens: Access;
  appServers: Access;
  kubeServers: Access;
  accessRequests: Access;
  billing: Access;
  dbServers: Access;
  desktops: Access;
  nodes: Access;
}

export interface User {
  // name is the teleport username.
  name: string;
  // roles is the list of roles user is assigned to.
  roles: string[];
  // authType describes how the user authenticated
  // e.g. locally or with a SSO provider.
  authType?: string;
  // isLocal is true if json.authType was 'local'.
  isLocal?: boolean;
  traits?: UserTraits;
}

// UserTraits contain fields that define traits for local accounts.
export interface UserTraits {
  // logins is the list of logins that this user is allowed to
  // start SSH sessions with.
  logins: string[];
  // databaseUsers is the list of db usernames that this user is
  // allowed to open db connections as.
  databaseUsers: string[];
  // databaseNames is the list of db names that this user can connect to.
  databaseNames: string[];
  // kubeUsers is the list of allowed kube logins.
  kubeUsers: string[];
  // kubeGroups is the list of allowed kube groups for a kube cluster.
  kubeGroups: string[];
  // windowsLogins is the list of logins that this user
  // is allowed to start desktop sessions.
  windowsLogins: string[];
  // awsRoleArns is a list of aws roles this user is allowed to assume.
  awsRoleArns: string[];
}

export interface ResetToken {
  value: string;
  username: string;
  expires: Date;
}

export type ResetPasswordType = 'invite' | 'password';
