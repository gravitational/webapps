import moment from 'moment';
import { Recording } from './types';
import { eventCodes } from 'teleport/services/audit';

// Takes in json objects built by SessionEnd and WindowsDesktopSessionEnd as defined in teleport/api/types/events/events.proto.
export function makeRecording(event: any): Recording {
  if (event.code === eventCodes.DESKTOP_SESSION_ENDED) {
    return makeDesktopRecording(event);
  } else {
    return makeSshRecording(event);
  }
}

function makeDesktopRecording({
  time,
  session_start,
  session_stop,
  user,
  sid,
  desktop_name,
  session_recording,
}) {
  const { duration, durationText } = formatDuration(
    session_start,
    session_stop
  );

  let description = PlayDescription;
  if (session_recording === 'off') {
    description = 'recording disabled';
  }

  return {
    duration,
    durationText,
    sid,
    createdDate: time,
    users: user,
    hostname: desktop_name,
    description,
    recordingType: 'desktop',
  } as Recording;
}

function makeSshRecording({
  participants = [],
  time,
  session_start,
  session_stop,
  server_hostname,
  interactive,
  session_recording = 'on',
  sid,
  proto = '',
  kubernetes_cluster = '',
  kubernetes_pod_namespace = '',
  kubernetes_pod_name = '',
}): Recording {
  const { duration, durationText } = formatDuration(
    session_start,
    session_stop
  );

  let hostname = server_hostname || 'N/A';
  // For Kubernetes sessions, put the full pod name as 'hostname'.
  if (proto === 'kube') {
    hostname = `${kubernetes_cluster}/${kubernetes_pod_namespace}/${kubernetes_pod_name}`;
  }

  // Description set to play for interactive so users can search by "play".
  let description = interactive ? PlayDescription : 'non-interactive';
  if (session_recording === 'off') {
    description = 'recording disabled';
  }

  return {
    duration,
    durationText,
    sid,
    createdDate: time,
    users: participants.join(', '),
    hostname,
    description,
    recordingType: 'ssh',
  } as Recording;
}

function formatDuration(start: string, stop: string) {
  let durationText = '';
  let duration = 0;
  if (start && stop) {
    duration = moment(stop).diff(start);
    durationText = moment.duration(duration).humanize();
  }
  return { duration, durationText };
}

export const PlayDescription = 'play';
