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

import { Acl } from './types';
import cfg from 'teleport/config';

export default function makeAcl(json): Acl {
  json = json || {};
  const windowsLogins = json.windowsLogins || [];
  const authConnectors = json.authConnectors || defaultAccess;
  const trustedClusters = json.trustedClusters || defaultAccess;
  const roles = json.roles || defaultAccess;
  const recordedSessions = json.recordedSessions || defaultAccess;
  const activeSessions = json.activeSessions || defaultAccess;
  const events = json.events || defaultAccess;
  const users = json.users || defaultAccess;
  const appServers = json.appServers || defaultAccess;
  const kubeServers = json.kubeServers || defaultAccess;
  const tokens = json.tokens || defaultAccess;
  const accessRequests = json.accessRequests || defaultAccess;
  const billing = json.billing || defaultAccess;
  const dbServers = json.dbServers || defaultAccess;
  const desktops = json.desktops || defaultAccess;
  // Defaults to true, see RFD 0049
  // https://github.com/gravitational/teleport/blob/master/rfd/0049-desktop-clipboard.md#security
  const clipboardSharingEnabled =
    json.clipboard !== undefined ? json.clipboard : true;
  // Defaults to true, see RFD 0033
  // https://github.com/gravitational/teleport/blob/master/rfd/0033-desktop-access.md#authorization
  const desktopSessionRecordingEnabled =
    json.desktopSessionRecording !== undefined
      ? json.desktopSessionRecording
      : true;
  // Behaves like clipboardSharingEnabled, see
  // https://github.com/gravitational/teleport/pull/12684#issue-1237830087
  const directorySharingEnabled =
    json.directorySharing !== undefined ? json.directorySharing : true;

  const nodes = json.nodes || defaultAccess;

  return {
    windowsLogins,
    authConnectors,
    trustedClusters,
    roles,
    recordedSessions,
    activeSessions,
    events,
    users,
    appServers,
    kubeServers,
    tokens,
    accessRequests,
    billing,
    dbServers,
    desktops,
    clipboardSharingEnabled,
    desktopSessionRecordingEnabled,
    nodes,
    directorySharingEnabled,
  };
}

export const defaultAccess = {
  list: false,
  read: false,
  edit: false,
  create: false,
  remove: false,
};
