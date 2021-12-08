/**
 * Copyright 2021 Gravitational, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import ClusterAdd from 'teleterm/ui/ClusterAdd';
import ClusterLogin from 'teleterm/ui/ClusterLogin';
import GatewayCreate from 'teleterm/ui/GatewayCreate';
import ServerConnect from 'teleterm/ui/ServerConnect';
import ClusterRemove from '../ClusterRemove/ClusterRemove';

export default function ModalsHost() {
  const { serviceModals } = useAppContext();
  const dialog = serviceModals.useState();

  if (dialog.kind === 'add-cluster') {
    return <ClusterAdd onClose={() => serviceModals.closeDialog()} />;
  }

  if (dialog.kind === 'cluster-login') {
    return (
      <ClusterLogin
        clusterUri={dialog.clusterUri}
        onClose={() => serviceModals.closeDialog()}
      />
    );
  }

  if (dialog.kind === 'cluster-remove') {
    return (
      <ClusterRemove
        clusterUri={dialog.clusterUri}
        clusterTitle={dialog.clusterTitle}
        onClose={() => serviceModals.closeDialog()}
      />
    );
  }

  if (dialog.kind === 'create-gateway') {
    return (
      <GatewayCreate
        targetUri={dialog.targetUri}
        onClose={() => serviceModals.closeDialog()}
      />
    );
  }

  if (dialog.kind === 'server-connect') {
    return (
      <ServerConnect
        serverUri={dialog.serverUri}
        onClose={() => serviceModals.closeDialog()}
      />
    );
  }

  return null;
}
