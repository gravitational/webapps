import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';

import {
  AccessRequestAssumeRoleEvent,
  AccessRequestCreateEvent,
  AccessRequestReviewEvent,
  ClusterProperties,
  ProtocolRunEvent,
  ConnectUsageEventOneOf,
  LoginEvent,
  FileTransferRunEvent,
  ReportEventRequest,
  UserJobRoleUpdateEvent,
} from 'teleterm/services/tshd/v1/usage_events_pb';

import * as types from './types';

export function mapUsageEvent(event: types.ReportEventRequest) {
  return new ReportEventRequest()
    .setDistinctId(event.distinctId)
    .setTimestamp(Timestamp.fromDate(event.timestamp))
    .setEvent(mapEventBody(event.event));
}

function mapEventBody(
  event: ConnectUsageEventOneOf.AsObject
): ConnectUsageEventOneOf {
  if (event.loginEvent) {
    const { loginEvent } = event;
    return new ConnectUsageEventOneOf().setLoginEvent(
      new LoginEvent()
        .setClusterProperties(mapClusterProperties(loginEvent))
        .setOs(loginEvent.os)
        .setArch(loginEvent.arch)
        .setOsVersion(loginEvent.osVersion)
        .setConnectVersion(loginEvent.connectVersion)
    );
  }
  if (event.protocolRunEvent) {
    const { protocolRunEvent } = event;
    return new ConnectUsageEventOneOf().setProtocolRunEvent(
      new ProtocolRunEvent()
        .setClusterProperties(mapClusterProperties(protocolRunEvent))
        .setProtocol(protocolRunEvent.protocol)
    );
  }
  if (event.accessRequestCreateEvent) {
    const { accessRequestCreateEvent } = event;
    return new ConnectUsageEventOneOf().setAccessRequestCreateEvent(
      new AccessRequestCreateEvent()
        .setClusterProperties(mapClusterProperties(accessRequestCreateEvent))
        .setKind(accessRequestCreateEvent.kind)
    );
  }
  if (event.accessRequestReviewEvent) {
    const { accessRequestReviewEvent } = event;
    return new ConnectUsageEventOneOf().setAccessRequestReviewEvent(
      new AccessRequestReviewEvent().setClusterProperties(
        mapClusterProperties(accessRequestReviewEvent)
      )
    );
  }
  if (event.accessRequestAssumeRoleEvent) {
    const { accessRequestAssumeRoleEvent } = event;
    return new ConnectUsageEventOneOf().setAccessRequestAssumeRoleEvent(
      new AccessRequestAssumeRoleEvent().setClusterProperties(
        mapClusterProperties(accessRequestAssumeRoleEvent)
      )
    );
  }
  if (event.fileTransferRunEvent) {
    const { fileTransferRunEvent } = event;
    return new ConnectUsageEventOneOf().setFileTransferRunEvent(
      new FileTransferRunEvent()
        .setClusterProperties(mapClusterProperties(fileTransferRunEvent))
        .setDirection(fileTransferRunEvent.direction)
    );
  }
  if (event.userJobRoleUpdateEvent) {
    const { userJobRoleUpdateEvent } = event;
    return new ConnectUsageEventOneOf().setUserJobRoleUpdateEvent(
      new UserJobRoleUpdateEvent().setJobRole(userJobRoleUpdateEvent.jobRole)
    );
  }

  throw new Error(`Unrecognized event: ${JSON.stringify(event)}`);
}

function mapClusterProperties(e: {
  clusterProperties?: ClusterProperties.AsObject;
}): ClusterProperties {
  if (!e.clusterProperties) {
    throw new Error('Missing cluster metadata');
  }
  return new ClusterProperties()
    .setAuthClusterId(e.clusterProperties.authClusterId)
    .setClusterName(e.clusterProperties.clusterName)
    .setUserName(e.clusterProperties.userName);
}
