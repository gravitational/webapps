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

import React from 'react';
import useDesktopSession, { State } from './useDesktopSession';
import TopBar from './TopBar';
import { Indicator, Box, Alert, Text, Flex } from 'design';
import useTeleport from 'teleport/useTeleport';
import TdpClientCanvas from 'teleport/components/TdpClientCanvas';

export default function Container() {
  const ctx = useTeleport();
  const state = useDesktopSession(ctx);
  return <DesktopSession {...state} />;
}

export function DesktopSession(props: State) {
  const {
    hostname,
    username,
    clipboard,
    recording,
    tdpClient,
    fetchAttempt,
    tdpConnection,
    wsConnection,
    onPngFrame,
    onTdpError,
    onWsClose,
    onWsOpen,
    disconnected,
    setDisconnected,
    onKeyDown,
    onKeyUp,
    onMouseMove,
    onMouseDown,
    onMouseUp,
    onMouseWheelScroll,
    onContextMenu,
  } = props;

  // The clipboard helper variables below are built from the clipboard prop, which is itself updated
  // with useState/setState. Hence they don't need to use state management primitives themselves in
  // order to manage conditional renders.
  const clipboardSharingActive =
    clipboard.isRequired && clipboard.permission === 'granted';
  const clipboardError = clipboard.isRequired && clipboard.hasError;
  const clipboardProcessing =
    clipboard.isRequired &&
    clipboard.permission === 'prompt' &&
    !clipboard.hasError;
  const clipboardSuccess =
    !clipboard.isRequired ||
    (clipboard.isRequired &&
      clipboard.permission === 'granted' &&
      !clipboard.hasError);

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

      <>
        {fetchAttempt.status === 'failed' && (
          <Alert
            style={{
              alignSelf: 'center',
            }}
            width={'450px'}
            my={2}
            children={fetchAttempt.statusText}
          />
        )}
        {tdpConnection.status === 'failed' && (
          <Alert
            style={{
              alignSelf: 'center',
            }}
            width={'450px'}
            my={2}
            children={tdpConnection.statusText}
          />
        )}
        {clipboardError && (
          <Alert
            style={{
              alignSelf: 'center',
            }}
            width={'450px'}
            my={2}
            children={clipboard.errorText}
          />
        )}
        {wsConnection === 'closed' &&
          tdpConnection.status !== 'failed' &&
          !disconnected &&
          tdpConnection.status !== 'processing' && (
            // If the websocket was closed for an unknown reason
            <Alert
              style={{
                alignSelf: 'center',
              }}
              width={'450px'}
              my={2}
              children={'Session disconnected for an unkown reason'}
            />
          )}

        {disconnected && (
          <Box textAlign="center" m={10}>
            <Text>Session successfully disconnected</Text>
          </Box>
        )}
        {(fetchAttempt.status === 'processing' ||
          tdpConnection.status === 'processing' ||
          clipboardProcessing) && (
          <Box textAlign="center" m={10}>
            <Indicator />
          </Box>
        )}
      </>

      <TdpClientCanvas
        style={{
          display:
            fetchAttempt.status === 'success' &&
            tdpConnection.status === 'success' &&
            wsConnection === 'open' &&
            !disconnected &&
            clipboardSuccess
              ? 'flex'
              : 'none',
          flex: 1, // ensures the canvas fills available screen space
        }}
        tdpCli={tdpClient}
        tdpCliOnPngFrame={onPngFrame}
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
      />
    </Flex>
  );
}
