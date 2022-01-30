/*
Copyright 2020 Gravitational, Inc.

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

import { useAppContext } from 'teleterm/ui/appContextProvider';
import * as types from 'teleterm/ui/services/docs/types';
import useAttempt from 'shared/hooks/useAttemptNext';

export function useReconnect(doc: types.DocumentTshNode) {
  const ctx = useAppContext();
  const { attempt, setAttempt } = useAttempt('');

  function updateDoc() {
    ctx.docsService.update(doc.uri, { status: 'connected' });
  }

  function reconnect() {
    const cluster = ctx.clustersService.findRootClusterByResource(
      doc.serverUri
    );
    if (!cluster) {
      setAttempt({
        status: 'failed',
        statusText: `unable to resolve cluster for ${doc.serverUri}`,
      });

      return;
    }

    if (!cluster.connected) {
      ctx.commandLauncher.executeCommand('cluster-connect', {
        clusterUri: cluster.uri,
        onSuccess: updateDoc,
      });

      return;
    }

    updateDoc();
  }

  return { reconnect, attempt };
}

export type State = ReturnType<typeof useReconnect>;
