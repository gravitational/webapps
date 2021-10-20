/*
Copyright 2019 Gravitational, Inc.

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

import { Store, useStore } from 'shared/libs/stores';

export interface CommandNoop {
  kind: 'noop';
}

export interface CommandDialogAddClusterOpen {
  kind: 'dialog.cluster-add-new.open';
}

export interface CommandDialogAddClusterClose {
  kind: 'dialog.cluster-add-new.close';
}

export interface CommandDialogNewGatewayOpen {
  kind: 'dialog.gateway-new.open';
  targetUri: string;
}
export interface CommandDialogNewGatewayClose {
  kind: 'dialog.gateway-new.close';
}
export interface CommandDialogClusterLoginOpen {
  kind: 'dialog.cluster-login.open';
  clusterUri: string;
}
export interface CommandDialogClusterLoginClose {
  kind: 'dialog.cluster-login.close';
}

export type Command =
  | CommandNoop
  | CommandDialogAddClusterOpen
  | CommandDialogAddClusterClose
  | CommandDialogClusterLoginOpen
  | CommandDialogClusterLoginClose
  | CommandDialogNewGatewayOpen
  | CommandDialogNewGatewayClose;

export default class CommandService extends Store<Command> {
  state: Command = {
    kind: 'noop',
  };

  sendCommand(cmd: Command) {
    this.setState(cmd);
  }

  useState() {
    return useStore(this).state;
  }
}
