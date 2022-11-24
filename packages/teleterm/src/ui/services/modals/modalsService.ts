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

import { ImmutableStore } from 'teleterm/ui/services/immutableStore';
import * as types from 'teleterm/services/tshd/types';

export class ModalsService extends ImmutableStore<Dialog> {
  state: Dialog = {
    kind: 'none',
  };

  /*
   * openDialog opens the given dialog. It returns a function which can be used to close the dialog
   * and automatically call the dialog's onCancel callback (if present).
   */
  openDialog(dialog: Dialog): () => void {
    this.setState(() => dialog);

    return () => {
      this.closeDialog();
      dialog['onCancel']?.();
    };
  }

  openClusterConnectDialog(options: {
    clusterUri?: string;
    onSuccess?(clusterUri: string): void;
    onCancel?(): void;
  }) {
    return this.openDialog({
      kind: 'cluster-connect',
      ...options,
    });
  }

  openDocumentsReopenDialog(options: {
    onConfirm?(): void;
    onCancel?(): void;
  }) {
    return this.openDialog({
      kind: 'documents-reopen',
      ...options,
    });
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

export interface DialogClusterConnect {
  kind: 'cluster-connect';
  clusterUri?: string;
  reason?: ClusterConnectReason;
  onSuccess?(clusterUri: string): void;
  onCancel?(): void;
}

export interface ClusterConnectReasonGatewayCertExpired {
  kind: 'reason.gateway-cert-expired';
  targetUri: string;
  // The original RPC message passes gatewayUri but we might not always be able to resolve it to a
  // gateway, hence the use of undefined.
  gateway: types.Gateway | undefined;
}

export type ClusterConnectReason = ClusterConnectReasonGatewayCertExpired;

export interface DialogClusterLogout {
  kind: 'cluster-logout';
  clusterUri: string;
  clusterTitle: string;
}

export interface DialogDocumentsReopen {
  kind: 'documents-reopen';

  onConfirm?(): void;

  onCancel?(): void;
}

export type Dialog =
  | DialogBase
  | DialogClusterConnect
  | DialogClusterLogout
  | DialogDocumentsReopen;
