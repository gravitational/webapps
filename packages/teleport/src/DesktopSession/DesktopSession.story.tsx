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
import { DesktopSession } from './DesktopSession';
import { State } from './useDesktopSession';
import TdpClient from 'teleport/lib/tdp/client';
import { MouseButton, ButtonState } from 'teleport/lib/tdp/codec';

export default {
  title: 'Teleport/DesktopSession',
};

export const Connecting = () => <DesktopSession {...props} />;
export const SettingsFalse = () => (
  <DesktopSession {...props} attempt={{ status: 'success' }} />
);
export const SettingsTrue = () => (
  <DesktopSession
    {...props}
    attempt={{ status: 'success' }}
    clipboard={true}
    recording={true}
  />
);
export const Disconnected = () => (
  <DesktopSession {...props} attempt={{ status: 'disconnected' }} />
);
export const Error = () => (
  <DesktopSession
    {...props}
    attempt={{ status: 'failed', statusText: 'some error message' }}
  />
);

const tdpClient = new TdpClient('wss://socketAddr.gov', 'username');
tdpClient.connect = () =>
  new Promise<void>(resolve => {
    resolve();
  });
tdpClient.sendUsername = () => {};
tdpClient.resize = (w: number, h: number) => {};
tdpClient.disconnect = () => {};
tdpClient.sendMouseMove = (x: number, y: number) => {};
tdpClient.sendMouseButton = (button: MouseButton, state: ButtonState) => {};
tdpClient.sendKeyboardInput = (code: string, state: ButtonState) => {};

const props: State = {
  tdpClient,
  userHost: 'user@host.com',
  attempt: { status: 'processing' },
  clipboard: false,
  recording: false,
};
