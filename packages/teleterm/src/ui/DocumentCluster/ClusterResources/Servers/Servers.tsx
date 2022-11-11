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

import { Box } from 'design';

import { MenuLogin } from 'shared/components/MenuLogin';

import { Danger } from 'design/Alert';

import { SearchPanel } from 'shared/components/Search';
import { SearchPagination } from 'shared/components/Search/SearchPagination';

import * as types from 'teleterm/ui/services/clusters/types';

import { MenuLoginTheme } from '../MenuLoginTheme';

import { useServers, State } from './useServers';

export default function Container() {
  const state = useServers();
  return <ServerList {...state} />;
}

function ServerList(props: State) {
  const {
    servers = [],
    getSshLogins,
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
          columns={[
            {
              key: 'hostname',
              headerText: 'Hostname',
              isSortable: true,
            },
            {
              key: 'addr',
              headerText: 'Address',
              isSortable: false,
              render: renderAddressCell,
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
              render: server =>
                renderConnectCell(
                  () => getSshLogins(server.uri),
                  login => connect(server, login)
                ),
            },
          ]}
          customSort={customSort}
          emptyText={emptyTableText}
          data={servers}
        />
        <SearchPagination prevPage={prevPage} nextPage={nextPage} />
      </DarkenWhileDisabled>
    </>
  );
}

const renderConnectCell = (
  getSshLogins: () => string[],
  onConnect: (login: string) => void
) => {
  return (
    <Cell align="right">
      <MenuLoginTheme>
        <MenuLogin
          getLoginItems={() =>
            getSshLogins().map(login => ({ login, url: '' }))
          }
          onSelect={(e, login) => onConnect(login)}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
        />
      </MenuLoginTheme>
    </Cell>
  );
};

const renderAddressCell = ({ addr, tunnel }: types.Server) => (
  <Cell>
    {tunnel && (
      <span
        style={{ cursor: 'default' }}
        title="This node is connected to cluster through reverse tunnel"
      >{`⟵ tunnel`}</span>
    )}
    {!tunnel && addr}
  </Cell>
);

const DarkenWhileDisabled = styled(Box)`
  // The timing functions of transitions have been chosen so that the element loses opacity slowly
  // when entering the disabled state but gains it quickly when going out of the disabled state.
  transition: opacity 150ms ease-out;
  &.disabled {
    pointer-events: none;
    opacity: 0.7;
    transition: opacity 150ms ease-in;
  }
`;
