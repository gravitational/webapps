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

import Client from './client';

enum Action {
  TOGGLE = 'toggle',
  // TODO: MOVE = 'move'
}

export class PlayerClient extends Client {
  constructor(socketAddr: string) {
    super(socketAddr);
  }

  // toggle toggle's the playback system between "playing" and "paused" states.
  toggle() {
    this.socket?.send(JSON.stringify({ action: Action.TOGGLE }));
  }
}
