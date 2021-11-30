/*
Copyright 2015-2021 Gravitational, Inc.

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
import { AuthProvider, Auth2faType, PreferredMfaType } from 'shared/services';

const cfg = {
  isEnterprise: false,
  isCloud: false,

  baseUrl: window.location.origin,

  auth: {
    localAuthEnabled: true,
    providers: [] as AuthProvider[],
    second_factor: 'off' as Auth2faType,
    authType: 'local',
    preferredLocalMfa: '' as PreferredMfaType,
  },

  proxyCluster: 'localhost',

  loc: {
    dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
    dateFormat: 'YYYY-MM-DD',
  },

  routes: {
    root: '/web',
    apps: '/web/cluster/:clusterId/apps',
    appLauncher: '/web/launch/:fqdn/:clusterId?/:publicAddr?/:arn?',
    support: '/web/support',
    settings: '/web/settings',
    account: '/web/account',
    accountPassword: '/web/account/password',
    accountMfaDevices: '/web/account/twofactor',
    roles: '/web/roles',
    sso: '/web/sso',
    cluster: '/web/cluster/:clusterId/',
    clusters: '/web/clusters',
    trustedClusters: '/web/trust',
    audit: '/web/cluster/:clusterId/audit',
    nodes: '/web/cluster/:clusterId/nodes',
    sessions: '/web/cluster/:clusterId/sessions',
    recordings: '/web/cluster/:clusterId/recordings',
    databases: '/web/cluster/:clusterId/databases',
    desktops: '/web/cluster/:clusterId/desktops',
    desktop: '/web/cluster/:clusterId/desktops/:desktopId/:username',
    users: '/web/users',
    console: '/web/cluster/:clusterId/console',
    consoleNodes: '/web/cluster/:clusterId/console/nodes',
    consoleConnect: '/web/cluster/:clusterId/console/node/:serverId/:login',
    consoleSession: '/web/cluster/:clusterId/console/session/:sid',
    player: '/web/cluster/:clusterId/session/:sid',
    sessionAuditPlayer: '/web/cluster/:clusterId/session/:sid/player',
    sessionAuditCmds: '/web/cluster/:clusterId/session/:sid/commands',
    login: '/web/login',
    loginSuccess: '/web/msg/info/login_success',
    loginErrorLegacy: '/web/msg/error/login_failed',
    loginError: '/web/msg/error/login',
    loginErrorCallback: '/web/msg/error/login/callback',
    userInvite: '/web/invite/:tokenId',
    userInviteContinue: '/web/invite/:tokenId/continue',
    userReset: '/web/reset/:tokenId',
    userResetContinue: '/web/reset/:tokenId/continue',
    kubernetes: '/web/cluster/:clusterId/kubernetes',
    // whitelist sso handlers
    oidcHandler: '/v1/webapi/oidc/*',
    samlHandler: '/v1/webapi/saml/*',
    githubHandler: '/v1/webapi/github/*',
  },

  api: {
    appSession: '/v1/webapi/sessions/app',
    appFqdnPath: '/v1/webapi/apps/:fqdn/:clusterId?/:publicAddr?',
    applicationsPath: '/v1/webapi/sites/:clusterId/apps',
    clustersPath: '/v1/webapi/sites',
    clusterEventsPath: `/v1/webapi/sites/:clusterId/events/search?from=:start?&to=:end?&limit=:limit?&startKey=:startKey?&include=:include?`,
    scp:
      '/v1/webapi/sites/:clusterId/nodes/:serverId/:login/scp?location=:location&filename=:filename',
    renewTokenPath: '/v1/webapi/sessions/renew',
    resetPasswordTokenPath: '/v1/webapi/users/password/token',
    sessionPath: '/v1/webapi/sessions',
    userContextPath: '/v1/webapi/sites/:clusterId/context',
    userStatusPath: '/v1/webapi/user/status',
    passwordTokenPath: '/v1/webapi/users/password/token/:tokenId?',
    changeUserPasswordPath: '/v1/webapi/users/password',
    nodesPath: '/v1/webapi/sites/:clusterId/nodes',
    databasesPath: `/v1/webapi/sites/:clusterId/databases`,
    desktopsPath: `/v1/webapi/sites/:clusterId/desktops`,
    desktopWsAddr:
      'wss://:fqdm/v1/webapi/sites/:clusterId/desktop/:desktopId/connect?access_token=:token',
    siteSessionPath: '/v1/webapi/sites/:siteId/sessions',
    ttyWsAddr:
      'wss://:fqdm/v1/webapi/sites/:clusterId/connect?access_token=:token&params=:params',
    terminalSessionPath: '/v1/webapi/sites/:clusterId/sessions/:sid?',
    kubernetesPath: '/v1/webapi/sites/:clusterId/kubernetes',

    usersPath: '/v1/webapi/users',
    usersDelete: '/v1/webapi/users/:username',
    createPrivilegeTokenPath: '/v1/webapi/users/privilege/token',

    rolesPath: '/v1/webapi/roles/:name?',
    githubConnectorsPath: '/v1/webapi/github/:name?',
    trustedClustersPath: '/v1/webapi/trustedcluster/:name?',

    nodeTokenPath: '/v1/enterprise/nodes/token',
    nodeScriptPath: '/scripts/:token/install-node.sh',
    appNodeScriptPath: '/scripts/:token/install-app.sh?name=:name&uri=:uri',

    mfaLoginBegin: '/v1/webapi/mfa/login/begin', // creates authnenticate challenge with user and password
    mfaLoginFinish: '/v1/webapi/mfa/login/finishsession', // creates a web session
    mfaChangePasswordBegin: '/v1/webapi/mfa/authenticatechallenge/password',

    mfaCreateRegistrationChallengePath:
      '/v1/webapi/mfa/token/:tokenId/registerchallenge',

    mfaRegisterChallengeWithTokenPath:
      '/v1/webapi/mfa/token/:tokenId/registerchallenge',
    mfaAuthnChallengePath: '/v1/webapi/mfa/authenticatechallenge',
    mfaAuthnChallengeWithTokenPath:
      '/v1/webapi/mfa/token/:tokenId/authenticatechallenge',
    mfaDevicesWithTokenPath: '/v1/webapi/mfa/token/:tokenId/devices',
    mfaDevicesPath: '/v1/webapi/mfa/devices',
    mfaDevicePath: '/v1/webapi/mfa/token/:tokenId/devices/:deviceName',
  },

  getAppFqdnUrl(params: UrlAppParams) {
    return generatePath(cfg.api.appFqdnPath, { ...params });
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

  getPreferredMfaType() {
    return cfg.auth ? cfg.auth.preferredLocalMfa : null;
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

  getDatabasesRoute(clusterId: string) {
    return generatePath(cfg.routes.databases, { clusterId });
  },

  getDesktopsRoute(clusterId: string) {
    return generatePath(cfg.routes.desktops, { clusterId });
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

  getDesktopRoute({ clusterId, username, desktopId }) {
    return generatePath(cfg.routes.desktop, {
      clusterId,
      desktopId,
      username,
    });
  },

  getSshSessionRoute({ clusterId, sid }: UrlParams) {
    return generatePath(cfg.routes.consoleSession, { clusterId, sid });
  },

  getPasswordTokenUrl(tokenId?: string) {
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

  getUserResetTokenContinueRoute(tokenId = '') {
    return generatePath(cfg.routes.userResetContinue, { tokenId });
  },

  getUserInviteTokenRoute(tokenId = '') {
    return generatePath(cfg.routes.userInvite, { tokenId });
  },

  getUserInviteTokenContinueRoute(tokenId = '') {
    return generatePath(cfg.routes.userInviteContinue, { tokenId });
  },

  getKubernetesRoute(clusterId: string) {
    return generatePath(cfg.routes.kubernetes, { clusterId });
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

  getDatabasesUrl(clusterId: string) {
    return generatePath(cfg.api.databasesPath, { clusterId });
  },

  getDesktopsUrl(clusterId: string) {
    return generatePath(cfg.api.desktopsPath, { clusterId });
  },

  getApplicationsUrl(clusterId: string) {
    return generatePath(cfg.api.applicationsPath, { clusterId });
  },

  getScpUrl(params: UrlScpParams) {
    return generatePath(cfg.api.scp, {
      ...params,
    });
  },

  getRenewTokenUrl() {
    return cfg.api.renewTokenPath;
  },

  getGithubConnectorsUrl(name?: string) {
    return generatePath(cfg.api.githubConnectorsPath, { name });
  },

  getTrustedClustersUrl(name?: string) {
    return generatePath(cfg.api.trustedClustersPath, { name });
  },

  getRolesUrl(name?: string) {
    return generatePath(cfg.api.rolesPath, { name });
  },

  getKubernetesUrl(clusterId: string) {
    return generatePath(cfg.api.kubernetesPath, { clusterId });
  },

  getAuthnChallengeWithTokenUrl(tokenId: string) {
    return generatePath(cfg.api.mfaAuthnChallengeWithTokenPath, {
      tokenId,
    });
  },

  getMfaDevicesWithTokenUrl(tokenId: string) {
    return generatePath(cfg.api.mfaDevicesWithTokenPath, { tokenId });
  },

  getMfaDeviceUrl(tokenId: string, deviceName: string) {
    return generatePath(cfg.api.mfaDevicePath, { tokenId, deviceName });
  },

  getMfaCreateRegistrationChallengeUrl(tokenId: string) {
    return generatePath(cfg.api.mfaCreateRegistrationChallengePath, {
      tokenId,
    });
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

export interface UrlAppParams {
  fqdn: string;
  clusterId?: string;
  publicAddr?: string;
  arn?: string;
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
  include?: string;
  startKey?: string;
}

export interface UrlLauncherParams {
  fqdn: string;
  clusterId?: string;
  publicAddr?: string;
  arn?: string;
}

export interface UrlPlayerParams {
  clusterId: string;
  sid: string;
}

// /web/cluster/:clusterId/desktops/:desktopId/:username
export interface UrlDesktopParams {
  username?: string;
  desktopId?: string;
  clusterId: string;
}

export default cfg;
