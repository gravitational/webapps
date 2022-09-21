import { useState, useEffect } from 'react';
import useAttempt from 'shared/hooks/useAttemptNext';
import { FetchStatus, SortType } from 'design/DataTable/types';
import type {
  AgentLabel,
  AgentFilter,
  AgentResponse,
  AgentKind,
  AgentIdKind,
} from 'teleport/services/agents';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import AppContext from 'teleterm/ui/appContext';
import { Server } from 'teleterm/services/tshd/types';
import { makeDatabase, makeServer } from 'teleterm/ui/services/clusters';

const pageSize = 10;

export default function useNewRequest() {
  const ctx = useAppContext();
  // const fetchServers = ctx.clustersService.client.getServers
  const clusterUri = ctx.workspacesService.getRootClusterUri();
  ctx.workspacesService.useState();
  const workspaceAccessRequest =
    ctx.workspacesService.getActiveWorkspaceAccessRequestsService();

  const isLeafCluster = false;
  // attempt status is used for initial search and switching between resource types
  const { attempt, setAttempt } = useAttempt('processing');
  // is used to disable buttons/rows during pagination and searching
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>('');
  const [fetchedData, setFetchedData] = useState<AgentResponse<AgentKind>>(
    getEmptyFetchedDataState()
  );
  const [requestableRoles, setRequestableRoles] = useState<string[]>([]);
  const [selectedResource, setSelectedResource] = useState<ResourceKind>(
    isLeafCluster ? 'node' : 'node'
  );
  const [agentFilter, setAgentFilter] = useState<AgentFilter>({
    sort: getDefaultSort(selectedResource),
  });
  const addedResources = workspaceAccessRequest.getPendingAccessRequest();

  const [page, setPage] = useState<Page>({ keys: [], index: 0 });

  function makeAgent(source) {
    switch (selectedResource) {
      case 'node':
        return makeServer(source);
      case 'db':
        return makeDatabase(source);
      default:
        return source;
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

  useEffect(() => {
    fetch();
  }, [agentFilter]);

  function addAgentLabelToQuery(filter: AgentFilter, label: AgentLabel) {
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

  function onAgentLabelClick(label: AgentLabel) {
    const query = addAgentLabelToQuery(agentFilter, label);
    setAgentFilter({ ...agentFilter, search: '', query });
  }

  function updateResourceKind(kind: ResourceKind) {
    setSelectedResource(kind);
    setAgentFilter({
      sort: getDefaultSort(kind),
      search: '',
      query: '',
    });
    setAttempt({ status: 'processing' });
  }

  function addOrRemoveResource(
    kind: ResourceKind,
    resourceId: string,
    resourceName?: string
  ) {
    workspaceAccessRequest.addOrRemoveResource(kind, resourceId, resourceName);
  }

  async function fetch() {
    try {
      // currently, we need to fetch roles for the current user
      // in the future it'd be nice to have this array of requestable roles
      // on the loggedInUser object
      if (selectedResource === 'role') {
        setFetchStatus('loading');
        const data = await ctx.clustersService.client.getRequestableRoles(
          clusterUri
        );
        setRequestableRoles(data);
        setAttempt({ status: 'success' });
        setFetchStatus('');
      } else {
        const cb = ctx.clustersService.getFetchCallback(
          clusterUri,
          selectedResource
        );
        setFetchStatus('loading');
        const data = await cb({
          clusterUri,
          ...agentFilter,
          limit: pageSize,
          searchAsRoles: 'yes',
        });
        setFetchedData({
          ...fetchedData,
          agents: data.agentsList.map(makeAgent),
          startKey: data.startKey,
          totalCount: data.totalCount,
        });
        setPage({
          keys: ['', data.startKey],
          index: 0,
        });
        setAttempt({ status: 'success' });
        setFetchStatus('');
      }
    } catch (err) {
      setAttempt({ status: 'failed', statusText: err.message });
      setFetchStatus('');
    }
  }

  async function fetchNext() {
    const cb = ctx.clustersService.getFetchCallback(
      clusterUri,
      selectedResource
    );
    setFetchStatus('loading');

    try {
      const data = await cb({
        clusterUri,
        ...agentFilter,
        limit: pageSize,
        searchAsRoles: 'yes',
        startKey: page.keys[page.index + 1],
      });
      setFetchedData({
        ...fetchedData,
        agents: data.agentsList.map(makeAgent),
        startKey: data.startKey,
      });
      setPage({
        keys: [...page.keys, data.startKey],
        index: page.index + 1,
      });
      setFetchStatus('');
    } catch (err) {
      setAttempt({ status: 'failed', statusText: err.message });
      setFetchStatus('');
    }
  }

  async function fetchPrev() {
    const cb = ctx.clustersService.getFetchCallback(
      clusterUri,
      selectedResource
    );
    setFetchStatus('loading');
    try {
      const data = await cb({
        clusterUri,
        ...agentFilter,
        limit: pageSize,
        searchAsRoles: 'yes',
        startKey: page.keys[page.index - 1],
      });
      setFetchedData({
        ...fetchedData,
        agents: data.agentsList.map(makeAgent),
        startKey: data.startKey,
      });
      setPage({
        keys: page.keys.slice(0, -1),
        index: page.index - 1,
      });
      setFetchStatus('');
    } catch (err) {
      setAttempt({ status: 'failed', statusText: err.message });
      setFetchStatus('');
    }
  }

  // Calculate counts for our resource list.
  let fromPage = 0;
  let toPage = 0;
  let totalCount = 0;
  if (selectedResource !== 'role' && fetchedData.totalCount) {
    fromPage = page.index * pageSize + 1;
    toPage = fromPage + fetchedData.agents.length - 1;
    totalCount = fetchedData.totalCount;
  } else if (selectedResource === 'role' && requestableRoles.length > 0) {
    fromPage = 1;
    toPage = requestableRoles.length;
    totalCount = requestableRoles.length;
  }

  // function clearAddedResources() {
  //   setAddedResources(getEmptyResourceState());
  // }

  return {
    isLeafCluster,
    attempt: attempt,
    agents: fetchedData.agents,
    agentFilter,
    updateSort,
    fetchStatus,
    updateQuery,
    updateSearch,
    onAgentLabelClick,
    selectedResource,
    updateResourceKind,
    addedResources,
    addOrRemoveResource,
    pageCount: {
      to: toPage,
      from: fromPage,
      total: totalCount,
    },
    customSort: {
      dir: agentFilter.sort?.dir,
      fieldName: agentFilter.sort?.fieldName,
      onSort: updateSort,
    },
    nextPage: page.keys[page.index + 1] ? fetchNext : null,
    prevPage: page.index > 0 ? fetchPrev : null,
    // clearAddedResources,
    requestableRoles,
  };
}

function getEmptyFetchedDataState() {
  return {
    agents: [],
    startKey: '',
    totalCount: 0,
  };
}

export function getEmptyResourceState() {
  return {
    node: {},
    db: {},
    app: {},
    kube_cluster: {},
    windows_desktop: {},
    role: {},
  };
}

// Page keeps track of our current agent list
//  start keys and current position.
type Page = {
  // keys are the list of start keys collected from
  // each page fetch.
  keys: string[];
  // index refers to the current index the page
  // is at in the list of keys.
  index: number;
};

function getDefaultSort(kind: ResourceKind): SortType {
  if (kind === 'node') {
    return { fieldName: 'hostname', dir: 'ASC' };
  }
  return { fieldName: 'name', dir: 'ASC' };
}

export type ResourceMap = {
  [K in ResourceKind]: Record<string, string>;
};

export type ResourceKind = AgentIdKind | 'role';

export type State = ReturnType<typeof useNewRequest>;
