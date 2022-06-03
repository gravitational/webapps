/**
 * Copyright 2020-2022 Gravitational, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useState, useEffect } from 'react';
import { FetchStatus } from 'design/DataTable/types';
import useAttempt from 'shared/hooks/useAttemptNext';
import { App } from 'teleport/services/apps';
import Ctx from 'teleport/teleportContext';
import useStickyClusterId from 'teleport/useStickyClusterId';
import { AgentResponse } from 'teleport/services/agents';
import {
  useUrlFiltering,
  useServerSidePagination,
} from 'teleport/components/hooks';

export default function useApps(ctx: Ctx) {
  const canCreate = ctx.storeUser.getTokenAccess().create;
  const [isAddAppVisible, setAppAddVisible] = useState(false);
  const { clusterId, isLeafCluster } = useStickyClusterId();
  const { attempt, setAttempt } = useAttempt('processing');
  const isEnterprise = ctx.isEnterprise;
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>('');
  const [results, setResults] = useState<AgentResponse<App>>({
    agents: [],
    startKey: '',
    totalCount: 0,
  });

  const { params, search, ...filteringProps } = useUrlFiltering({
    fieldName: 'name',
    dir: 'ASC',
  });
  const { setStartKeys, pageSize, ...paginationProps } =
    useServerSidePagination({
      fetchFunc: ctx.appService.fetchApps,
      clusterId,
      params,
      results,
      setResults,
      setFetchStatus,
      setAttempt,
    });

  useEffect(() => {
    fetch();
  }, [clusterId, search]);

  const hideAddApp = () => {
    setAppAddVisible(false);
    fetch();
  };

  const showAddApp = () => {
    setAppAddVisible(true);
  };

  function fetch() {
    setAttempt({ status: 'processing' });
    ctx.appService
      .fetchApps(clusterId, { ...params, limit: pageSize })
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

  return {
    clusterId,
    isLeafCluster,
    isEnterprise,
    isAddAppVisible,
    hideAddApp,
    showAddApp,
    canCreate,
    attempt,
    results,
    fetchStatus,
    params,
    pageSize,
    ...filteringProps,
    ...paginationProps,
  };
}

export type State = ReturnType<typeof useApps>;
