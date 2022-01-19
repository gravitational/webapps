import moment from 'moment';
import { Recording, RecordingType } from './types';
import { eventCodes } from 'teleport/services/audit';

// Takes in json objects built by SessionEnd and WindowsDesktopSessionEnd as defined in teleport/api/types/events/events.proto.
export default function makeRecording({
  participants = [],
  time,
  session_start,
  session_stop,
  server_hostname,
  interactive,
  user,
  session_recording = 'on',
  sid,
  proto = '',
  kubernetes_cluster = '',
  kubernetes_pod_namespace = '',
  kubernetes_pod_name = '',
  desktop_name = '',
  code,
}): Recording {
  let type: RecordingType =
    code === eventCodes.DESKTOP_SESSION_ENDED ? 'desktop' : 'ssh';
  let durationText = '';
  let duration = 0;
  if (session_start && session_stop) {
    duration = moment(session_stop).diff(session_start);
    durationText = moment.duration(duration).humanize();
  }

  // Desktop sessions will have desktop_name set, ssh sessions can have server_hostname or neither.
  let hostname = desktop_name || server_hostname || 'N/A';
  // For Kubernetes sessions, put the full pod name as 'hostname'.
  if (proto === 'kube') {
    hostname = `${kubernetes_cluster}/${kubernetes_pod_namespace}/${kubernetes_pod_name}`;
  }

  let description =
    type === 'desktop' || interactive ? 'play' : 'non-interactive'; // all desktop sessions are interactive
  if (session_recording === 'off') {
    description = 'recording disabled';
  }

  return {
    duration,
    durationText,
    sid,
    createdDate: time,
    users: participants.join(', ') || user, // ssh sessions have participant(s), windows sessions just have a user
    hostname,
    description,
    type,
  };
}
