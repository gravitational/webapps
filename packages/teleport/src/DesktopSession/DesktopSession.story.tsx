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
import blobArray from './fixtures/onmessageBlobs';
import { DesktopSession } from './DesktopSession';
import TdpClient from 'teleport/lib/tdp/client';

export default {
  title: 'Teleport/DesktopSession',
};

export const PerformanceTest = () => {
  const client = new TdpClient('wss://address', 'Administrator');

  client.connect = () => {
    // emit open to simulate the opening of a websocket, alerts DesktopSession to resize its canvas to screen size
    client.emit('open');
    // Allows us test out the rendering pipeline with different simulated delays between
    // onmessage calls.
    var optionallyDelayedOnmessage = (i: number, delay?: number) => {
      if (!delay || delay == 0) {
        blobArray.forEach(blob => {
          client.processMessage(blob);
        });
        return;
      }

      if (i < blobArray.length - 1) {
        client.processMessage(blobArray[i++]);
        setTimeout(function() {
          optionallyDelayedOnmessage(i, delay);
        }, delay);
      }
    };

    client.disconnect = () => {
      client.removeAllListeners();
    };

    const delayMs = 1;
    optionallyDelayedOnmessage(0, delayMs);
  };

  client.sendUsername = () => {};
  client.resize = (w: number, h: number) => {};

  return (
    <DesktopSession
      tdpClient={client}
      attempt={{ status: 'success' }}
      setAttempt={() => {}}
    />
  );
};
