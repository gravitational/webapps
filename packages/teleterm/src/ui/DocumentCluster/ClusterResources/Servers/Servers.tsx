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
import { Danger } from 'design/Alert';
import { MenuLogin } from 'shared/components/MenuLogin';
import { SearchPanel, SearchPagination } from 'shared/components/Search';
import { AttemptStatus } from 'shared/hooks/useAsync';

import { makeServer } from 'teleterm/ui/services/clusters';

import { MenuLoginTheme } from '../MenuLoginTheme';
import { DarkenWhileDisabled } from '../DarkenWhileDisabled';

import { useServers, State } from './useServers';

export default function Container() {
  const state = useServers();
  return <ServerList {...state} />;
}

function getEmptyTableText(status: AttemptStatus) {
  switch (status) {
    case 'error':
      return 'Failed to fetch servers.';
    case '':
      return 'Searching…';
    case 'processing':
      return 'Searching…';
    case 'success':
      return 'No servers found.';
  }
}

function ServerList(props: State) {
  const {
    servers,
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

const renderAddressCell = ({ addr, tunnel }: ReturnType<typeof makeServer>) => (
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
