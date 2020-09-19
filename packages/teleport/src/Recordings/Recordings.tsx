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
import {
  FeatureBox,
  FeatureHeader,
  FeatureHeaderTitle,
} from 'teleport/components/Layout';
import RecordList from './RecordList';
import RangePicker from 'teleport/components/EventRangePicker';
import { Danger } from 'design/Alert';
import { Flex, Indicator, Box } from 'design';
import InputSearch from 'teleport/components/InputSearch';
import useTeleport from 'teleport/useTeleport';
import useAuditEvents from 'teleport/useAuditEvents';
import useStickyClusterId from 'teleport/useStickyClusterId';

export default function Container() {
  const teleCtx = useTeleport();
  const { clusterId } = useStickyClusterId();
  const state = useAuditEvents(teleCtx, clusterId);
  return <Recordings {...state} />;
}

export function Recordings(props: ReturnType<typeof useAuditEvents>) {
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
        <FeatureHeaderTitle mr="8"> Session Recordings</FeatureHeaderTitle>
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
        <RecordList
          searchValue={searchValue}
          events={events}
          clusterId={clusterId}
        />
      )}
    </FeatureBox>
  );
}
