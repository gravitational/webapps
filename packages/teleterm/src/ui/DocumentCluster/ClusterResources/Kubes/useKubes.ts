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

import { Kube, ServerSideParams } from 'teleterm/services/tshd/types';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import { useClusterContext } from 'teleterm/ui/DocumentCluster/clusterContext';

import { useServerSideResources } from '../useServerSideResources';

function getEmptyTableText(status: AttemptStatus) {
  switch (status) {
    case 'error':
      return 'Failed to fetch kubernetes clusters.';
    case '':
      return 'Searching…';
    case 'processing':
      return 'Searching…';
    case 'success':
      return 'No kubernetes clusters found.';
  }
}

export function useKubes() {
  const appContext = useAppContext();
  const ctx = useClusterContext();
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
  } = useServerSideResources<Kube>(
    { fieldName: 'name', dir: 'ASC' }, // default sort
    (params: ServerSideParams) => appContext.resourcesService.fetchKubes(params)
  );

  return {
    connect: ctx.connectKube,
    fetchAttempt,
    kubes: fetchAttempt.data?.agentsList,
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

export type State = ReturnType<typeof useKubes>;
