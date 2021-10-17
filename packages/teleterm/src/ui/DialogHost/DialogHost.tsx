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
import { useAppContext } from './../appContextProvider';
import AddCluster from './../AddCluster';
import ClusterLogin from 'teleterm/ui/ClusterLogin';

export default function DialogHost() {
  const { serviceCommands } = useAppContext();
  const cmd = serviceCommands.useState();

  if (cmd.kind === 'dialog.cluster-add-new.open') {
    return (
      <AddCluster
        onClose={() =>
          serviceCommands.sendCommand({ kind: 'dialog.cluster-add-new.close' })
        }
      />
    );
  }

  if (cmd.kind === 'dialog.cluster-login.open') {
    return (
      <ClusterLogin
        clusterUri={cmd.clusterUri}
        onClose={() =>
          serviceCommands.sendCommand({ kind: 'dialog.cluster-login.close' })
        }
      />
    );
  }

  return null;
}
