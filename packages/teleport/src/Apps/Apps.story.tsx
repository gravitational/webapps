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
import { Apps } from './Apps';
import { State } from './useApps';
import { apps } from './fixtures';

export default {
  title: 'Teleport/Apps',
  excludeStories: ['props'],
};

export const Loaded = () => <Apps {...props} />;

export const PaginationUnsupported = () => (
  <Apps
    {...props}
    results={{ ...props.results, paginationUnsupported: true }}
  />
);

export const Empty = () => (
  <Apps {...props} results={{ apps: [] }} isSearchEmpty={true} />
);

export const EmptyReadOnly = () => (
  <Apps
    {...props}
    results={{ apps: [] }}
    canCreate={false}
    isSearchEmpty={true}
  />
);

export const Loading = () => (
  <Apps {...props} attempt={{ status: 'processing' }} />
);

export const Failed = () => (
  <Apps
    {...props}
    attempt={{ status: 'failed', statusText: 'some error message' }}
  />
);

export const props: State = {
  results: {
    apps,
    totalCount: apps.length,
  },
  fetchStatus: '',
  attempt: { status: 'success' },
  clusterId: 'im-a-cluster',
  isLeafCluster: false,
  isEnterprise: false,
  isAddAppVisible: false,
  canCreate: true,
  hideAddApp: () => null,
  showAddApp: () => null,
  fetchNext: () => null,
  fetchPrev: () => null,
  pageSize: apps.length,
  from: 1,
  to: apps.length,
  params: {
    search: '',
    query: '',
    sort: { fieldName: 'name', dir: 'ASC' },
  },
  setParams: () => null,
  setSort: () => null,
  startKeys: [''],
  pathname: '',
  replaceHistory: () => null,
  isSearchEmpty: false,
  onLabelClick: () => null,
};
