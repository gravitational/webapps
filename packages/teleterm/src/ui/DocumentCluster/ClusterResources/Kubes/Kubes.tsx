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

import styled from 'styled-components';

import Table, { Cell, ClickableLabelCell } from 'design/DataTable';
import { ButtonBorder, Box } from 'design';

import { Danger } from 'design/Alert';

import { useKubes, State } from './useKubes';
import { SearchPanel } from 'shared/components/Search';
import { SearchPagination } from 'shared/components/Search/SearchPagination';

export default function Container() {
  const state = useKubes();
  return <KubeList {...state} />;
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
    disabledRows,
    updateSearch,
    emptyTableText,
  } = props;

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
        disableSearch={disabledRows}
      />
      <DarkenWhileDisabled className={disabledRows ? 'disabled' : ''}>
        <Table
          data={kubes}
          columns={[
            {
              key: 'name',
              headerText: 'Name',
              isSortable: true,
            },
            {
              key: 'labelsList',
              headerText: 'Labels',
              render: ({ labelsList }) => (
                <ClickableLabelCell
                  labels={labelsList}
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

const DarkenWhileDisabled = styled(Box)`
      // The timing functions of transitions have been chosen so that the element loses opacity slowly
      // when entering the disabled state but gains it quickly when going out of the disabled state.
      transition: opacity 150ms ease-out;
      &.disabled {
        pointer - events: none;
      opacity: 0.7;
      transition: opacity 150ms ease-in;
  }
      `;
