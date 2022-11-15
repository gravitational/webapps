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
import { AttemptStatus } from 'shared/hooks/useAsync';
import { ResourceKind } from 'teleport/Discover/Shared';

import { Server, ServerSideParams } from 'teleterm/services/tshd/types';
import { useAppContext } from 'teleterm/ui/appContextProvider';

import { useServerSideResources } from '../useServerSideResources';

function getEmptyTableText(status: AttemptStatus) {
  switch (status) {
    case 'error':
      return 'Failed to fetch servers.';
    case '':
      return 'Searching…';
    case 'processing':
      return 'Searching…';
    case 'success':
      return 'No servers found.';
  }
}

export function useServers() {
  const appContext = useAppContext();

  const {
    fetchAttempt,
    updateQuery,
    agentFilter,
    prevPage,
    nextPage,
    updateSearch,
    onAgentLabelClick,
    updateSort,
    pageCount,
  } = useServerSideResources<Server>(
    ResourceKind.Server,
    (params: ServerSideParams) =>
      appContext.resourcesService.fetchServers(params)
  );

  function getSshLogins(serverUri: string): string[] {
    const cluster = appContext.clustersService.findClusterByResource(serverUri);
    return cluster?.loggedInUser?.sshLoginsList || [];
  }

  function connect(server: Server, login: string): void {
    const rootCluster = appContext.clustersService.findRootClusterByResource(
      server.uri
    );
    const documentsService =
      appContext.workspacesService.getWorkspaceDocumentService(rootCluster.uri);
    const doc = documentsService.createTshNodeDocument(server.uri);
    doc.title = `${login}@${server.hostname}`;
    doc.login = login;

    documentsService.add(doc);
    documentsService.setLocation(doc.uri);
  }

  return {
    fetchAttempt,
    servers: fetchAttempt.data?.agentsList,
    getSshLogins,
    connect,
    agentFilter,
    updateQuery,
    updateSearch,
    onAgentLabelClick,
    pageCount,
    disabledRows: fetchAttempt.status === 'processing',
    nextPage,
    prevPage,
    emptyTableText: getEmptyTableText(fetchAttempt.status),
    customSort: {
      dir: agentFilter.sort?.dir,
      fieldName: agentFilter.sort?.fieldName,
      onSort: updateSort,
    },
  };
}

export type State = ReturnType<typeof useServers>;
