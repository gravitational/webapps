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

import api from 'teleport/services/api';
import cfg from 'teleport/config';
import makeEvent from './makeEvent';
import { EventQuery, Event } from './types';

// TODO change default to 5k
const EVENT_FETCH_MAX_LIMIT = 20;

class AuditService {
  maxFetchLimit = EVENT_FETCH_MAX_LIMIT;

  fetchEvents(clusterId: string, params: EventQuery): Promise<EventResponse> {
    const start = params.from.toISOString();
    const end = params.to.toISOString();

    const url = cfg.getClusterEventsUrl(clusterId, {
      start,
      end,
      limit: this.maxFetchLimit,
      include:
        params.filters && params.filters.length > 0
          ? params.filters.join(',')
          : undefined,
      startKey: params.startKey ? params.startKey : undefined,
    });

    return api.get(url).then(json => {
      const events = json.events || [];
      let startKey = json.startKey || '';

      // TODO should this be handled in backend?
      // 1) There is a bug in backend where if I end up querying the EXACT amount of total events,
      //    fetching always returns the last result with startKey non empty

      // 2) Handles a case where if given limit and a filter,
      //    if results came back < limit, then there are no more results
      //    related to the filter within given range.
      if (events.length < this.maxFetchLimit) {
        startKey = '';
      }

      return { events: events.map(makeEvent), startKey };
    });
  }
}

export default AuditService;

type EventResponse = {
  events: Event[];
  startKey: string;
};
