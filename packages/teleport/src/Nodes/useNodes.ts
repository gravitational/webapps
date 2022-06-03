/*
Copyright 2019-2022 Gravitational, Inc.

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
import { FetchStatus } from 'design/DataTable/types';
import useAttempt from 'shared/hooks/useAttemptNext';
import Ctx from 'teleport/teleportContext';
import { StickyCluster } from 'teleport/types';
import cfg from 'teleport/config';
import { Node } from 'teleport/services/nodes';
import { openNewTab } from 'teleport/lib/util';
import { AgentResponse } from 'teleport/services/agents';
import {
  useUrlFiltering,
  useServerSidePagination,
} from 'teleport/components/hooks';

export default function useNodes(ctx: Ctx, stickyCluster: StickyCluster) {
  const { isLeafCluster, clusterId } = stickyCluster;
  const { attempt, setAttempt } = useAttempt('processing');
  const [isAddNodeVisible, setIsAddNodeVisible] = useState(false);
  const canCreate = ctx.storeUser.getTokenAccess().create;
  const logins = ctx.storeUser.getSshLogins();
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>('');
  const [results, setResults] = useState<AgentResponse<Node>>({
    agents: [],
    startKey: '',
    totalCount: 0,
  });

  const { params, search, ...filteringProps } = useUrlFiltering({
    fieldName: 'hostname',
    dir: 'ASC',
  });

  const { setStartKeys, pageSize, ...paginationProps } =
    useServerSidePagination({
      fetchFunc: ctx.nodeService.fetchNodes,
      clusterId,
      params,
      results,
      setResults,
      setFetchStatus,
      setAttempt,
    });

  useEffect(() => {
    fetchNodes();
  }, [clusterId, search]);

  function getNodeLoginOptions(serverId: string) {
    return makeOptions(clusterId, serverId, logins);
  }

  const startSshSession = (login: string, serverId: string) => {
    const url = cfg.getSshConnectRoute({
      clusterId,
      serverId,
      login,
    });

    openNewTab(url);
  };

  function fetchNodes() {
    setAttempt({ status: 'processing' });
    ctx.nodeService
      .fetchNodes(clusterId, { ...params, limit: pageSize })
      .then(res => {
        setResults(res);
        setFetchStatus(res.startKey ? '' : 'disabled');
        setStartKeys(['', res.startKey]);
        setAttempt({ status: 'success' });
      })
      .catch((err: Error) => {
        setAttempt({ status: 'failed', statusText: err.message });
        setResults({ ...results, agents: [], totalCount: 0 });
        setStartKeys(['']);
      });
  }

  const hideAddNode = () => {
    setIsAddNodeVisible(false);
    fetchNodes();
  };

  const showAddNode = () => {
    setIsAddNodeVisible(true);
  };

  return {
    canCreate,
    attempt,
    getNodeLoginOptions,
    startSshSession,
    isAddNodeVisible,
    isLeafCluster,
    clusterId,
    hideAddNode,
    showAddNode,
    results,
    fetchStatus,
    params,
    pageSize,
    ...filteringProps,
    ...paginationProps,
  };
}

function makeOptions(
  clusterId: string,
  serverId = '',
  logins = [] as string[]
) {
  return logins.map(login => {
    const url = cfg.getSshConnectRoute({
      clusterId,
      serverId,
      login,
    });

    return {
      login,
      url,
    };
  });
}

export type State = ReturnType<typeof useNodes>;
