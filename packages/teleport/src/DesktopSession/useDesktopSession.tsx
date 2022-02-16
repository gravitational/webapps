/*
Copyright 2021 Gravitational, Inc.

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

import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router';
import useAttempt from 'shared/hooks/useAttemptNext';
import { useClipboardReadWrite } from './useClipboard';
import { UrlDesktopParams } from 'teleport/config';
import desktopService from 'teleport/services/desktops';
import userService from 'teleport/services/user';
import useTdpClientCanvas from './useTdpClientCanvas';

export default function useDesktopSession() {
  const { attempt: fetchAttempt, run } = useAttempt('processing');

  // tdpConnection tracks the state of the tdpClient's TDP connection
  // tdpConnection.status ===
  // - 'processing' at first
  // - 'success' once the first TdpClientEvent.IMAGE_FRAGMENT is seen
  // - 'failed' if a TdpClientEvent.TDP_ERROR is encountered
  const { attempt: tdpConnection, setAttempt: setTdpConnection } =
    useAttempt('processing');

  // wsConnection track's the state of the tdpClient's websocket connection.
  // 'closed' to start, 'open' when TdpClientEvent.WS_OPEN is encountered, then 'closed'
  // again when TdpClientEvent.WS_CLOSE is encountered.
  const [wsConnection, setWsConnection] = useState<'open' | 'closed'>('closed');

  // disconnected tracks whether the user intentionally disconnected the client
  const [disconnected, setDisconnected] = useState(false);

  const [hasClipboardAccess, setHasClipboardAccess] = useState(false);

  // recording tracks whether or not a recording is in progress
  const [recording, setRecording] = useState(false);

  const { username, desktopName, clusterId } = useParams<UrlDesktopParams>();
  const [hostname, setHostname] = useState<string>('');

  const isUsingChrome = navigator.userAgent.indexOf('Chrome') > -1;
  const clipboardRWPermission = useClipboardReadWrite(
    isUsingChrome && hasClipboardAccess
  );
  const [clipboard, setClipboard] = useState({
    enabled: hasClipboardAccess,
    permission: clipboardRWPermission,
    errorText: '', // empty string means no error
  });

  const clientCanvasProps = useTdpClientCanvas({
    username,
    desktopName,
    clusterId,
    setTdpConnection,
    setWsConnection,
    canShareClipboard: hasClipboardAccess && isUsingChrome,
  });

  useEffect(() => {
    // errors:
    // - role permits, browser not chromium
    // - role permits, clipboard permissions denied
    if (clipboardRWPermission.state === 'error') {
      setClipboard({
        enabled: hasClipboardAccess,
        permission: clipboardRWPermission,
        errorText:
          clipboardRWPermission.errorText ||
          'unknown clipboard permission error',
      });
    } else if (hasClipboardAccess && !isUsingChrome) {
      setClipboard({
        enabled: hasClipboardAccess,
        permission: clipboardRWPermission,
        errorText:
          'Your user role supports clipboard sharing over desktop access, however this feature is only available on chromium based browsers like Brave or Google Chrome. Please switch to a supported browser.',
      });
    } else if (hasClipboardAccess && clipboardRWPermission.state === 'denied') {
      setClipboard({
        enabled: hasClipboardAccess,
        permission: clipboardRWPermission,
        errorText: `Your user role supports clipboard sharing over desktop access, but your browser is blocking clipboard read or clipboard write permissions. Please grant both of these permissions to Teleport in your browser's settings.`,
      });
    } else {
      setClipboard({
        enabled: hasClipboardAccess,
        permission: clipboardRWPermission,
        errorText: '',
      });
    }
  }, [isUsingChrome, hasClipboardAccess, clipboardRWPermission]);

  document.title = useMemo(
    () => `${clusterId} • ${username}@${hostname}`,
    [hostname]
  );

  useEffect(() => {
    run(() =>
      Promise.all([
        desktopService
          .fetchDesktop(clusterId, desktopName)
          .then(desktop => setHostname(desktop.addr)),
        userService.fetchUserContext().then(user => {
          setHasClipboardAccess(user.acl.canShareClipboard);
          setRecording(user.acl.desktopSessionRecording);
        }),
      ])
    );
  }, [clusterId, desktopName]);

  return {
    hostname,
    username,
    clipboard,
    recording,
    fetchAttempt,
    tdpConnection,
    wsConnection,
    disconnected,
    setDisconnected,
    ...clientCanvasProps,
  };
}

export type State = ReturnType<typeof useDesktopSession>;
