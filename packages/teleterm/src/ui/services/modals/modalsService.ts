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

import { useStore } from 'shared/libs/stores';
import { ImmutableStore } from '../immutableStore';

export class ModalsService extends ImmutableStore<Dialog> {
  state: Dialog = {
    kind: 'none',
  };

  openDialog(dialog: Dialog) {
    this.setState(() => dialog);
  }

  openAddClusterDialog() {
    this.setState(() => ({
      kind: 'add-cluster',
    }));
  }

  openProxyDbDialog(dbUri: string) {
    this.setState(() => ({
      kind: 'create-gateway',
      targetUri: dbUri,
    }));
  }

  openProxySshDialog(serverUri: string) {
    this.setState(() => ({
      kind: 'server-connect',
      serverUri,
    }));
  }

  openLoginDialog(clusterUri: string, customOnSuccess?: () => void) {
    this.setState(() => ({
      kind: 'cluster-login',
      clusterUri,
      customOnSuccess
    }));
  }

  closeDialog() {
    this.setState(() => ({
      kind: 'none',
    }));
  }

  useState() {
    return useStore(this).state;
  }
}

export interface DialogBase {
  kind: 'none';
}

export interface DialogAddCluster {
  kind: 'add-cluster';
}

export interface DialogNewGateway {
  kind: 'create-gateway';
  targetUri: string;
}

export interface DialogClusterLogin {
  kind: 'cluster-login';
  clusterUri: string;
  customOnSuccess?(): void;
}

export interface DialogClusterRemove {
  kind: 'cluster-remove';
  clusterUri: string;
  clusterTitle: string;
}

export interface DialogServerConnect {
  kind: 'server-connect';
  serverUri: string;
}

export type Dialog =
  | DialogBase
  | DialogAddCluster
  | DialogClusterLogin
  | DialogNewGateway
  | DialogServerConnect
  | DialogClusterRemove;
