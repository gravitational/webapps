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
import styled from 'styled-components';

import {
  Indicator,
  Box,
  Alert,
  Text,
  Flex,
  ButtonSecondary,
  ButtonPrimary,
} from 'design';
import Dialog, {
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from 'design/Dialog';

import TdpClientCanvas from 'teleport/components/TdpClientCanvas';
import AuthnDialog from 'teleport/components/AuthnDialog';
import useDesktopSession, { State } from './useDesktopSession';
import TopBar from './TopBar';

export default function Container() {
  const state = useDesktopSession();
  return <DesktopSession {...state} />;
}

export function DesktopSession(props: State) {
  const {
    fetchAttempt,
    tdpConnection,
    wsConnection,
    disconnected,
    showAnotherSessionActiveDialog,
    setShowAnotherSessionActiveDialog,
  } = props;

  // Websocket is closed but we haven't
  // closed it on purpose or registered a tdp error.
  const unknownConnectionError =
    wsConnection === 'closed' &&
    !disconnected &&
    tdpConnection.status === 'success';

  const processing =
    fetchAttempt.status === 'processing' ||
    tdpConnection.status === 'processing';

  let alertText: string;
  if (fetchAttempt.status === 'failed') {
    alertText = fetchAttempt.statusText || 'fetch attempt failed';
  } else if (tdpConnection.status === 'failed') {
    alertText = tdpConnection.statusText || 'tdp connection failed';
  } else if (unknownConnectionError) {
    alertText = 'Session disconnected for an unknown reason';
  }

  if (alertText) {
    return (
      <Session {...props} initTdpCli={false} displayCanvas={false}>
        <DesktopSessionAlert my={2} mx={10} children={alertText} />
      </Session>
    );
  }

  if (showAnotherSessionActiveDialog) {
    // Don't start the TDP connection until the user confirms they're ok
    // with potentially killing another user's connection.
    const initTdpCli = false;

    return (
      <Session {...props} initTdpCli={initTdpCli} displayCanvas={false}>
        <Dialog
          dialogCss={() => ({ width: '484px' })}
          onClose={() => {}}
          open={true}
        >
          <DialogHeader style={{ flexDirection: 'column' }}>
            <DialogTitle>Another Session Is Active</DialogTitle>
          </DialogHeader>
          <DialogContent>
            This desktop has an active session, connecting to it may close the
            other session. Do you wish to continue?
          </DialogContent>
          <DialogFooter>
            <ButtonPrimary
              mr={3}
              onClick={() => {
                window.close();
              }}
            >
              Abort
            </ButtonPrimary>
            <ButtonSecondary
              onClick={() => {
                setShowAnotherSessionActiveDialog(false);
              }}
            >
              Continue
            </ButtonSecondary>
          </DialogFooter>
        </Dialog>
      </Session>
    );
  }

  if (disconnected) {
    return (
      <Session {...props} initTdpCli={false} displayCanvas={false}>
        <Box textAlign="center" m={10}>
          <Text>Session successfully disconnected</Text>
        </Box>
      </Session>
    );
  }

  if (processing) {
    // We don't know whether another session for this desktop is active while the
    // fetchAttempt is still processing, so hold off on starting a TDP connection
    // until that information is available.
    const initTdpCli = fetchAttempt.status !== 'processing';

    return (
      <Session {...props} initTdpCli={initTdpCli} displayCanvas={false}>
        <Box textAlign="center" m={10}>
          <Indicator />
        </Box>
      </Session>
    );
  }

  return <Session {...props} initTdpCli={true} displayCanvas={true} />;
}

function Session(props: PropsWithChildren<Props>) {
  const {
    setDisconnected,
    webauthn,
    tdpClient,
    username,
    hostname,
    clipboardSharingEnabled: clipboardState,
    setClipboardSharingEnabled: setClipboardState,
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
    initTdpCli,
    displayCanvas,
  } = props;

  const clipboardSharingActive = clipboardState;

  return (
    <Flex flexDirection="column">
      <TopBar
        onDisconnect={() => {
          setDisconnected(true);
          setClipboardState(false);
          tdpClient.shutdown();
        }}
        userHost={`${username}@${hostname}`}
        clipboardSharingEnabled={clipboardSharingActive}
      />

      {props.children}

      {webauthn.requested && (
        <AuthnDialog
          onContinue={webauthn.authenticate}
          onCancel={() => {
            webauthn.setState(prevState => {
              return {
                ...prevState,
                errorText:
                  'This session requires multi factor authentication to continue. Please hit "Retry" and follow the prompts given by your browser to complete authentication.',
              };
            });
          }}
          errorText={webauthn.errorText}
        />
      )}

      <TdpClientCanvas
        style={{
          display: displayCanvas ? 'flex' : 'none',
          flex: 1, // ensures the canvas fills available screen space
        }}
        tdpCli={tdpClient}
        tdpCliInit={initTdpCli}
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
      />
    </Flex>
  );
}

const DesktopSessionAlert = styled(Alert)`
  align-self: center;
  min-width: 450px;
`;

type Props = State & {
  // Determines whether the tdp client that's passed to the TdpClientCanvas
  // should be initialized.
  initTdpCli: boolean;
  displayCanvas: boolean;
};
