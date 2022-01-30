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
import GatewayCreate from 'teleterm/ui/GatewayCreate';
import ServerConnect from 'teleterm/ui/ServerConnect';
import ClusterRemove from '../ClusterRemove/ClusterRemove';
import { ClusterConnect } from 'teleterm/ui/ClusterConnect';

export default function ModalsHost() {
  const { modalsService } = useAppContext();
  const dialog = modalsService.useState();

  const handleClose = () => modalsService.closeDialog();

  if (dialog.kind === 'cluster-connect') {
    return (
      <ClusterConnect
        clusterUri={dialog.clusterUri}
        onClose={handleClose}
        onSuccess={dialog.onSuccess}
      />
    );
  }

  if (dialog.kind === 'cluster-remove') {
    return (
      <ClusterRemove
        clusterUri={dialog.clusterUri}
        clusterTitle={dialog.clusterTitle}
        onClose={handleClose}
      />
    );
  }

  if (dialog.kind === 'create-gateway') {
    return <GatewayCreate {...dialog} onClose={handleClose} />;
  }

  if (dialog.kind === 'server-connect') {
    return <ServerConnect serverUri={dialog.serverUri} onClose={handleClose} />;
  }

  return null;
}
