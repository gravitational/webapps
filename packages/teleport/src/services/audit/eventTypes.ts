/**
 * Copyright 2021 Gravitational, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as Icons from 'design/Icon/Icon';

/**
 * eventTypes is a map of event type definitions.
 *
 * After defining an event type:
 *  1: If applicable, define duplicated event names in `groupedEventNames` object.
 *     Some events can have same event "name" but have unique "code".
 *  2: Define the raw field types in types file, which are the fields from JSON response.
 *  3: Define formatter in makeEvent file which formats how the event will
 *     be text formatted to user (displayed in table).
 *  4: Add an actual JSON event to the fixtures file in `src/Audit` directory to
 *     be used for display and test in storybook.
 *
 * Event fields:
 *  - name: is event name (also used as filter when fetching events)
 *  - code: is event code and is unique
 *  - desc: is title of event (displayed in table)
 *  - icon: a visual (svg) that describes the event (displayed in table)
 */
const eventTypes = {
  accessRequestCreate: {
    name: 'access_request.create',
    code: 'T5000I',
    desc: 'Access Request Created',
    icon: Icons.Info,
  },
  accessRequestReview: {
    name: 'access_request.review',
    code: 'T5002I',
    desc: 'Access Request Reviewed',
    icon: Icons.Info,
  },
  accessRequestUpdate: {
    name: 'access_request.update',
    code: 'T5001I',
    desc: 'Access Request Updated',
    icon: Icons.Info,
  },
  appSessionChunk: {
    name: 'app.session.chunk',
    code: 'T2008I',
    desc: 'App Session Data',
    icon: Icons.Info,
  },
  appSessionStart: {
    name: 'app.session.start',
    code: 'T2007I',
    desc: 'App Session Started',
    icon: Icons.Info,
  },
  authAttemptFailure: {
    name: 'auth',
    code: 'T3007W',
    desc: 'Auth Attempt Failed',
    icon: Icons.Info,
  },
  billingCardCreate: {
    name: 'billing.create_card',
    code: 'TBL00I',
    desc: 'Credit Card Added',
    icon: Icons.CreditCardAlt2,
  },
  billingCardDelete: {
    name: 'billing.delete_card',
    code: 'TBL01I',
    desc: 'Credit Card Deleted',
    icon: Icons.CreditCardAlt2,
  },
  billingCardUpdate: {
    name: 'billing.update_card',
    code: 'TBL02I',
    desc: 'Credit Card Updated',
    icon: Icons.CreditCardAlt2,
  },
  billingInformationUpdate: {
    name: 'billing.update_info',
    code: 'TBL03I',
    desc: 'Billing Information Updated',
    icon: Icons.CreditCardAlt2,
  },
  clientDisconnect: {
    name: 'client.disconnect',
    code: 'T3006I',
    desc: 'Client Disconnected',
    icon: Icons.Info,
  },
  databaseSessionEnd: {
    name: 'db.session.end',
    code: 'TDB01I',
    desc: 'Database Session Ended',
    icon: Icons.Database,
  },
  databaseSessionQuery: {
    name: 'db.session.query',
    code: 'TDB02I',
    desc: 'Database Query',
    icon: Icons.Database,
  },
  databaseSessionStart: {
    name: 'db.session.start',
    code: 'TDB00I',
    desc: 'Database Session Started',
    icon: Icons.Database,
  },
  databaseSessionStartFailure: {
    name: 'db.session.start',
    code: 'TDB00W',
    desc: 'Database Session Denied',
    icon: Icons.Database,
  },
  exec: {
    name: 'exec',
    code: 'T3002I',
    desc: 'Command Execution',
    icon: Icons.Cli,
  },
  execFailure: {
    name: 'exec',
    code: 'T3002E',
    desc: 'Command Execution Failed',
    icon: Icons.Cli,
  },
  githubConnectorCreated: {
    name: 'github.created',
    code: 'T8000I',
    desc: 'GITHUB Auth Connector Created',
    icon: Icons.Info,
  },
  githubConnectorDeleted: {
    name: 'github.deleted',
    code: 'T8001I',
    desc: 'GITHUB Auth Connector Deleted',
    icon: Icons.Info,
  },
  kubeRequest: {
    name: 'kube.request',
    code: 'T3009I',
    desc: 'Kubernetes Request',
    icon: Icons.Kubernetes,
  },
  mfaDeviceAdd: {
    name: 'mfa.add',
    code: 'T1006I',
    desc: 'MFA Device Added',
    icon: Icons.Info,
  },
  mfaDeviceDelete: {
    name: 'mfa.delete',
    code: 'T1007I',
    desc: 'MFA Device Deleted',
    icon: Icons.Info,
  },
  oidcConnectorCreated: {
    name: 'oidc.created',
    code: 'T8100I',
    desc: 'OIDC Auth Connector Created',
    icon: Icons.Info,
  },
  oidcConnectorDeleted: {
    name: 'oidc.deleted',
    code: 'T8101I',
    desc: 'OIDC Auth Connector Deleted',
    icon: Icons.Info,
  },
  portForward: {
    name: 'port',
    code: 'T3003I',
    desc: 'Port Forwarding Started',
    icon: Icons.Info,
  },
  portForwardFailure: {
    name: 'port',
    code: 'T3003E',
    desc: 'Port Forwarding Failed',
    icon: Icons.Info,
  },
  resetPasswordTokenCreate: {
    name: 'reset_password_token.create',
    code: 'T6000I',
    desc: 'Reset Password Token Created',
    icon: Icons.Info,
  },
  terminalResize: {
    name: 'resize',
    code: 'T2002I',
    desc: 'Terminal Resize',
    icon: Icons.Cli,
  },
  userRoleCreated: {
    name: 'role.created',
    code: 'T9000I',
    desc: 'User Role Created',
    icon: Icons.Info,
  },
  userRoleDeleted: {
    name: 'role.deleted',
    code: 'T9001I',
    desc: 'User Role Deleted',
    icon: Icons.Info,
  },
  samlConnectorCreated: {
    name: 'saml.created',
    code: 'T8200I',
    desc: 'SAML Connector Created',
    icon: Icons.Info,
  },
  samlConnectorDeleted: {
    name: 'saml.deleted',
    code: 'T8201I',
    desc: 'SAML Connector Deleted',
    icon: Icons.Info,
  },
  scpDownload: {
    name: 'scp',
    code: 'T3004I',
    desc: 'SCP Download',
    icon: Icons.Download,
  },
  scpDownloadFailure: {
    name: 'scp',
    code: 'T3004E',
    desc: 'SCP Download Failed',
    icon: Icons.Download,
  },
  scpUpload: {
    name: 'scp',
    code: 'T3005I',
    desc: 'SCP Upload',
    icon: Icons.Upload,
  },
  scpUploadFailure: {
    name: 'scp',
    code: 'T3005E',
    desc: 'SCP Upload Failed',
    icon: Icons.Upload,
  },
  sessionCommand: {
    name: 'session.command',
    code: 'T4000I',
    desc: 'Session Command',
    icon: Icons.Cli,
  },
  sessionData: {
    name: 'session.data',
    code: 'T2006I',
    desc: 'Session Data',
    icon: Icons.Cli,
  },
  sessionDisk: {
    name: 'session.disk',
    code: 'T4001I',
    desc: 'Session File Access',
    icon: Icons.Cli,
  },
  sessionEnd: {
    name: 'session.end',
    code: 'T2004I',
    desc: 'Session Ended',
    icon: Icons.Cli,
  },
  userSessionJoin: {
    name: 'session.join',
    code: 'T2001I',
    desc: 'User Joined',
    icon: Icons.Cli,
  },
  userSessionLeave: {
    name: 'session.leave',
    code: 'T2003I',
    desc: 'User Disconnected',
    icon: Icons.Cli,
  },
  sessionNetwork: {
    name: 'session.network',
    code: 'T4002I',
    desc: 'Session Network Connection',
    icon: Icons.Cli,
  },
  sessionRejected: {
    name: 'session.rejected',
    code: 'T1006W',
    desc: 'Session Rejected',
    icon: Icons.Cli,
  },
  sessionStart: {
    name: 'session.start',
    code: 'T2000I',
    desc: 'Session Started',
    icon: Icons.Cli,
  },
  sessionUpload: {
    name: 'session.upload',
    code: 'T2005I',
    desc: 'Session Uploaded',
    icon: Icons.Cli,
  },
  subsystem: {
    name: 'subsystem',
    code: 'T3001I',
    desc: 'Subsystem Requested',
    icon: Icons.Info,
  },
  subsystemFailure: {
    name: 'subsystem',
    code: 'T3001E',
    desc: 'Subsystem Request Failed',
    icon: Icons.Info,
  },
  trustedClusterCreate: {
    name: 'trusted_cluster.create',
    code: 'T7000I',
    desc: 'Trusted Cluster Created',
    icon: Icons.Info,
  },
  trustedClusterDelete: {
    name: 'trusted_cluster.delete',
    code: 'T7001I',
    desc: 'Trusted Cluster Deleted',
    icon: Icons.Info,
  },
  trustedClusterTokenCreate: {
    name: 'trusted_cluster_token.create',
    code: 'T7002I',
    desc: 'Trusted Cluster Token Created',
    icon: Icons.Info,
  },
  userCreate: {
    name: 'user.create',
    code: 'T1002I',
    desc: 'User Created',
    icon: Icons.Info,
  },
  userDelete: {
    name: 'user.delete',
    code: 'T1004I',
    desc: 'User Deleted',
    icon: Icons.Info,
  },
  userLogin: {
    name: 'user.login',
    code: 'T1000I',
    desc: 'Local Login',
    icon: Icons.Info,
  },
  userLoginFailure: {
    name: 'user.login',
    code: 'T1000W',
    desc: 'Local Login Failed',
    icon: Icons.Info,
  },
  userSsoLogin: {
    name: 'user.login',
    code: 'T1001I',
    desc: 'SSO Login',
    icon: Icons.Info,
  },
  userSsoLoginFailure: {
    name: 'user.login',
    code: 'T1001W',
    desc: 'SSO Login Failed',
    icon: Icons.Info,
  },
  userPasswordChange: {
    name: 'user.password_change',
    code: 'T1005I',
    desc: 'User Password Updated',
    icon: Icons.Info,
  },
  userUpdated: {
    name: 'user.update',
    code: 'T1003I',
    desc: 'User Updated',
    icon: Icons.Info,
  },
} as const;
export default eventTypes;

// groupedEventNames contains a map of events that were grouped under the same
// event name but have different event codes. This is used to filter out duplicate
// event names when listing event filters and provide modified description of event.
export const groupedEventNames: Partial<Record<EventTypeName, string>> = {
  'db.session.start': 'Database Session Start',
  exec: 'Command Execution',
  port: 'Port Forwarding',
  scp: 'SCP',
  subsystem: 'Subsystem Request',
  'user.login': 'User Logins',
};

type EventTypes = typeof eventTypes;
type EventTypeKeys = keyof EventTypes;
type EventTypeName = EventTypes[EventTypeKeys]['name'];

export type EventCode = EventTypes[EventTypeKeys]['code'];
