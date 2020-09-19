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

import { FeatureBox } from 'teleport/components/Layout';
import React from 'react';
import { Flex, Indicator } from 'design';
import { Danger } from 'design/Alert';
import useTeleport from 'teleport/useTeleport';
import ClusterList from './ClusterList';
import useClusters from './useClusters';

export default function Container() {
  const ctx = useTeleport();
  const state = useClusters(ctx);
  return <LeafClusters {...state} />;
}

export function LeafClusters(props: ReturnType<typeof useClusters>) {
  const { clusters, searchValue, setSearchValue, initAttempt } = props;
  return (
    <FeatureBox pt="4">
      {initAttempt.status === 'processing' && (
        <Flex justifyContent="center">
          <Indicator />
        </Flex>
      )}
      {initAttempt.status === 'failed' && (
        <Danger>{initAttempt.statusText} </Danger>
      )}
      {initAttempt.status === 'success' && (
        <ClusterList
          clusters={clusters}
          search={searchValue}
          onSearchChange={setSearchValue}
        />
      )}
    </FeatureBox>
  );
}
