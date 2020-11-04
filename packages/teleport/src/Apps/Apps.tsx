/**
 * Copyright 2020 Gravitational, Inc.
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

import React from 'react';
import {
  FeatureBox,
  FeatureHeader,
  FeatureHeaderTitle,
} from 'teleport/components/Layout';
import { Danger } from 'design/Alert';
import { Indicator, Box } from 'design';
import AppList from './AppList';
import AddButton from './AddButton';
import Empty from './Empty';
import useApps, { State } from './useApps';

export default function Container() {
  const state = useApps();
  return <Apps {...state} />;
}

export function Apps({ attempt, apps, clusterId }: State) {
  const isEmpty = attempt.status === 'success' && apps.length === 0;
  const hasApps = attempt.status === 'success' && apps.length > 0;
  const isAdmin = false;

  return (
    <FeatureBox>
      <FeatureHeader alignItems="center" justifyContent="space-between">
        <FeatureHeaderTitle>Applications</FeatureHeaderTitle>
        <AddButton isAdmin={isAdmin} />
      </FeatureHeader>
      {attempt.status === 'processing' && (
        <Box textAlign="center" m={10}>
          <Indicator />
        </Box>
      )}
      {attempt.status === 'failed' && <Danger>{attempt.statusText} </Danger>}
      {hasApps && <AppList apps={apps} />}
      {isEmpty && (
        <Empty clusterId={clusterId} isAdmin={isAdmin} onCreate={() => null} />
      )}
    </FeatureBox>
  );
}
