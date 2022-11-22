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
import Table, { Cell, ClickableLabelCell } from 'design/DataTable';
import { ButtonBorder } from 'design';
import { Danger } from 'design/Alert';
import { SearchPanel, SearchPagination } from 'shared/components/Search';
import { AttemptStatus } from 'shared/hooks/useAsync';

import { DarkenWhileDisabled } from '../DarkenWhileDisabled';

import { useKubes, State } from './useKubes';

export default function Container() {
  const state = useKubes();
  return <KubeList {...state} />;
}

function getEmptyTableText(status: AttemptStatus) {
  switch (status) {
    case 'error':
      return 'Failed to fetch kubernetes clusters.';
    case '':
      return 'Searching…';
    case 'processing':
      return 'Searching…';
    case 'success':
      return 'No kubernetes clusters found.';
  }
}

function KubeList(props: State) {
  const {
    kubes = [],
    connect,
    fetchAttempt,
    agentFilter,
    pageCount,
    customSort,
    prevPage,
    nextPage,
    updateQuery,
    onAgentLabelClick,
    updateSearch,
  } = props;
  const disabled = fetchAttempt.status === 'processing';
  const emptyTableText = getEmptyTableText(fetchAttempt.status);

  return (
    <>
      {fetchAttempt.status === 'error' && (
        <Danger>{fetchAttempt.statusText}</Danger>
      )}
      <SearchPanel
        updateQuery={updateQuery}
        updateSearch={updateSearch}
        pageCount={pageCount}
        filter={agentFilter}
        showSearchBar={true}
        disableSearch={disabled}
      />
      <DarkenWhileDisabled disabled={disabled}>
        <Table
          data={kubes}
          columns={[
            {
              key: 'name',
              headerText: 'Name',
              isSortable: true,
            },
            {
              key: 'labels',
              headerText: 'Labels',
              render: ({ labels }) => (
                <ClickableLabelCell
                  labels={labels}
                  onClick={onAgentLabelClick}
                />
              ),
            },
            {
              altKey: 'connect-btn',
              render: kube => renderConnectButtonCell(kube.uri, connect),
            },
          ]}
          customSort={customSort}
          emptyText={emptyTableText}
        />
        <SearchPagination prevPage={prevPage} nextPage={nextPage} />
      </DarkenWhileDisabled>
    </>
  );
}

export const renderConnectButtonCell = (
  uri: string,
  connect: (kubeUri: string) => void
) => {
  return (
    <Cell align="right">
      <ButtonBorder
        size="small"
        onClick={() => {
          connect(uri);
        }}
      >
        Connect
      </ButtonBorder>
    </Cell>
  );
};
