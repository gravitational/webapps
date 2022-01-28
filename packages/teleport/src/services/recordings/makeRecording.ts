import { differenceInMilliseconds, formatDistanceStrict } from 'date-fns';
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
  recorded,
}) {
  const { duration, durationText } = formatDuration(
    session_start,
    session_stop
  );

  let description = recorded ? 'play' : disabledDescription;

  return {
    duration,
    durationText,
    sid,
    createdDate: new Date(time),
    users: user,
    hostname: desktop_name,
    description,
    recordingType: 'desktop',
    playable: recorded,
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
  let description = interactive ? 'play' : 'non-interactive';
  let playable = session_recording === 'off' ? false : interactive;
  if (session_recording === 'off') {
    description = disabledDescription;
  }

  return {
    duration,
    durationText,
    sid,
    createdDate: new Date(time),
    users: participants.join(', '),
    hostname,
    description,
    recordingType: 'ssh',
    playable,
  } as Recording;
}

function formatDuration(startDateString: string, stopDateString: string) {
  let durationText = '';
  let duration = 0;
  if (startDateString && stopDateString) {
    const start = new Date(startDateString);
    const end = new Date(stopDateString);

    duration = differenceInMilliseconds(end, start);
    durationText = formatDistanceStrict(start, end);
  }

  return { duration, durationText };
}

const disabledDescription = 'recording disabled';
