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

import React from 'react';
import { Indicator, Box } from 'design';
import * as Cards from 'design/CardError';
import AjaxPoller from 'teleport/components/AjaxPoller';
import {
  FeatureBox,
  FeatureHeader,
  FeatureHeaderTitle,
} from 'teleport/components/Layout';
import { useTeleport } from 'teleport/teleportContextProvider';
import SessionList from './SessionList';
import useSessions from './useSessions';
const POLLING_INTERVAL = 3000; // every 3 sec

export default function Container() {
  const ctx = useTeleport();
  const state = useSessions(ctx);
  return <Sessions {...state} />;
}

export function Sessions(props: ReturnType<typeof useSessions>) {
  const { attempt, onRefresh, sessions } = props;
  if (attempt.isFailed) {
    return <Cards.Failed alignSelf="baseline" message={attempt.message} />;
  }

  return (
    <FeatureBox>
      <FeatureHeader alignItems="center">
        <FeatureHeaderTitle>Active Sessions</FeatureHeaderTitle>
      </FeatureHeader>
      {attempt.isProcessing && (
        <Box textAlign="center" m={10}>
          <Indicator />
        </Box>
      )}
      {attempt.isSuccess && (
        <>
          <SessionList sessions={sessions} />
          <AjaxPoller time={POLLING_INTERVAL} onFetch={onRefresh} />
        </>
      )}
    </FeatureBox>
  );
}
