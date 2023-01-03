import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';

import * as api from './v1/usage_events_pb';
import * as prehogApi from './prehog/v1alpha/connect_pb';

import * as types from './types';

export function mapUsageEvent(event: types.ReportUsageEventRequest) {
  return new api.ReportUsageEventRequest()
    .setAuthClusterId(event.authClusterId)
    .setPrehogEvent(mapPrehogBody(event.prehogEvent));
}

function mapPrehogBody(
  prehogEvent: types.ReportUsageEventRequest['prehogEvent']
): prehogApi.SubmitConnectEventRequest {
  const prehogApiEvent = new prehogApi.SubmitConnectEventRequest()
    .setTimestamp(Timestamp.fromDate(prehogEvent.timestamp))
    .setDistinctId(prehogEvent.distinctId);

  // Non-anonymized events.
  if (prehogEvent.userJobRoleUpdate) {
    const event = prehogEvent.userJobRoleUpdate;
    const apiEvent = new prehogApi.ConnectUserJobRoleUpdateEvent().setJobRole(
      event.jobRole
    );

    return prehogApiEvent.setUserJobRoleUpdate(apiEvent);
  }

  // Anonymized events.
  if (prehogEvent.userLogin) {
    const event = prehogEvent.userLogin;
    const apiEvent = new prehogApi.ConnectUserLoginEvent()
      .setClusterName(event.clusterName)
      .setUserName(event.userName)
      .setOs(event.os)
      .setArch(event.arch)
      .setOsVersion(event.osVersion)
      .setConnectVersion(event.connectVersion);

    return prehogApiEvent.setUserLogin(apiEvent);
  }
  if (prehogEvent.protocolUse) {
    const event = prehogEvent.protocolUse;
    const apiEvent = new prehogApi.ConnectProtocolUseEvent()
      .setClusterName(event.clusterName)
      .setUserName(event.userName)
      .setProtocol(event.protocol);

    return prehogApiEvent.setProtocolUse(apiEvent);
  }
  if (prehogEvent.accessRequestCreate) {
    const event = prehogEvent.accessRequestCreate;
    const apiEvent = new prehogApi.ConnectAccessRequestCreateEvent()
      .setClusterName(event.clusterName)
      .setUserName(event.userName)
      .setKind(event.kind);

    return prehogApiEvent.setAccessRequestCreate(apiEvent);
  }
  if (prehogEvent.accessRequestReview) {
    const event = prehogEvent.accessRequestReview;
    const apiEvent = new prehogApi.ConnectAccessRequestReviewEvent()
      .setClusterName(event.clusterName)
      .setUserName(event.userName);

    return prehogApiEvent.setAccessRequestReview(apiEvent);
  }
  if (prehogEvent.accessRequestAssumeRole) {
    const event = prehogEvent.accessRequestAssumeRole;
    const apiEvent = new prehogApi.ConnectAccessRequestAssumeRoleEvent()
      .setClusterName(event.clusterName)
      .setUserName(event.userName);

    return prehogApiEvent.setAccessRequestAssumeRole(apiEvent);
  }
  if (prehogEvent.fileTransferRun) {
    const event = prehogEvent.fileTransferRun;
    const apiEvent = new prehogApi.ConnectFileTransferRunEvent()
      .setClusterName(event.clusterName)
      .setUserName(event.userName)
      .setDirection(event.direction);

    return prehogApiEvent.setFileTransferRun(apiEvent);
  }

  throw new Error(`Unrecognized event: ${JSON.stringify(prehogEvent)}`);
}
