// Copyright 2021 Gravitational, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import Client, { TdpClientEvent } from './client';
import { decode } from 'base64-arraybuffer';

enum Action {
  TOGGLE_PLAY_PAUSE = 'play/pause',
  // TODO: MOVE = 'move'
}

export enum PlayerClientEvent {
  TOGGLE_PLAY_PAUSE = 'play/pause',
}

export class PlayerClient extends Client {
  currentMs = 0; // the current time of the playback in milliseconds
  totalMs: number; // the total time of the playback in milliseconds
  textDecoder = new TextDecoder();

  constructor(socketAddr: string) {
    super(socketAddr);
  }

  // togglePlayPause toggles the playback system between "playing" and "paused" states.
  togglePlayPause() {
    this.socket?.send(JSON.stringify({ action: Action.TOGGLE_PLAY_PAUSE }));
    this.emit(PlayerClientEvent.TOGGLE_PLAY_PAUSE);
  }

  // Overrides Client implementation.
  processMessage(buffer: ArrayBuffer) {
    const json = JSON.parse(this.textDecoder.decode(buffer));
    this.currentMs = json.ms;
    super.processMessage(decode(json.message));
  }

  // Overrides Client implementation.
  handleClientScreenSpec(buffer: ArrayBuffer) {
    this.emit(
      TdpClientEvent.TDP_CLIENT_SCREEN_SPEC,
      this.codec.decodeClientScreenSpec(buffer)
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // Overrides Client implementation.
  handleMouseButton(buffer: ArrayBuffer) {
    // TODO
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // Overrides Client implementation.
  handleMouseMove(buffer: ArrayBuffer) {
    // TODO
    return;
  }
}
