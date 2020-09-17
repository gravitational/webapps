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

import React, { useEffect, useState, useMemo } from 'react';
import {
  FeatureBox,
  FeatureHeader,
  FeatureHeaderTitle,
} from 'teleport/components/Layout';
import EventList from './EventList';
import RangePicker, { getRangeOptions } from './RangePicker';
import { useAttempt } from 'shared/hooks';
import { Danger } from 'design/Alert';
import { Flex, Indicator, Box } from 'design';
import InputSearch from 'teleport/components/InputSearch';
import TeleportContext from 'teleport/teleportContext';
import { useTeleport } from 'teleport/teleportContextProvider';
import useClusterId from 'teleport/Main/useClusterId';

export default function Container() {
  const clusterId = useClusterId();
  const teleCtx = useTeleport();
  const state = useEvents(clusterId, teleCtx);
  return <Audit {...state} />;
}

export function Audit(props: ReturnType<typeof useEvents>) {
  const {
    overflow,
    attempt,
    maxLimit,
    range,
    rangeOptions,
    setRange,
    events,
    searchValue,
    clusterId,
    setSearchValue,
  } = props;

  const { isSuccess, isFailed, message, isProcessing } = attempt;

  return (
    <FeatureBox>
      <FeatureHeader alignItems="center">
        <FeatureHeaderTitle mr="8">Audit Log</FeatureHeaderTitle>
        <RangePicker
          ml="auto"
          value={range}
          options={rangeOptions}
          onChange={setRange}
        />
      </FeatureHeader>
      <Flex mb={4} alignItems="center" justifyContent="flex-start">
        <InputSearch height="30px" mr="3" onChange={setSearchValue} />
      </Flex>
      {overflow && (
        <Danger>
          Number of events retrieved for specified date range has exceeded the
          maximum limit of {maxLimit} events
        </Danger>
      )}
      {isFailed && <Danger> {message} </Danger>}
      {isProcessing && (
        <Box textAlign="center" m={10}>
          <Indicator />
        </Box>
      )}
      {isSuccess && (
        <EventList search={searchValue} events={events} clusterId={clusterId} />
      )}
    </FeatureBox>
  );
}

function useEvents(clusterId: string, ctx: TeleportContext) {
  const rangeOptions = useMemo(() => getRangeOptions(), []);
  const [searchValue, setSearchValue] = React.useState('');
  const [range, setRange] = useState(rangeOptions[0]);
  const [attempt, attemptActions] = useAttempt({ isProcessing: true });
  const [results, setResults] = useState({
    events: [],
    overflow: false,
  });

  function onFetch({ from, to }: Range) {
    attemptActions.do(() => {
      return ctx.auditService
        .fetchEvents(clusterId, { start: from, end: to })
        .then(setResults);
    });
  }

  useEffect(() => {
    onFetch(range);
  }, [clusterId, range]);

  return {
    ...results,
    attempt,
    clusterId,
    attemptActions,
    onFetch,
    maxLimit: ctx.auditService.maxLimit,
    range,
    rangeOptions,
    setRange,
    searchValue,
    setSearchValue,
  };
}

type Range = { from: Date; to: Date };
