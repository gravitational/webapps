/*
Copyright 2019-2022 Gravitational, Inc.

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
import { SortType } from 'design/DataTable/types';
import { LoginItem, MenuLogin } from 'shared/components/MenuLogin';
import { Node } from 'teleport/services/nodes';
import { AgentLabel } from 'teleport/services/agents';
import ServersideSearchPanel from 'teleport/components/ServersideSearchPanel';
import { ResourceUrlQueryParams } from 'teleport/getUrlQueryParams';

function NodeList(props: Props) {
  const {
    nodes = [],
    onLoginMenuOpen,
    onLoginSelect,
    pageSize,
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
  } = props;

  return (
    <>
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
            render: renderAddressCell,
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
            render: ({ id }) =>
              renderLoginCell(id, onLoginSelect, onLoginMenuOpen),
          },
        ]}
        emptyText="No Nodes Found"
        data={nodes}
        pagination={{
          pageSize,
        }}
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
      />
    </>
  );
}

const renderLoginCell = (
  id: string,
  onSelect: (e: React.SyntheticEvent, login: string, serverId: string) => void,
  onOpen: (serverId: string) => LoginItem[]
) => {
  function handleOnOpen() {
    return onOpen(id);
  }

  function handleOnSelect(e: React.SyntheticEvent, login: string) {
    if (!onSelect) {
      return [];
    }

    return onSelect(e, login, id);
  }

  return (
    <Cell align="right">
      <MenuLogin
        getLoginItems={handleOnOpen}
        onSelect={handleOnSelect}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
      />
    </Cell>
  );
};

export const renderAddressCell = ({ addr, tunnel }: Node) => (
  <Cell>{tunnel ? renderTunnel() : addr}</Cell>
);

function renderTunnel() {
  return (
    <span
      style={{ cursor: 'default' }}
      title="This node is connected to cluster through reverse tunnel"
    >{`⟵ tunnel`}</span>
  );
}

type Props = {
  nodes: Node[];
  onLoginMenuOpen(serverId: string): { login: string; url: string }[];
  onLoginSelect(e: React.SyntheticEvent, login: string, serverId: string): void;
  fetchNext: () => void;
  fetchPrev: () => void;
  fetchStatus: any;
  from: number;
  to: number;
  totalCount: number;
  pageSize?: number;
  params: ResourceUrlQueryParams;
  setParams: (params: ResourceUrlQueryParams) => void;
  startKeys: string[];
  setSort: (sort: SortType) => void;
  pathname: string;
  replaceHistory: (path: string) => void;
  onLabelClick: (label: AgentLabel) => void;
};

export default NodeList;
