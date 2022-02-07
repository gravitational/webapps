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

import React from 'react';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import * as types from 'teleterm/ui/services/docs/types';
import useAsync from 'teleterm/ui/useAsync';

export default function useGateway(doc: types.DocumentGateway) {
  const ctx = useAppContext();
  const gateway = ctx.clustersService.findGateway(doc.gatewayUri);
  const connected = !!gateway;

  const [connectAttempt, createGateway, setConnectAttempt] = useAsync(
    async () => {
      const gw = await ctx.clustersService.createGateway({
        targetUri: doc.targetUri,
        port: doc.port,
        user: doc.targetUser,
      });

      ctx.docsService.update(doc.uri, {
        gatewayUri: gw.uri,
      });
    }
  );

  const [disconnectAttempt, disconnect] = useAsync(async () => {
    await ctx.clustersService.removeGateway(doc.gatewayUri);
  });

  const reconnect = () => {
    const cluster = ctx.clustersService.findRootClusterByResource(
      doc.targetUri
    );
    if (cluster && cluster.connected) {
      createGateway();
      return;
    }

    if (cluster && !cluster.connected) {
      ctx.commandLauncher.executeCommand('cluster-connect', {
        clusterUri: cluster.uri,
        onSuccess: createGateway,
      });
      return;
    }

    if (!cluster) {
      setConnectAttempt({
        status: 'error',
        statusText: `unable to resolve cluster for ${doc.targetUri}`,
      });
    }
  };

  React.useEffect(() => {
    if (disconnectAttempt.status === 'success') {
      ctx.docsService.close(doc.uri);
    }
  }, [disconnectAttempt.status]);

  return {
    doc,
    gateway,
    disconnect,
    connected,
    reconnect,
    connectAttempt,
  };
}

export type State = ReturnType<typeof useGateway>;
