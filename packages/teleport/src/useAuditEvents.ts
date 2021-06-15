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

import moment from 'moment';
import { useEffect, useState, useMemo } from 'react';
import useAttempt from 'shared/hooks/useAttemptNext';
import Ctx from 'teleport/teleportContext';
import { Event } from 'teleport/services/audit';

export default function useAuditEvents(
  ctx: Ctx,
  clusterId: string,
  eventType?: string
) {
  const rangeOptions = useMemo(() => getRangeOptions(), []);
  const [searchValue, setSearchValue] = useState('');
  const [range, setRange] = useState<EventRange>(rangeOptions[0]);
  const { attempt, setAttempt, run } = useAttempt('processing');
  const [results, setResults] = useState<EventResult>({
    events: [],
    fetchStartKey: '',
    fetchStatus: '',
  });

  useEffect(() => {
    fetch();
  }, [clusterId, range]);

  // fetchMore gets events from last position from
  // last fetch, indicated by startKey. The response is
  // appended to existing events list.
  function fetchMore() {
    setResults({
      ...results,
      fetchStatus: 'loading',
    });
    ctx.auditService
      .fetchEvents(clusterId, {
        ...range,
        startKey: results.fetchStartKey,
        filterBy: eventType,
      })
      .then(res =>
        setResults({
          events: [...results.events, ...res.events],
          fetchStartKey: res.startKey,
          fetchStatus: res.startKey ? '' : 'disabled',
        })
      )
      .catch((err: Error) => {
        setAttempt({ status: 'failed', statusText: err.message });
      });
  }

  // fetch gets events from beginning of range and
  // replaces existing events list.
  function fetch() {
    run(() =>
      ctx.auditService
        .fetchEvents(clusterId, { ...range, filterBy: eventType })
        .then(res =>
          setResults({
            events: res.events,
            fetchStartKey: res.startKey,
            fetchStatus: res.startKey ? '' : 'disabled',
          })
        )
    );
  }

  return {
    ...results,
    fetchMore,
    clusterId,
    attempt,
    range,
    setRange,
    rangeOptions,
    searchValue,
    setSearchValue,
  };
}

function getRangeOptions(): EventRange[] {
  return [
    {
      name: 'Today',
      from: moment(new Date())
        .startOf('day')
        .toDate(),
      to: moment(new Date())
        .endOf('day')
        .toDate(),
    },
    {
      name: '7 days',
      from: moment()
        .subtract(6, 'day')
        .startOf('day')
        .toDate(),
      to: moment(new Date())
        .endOf('day')
        .toDate(),
    },
    {
      name: 'Custom Range...',
      isCustom: true,
      from: new Date(),
      to: new Date(),
    },
  ];
}

type EventResult = {
  events: Event[];
  fetchStatus: 'loading' | 'disabled' | '';
  fetchStartKey: string;
};

export type EventRange = {
  from: Date;
  to: Date;
  isCustom?: boolean;
  name?: string;
};

export type State = ReturnType<typeof useAuditEvents>;
