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

import { Store } from 'shared/libs/stores';

import { UserContext } from 'teleport/services/user';

export default class StoreUserContext extends Store<UserContext> {
  state: UserContext = null;

  isSso() {
    return this.state.authType === 'sso';
  }

  getUsername() {
    return this.state?.username;
  }

  getClusterId() {
    return this.state.cluster.clusterId;
  }

  getEventAccess() {
    return this.state.acl.events;
  }

  getConnectorAccess() {
    return this.state.acl.authConnectors;
  }

  getRoleAccess() {
    return this.state.acl.roles;
  }

  getWindowsLogins() {
    return this.state.acl.windowsLogins;
  }

  getTrustedClusterAccess() {
    return this.state.acl.trustedClusters;
  }

  getUserAccess() {
    return this.state.acl.users;
  }

  getAppServerAccess() {
    return this.state.acl.appServers;
  }

  getKubeServerAccess() {
    return this.state.acl.kubeServers;
  }

  getTokenAccess() {
    return this.state.acl.tokens;
  }

  getWorkflowAccess() {
    return this.state.acl.accessRequests;
  }

  getAccessStrategy() {
    return this.state.accessStrategy;
  }

  getRequestableRoles() {
    return this.state.accessCapabilities.requestableRoles;
  }

  getSuggestedReviewers() {
    return this.state.accessCapabilities.suggestedReviewers;
  }

  getBillingAccess() {
    return this.state.acl.billing;
  }

  getDatabaseAccess() {
    return this.state.acl.dbServers;
  }

  getDesktopAccess() {
    return this.state.acl.desktops;
  }

  getSessionsAccess() {
    return this.state.acl.recordedSessions;
  }

  getActiveSessionsAccess() {
    return this.state.acl.activeSessions;
  }

  getClipboardAccess() {
    return this.state.acl.clipboardSharingEnabled;
  }

  getNodeAccess() {
    return this.state.acl.nodes;
  }

  // hasPrereqAccessToAddAgents checks if user meets the prerequisite
  // access to add an agent:
  //  - user should be able to edit themselves to update user traits
  //  - user should be able to create provisioning tokens
  //  - user should be able to read, create and update connection diagnostics
  //    to test agent connection
  hasPrereqAccessToAddAgents() {
    const { users, tokens, connectionDiagnostic } = this.state.acl;

    return (
      users.edit &&
      tokens.create &&
      connectionDiagnostic.create &&
      connectionDiagnostic.edit &&
      connectionDiagnostic.read
    );
  }

  // hasAccessToAgentQuery checks for at least one valid query permission.
  // Nodes require only a 'list' access while the rest of the agents
  // require 'list + read'.
  hasAccessToQueryAgent() {
    const { nodes, appServers, dbServers, kubeServers, desktops } =
      this.state.acl;

    return (
      nodes.list ||
      (appServers.read && appServers.list) ||
      (dbServers.read && dbServers.list) ||
      (kubeServers.read && kubeServers.list) ||
      (desktops.read && desktops.list)
    );
  }
}
