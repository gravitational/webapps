import { useState, useEffect } from 'react';
import { SortType } from 'design/DataTable/types';
import { useAsync } from 'shared/hooks/useAsync';
import { ServerSideParams } from 'teleterm/services/tshd/types';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import { retryWithRelogin } from 'teleterm/ui/utils';
import { useClusterContext } from '../clusterContext';
import { AgentFilter, AgentLabel } from 'teleport/services/agents';
import { addAgentLabelToQuery } from 'shared/utils/addAgentLabelToQuery';
import { ResourceKind } from 'teleport/Discover/Shared';

export function useServerSideResources<Agent>(
  fetchFunction: (params: ServerSideParams) => Promise<{
    agentsList: Array<Agent>;
    totalCount: number;
    startKey: string;
  }>
) {
  const ctx = useAppContext();
  const { clusterUri, documentUri } = useClusterContext();
  const [pageIndex, setPageIndex] = useState(0);
  const [keys, setKeys] = useState<string[]>([]);
  const [agentFilter, setAgentFilter] = useState<AgentFilter>({
    sort: getDefaultSort(),
  });
  const [pageCount, setPageCount] = useState({
    to: 0,
    from: 0,
    total: 0,
  });

  const limit = 15;

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
        fetch(proposedKey);
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
        // if we got pageIndex - 1, we'd get the same data as the previous "next" we just called.
        // we have to go back 2. which is why we use newPageIndex instead

        // example after going from pageIndex = 0 to pageIndex = 1:
        // ['startKeyFromInitialFetch', 'goEvenFurtherStartKey']
        //     ^- just came from here          ^- we are here
        //
        // so in order to get the start key for the page BEFORE this one, we go back twice.
        // this could also be written/read as keys[pageIndex - 2]
        fetch(keys[newPageIndex - 1]);
        setPageIndex(newPageIndex);
      };
    }
    return null;
  }

  useEffect(() => {
    // when agent filter changes we consider it a 'new' search so we should pass an empty
    // startKey to get the beginning of the list with new filters, and set pageIndex back to zero
    fetch('');
    setPageIndex(0);
  }, [agentFilter]);

  // when we receive data from fetch, we store the startKey (or lack of) according to the current
  // page index. think of this as "this page's nextKey".
  // "why don't we just name it nextKey then?"
  // Mostly because it's called startKey almost everywhere else in the UI, and also because we'd have the same issue
  // for prevPage if we swapped named, and this comment would be explaining "this page's startKey".
  useEffect(() => {
    const newKeys = [...keys];
    newKeys[pageIndex] = fetchAttempt.data?.startKey;
    setKeys(newKeys);

    setPageCount(getPageCount());
  }, [fetchAttempt.data]);

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

  function getPageCount() {
    let from = 0;
    let to = 0;

    let total = fetchAttempt?.data?.totalCount || 0;
    if (fetchAttempt.status === 'success') {
      from = pageIndex * limit + 1;
      to = from + fetchAttempt.data?.agentsList.length - 1;
    }
    return {
      to,
      total,
      from,
    };
  }

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
