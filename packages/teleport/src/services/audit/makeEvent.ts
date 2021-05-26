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

import moment from 'moment';
import { Event, RawEvent, Formatters } from './types';
import events from './eventTypes';

export const formatters: Formatters = {
  [events.accessRequestCreate.code]: {
    desc: events.accessRequestCreate.desc,
    format: ({ id, state }) =>
      `Access request [${id}] has been created and is ${state}`,
  },
  [events.accessRequestUpdate.code]: {
    desc: events.accessRequestUpdate.desc,
    format: ({ id, state }) =>
      `Access request [${id}] has been updated to ${state}`,
  },
  [events.accessRequestReview.code]: {
    desc: events.accessRequestReview.desc,
    format: ({ id, reviewer }) =>
      `User [${reviewer}] reviewed access request [${id}]`,
  },
  [events.sessionCommand.code]: {
    desc: events.sessionCommand.desc,
    format: ({ program, sid }) =>
      `Program [${program}] has been executed within a session [${sid}]`,
  },
  [events.sessionDisk.code]: {
    desc: events.sessionDisk.desc,
    format: ({ path, sid, program }) =>
      `Program [${program}] accessed a file [${path}] within a session [${sid}]`,
  },
  [events.sessionNetwork.code]: {
    desc: events.sessionNetwork.desc,
    format: ({ sid, program, src_addr, dst_addr, dst_port }) =>
      `Program [${program}] opened a connection [${src_addr} <-> ${dst_addr}:${dst_port}] within a session [${sid}]`,
  },
  [events.sessionData.code]: {
    desc: events.sessionData.desc,
    format: ({ sid }) =>
      `Usage report has been updated for session [${sid || ''}]`,
  },

  [events.userPasswordChange.code]: {
    desc: events.userPasswordChange.desc,
    format: ({ user }) => `User [${user}] has changed a password`,
  },

  [events.userUpdated.code]: {
    desc: events.userUpdated.desc,
    format: ({ name }) => `User [${name}] has been updated`,
  },
  [events.resetPasswordTokenCreate.code]: {
    desc: events.resetPasswordTokenCreate.desc,
    format: ({ name, user }) =>
      `User [${user}] created a password reset token for user [${name}]`,
  },
  [events.authAttemptFailure.code]: {
    desc: events.authAttemptFailure.desc,
    format: ({ user, error }) => `User [${user}] failed auth attempt: ${error}`,
  },

  [events.clientDisconnect.code]: {
    desc: events.clientDisconnect.desc,
    format: ({ user, reason }) =>
      `User [${user}] has been disconnected: ${reason}`,
  },
  [events.exec.code]: {
    desc: events.exec.desc,
    format: event => {
      const { proto, kubernetes_cluster, user = '' } = event;
      if (proto === 'kube') {
        if (!kubernetes_cluster) {
          return `User [${user}] executed a kubernetes command`;
        }
        return `User [${user}] executed a command on kubernetes cluster [${kubernetes_cluster}]`;
      }

      return `User [${user}] executed a command on node ${event['addr.local']}`;
    },
  },
  [events.execFailure.code]: {
    desc: events.execFailure.desc,
    format: ({ user, exitError, ...rest }) =>
      `User [${user}] command execution on node ${rest['addr.local']} failed [${exitError}]`,
  },
  [events.githubConnectorCreated.code]: {
    desc: events.githubConnectorCreated.desc,
    format: ({ user, name }) =>
      `User [${user}] created Github connector [${name}] has been created`,
  },
  [events.githubConnectorDeleted.code]: {
    desc: events.githubConnectorDeleted.desc,
    format: ({ user, name }) =>
      `User [${user}] deleted Github connector [${name}]`,
  },
  [events.oidcConnectorCreated.code]: {
    desc: events.oidcConnectorCreated.desc,
    format: ({ user, name }) =>
      `User [${user}] created OIDC connector [${name}]`,
  },
  [events.oidcConnectorDeleted.code]: {
    desc: events.oidcConnectorDeleted.desc,
    format: ({ user, name }) =>
      `User [${user}] deleted OIDC connector [${name}]`,
  },
  [events.portForward.code]: {
    desc: events.portForward.desc,
    format: ({ user }) => `User [${user}] started port forwarding`,
  },
  [events.portForwardFailure.code]: {
    desc: events.portForwardFailure.desc,
    format: ({ user, error }) =>
      `User [${user}] port forwarding request failed: ${error}`,
  },
  [events.samlConnectorCreated.code]: {
    desc: events.samlConnectorCreated.desc,
    format: ({ user, name }) =>
      `User [${user}] created SAML connector [${name}]`,
  },
  [events.samlConnectorDeleted.code]: {
    desc: events.samlConnectorDeleted.desc,
    format: ({ user, name }) =>
      `User [${user}] deleted SAML connector [${name}]`,
  },
  [events.scpDownload.code]: {
    desc: events.scpDownload.desc,
    format: ({ user, path, ...rest }) =>
      `User [${user}] downloaded a file [${path}] from node [${rest['addr.local']}]`,
  },
  [events.scpDownloadFailure.code]: {
    desc: events.scpDownloadFailure.desc,
    format: ({ exitError, ...rest }) =>
      `File download from node [${rest['addr.local']}] failed [${exitError}]`,
  },
  [events.scpUpload.code]: {
    desc: events.scpUpload.desc,
    format: ({ user, path, ...rest }) =>
      `User [${user}] uploaded a file [${path}] to node [${rest['addr.local']}]`,
  },
  [events.scpUploadFailure.code]: {
    desc: events.scpUploadFailure.desc,
    format: ({ exitError, ...rest }) =>
      `File upload to node [${rest['addr.local']}] failed [${exitError}]`,
  },
  [events.userSessionJoin.code]: {
    desc: events.userSessionJoin.desc,
    format: ({ user, sid }) => `User [${user}] has joined the session [${sid}]`,
  },
  [events.sessionEnd.code]: {
    desc: events.sessionEnd.desc,
    format: event => {
      const user = event.user || '';
      const node =
        event.server_hostname || event.server_addr || event.server_id;

      if (event.proto === 'kube') {
        if (!event.kubernetes_cluster) {
          return `User [${user}] has ended a kubernetes session [${event.sid}]`;
        }
        return `User [${user}] has ended a session [${event.sid}] on kubernetes cluster [${event.kubernetes_cluster}]`;
      }

      if (!event.interactive) {
        return `User [${user}] has ended a non-interactive session [${event.sid}] on node [${node}] `;
      }

      if (event.session_start && event.session_stop) {
        const duration = moment(event.session_stop).diff(event.session_start);
        const durationText = moment.duration(duration).humanize();
        return `User [${user}] has ended an interactive session lasting ${durationText} [${event.sid}] on node [${node}]`;
      }

      return `User [${user}] has ended interactive session [${event.sid}] on node [${node}] `;
    },
  },
  [events.sessionRejected.code]: {
    desc: events.sessionRejected.desc,
    format: ({ user, login, server_id, reason }) =>
      `User [${user}] was denied access to [${login}@${server_id}] because [${reason}]`,
  },
  [events.userSessionLeave.code]: {
    desc: events.userSessionLeave.desc,
    format: ({ user, sid }) => `User [${user}] has left the session [${sid}]`,
  },
  [events.sessionStart.code]: {
    desc: events.sessionStart.desc,
    format: ({ user, sid }) => `User [${user}] has started a session [${sid}]`,
  },
  [events.sessionUpload.code]: {
    desc: events.sessionUpload.desc,
    format: () => `Recorded session has been uploaded`,
  },
  [events.appSessionStart.code]: {
    desc: events.appSessionStart.desc,
    format: ({ user, sid }) =>
      `User [${user}] has started an app session [${sid}]`,
  },
  [events.appSessionChunk.code]: {
    desc: events.appSessionChunk.desc,
    format: ({ sid }) => `New app session data created [${sid}]`,
  },
  [events.subsystem.code]: {
    desc: events.subsystem.desc,
    format: ({ user, name }) => `User [${user}] requested subsystem [${name}]`,
  },
  [events.subsystemFailure.code]: {
    desc: events.subsystemFailure.desc,
    format: ({ user, name, exitError }) =>
      `User [${user}] subsystem [${name}] request failed [${exitError}]`,
  },
  [events.terminalResize.code]: {
    desc: events.terminalResize.desc,
    format: ({ user, sid }) =>
      `User [${user}] resized the session [${sid}] terminal`,
  },
  [events.userCreate.code]: {
    desc: events.userCreate.desc,
    format: ({ name }) => `User [${name}] has been created`,
  },
  [events.userDelete.code]: {
    desc: events.userDelete.desc,
    format: ({ name }) => `User [${name}] has been deleted`,
  },
  [events.userLogin.code]: {
    desc: events.userLogin.desc,
    format: ({ user }) => `Local user [${user}] successfully logged in`,
  },
  [events.userLoginFailure.code]: {
    desc: events.userLoginFailure.desc,
    format: ({ user, error }) => `Local user [${user}] login failed [${error}]`,
  },
  [events.userSsoLogin.code]: {
    desc: events.userSsoLogin.desc,
    format: ({ user }) => `SSO user [${user}] successfully logged in`,
  },
  [events.userSsoLoginFailure.code]: {
    desc: events.userSsoLoginFailure.desc,
    format: ({ error }) => `SSO user login failed [${error}]`,
  },
  [events.userRoleCreated.code]: {
    desc: events.userRoleCreated.desc,
    format: ({ user, name }) => `User [${user}] created a role [${name}]`,
  },
  [events.userRoleDeleted.code]: {
    desc: events.userRoleDeleted.desc,
    format: ({ user, name }) => `User [${user}] deleted a role [${name}]`,
  },
  [events.trustedClusterTokenCreate.code]: {
    desc: events.trustedClusterTokenCreate.desc,
    format: ({ user }) => `User [${user}] has created a trusted cluster token`,
  },
  [events.trustedClusterCreate.code]: {
    desc: events.trustedClusterCreate.desc,
    format: ({ user, name }) =>
      `User [${user}] has created a trusted relationship with cluster [${name}]`,
  },
  [events.trustedClusterDelete.code]: {
    desc: events.trustedClusterDelete.desc,
    format: ({ user, name }) =>
      `User [${user}] has deleted a trusted relationship with cluster [${name}]`,
  },
  [events.kubeRequest.code]: {
    desc: events.kubeRequest.desc,
    format: ({ user, kubernetes_cluster }) =>
      `User [${user}] made a request to kubernetes cluster [${kubernetes_cluster}]`,
  },
  [events.databaseSessionStart.code]: {
    desc: events.databaseSessionStart.desc,
    format: ({ user, db_service, db_name, db_user }) =>
      `User [${user}] has connected to database [${db_name}] as [${db_user}] on [${db_service}]`,
  },
  [events.databaseSessionStartFailure.code]: {
    desc: events.databaseSessionStartFailure.desc,
    format: ({ user, db_service, db_name, db_user }) =>
      `User [${user}] was denied access to database [${db_name}] as [${db_user}] on [${db_service}]`,
  },
  [events.databaseSessionEnd.code]: {
    desc: events.databaseSessionEnd.desc,
    format: ({ user, db_service, db_name }) =>
      `User [${user}] has disconnected from database [${db_name}] on [${db_service}]`,
  },
  [events.databaseSessionQuery.code]: {
    desc: events.databaseSessionQuery.desc,
    format: ({ user, db_service, db_name, db_query }) =>
      `User [${user}] has executed query [${truncateStr(
        db_query,
        80
      )}] in database [${db_name}] on [${db_service}]`,
  },
  [events.mfaDeviceAdd.code]: {
    desc: events.mfaDeviceAdd.desc,
    format: ({ user, mfa_device_name, mfa_device_type }) =>
      `User [${user}] added ${mfa_device_type} device [${mfa_device_name}]`,
  },
  [events.mfaDeviceDelete.code]: {
    desc: events.mfaDeviceDelete.desc,
    format: ({ user, mfa_device_name, mfa_device_type }) =>
      `User [${user}] deleted ${mfa_device_type} device [${mfa_device_name}]`,
  },
  [events.billingCardCreate.code]: {
    desc: events.billingCardCreate.desc,
    format: ({ user }) => `User [${user}] has added a credit card`,
  },
  [events.billingCardDelete.code]: {
    desc: events.billingCardDelete.desc,
    format: ({ user }) => `User [${user}] has deleted a credit card`,
  },
  [events.billingCardUpdate.code]: {
    desc: events.billingCardUpdate.desc,
    format: ({ user }) => `User [${user}] has updated a credit card`,
  },
  [events.billingInformationUpdate.code]: {
    desc: events.billingInformationUpdate.desc,
    format: ({ user }) => `User [${user}] has updated the billing information`,
  },
};

const unknownFormatter = {
  desc: 'Unknown',
  format: () => 'Unknown',
};

export default function makeEvent(json: any): Event {
  // lookup event formatter by code
  const formatter = formatters[json.code] || unknownFormatter;
  const event = {
    codeDesc: formatter.desc,
    message: formatter.format(json as any),
    id: getId(json),
    code: json.code,
    user: json.user,
    time: new Date(json.time),
    raw: json,
  };

  return event;
}

// older events might not have an uid field.
// in this case compose it from other fields.
function getId(json: RawEvent<any>) {
  const { uid, event, time } = json;
  if (uid) {
    return uid;
  }

  return `${event}:${time}`;
}

function truncateStr(str: string, len: number): string {
  if (str.length <= len) {
    return str;
  }
  return str.substring(0, len - 3) + '...';
}
