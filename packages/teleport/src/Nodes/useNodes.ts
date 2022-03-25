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
import { useLocation } from 'react-router';
import useAttempt from 'shared/hooks/useAttemptNext';
import Ctx from 'teleport/teleportContext';
import { StickyCluster } from 'teleport/types';
import cfg from 'teleport/config';
import { NodesResponse } from 'teleport/services/nodes';
import { openNewTab } from 'teleport/lib/util';
import getResourceUrlQueryParams from 'teleport/getUrlQueryParams';

export default function useNodes(ctx: Ctx, stickyCluster: StickyCluster) {
  const { isLeafCluster, clusterId } = stickyCluster;
  const searchPath = useLocation().search;
  const params = getResourceUrlQueryParams(searchPath);

  const [results, setResults] = useState<NodesResponse>({
    nodes: [],
    hasResources: false,
    startKey: '',
    fetchStatus: '',
    totalCount: 0,
  });

  const { attempt, run, setAttempt } = useAttempt('processing');
  const [isAddNodeVisible, setIsAddNodeVisible] = useState(false);
  const canCreate = ctx.storeUser.getTokenAccess().create;
  const logins = ctx.storeUser.getSshLogins();

  useEffect(() => {
    fetch();
  }, [clusterId, searchPath]);

  const getNodeLoginOptions = (serverId: string) =>
    makeOptions(clusterId, serverId, logins);

  const startSshSession = (login: string, serverId: string) => {
    const url = cfg.getSshConnectRoute({
      clusterId,
      serverId,
      login,
    });

    openNewTab(url);
  };

  function fetch() {
    run(() =>
      ctx.nodeService
        .fetchNodes(clusterId, { ...params })
        .then(res =>
          setResults({
            ...res,
            fetchStatus: res.startKey ? '' : 'disabled',
          })
        )
        .catch((err: Error) => {
          setAttempt({ status: 'failed', statusText: err.message });
        })
    );
  }

  const fetchMore = () => {
    console.log('heyyyy');
    setResults({
      ...results,
      fetchStatus: 'loading',
    });
    ctx.nodeService
      .fetchNodes(clusterId, { ...params, startKey: results.startKey })
      .then(res =>
        setResults({
          ...results,
          nodes: [...results.nodes, ...res.nodes],
          startKey: res.startKey,
          fetchStatus: res.startKey ? '' : 'disabled',
        })
      )
      .catch((err: Error) =>
        setAttempt({ status: 'failed', statusText: err.message })
      );
  };

  const hideAddNode = () => {
    setIsAddNodeVisible(false);
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
    fetchMore,
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
