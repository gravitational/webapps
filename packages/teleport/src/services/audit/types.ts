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

import events, { EventCode } from './eventTypes';

/**
 * Describes all raw event types
 */
export type RawEvents = {
  [events.accessRequestCreate.code]: RawEventAccess<
    typeof events.accessRequestUpdate.code
  >;
  [events.accessRequestUpdate.code]: RawEventAccess<
    typeof events.accessRequestUpdate.code
  >;
  [events.accessRequestReview.code]: RawEventAccess<
    typeof events.accessRequestReview.code
  >;
  [events.authAttemptFailure.code]: RawEvent<
    typeof events.authAttemptFailure.code,
    {
      error: string;
    }
  >;
  [events.clientDisconnect.code]: RawEvent<
    typeof events.clientDisconnect.code,
    { reason: string }
  >;
  [events.clientDisconnect.code]: RawEvent<
    typeof events.clientDisconnect.code,
    { reason: string }
  >;
  [events.exec.code]: RawEvent<
    typeof events.exec.code,
    {
      proto: 'kube';
      kubernetes_cluster: string;
    }
  >;
  [events.execFailure.code]: RawEvent<
    typeof events.execFailure.code,
    { exitError: string }
  >;
  [events.billingCardCreate.code]: RawEvent<
    typeof events.billingCardCreate.code
  >;
  [events.billingCardDelete.code]: RawEvent<
    typeof events.billingCardDelete.code
  >;
  [events.billingCardUpdate.code]: RawEvent<
    typeof events.billingCardUpdate.code
  >;
  [events.billingInformationUpdate.code]: RawEvent<
    typeof events.billingInformationUpdate.code
  >;
  [events.githubConnectorCreated.code]: RawEventConnector<
    typeof events.githubConnectorCreated.code
  >;
  [events.githubConnectorDeleted.code]: RawEventConnector<
    typeof events.githubConnectorDeleted.code
  >;
  [events.oidcConnectorCreated.code]: RawEventConnector<
    typeof events.oidcConnectorCreated.code
  >;
  [events.oidcConnectorDeleted.code]: RawEventConnector<
    typeof events.oidcConnectorDeleted.code
  >;
  [events.portForward.code]: RawEvent<typeof events.portForward.code>;
  [events.portForwardFailure.code]: RawEvent<
    typeof events.portForwardFailure.code,
    {
      error: string;
    }
  >;
  [events.samlConnectorCreated.code]: RawEventConnector<
    typeof events.samlConnectorCreated.code
  >;
  [events.samlConnectorDeleted.code]: RawEventConnector<
    typeof events.samlConnectorDeleted.code
  >;
  [events.scpDownload.code]: RawEvent<
    typeof events.scpDownload.code,
    {
      path: string;
      ['addr_local']: string;
    }
  >;
  [events.scpDownloadFailure.code]: RawEvent<
    typeof events.scpDownloadFailure.code,
    {
      exitError: string;
    }
  >;
  [events.scpUpload.code]: RawEvent<
    typeof events.scpUpload.code,
    {
      path: string;
      ['addr.local']: string;
    }
  >;
  [events.scpUploadFailure.code]: RawEvent<
    typeof events.scpUploadFailure.code,
    {
      exitError: string;
    }
  >;

  [events.sessionCommand.code]: RawEvent<
    typeof events.sessionCommand.code,
    {
      login: string;
      namespace: string;
      path: string;
      pid: number;
      ppid: number;
      program: string;
      return_code: number;
      server_id: string;
      sid: string;
    }
  >;

  [events.sessionDisk.code]: RawEvent<
    typeof events.sessionDisk.code,
    {
      login: string;
      namespace: string;
      pid: number;
      cgroup_id: number;
      program: string;
      path: string;
      return_code: number;
      server_id: string;
      flags: number;
      sid: string;
    }
  >;

  [events.sessionNetwork.code]: RawEvent<
    typeof events.sessionNetwork.code,
    {
      login: string;
      namespace: string;
      pid: number;
      cgroup_id: number;
      program: string;
      server_id: string;
      flags: number;
      sid: string;
      src_addr: string;
      dst_addr: string;
      dst_port: string;
    }
  >;

  [events.sessionData.code]: RawEvent<
    typeof events.sessionData.code,
    {
      login: string;
      rx: number;
      server_id: string;
      sid: string;
      tx: number;
      user: string;
    }
  >;

  [events.userSessionJoin.code]: RawEvent<
    typeof events.userSessionJoin.code,
    {
      sid: string;
    }
  >;

  [events.sessionEnd.code]: RawEvent<
    typeof events.sessionEnd.code,
    {
      sid: string;
      server_id: string;
      server_addr: string;
      session_start: string;
      session_stop: string;
      participants?: string[];
      server_hostname: string;
      interactive: boolean;
      proto: string;
      kubernetes_cluster: string;
      kubernetes_pod_namespace: string;
      kubernetes_pod_name: string;
      session_recording: 'off' | 'node' | 'proxy' | 'node-sync' | 'proxy-sync';
    }
  >;
  [events.userSessionLeave.code]: RawEvent<
    typeof events.userSessionLeave.code,
    {
      sid: string;
    }
  >;
  [events.sessionStart.code]: RawEvent<
    typeof events.sessionStart.code,
    {
      sid: string;
    }
  >;
  [events.sessionRejected.code]: RawEvent<
    typeof events.sessionRejected.code,
    {
      login: string;
      server_id: string;
      reason: string;
    }
  >;
  [events.sessionUpload.code]: RawEvent<
    typeof events.sessionUpload.code,
    {
      sid: string;
    }
  >;
  [events.appSessionStart.code]: RawEvent<
    typeof events.appSessionStart.code,
    { sid: string }
  >;
  [events.appSessionChunk.code]: RawEvent<
    typeof events.appSessionChunk.code,
    { sid: string }
  >;
  [events.subsystem.code]: RawEvent<
    typeof events.subsystem.code,
    {
      name: string;
    }
  >;
  [events.subsystemFailure.code]: RawEvent<
    typeof events.subsystemFailure.code,
    {
      name: string;
      exitError: string;
    }
  >;
  [events.terminalResize.code]: RawEvent<
    typeof events.terminalResize.code,
    { sid: string }
  >;
  [events.userCreate.code]: RawEventUser<typeof events.userCreate.code>;
  [events.userDelete.code]: RawEventUser<typeof events.userDelete.code>;
  [events.userUpdated.code]: RawEventUser<typeof events.userUpdated.code>;
  [events.userPasswordChange.code]: RawEvent<
    typeof events.userPasswordChange.code,
    HasName
  >;
  [events.resetPasswordTokenCreate.code]: RawEvent<
    typeof events.resetPasswordTokenCreate.code,
    {
      name: string;
      ttl: string;
    }
  >;
  [events.userLogin.code]: RawEvent<typeof events.userLogin.code>;
  [events.userLoginFailure.code]: RawEvent<
    typeof events.userLoginFailure.code,
    {
      error: string;
    }
  >;
  [events.userSsoLogin.code]: RawEvent<typeof events.userSsoLogin.code>;
  [events.userSsoLoginFailure.code]: RawEvent<
    typeof events.userSsoLoginFailure.code,
    {
      error: string;
    }
  >;
  [events.userRoleCreated.code]: RawEvent<
    typeof events.userRoleCreated.code,
    HasName
  >;
  [events.userRoleDeleted.code]: RawEvent<
    typeof events.userRoleDeleted.code,
    HasName
  >;
  [events.trustedClusterTokenCreate.code]: RawEvent<
    typeof events.trustedClusterTokenCreate.code
  >;
  [events.trustedClusterCreate.code]: RawEvent<
    typeof events.trustedClusterCreate.code,
    {
      name: string;
    }
  >;
  [events.trustedClusterDelete.code]: RawEvent<
    typeof events.trustedClusterDelete.code,
    {
      name: string;
    }
  >;
  [events.kubeRequest.code]: RawEvent<
    typeof events.kubeRequest.code,
    {
      kubernetes_cluster: string;
    }
  >;
  [events.databaseSessionStart.code]: RawEvent<
    typeof events.databaseSessionStart.code,
    {
      name: string;
      db_service: string;
      db_name: string;
      db_user: string;
    }
  >;
  [events.databaseSessionStartFailure.code]: RawEventDatabase<
    typeof events.databaseSessionStartFailure.code
  >;
  [events.databaseSessionEnd.code]: RawEventDatabase<
    typeof events.databaseSessionEnd.code
  >;
  [events.databaseSessionQuery.code]: RawEventDatabase<
    typeof events.databaseSessionQuery.code
  >;
  [events.mfaDeviceAdd.code]: RawEvent<
    typeof events.mfaDeviceAdd.code,
    {
      mfa_device_name: string;
      mfa_device_uuid: string;
      mfa_device_type: string;
    }
  >;
  [events.mfaDeviceDelete.code]: RawEvent<
    typeof events.mfaDeviceDelete.code,
    {
      mfa_device_name: string;
      mfa_device_uuid: string;
      mfa_device_type: string;
    }
  >;
};

type HasName = {
  name: string;
};

/**
 * Merges properties of 2 types and returns a new "clean" type (using "infer")
 */
type Merge<A, B> = Omit<A, keyof B> & B extends infer O
  ? { [K in keyof O]: O[K] }
  : never;

/**
 * Describes common properties of the raw events (backend data)
 */
export type RawEvent<T extends EventCode, K = {}> = Merge<
  {
    code: T;
    user: string;
    time: string;
    uid: string;
    event: string;
  },
  K
>;

type RawEventAccess<T extends EventCode> = RawEvent<
  T,
  {
    id: string;
    user: string;
    roles: string[];
    state: string;
    reviewer: string;
  }
>;

type RawEventUser<T extends EventCode> = RawEvent<
  T,
  {
    name: string;
  }
>;

type RawEventConnector<T extends EventCode> = RawEvent<
  T,
  {
    name: string;
    user: string;
  }
>;

type RawEventDatabase<T extends EventCode> = RawEvent<
  T,
  {
    name: string;
    db_service: string;
    db_name: string;
    db_user: string;
    db_query: string;
  }
>;

/**
 * A map of event formatters that provide short and long description
 */
export type Formatters = {
  [key in EventCode]: {
    desc: string;
    format: (json: RawEvents[key]) => string;
  };
};

export type Events = {
  [key in EventCode]: {
    id: string;
    time: Date;
    user: string;
    message: string;
    code: key;
    codeDesc: string;
    raw: RawEvents[key];
  };
};

export type Event = Events[EventCode];

export type SessionEnd = Events[typeof events.sessionEnd.code];

export type EventQuery = {
  from: Date;
  to: Date;
  limit?: number;
  startKey?: string;
  filters?: string[];
};
