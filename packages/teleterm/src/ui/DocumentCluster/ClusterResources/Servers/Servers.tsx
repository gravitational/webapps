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
import { Danger } from 'design/Alert';
import useServers from './useServers';
import { sortBy } from 'lodash';
import { ButtonBorder } from 'design';
import {
  Column,
  SortHeaderCell,
  Cell,
  TextCell,
  SortTypes,
  renderLabelCell,
} from 'design/DataTable';
import Table from 'design/DataTable/Paged';
import * as types from 'teleterm/ui/services/clusters/types';

export default function Container() {
  const { servers, syncStatus, connect } = useServers();
  return (
    <ServerList servers={servers} syncStatus={syncStatus} onConnect={connect} />
  );
}

function ServerList(props: Props) {
  const { servers = [], syncStatus, onConnect, pageSize = 100 } = props;
  const [sortDir, setSortDir] = React.useState<Record<string, string>>({
    hostname: SortTypes.DESC,
  });

  function sortServers() {
    const columnKey = Object.getOwnPropertyNames(sortDir)[0];
    const sorted = sortBy(servers, columnKey);
    if (sortDir[columnKey] === SortTypes.ASC) {
      return sorted.reverse();
    }

    return sorted;
  }

  function onSortChange(columnKey: string, sortDir: string) {
    setSortDir({ [columnKey]: sortDir });
  }

  const sorted = sortServers();

  return (
    <StyledServers>
      {syncStatus.status === 'failed' && (
        <Danger>{syncStatus.statusText}</Danger>
      )}
      <StyledTable pageSize={pageSize} data={sorted}>
        <Column
          columnKey="hostname"
          header={
            <SortHeaderCell
              sortDir={sortDir.hostname}
              onSortChange={onSortChange}
              title="Hostname"
            />
          }
          cell={<TextCell />}
        />
        <Column
          columnKey="addr"
          header={
            <SortHeaderCell
              sortDir={sortDir.addr}
              onSortChange={onSortChange}
              title="Address"
            />
          }
          cell={<AddressCell />}
        />
        <Column header={<Cell>Labels</Cell>} cell={<LabelCell />} />
        <Column
          header={<Cell />}
          cell={<ConnectButton onClick={onConnect} />}
        />
      </StyledTable>
    </StyledServers>
  );
}

function ConnectButton(props) {
  const { onClick, rowIndex, data } = props;
  const { uri } = data[rowIndex] as types.tsh.Database;

  return (
    <Cell align="right">
      <ButtonBorder
        size="small"
        onClick={() => {
          onClick(uri);
        }}
      >
        Connect
      </ButtonBorder>
    </Cell>
  );
}

function AddressCell(props) {
  const { rowIndex, data, ...rest } = props;
  const { addr, tunnel } = data[rowIndex] as types.tsh.Server;
  return <Cell {...rest}>{tunnel ? renderTunnel() : addr}</Cell>;
}

function renderTunnel() {
  return (
    <span
      style={{ cursor: 'default' }}
      title="This node is connected to cluster through reverse tunnel"
    >{`⟵ tunnel`}</span>
  );
}

function LabelCell(props) {
  const { rowIndex, data } = props;
  const { tags = [] } = data[rowIndex];
  return renderLabelCell(tags);
}

type Props = {
  servers: types.tsh.Server[];
  syncStatus: types.SyncStatus;
  onConnect(serverUri: string): void;
  pageSize?: number;
};

const StyledTable = styled(Table)`
  & > tbody > tr > td {
    vertical-align: baseline;
  }
`;

const StyledServers = styled.div`
  flex-direction: column;
  display: flex;
  flex: 1;
  max-width: 1024px;
  ::after {
    content: ' ';
    padding-bottom: 24px;
  }
`;
