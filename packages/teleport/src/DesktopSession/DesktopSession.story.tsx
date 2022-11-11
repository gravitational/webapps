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

import { TdpClient, TdpClientEvent } from 'teleport/lib/tdp';

import { State } from './useDesktopSession';
import { DesktopSession } from './DesktopSession';

export default {
  title: 'Teleport/DesktopSession',
};

const fakeClient = () => {
  const client = new TdpClient('wss://socketAddr.gov');
  client.init = () => {}; // Don't actually try to connect to a websocket.
  return client;
};

const fillGray = (canvas: HTMLCanvasElement) => {
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'gray';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const props: State = {
  hostname: 'host.com',
  fetchAttempt: { status: 'processing' },
  tdpConnection: { status: 'processing' },
  clipboardSharingEnabled: false,
  tdpClient: fakeClient(),
  username: 'user',
  onWsOpen: () => {},
  onWsClose: () => {},
  wsConnection: 'closed',
  disconnected: false,
  setDisconnected: () => {},
  setClipboardSharingEnabled: () => {},
  directorySharingState: {
    canShare: true,
    isSharing: false,
    browserError: false,
  },
  setDirectorySharingState: () => {},
  onShareDirectory: () => {},
  onPngFrame: () => {},
  onTdpError: () => {},
  onTdpWarning: () => {},
  onKeyDown: () => {},
  onKeyUp: () => {},
  onMouseMove: () => {},
  onMouseDown: () => {},
  onMouseUp: () => {},
  onMouseWheelScroll: () => {},
  onContextMenu: () => false,
  onClipboardData: async () => {},
  setTdpConnection: () => {},
  webauthn: {
    errorText: '',
    requested: false,
    authenticate: () => {},
    setState: () => {},
  },
  isUsingChrome: true,
  showAnotherSessionActiveDialog: false,
  setShowAnotherSessionActiveDialog: () => {},
  warnings: [
    {
      content:
        'clipboard sync failed: clipboard data exceeded maximum length\u0001',
      severity: 'warn',
      id: '6042e748-b756-4cb0-8c20-9f42d4d9beff',
    },
    {
      content:
        'clipboard sync failed: clipboard data exceeded maximum length\u0001',
      severity: 'warn',
      id: '65f5faf5-8f01-47bc-8761-8cc654d7e1e2',
    },
    {
      content:
        'clipboard sync failed: clipboard data exceeded maximum length\u0001',
      severity: 'warn',
      id: '65f5faf5-8f01-47bc-8761-8cc654d7e1e3',
    },
    {
      content:
        'clipboard sync failed: clipboard data exceeded maximum length\u0001',
      severity: 'warn',
      id: '65f5faf5-8f01-47bc-8761-8cc654d7e1e4',
    },
    {
      content:
        'clipboard sync failed: clipboard data exceeded maximum length\u0001',
      severity: 'warn',
      id: '65f5faf5-8f01-47bc-8761-8cc654d7e1e5',
    },
    {
      content:
        'clipboard sync failed: clipboard data exceeded maximum length\u0001',
      severity: 'warn',
      id: '65f5faf5-8f01-47bc-8761-8cc654d7e1e6',
    },
    {
      content:
        'clipboard sync failed: clipboard data exceeded maximum length\u0001',
      severity: 'warn',
      id: '65f5faf5-8f01-47bc-8761-8cc654d7e1e7',
    },
  ],
};

export const Processing = () => (
  <DesktopSession
    {...props}
    fetchAttempt={{ status: 'processing' }}
    tdpConnection={{ status: 'processing' }}
    clipboardSharingEnabled={true}
    wsConnection={'open'}
    disconnected={false}
  />
);

export const TdpProcessing = () => (
  <DesktopSession
    {...props}
    fetchAttempt={{ status: 'success' }}
    tdpConnection={{ status: 'processing' }}
    clipboardSharingEnabled={true}
    wsConnection={'open'}
    disconnected={false}
  />
);

export const InvalidProcessingState = () => (
  <DesktopSession
    {...props}
    fetchAttempt={{ status: 'processing' }}
    tdpConnection={{ status: 'success' }}
    clipboardSharingEnabled={true}
    wsConnection={'open'}
    disconnected={false}
  />
);

export const ConnectedSettingsFalse = () => {
  const client = fakeClient();
  client.init = () => {
    client.emit(TdpClientEvent.TDP_PNG_FRAME);
  };

  return (
    <DesktopSession
      {...props}
      tdpClient={client}
      fetchAttempt={{ status: 'success' }}
      tdpConnection={{ status: 'success' }}
      wsConnection={'open'}
      disconnected={false}
      clipboardSharingEnabled={false}
      onPngFrame={(ctx: CanvasRenderingContext2D) => {
        fillGray(ctx.canvas);
      }}
    />
  );
};

export const ConnectedSettingsTrue = () => {
  const client = fakeClient();
  client.init = () => {
    client.emit(TdpClientEvent.TDP_PNG_FRAME);
  };

  return (
    <DesktopSession
      {...props}
      tdpClient={client}
      fetchAttempt={{ status: 'success' }}
      tdpConnection={{ status: 'success' }}
      wsConnection={'open'}
      disconnected={false}
      clipboardSharingEnabled={true}
      directorySharingState={{
        canShare: true,
        isSharing: true,
        browserError: false,
      }}
      onPngFrame={(ctx: CanvasRenderingContext2D) => {
        fillGray(ctx.canvas);
      }}
    />
  );
};

export const Disconnected = () => (
  <DesktopSession
    {...props}
    fetchAttempt={{ status: 'success' }}
    tdpConnection={{ status: 'success' }}
    wsConnection={'open'}
    disconnected={true}
  />
);

export const FetchError = () => (
  <DesktopSession
    {...props}
    fetchAttempt={{ status: 'failed', statusText: 'some fetch  error' }}
    tdpConnection={{ status: 'success' }}
    wsConnection={'open'}
    disconnected={false}
  />
);

export const ConnectionError = () => (
  <DesktopSession
    {...props}
    fetchAttempt={{ status: 'success' }}
    tdpConnection={{
      status: 'failed',
      statusText: 'some connection error',
    }}
    wsConnection={'closed'}
    disconnected={false}
  />
);

export const DismissibleError = () => (
  <DesktopSession
    {...props}
    fetchAttempt={{ status: 'success' }}
    tdpConnection={{ status: '', statusText: 'dismissible error' }}
    wsConnection={'open'}
    disconnected={false}
  />
);

export const UnintendedDisconnect = () => (
  <DesktopSession
    {...props}
    fetchAttempt={{ status: 'success' }}
    tdpConnection={{ status: 'success' }}
    disconnected={false}
    wsConnection={'closed'}
  />
);

export const WebAuthnPrompt = () => (
  <DesktopSession
    {...props}
    fetchAttempt={{ status: 'processing' }}
    tdpConnection={{ status: 'processing' }}
    clipboardSharingEnabled={true}
    wsConnection={'open'}
    disconnected={false}
    webauthn={{
      errorText: '',
      requested: true,
      authenticate: () => {},
      setState: () => {},
    }}
  />
);

export const AnotherSessionActive = () => (
  <DesktopSession {...props} showAnotherSessionActiveDialog={true} />
);
