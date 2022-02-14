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

import React, { PropsWithChildren } from 'react';
import useDesktopSession, { State } from './useDesktopSession';
import TopBar from './TopBar';
import { Indicator, Box, Alert, Text, Flex } from 'design';
import TdpClientCanvas from 'teleport/components/TdpClientCanvas';

export default function Container() {
  const state = useDesktopSession();
  return <DesktopSession {...state} />;
}

export function DesktopSession(props: State) {
  const { clipboard, fetchAttempt, tdpConnection, wsConnection, disconnected } =
    props;

  const clipboardError = clipboard.enabled && clipboard.hasError;

  const clipboardProcessing =
    clipboard.enabled &&
    clipboard.permission.state === 'prompt' &&
    !clipboard.hasError;

  // Websocket is closed but we haven't
  // closed it on purpose or registered a tdp error.
  const unknownConnectionError =
    wsConnection === 'closed' &&
    !disconnected &&
    tdpConnection.status === 'success';

  const processing =
    fetchAttempt.status === 'processing' ||
    tdpConnection.status === 'processing' ||
    clipboardProcessing;

  if (fetchAttempt.status === 'failed') {
    return (
      <Session {...props}>
        <Alert
          style={{
            alignSelf: 'center',
            minWidth: '450px',
          }}
          my={2}
          children={fetchAttempt.statusText}
        />
      </Session>
    );
  }

  if (tdpConnection.status === 'failed') {
    return (
      <Session {...props}>
        <Alert
          style={{
            alignSelf: 'center',
            minWidth: '450px',
          }}
          my={2}
          children={tdpConnection.status}
        />
      </Session>
    );
  }

  if (clipboardError) {
    return (
      <Session {...props}>
        <Alert
          style={{
            alignSelf: 'center',
            minWidth: '450px',
          }}
          my={2}
          children={clipboard.errorText}
        />
      </Session>
    );
  }

  if (unknownConnectionError) {
    return (
      <Session {...props}>
        <Alert
          style={{
            alignSelf: 'center',
          }}
          width={'450px'}
          my={2}
          children={'Session disconnected for an unkown reason'}
        />
      </Session>
    );
  }

  if (disconnected) {
    return (
      <Session {...props}>
        <Box textAlign="center" m={10}>
          <Text>Session successfully disconnected</Text>
        </Box>
      </Session>
    );
  }

  if (processing) {
    return (
      <Session {...props}>
        <Box textAlign="center" m={10}>
          <Indicator />
        </Box>
      </Session>
    );
  }

  return <Session {...props}></Session>;
}

function Session(props: PropsWithChildren<State>) {
  const {
    fetchAttempt,
    tdpConnection,
    wsConnection,
    disconnected,
    setDisconnected,
    tdpClient,
    username,
    hostname,
    clipboard,
    recording,
    onPngFrame,
    onClipboardData,
    onTdpError,
    onWsClose,
    onWsOpen,
    onKeyDown,
    onKeyUp,
    onMouseMove,
    onMouseDown,
    onMouseUp,
    onMouseWheelScroll,
    onContextMenu,
    onMouseEnter,
  } = props;

  const clipboardSharingActive =
    clipboard.enabled && clipboard.permission.state === 'granted';
  const clipboardSuccess =
    !clipboard.enabled ||
    (clipboard.enabled &&
      clipboard.permission.state === 'granted' &&
      !clipboard.hasError);

  const showCanvas =
    fetchAttempt.status === 'success' &&
    tdpConnection.status === 'success' &&
    wsConnection === 'open' &&
    !disconnected &&
    clipboardSuccess;

  return (
    <Flex flexDirection="column">
      <TopBar
        onDisconnect={() => {
          setDisconnected(true);
          tdpClient.nuke();
        }}
        userHost={`${username}@${hostname}`}
        clipboard={clipboardSharingActive}
        recording={recording}
      />

      {props.children}

      {/* TdpClientCanvas should always be present in th DOM so that it calls
          tdpClient.init() and initializes the required tdpClient event listeners,
          both of which are needed for this component's state to properly respond to
          initialization events. */}
      <TdpClientCanvas
        style={{
          display: showCanvas ? 'flex' : 'none',
          flex: 1, // ensures the canvas fills available screen space
        }}
        tdpCli={tdpClient}
        tdpCliOnPngFrame={onPngFrame}
        tdpCliOnClipboardData={onClipboardData}
        tdpCliOnTdpError={onTdpError}
        tdpCliOnWsClose={onWsClose}
        tdpCliOnWsOpen={onWsOpen}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onMouseMove={onMouseMove}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseWheelScroll={onMouseWheelScroll}
        onContextMenu={onContextMenu}
        onMouseEnter={onMouseEnter}
      />
    </Flex>
  );
}
