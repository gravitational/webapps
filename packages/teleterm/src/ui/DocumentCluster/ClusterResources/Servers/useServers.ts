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

import { SortType } from 'design/DataTable/types';

import { AgentFilter, AgentLabel } from 'teleport/services/agents';

import { useAsync } from 'shared/hooks/useAsync';
import getPageCount, { Page } from 'shared/utils/getPageCount';
import getStartKey from 'shared/utils/getStartKey';
import { addAgentLabelToQuery } from 'shared/utils/addAgentLabelToQuery';

import { useClusterContext } from 'teleterm/ui/DocumentCluster/clusterContext';
import { useAppContext } from 'teleterm/ui/appContextProvider';

export function useServers() {
  const appContext = useAppContext();
  const clusterContext = useClusterContext();
  const [fetchedData, setFetchedData] = useState(getEmptyFetchedDataState());
  const [page, setPage] = useState<Page>({ keys: [], index: 0 });
  const [agentFilter, setAgentFilter] = useState<AgentFilter>({
    sort: getDefaultSort(),
  });
  const limit = 15;

  const [fetchAttempt, fetch] = useAsync(async (dir?: 'prev' | 'next') => {
    const data = await appContext.clustersService.fetchServers({
      ...agentFilter,
      clusterUri: clusterContext.clusterUri,
      startKey: getStartKey({ dir, page }),
      searchAsRoles: 'no',
      limit,
    });
    setFetchedData({
      agents: data.agentsList,
      startKey: data.startKey,
      totalCount: data.totalCount,
    });
    handleSetPage(dir, data.startKey);
  });

  useEffect(() => {
    fetch();
  }, [agentFilter]);

  function handleSetPage(dir: '' | 'prev' | 'next', startKey: string) {
    switch (dir) {
      case 'prev':
        return setPage({
          keys: page.keys.slice(0, -1),
          index: page.index - 1,
        });
      case 'next':
        return setPage({
          keys: [...page.keys, startKey],
          index: page.index + 1,
        });
      default:
        return setPage({
          keys: ['', startKey],
          index: 0,
        });
    }
  }

  function updateSort(sort: SortType) {
    setAgentFilter({ ...agentFilter, sort });
  }

  function updateSearch(search: string) {
    setAgentFilter({ ...agentFilter, query: '', search });
  }

  function updateQuery(query: string) {
    setAgentFilter({ ...agentFilter, search: '', query });
  }

  function onAgentLabelClick(label: AgentLabel) {
    const query = addAgentLabelToQuery(agentFilter, label);
    setAgentFilter({ ...agentFilter, search: '', query });
  }

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

  return {
    fetchAttempt,
    servers: fetchedData.agents,
    getSshLogins,
    connect,
    agentFilter,
    updateQuery,
    updateSearch,
    onAgentLabelClick,
    disabledRows: fetchAttempt.status === 'processing',
    nextPage: page.keys[page.index + 1] ? () => fetch('next') : null,
    prevPage: page.index > 0 ? () => fetch('prev') : null,
    customSort: {
      dir: agentFilter.sort?.dir,
      fieldName: agentFilter.sort?.fieldName,
      onSort: updateSort,
    },
    pageCount: getPageCount({ page, fetchedData, limit }),
  };
}

function getEmptyFetchedDataState() {
  return {
    agents: [],
    startKey: '',
    totalCount: 0,
  };
}

function getDefaultSort(): SortType {
  return { fieldName: 'hostname', dir: 'ASC' };
}

export type State = ReturnType<typeof useServers>;
