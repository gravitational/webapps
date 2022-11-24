/*
Copyright 2021-2022 Gravitational, Inc.

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

import React, { useState } from 'react';
import { ButtonBorder } from 'design';
import Table, { Cell, ClickableLabelCell } from 'design/DataTable';
import { SortType } from 'design/DataTable/types';
import { DbProtocol } from 'shared/services/databases';

import { AuthType } from 'teleport/services/user';
import { Database } from 'teleport/services/databases';
import { AgentLabel } from 'teleport/services/agents';
import ConnectDialog from 'teleport/Databases/ConnectDialog';
import ServersideSearchPanel from 'teleport/components/ServersideSearchPanel';
import { ResourceUrlQueryParams } from 'teleport/getUrlQueryParams';

function DatabaseList(props: Props) {
  const {
    databases = [],
    pageSize,
    username,
    clusterId,
    authType,
    totalCount,
    fetchNext,
    fetchPrev,
    fetchStatus,
    from,
    to,
    params,
    setParams,
    startKeys,
    setSort,
    pathname,
    replaceHistory,
    onLabelClick,
    accessRequestId,
  } = props;

  const [dbConnectInfo, setDbConnectInfo] = useState<{
    name: string;
    protocol: DbProtocol;
  }>(null);

  return (
    <>
      <Table
        data={databases}
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
              <ClickableLabelCell labels={labels} onClick={onLabelClick} />
            ),
          },
          {
            altKey: 'connect-btn',
            render: database => renderConnectButton(database, setDbConnectInfo),
          },
        ]}
        pagination={{ pageSize }}
        fetching={{
          onFetchNext: fetchNext,
          onFetchPrev: fetchPrev,
          fetchStatus,
        }}
        serversideProps={{
          sort: params.sort,
          setSort,
          startKeys,
          serversideSearchPanel: (
            <ServersideSearchPanel
              from={from}
              to={to}
              count={totalCount}
              params={params}
              setParams={setParams}
              pathname={pathname}
              replaceHistory={replaceHistory}
            />
          ),
        }}
        isSearchable
        emptyText="No Databases Found"
      />
      {dbConnectInfo && (
        <ConnectDialog
          username={username}
          clusterId={clusterId}
          dbName={dbConnectInfo.name}
          dbProtocol={dbConnectInfo.protocol}
          onClose={() => setDbConnectInfo(null)}
          authType={authType}
          accessRequestId={accessRequestId}
        />
      )}
    </>
  );
}

function renderConnectButton(
  { name, protocol }: Database,
  setDbConnectInfo: React.Dispatch<
    React.SetStateAction<{
      name: string;
      protocol: DbProtocol;
    }>
  >
) {
  return (
    <Cell align="right">
      <ButtonBorder
        size="small"
        onClick={() => {
          setDbConnectInfo({ name, protocol });
        }}
      >
        Connect
      </ButtonBorder>
    </Cell>
  );
}

type Props = {
  databases: Database[];
  pageSize: number;
  username: string;
  clusterId: string;
  authType: AuthType;
  fetchNext: () => void;
  fetchPrev: () => void;
  fetchStatus: any;
  from: number;
  to: number;
  totalCount: number;
  params: ResourceUrlQueryParams;
  setParams: (params: ResourceUrlQueryParams) => void;
  startKeys: string[];
  setSort: (sort: SortType) => void;
  pathname: string;
  replaceHistory: (path: string) => void;
  onLabelClick: (label: AgentLabel) => void;
  accessRequestId?: string;
};

export default DatabaseList;
