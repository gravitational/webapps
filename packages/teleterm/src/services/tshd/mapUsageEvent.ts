import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';

import * as api from 'teleterm/services/tshd/v1/usage_events_pb';
import * as prehogApi from 'teleterm/services/tshd/prehog/v1alpha/connect_pb';

import * as types from './types';

export function mapUsageEvent(
  req: types.ReportEventRequest
): api.ReportEventRequest {
  const apiReq = new api.ReportEventRequest()
    .setAuthClusterId(req.authClusterId)
    .setDistinctId(req.distinctId)
    .setTimestamp(Timestamp.fromDate(req.timestamp));

  setEvent(apiReq, req);

  return apiReq;
}

function setEvent(
  apiReq: api.ReportEventRequest,
  req: types.ReportEventRequest
): void {
  // Non-anonymized events.

  if (req.connectUserJobRoleUpdateEvent) {
    const { connectUserJobRoleUpdateEvent: event } = req;
    const apiEvent = new prehogApi.ConnectUserJobRoleUpdateEvent().setJobRole(
      event.jobRole
    );

    apiReq.setConnectUserJobRoleUpdateEvent(apiEvent);
    return;
  }

  // Anonymized events.

  if (req.connectLogin) {
    const { connectLogin: event } = req;
    const apiEvent = new prehogApi.ConnectLoginEvent()
      .setClusterName(event.clusterName)
      .setUserName(event.userName)
      .setOs(event.os)
      .setArch(event.arch)
      .setOsVersion(event.osVersion)
      .setConnectVersion(event.connectVersion);

    apiReq.setConnectLogin(apiEvent);
    return;
  }

  if (req.connectProtocolRun) {
    const { connectProtocolRun: event } = req;
    const apiEvent = new prehogApi.ConnectProtocolRunEvent()
      .setClusterName(event.clusterName)
      .setUserName(event.userName)
      .setProtocol(event.protocol);

    apiReq.setConnectProtocolRun(apiEvent);
    return;
  }

  if (req.connectAccessRequestCreate) {
    const { connectAccessRequestCreate: event } = req;
    const apiEvent = new prehogApi.ConnectAccessRequestCreateEvent()
      .setClusterName(event.clusterName)
      .setUserName(event.userName)
      .setKind(event.kind);

    apiReq.setConnectAccessRequestCreate(apiEvent);
    return;
  }

  if (req.connectAccessRequestReview) {
    const { connectAccessRequestReview: event } = req;

    const apiEvent = new prehogApi.ConnectAccessRequestReviewEvent()
      .setClusterName(event.clusterName)
      .setUserName(event.userName);

    apiReq.setConnectAccessRequestReview(apiEvent);
    return;
  }

  if (req.connectAccessRequestAssumeRole) {
    const { connectAccessRequestAssumeRole: event } = req;
    const apiEvent = new prehogApi.ConnectAccessRequestAssumeRoleEvent()
      .setClusterName(event.clusterName)
      .setUserName(event.userName);

    apiReq.setConnectAccessRequestAssumeRole(apiEvent);
    return;
  }

  if (req.connectFileTransferRunEvent) {
    const { connectFileTransferRunEvent: event } = req;
    const apiEvent = new prehogApi.ConnectFileTransferRunEvent()
      .setClusterName(event.clusterName)
      .setUserName(event.userName)
      .setDirection(event.direction);

    apiReq.setConnectFileTransferRunEvent(apiEvent);
    return;
  }

  throw new Error(`Unrecognized event: ${JSON.stringify(req)}`);
}
