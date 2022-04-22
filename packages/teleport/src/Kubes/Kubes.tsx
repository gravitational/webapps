/*
Copyright 2021-2022 Gravitational, Inc.

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

import React from 'react';
import { Box, Indicator, ButtonPrimary } from 'design';
import { Danger } from 'design/Alert';
import KubeList from 'teleport/Kubes/KubeList';
import {
  FeatureBox,
  FeatureHeader,
  FeatureHeaderTitle,
} from 'teleport/components/Layout';
import useTeleport from 'teleport/useTeleport';
import Empty, { EmptyStateInfo } from 'teleport/components/Empty';
import useKubes, { State } from './useKubes';

export default function Container() {
  const ctx = useTeleport();
  const state = useKubes(ctx);
  return <Kubes {...state} />;
}

const DOC_URL = 'https://goteleport.com/docs/kubernetes-access/guides';

export function Kubes(props: State) {
  const {
    attempt,
    username,
    authType,
    isLeafCluster,
    clusterId,
    canCreate,
    results,
    fetchNext,
    fetchPrev,
    from,
    to,
    pageSize,
    params,
    setParams,
    startKeys,
    setSort,
    pathname,
    replaceHistory,
    fetchStatus,
    isSearchEmpty,
  } = props;

  const hasNoKubes =
    attempt.status === 'success' && results.kubes.length === 0 && isSearchEmpty;

  return (
    <FeatureBox>
      <FeatureHeader alignItems="center" justifyContent="space-between">
        <FeatureHeaderTitle>Kubernetes</FeatureHeaderTitle>
        {!hasNoKubes && (
          <ButtonPrimary
            as="a"
            width="240px"
            target="_blank"
            href={DOC_URL}
            rel="noreferrer"
          >
            View documentation
          </ButtonPrimary>
        )}
      </FeatureHeader>
      {attempt.status === 'failed' && <Danger>{attempt.statusText}</Danger>}
      {attempt.status === 'processing' && (
        <Box textAlign="center" m={10}>
          <Indicator />
        </Box>
      )}
      {attempt.status !== 'processing' && !hasNoKubes && (
        <>
          <KubeList
            kubes={results.kubes}
            username={username}
            authType={authType}
            clusterId={clusterId}
            fetchNext={fetchNext}
            fetchPrev={fetchPrev}
            fetchStatus={fetchStatus}
            from={from}
            to={to}
            totalCount={results.totalCount}
            pageSize={pageSize}
            params={params}
            setParams={setParams}
            startKeys={startKeys}
            setSort={setSort}
            pathname={pathname}
            replaceHistory={replaceHistory}
          />
        </>
      )}
      {hasNoKubes && (
        <Empty
          clusterId={clusterId}
          canCreate={canCreate && !isLeafCluster}
          emptyStateInfo={emptyStateInfo}
        />
      )}
    </FeatureBox>
  );
}

const emptyStateInfo: EmptyStateInfo = {
  title: 'Add your first Kubernetes cluster to Teleport',
  byline:
    'Teleport Kubenetes Access provides secure access to Kubernetes clusters.',
  docsURL: DOC_URL,
  resourceType: 'kubernetes',
  readOnly: {
    title: 'No Kubernetes Clusters Found',
    resource: 'kubernetes clusters',
  },
};
