/*
Copyright 2015 Gravitational, Inc.

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

import { generatePath } from 'react-router';
import { merge } from 'lodash';
import { Resource } from 'teleport/services/resources';

const cfg = {
  isEnterprise: false,

  baseUrl: window.location.origin,

  auth: {
    localAuthEnabled: true,
    providers: [],
    second_factor: 'off',
    authType: 'local',
  },

  proxyCluster: 'localhost',

  loc: {
    dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
    dateFormat: 'YYYY-MM-DD',
  },

  routes: {
    root: '/web',
    apps: '/web/cluster/:clusterId/apps',
    appLauncher: '/web/launch/:fqdn/:clusterId?/:publicAddr?',
    support: '/web/support',
    settings: '/web/settings',
    account: '/web/account',
    roles: '/web/roles',
    sso: '/web/sso',
    cluster: '/web/cluster/:clusterId/',
    clusters: '/web/clusters',
    trustedClusters: '/web/trust',
    audit: '/web/cluster/:clusterId/audit',
    nodes: '/web/cluster/:clusterId/nodes',
    sessions: '/web/cluster/:clusterId/sessions',
    recordings: '/web/cluster/:clusterId/recordings',
    users: '/web/users',
    console: '/web/cluster/:clusterId/console',
    consoleNodes: '/web/cluster/:clusterId/console/nodes',
    consoleConnect: '/web/cluster/:clusterId/console/node/:serverId/:login',
    consoleSession: '/web/cluster/:clusterId/console/session/:sid',
    player: '/web/cluster/:clusterId/session/:sid',
    sessionAuditPlayer: '/web/cluster/:clusterId/session/:sid/player',
    sessionAuditCmds: '/web/cluster/:clusterId/session/:sid/commands',
    error: '/web/msg/error/:type?',
    login: '/web/login',
    loginFailed: '/web/msg/error/login_failed',
    loginSuccess: '/web/msg/info/login_success',
    userInvite: '/web/invite/:tokenId',
    userReset: '/web/reset/:tokenId',
    // whitelist sso handlers
    oidcHandler: '/v1/webapi/oidc/*',
    samlHandler: '/v1/webapi/saml/*',
    githubHandler: '/v1/webapi/github/*',
  },

  api: {
    aapSession: '/v1/webapi/sessions/app',
    applicationsPath: '/v1/webapi/sites/:clusterId/apps',
    clustersPath: '/v1/webapi/sites',
    clusterEventsPath: `/v1/webapi/sites/:clusterId/events/search?from=:start?&to=:end?&limit=:limit?`,
    scp:
      '/v1/webapi/sites/:clusterId/nodes/:serverId/:login/scp?location=:location&filename=:filename',
    renewTokenPath: '/v1/webapi/sessions/renew/:requestId?',
    resetPasswordTokenPath: '/v1/webapi/users/password/token',
    sessionPath: '/v1/webapi/sessions',
    userContextPath: '/v1/webapi/sites/:clusterId/context',
    userStatusPath: '/v1/webapi/user/status',
    passwordTokenPath: '/v1/webapi/users/password/token/:tokenId?',
    userTokenInviteDonePath: '/v1/webapi/users',
    changeUserPasswordPath: '/v1/webapi/users/password',
    u2fCreateUserChallengePath: '/v1/webapi/u2f/signuptokens/:tokenId',
    u2fSessionChallengePath: '/v1/webapi/u2f/signrequest',
    u2fChangePassChallengePath: '/v1/webapi/u2f/password/changerequest',
    u2fSessionPath: '/v1/webapi/u2f/sessions',
    nodesPath: '/v1/webapi/sites/:clusterId/nodes',
    siteSessionPath: '/v1/webapi/sites/:siteId/sessions',
    sessionEventsPath: '/v1/webapi/sites/:siteId/sessions/:sid/events',
    siteEventSessionFilterPath: `/v1/webapi/sites/:siteId/sessions`,
    siteEventsFilterPath: `/v1/webapi/sites/:siteId/events?event=session.start&event=session.end&from=:start&to=:end`,
    ttyWsAddr:
      'wss://:fqdm/v1/webapi/sites/:clusterId/connect?access_token=:token&params=:params',
    terminalSessionPath: '/v1/webapi/sites/:clusterId/sessions/:sid?',

    usersPath: '/v1/enterprise/users',
    usersDelete: '/v1/enterprise/users/:username',
    resourcePath: '/v1/enterprise/sites/:clusterId/resources/:kind?',
    removeResourcePath: '/v1/enterprise/sites/:clusterId/resources/:kind/:id',
    nodeTokenPath: '/v1/enterprise/nodes/token',
    nodeScriptPath: '/scripts/:token/install-node.sh',
    appNodeScriptPath: '/scripts/:token/install-app.sh?name=:name&uri=:uri',
  },

  getClusterEventsUrl(clusterId: string, params: UrlClusterEventsParams) {
    return generatePath(cfg.api.clusterEventsPath, {
      clusterId,
      ...params,
    });
  },

  getAuthProviders() {
    return cfg.auth && cfg.auth.providers ? cfg.auth.providers : [];
  },

  getAuth2faType() {
    return cfg.auth ? cfg.auth.second_factor : null;
  },

  getLocalAuthFlag() {
    return cfg.auth.localAuthEnabled;
  },

  getAuthType() {
    return cfg.auth.authType;
  },

  getSsoUrl(providerUrl, providerName, redirect) {
    return cfg.baseUrl + generatePath(providerUrl, { redirect, providerName });
  },

  getAuditRoute(clusterId: string) {
    return generatePath(cfg.routes.audit, { clusterId });
  },

  getNodesRoute(clusterId: string) {
    return generatePath(cfg.routes.nodes, { clusterId });
  },

  getNodeJoinTokenUrl() {
    return cfg.api.nodeTokenPath;
  },

  getNodeScriptUrl(token: string) {
    return cfg.baseUrl + generatePath(cfg.api.nodeScriptPath, { token });
  },

  getAppNodeScriptUrl(token: string, name: string, uri: string) {
    return (
      cfg.baseUrl +
      generatePath(cfg.api.appNodeScriptPath, { token, name, uri })
    );
  },

  getUsersRoute() {
    const clusterId = cfg.proxyCluster;
    return generatePath(cfg.routes.users, { clusterId });
  },

  getAppsRoute(clusterId: string) {
    return generatePath(cfg.routes.apps, { clusterId });
  },

  getSessionsRoute(clusterId: string) {
    return generatePath(cfg.routes.sessions, { clusterId });
  },

  getRecordingsRoute(clusterId: string) {
    return generatePath(cfg.routes.recordings, { clusterId });
  },

  getConsoleNodesRoute(clusterId: string) {
    return generatePath(cfg.routes.consoleNodes, {
      clusterId,
    });
  },

  getSshConnectRoute({ clusterId, login, serverId }: UrlParams) {
    return generatePath(cfg.routes.consoleConnect, {
      clusterId,
      serverId,
      login,
    });
  },

  getSshSessionRoute({ clusterId, sid }: UrlParams) {
    return generatePath(cfg.routes.consoleSession, { clusterId, sid });
  },

  getPasswordTokenUrl(tokenId) {
    return generatePath(cfg.api.passwordTokenPath, { tokenId });
  },

  getClusterRoute(clusterId: string) {
    return generatePath(cfg.routes.cluster, { clusterId });
  },

  getConsoleRoute(clusterId: string) {
    return generatePath(cfg.routes.console, { clusterId });
  },

  getAppLauncherRoute(params: UrlLauncherParams) {
    return generatePath(cfg.routes.appLauncher, { ...params });
  },

  getPlayerRoute(params: UrlPlayerParams) {
    return generatePath(cfg.routes.player, { ...params });
  },

  getSessionAuditPlayerRoute(params: UrlPlayerParams) {
    return generatePath(cfg.routes.sessionAuditPlayer, { ...params });
  },

  getSessionAuditCmdsRoute(params: UrlPlayerParams) {
    return generatePath(cfg.routes.sessionAuditCmds, { ...params });
  },

  getUserContextUrl() {
    const clusterId = cfg.proxyCluster;
    return generatePath(cfg.api.userContextPath, { clusterId });
  },

  getUserResetTokenRoute(tokenId = '', invite = true) {
    const route = invite ? cfg.routes.userInvite : cfg.routes.userReset;
    return cfg.baseUrl + generatePath(route, { tokenId });
  },

  getUsersUrl() {
    return cfg.api.usersPath;
  },

  getUsersDeleteUrl(username = '') {
    return generatePath(cfg.api.usersDelete, { username });
  },

  getTerminalSessionUrl({ clusterId, sid }: UrlParams) {
    return generatePath(cfg.api.terminalSessionPath, { clusterId, sid });
  },

  getClusterNodesUrl(clusterId: string) {
    return generatePath(cfg.api.nodesPath, { clusterId });
  },

  getApplicationsUrl(clusterId: string) {
    return generatePath(cfg.api.applicationsPath, { clusterId });
  },

  getU2fCreateUserChallengeUrl(tokenId: string) {
    return generatePath(cfg.api.u2fCreateUserChallengePath, { tokenId });
  },

  getScpUrl(params: UrlScpParams) {
    return generatePath(cfg.api.scp, {
      ...params,
    });
  },

  getRenewTokenUrl(requestId?: string) {
    return generatePath(cfg.api.renewTokenPath, { requestId });
  },

  getResourcesUrl(kind?: Resource['kind']) {
    const clusterId = cfg.proxyCluster;
    return generatePath(cfg.api.resourcePath, { clusterId, kind });
  },

  getRemoveResourceUrl(kind: Resource['kind'], id: string) {
    const clusterId = cfg.proxyCluster;
    return generatePath(cfg.api.removeResourcePath, { clusterId, kind, id });
  },

  init(backendConfig = {}) {
    merge(this, backendConfig);
  },
};

export interface UrlParams {
  clusterId: string;
  sid?: string;
  login?: string;
  serverId?: string;
}

export interface UrlScpParams {
  clusterId: string;
  serverId: string;
  login: string;
  location: string;
  filename: string;
}

export interface UrlSshParams {
  login?: string;
  serverId?: string;
  sid?: string;
  clusterId: string;
}

export interface UrlClusterEventsParams {
  start: string;
  end: string;
  limit?: number;
}

export interface UrlLauncherParams {
  fqdn: string;
  clusterId?: string;
  publicAddr?: string;
}

export interface UrlPlayerParams {
  clusterId: string;
  sid: string;
}

export default cfg;
