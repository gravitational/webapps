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
import { MenuLogin, MenuLoginProps } from 'shared/components/MenuLogin';
import { SearchPanel, SearchPagination } from 'shared/components/Search';
import { AttemptStatus } from 'shared/hooks/useAsync';

import { useAppContext } from 'teleterm/ui/appContextProvider';
import { retryWithRelogin } from 'teleterm/ui/utils';
import { IAppContext } from 'teleterm/ui/types';
import { GatewayProtocol } from 'teleterm/ui/services/clusters';

import { MenuLoginTheme } from '../MenuLoginTheme';
import { DarkenWhileDisabled } from '../DarkenWhileDisabled';

import { useDatabases, State } from './useDatabases';

export default function Container() {
  const state = useDatabases();
  return <DatabaseList {...state} />;
}

function getEmptyTableText(status: AttemptStatus) {
  switch (status) {
    case 'error':
      return 'Failed to fetch databases.';
    case '':
      return 'Searching…';
    case 'processing':
      return 'Searching…';
    case 'success':
      return 'No databases found.';
  }
}

function DatabaseList(props: State) {
  const {
    dbs,
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
          data={dbs}
          columns={[
            {
              key: 'name',
              headerText: 'Name',
              isSortable: true,
            },
            {
              key: 'description',
              headerText: 'Description',
              isSortable: true,
            },
            {
              key: 'type',
              headerText: 'Type',
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
              render: db => (
                <ConnectButton
                  dbUri={db.uri}
                  protocol={db.protocol as GatewayProtocol}
                  onConnect={dbUser => connect(db, dbUser)}
                />
              ),
            },
          ]}
          customSort={customSort}
          emptyText={getEmptyTableText(fetchAttempt.status)}
        />
        <SearchPagination prevPage={prevPage} nextPage={nextPage} />
      </DarkenWhileDisabled>
    </>
  );
}

function ConnectButton({
  dbUri,
  protocol,
  onConnect,
}: {
  dbUri: string;
  protocol: GatewayProtocol;
  onConnect: (dbUser: string) => void;
}) {
  const appContext = useAppContext();

  return (
    <Cell align="right">
      <MenuLoginTheme>
        <MenuLogin
          {...getMenuLoginOptions(protocol)}
          width="195px"
          getLoginItems={() => getDatabaseUsers(appContext, dbUri)}
          onSelect={(_, user) => {
            onConnect(user);
          }}
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
}

function getMenuLoginOptions(
  protocol: GatewayProtocol
): Pick<MenuLoginProps, 'placeholder' | 'required'> {
  if (protocol === 'redis') {
    return {
      placeholder: 'Enter username (optional)',
      required: false,
    };
  }

  return {
    placeholder: 'Enter username',
    required: true,
  };
}

async function getDatabaseUsers(appContext: IAppContext, dbUri: string) {
  try {
    const dbUsers = await retryWithRelogin(appContext, dbUri, () =>
      appContext.clustersService.getDbUsers(dbUri)
    );
    return dbUsers.map(user => ({ login: user, url: '' }));
  } catch (e) {
    // Emitting a warning instead of an error here because fetching those username suggestions is
    // not the most important part of the app.
    appContext.notificationsService.notifyWarning({
      title: 'Could not fetch database usernames',
      description: e.message,
    });

    throw e;
  }
}
