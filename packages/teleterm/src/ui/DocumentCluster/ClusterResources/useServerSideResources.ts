import { useState, useEffect, useMemo } from 'react';
import { SortType } from 'design/DataTable/types';
import { useAsync } from 'shared/hooks/useAsync';
import { ServerSideParams } from 'teleterm/services/tshd/types';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import { retryWithRelogin } from 'teleterm/ui/utils';
import { useClusterContext } from '../clusterContext';
import { AgentFilter, AgentLabel } from 'teleport/services/agents';

export function addAgentLabelToQuery(filter: AgentFilter, label: AgentLabel) {
  const queryParts = [];

  // Add existing query
  if (filter.query) {
    queryParts.push(filter.query);
  }

  // If there is an existing simple search,
  // convert it to predicate language and add it
  if (filter.search) {
    queryParts.push(`search("${filter.search}")`);
  }

  // Create the label query.
  queryParts.push(`labels["${label.name}"] == "${label.value}"`);

  return queryParts.join(' && ');
}

const limit = 15;

export function useServerSideResources<Agent>(
  fetchFunction: (params: ServerSideParams) => Promise<FetchResponse<Agent>>
) {
  const ctx = useAppContext();
  const { clusterUri, documentUri } = useClusterContext();
  const [pageIndex, setPageIndex] = useState(0);
  const [keys, setKeys] = useState<string[]>([]);
  const [agentFilter, setAgentFilter] = useState<AgentFilter>({
    sort: getDefaultSort(),
  });

  // startKey is used here as a way to paginate through agents returned from
  // their respective rpcs.
  const [fetchAttempt, fetch] = useAsync(async (startKey: string) =>
    retryWithRelogin(ctx, documentUri, clusterUri, () =>
      fetchFunction({
        ...agentFilter,
        limit,
        clusterUri,
        startKey,
      })
    )
  );

  // If there is no startKey at the current page's index, there is no more data to get
  function nextPage() {
    const proposedKey = keys[pageIndex];
    if (proposedKey) {
      return () => {
        setPageIndex(pageIndex + 1);
      };
    }
    return null;
  }

  // If we are at the first page (index 0), we cannot fetch more previous data
  function prevPage() {
    const newPageIndex = pageIndex - 1;
    if (newPageIndex > -1) {
      return () => {
        setPageIndex(newPageIndex);
      };
    }
    return null;
  }

  useEffect(() => {
    const fetchAndUpdateKeys = async () => {
      const [response, err] = await fetch(keys[pageIndex - 1]);
      // the error will be handled via the fetchAttempt outside
      // return early here as there are no keys to update
      if (err) {
        return;
      }

      // when we receive data from fetch, we store the startKey (or lack of) according to the current
      // page index. think of this as "this page's nextKey".
      // "why don't we just name it nextKey then?"
      // Mostly because it's called startKey almost everywhere else in the UI, and also because we'd have the same issue
      // for prevPage if we swapped named, and this comment would be explaining "this page's startKey".
      const newKeys = [...keys];
      newKeys[pageIndex] = response.startKey;
      setKeys(newKeys);
    };
    fetchAndUpdateKeys();
  }, [agentFilter, pageIndex]);

  function updateAgentFilter(filter: AgentFilter) {
    setPageIndex(0);
    setAgentFilter(filter);
  }

  function updateSort(sort: SortType) {
    updateAgentFilter({ ...agentFilter, sort });
  }

  function updateSearch(search: string) {
    updateAgentFilter({ ...agentFilter, query: '', search });
  }

  function updateQuery(query: string) {
    updateAgentFilter({ ...agentFilter, search: '', query });
  }

  function onAgentLabelClick(label: AgentLabel) {
    const query = addAgentLabelToQuery(agentFilter, label);
    updateAgentFilter({ ...agentFilter, search: '', query });
  }

  const pageCount = useMemo(() => {
    if (fetchAttempt.status !== 'success') {
      return {
        from: 0,
        to: 0,
        total: 0,
      };
    }
    const from = pageIndex * limit + 1;
    return {
      from,
      to: from + fetchAttempt.data.agentsList.length - 1,
      total: fetchAttempt.data.totalCount,
    };
  }, [fetchAttempt.status]);

  return {
    fetchAttempt,
    fetch,
    updateSearch,
    updateSort,
    updateQuery,
    agentFilter,
    prevPage: prevPage(),
    nextPage: nextPage(),
    onAgentLabelClick,
    pageCount,
  };
}

function getDefaultSort(): SortType {
  return { fieldName: 'hostname', dir: 'ASC' };
}

type FetchResponse<T> = {
  agentsList: Array<T>;
  totalCount: number;
  startKey: string;
};
