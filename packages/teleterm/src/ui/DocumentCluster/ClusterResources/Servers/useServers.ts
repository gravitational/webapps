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
import { useState, useEffect } from 'react';

import { useClusterContext } from 'teleterm/ui/DocumentCluster/clusterContext';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import { Server } from 'teleterm/services/tshd/types';
import { useAsync } from 'shared/hooks/useAsync';

export function useServers() {
  const appContext = useAppContext();
  const clusterContext = useClusterContext();
  const serverCache = clusterContext.getServers();
  const syncStatus = clusterContext.getSyncStatus().servers;
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [servers, setServers] = useState([]);

  useEffect(() => {
    if (isInitialLoad && syncStatus.status === 'ready') {
      setServers(serverCache);
      setIsInitialLoad(false);
    }
  }, [serverCache]);

  function getSshLogins(serverUri: string): string[] {
    const cluster = appContext.clustersService.findClusterByResource(serverUri);
    return cluster?.loggedInUser?.sshLoginsList || [];
  }

  function connect(serverUri: string, login: string): void {
    const server = appContext.clustersService.getServer(serverUri);

    const rootCluster =
      appContext.clustersService.findRootClusterByResource(serverUri);
    const documentsService =
      appContext.workspacesService.getWorkspaceDocumentService(rootCluster.uri);
    const doc = documentsService.createTshNodeDocument(serverUri);
    doc.title = `${login}@${server.hostname}`;
    doc.login = login;

    documentsService.add(doc);
    documentsService.setLocation(doc.uri);
  }

  async function fetchServers({ search, query }) {
    // set fetching state to processing
    try {
      const response = await appContext.clustersService.listServers({
        clusterUri: clusterContext.clusterUri,
        search,
        query,
      });
      setServers(response);
    } catch (error) {
      // set fetching error
    } finally {
      // set fetching state to ready
    }
  }

  return {
    servers,
    getSshLogins,
    connect,
    fetchServers,
    syncStatus,
  };
}

export type State = ReturnType<typeof useServers>;
