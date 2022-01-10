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

import React, { useState } from 'react';
import styled from 'styled-components';
import { Danger } from 'design/Alert';
import { Box } from 'design';
import useDatabases from './useDatabases';
import * as types from 'teleterm/ui/services/clusters/types';
import { sortBy } from 'lodash';
import { ButtonBorder } from 'design';
import {
  Column,
  SortHeaderCell,
  Cell,
  renderLabelCell,
  TextCell,
  SortTypes,
} from 'design/DataTable';
import Table from 'design/DataTable/Paged';

export default function Container() {
  const { dbs, connect, syncStatus } = useDatabases();
  return <Databases dbs={dbs} onConnect={connect} syncStatus={syncStatus} />;
}

function Databases(props: Props) {
  const { onConnect, syncStatus, dbs = [], pageSize = 100 } = props;
  const [sortDir, setSortDir] = useState<Record<string, string>>({
    name: SortTypes.DESC,
  });

  function sortDbs() {
    const columnKey = Object.getOwnPropertyNames(sortDir)[0];
    const sorted = sortBy(dbs, columnKey);
    if (sortDir[columnKey] === SortTypes.ASC) {
      return sorted.reverse();
    }

    return sorted;
  }

  function onSortChange(columnKey: string, sortDir: string) {
    setSortDir({ [columnKey]: sortDir });
  }

  const data = sortDbs();

  return (
    <StyledDatabases>
      {syncStatus.status === 'failed' && (
        <Danger>{syncStatus.statusText}</Danger>
      )}
      <StyledTable pageSize={pageSize} data={data}>
        <Column
          columnKey="name"
          header={
            <SortHeaderCell
              sortDir={sortDir.name}
              onSortChange={onSortChange}
              title="Name"
            />
          }
          cell={<TextCell />}
        />
        <Column
          columnKey="desc"
          header={
            <SortHeaderCell
              sortDir={sortDir.desc}
              onSortChange={onSortChange}
              title="Description"
            />
          }
          cell={<TextCell />}
        />
        <Column
          columnKey="title"
          header={
            <SortHeaderCell
              sortDir={sortDir.title}
              onSortChange={onSortChange}
              title="Type"
            />
          }
          cell={<TextCell />}
        />
        <Column header={<Cell>Labels</Cell>} cell={<LabelCell />} />
        <Column
          header={<Cell />}
          cell={<ConnectButton onClick={onConnect} />}
        />
      </StyledTable>
    </StyledDatabases>
  );
}

function LabelCell(props) {
  const { rowIndex, data } = props;
  const { tags = [] } = data[rowIndex];
  return renderLabelCell(tags);
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

const StyledTable = styled(Table)`
  & > tbody > tr > td {
    vertical-align: baseline;
  }
`;

type Props = {
  dbs: types.tsh.Database[];
  pageSize?: number;
  onConnect(uri: string): void;
  syncStatus: types.SyncStatus;
};

const StyledDatabases = styled(Box)`
  flex-direction: column;
  display: flex;
  flex: 1;
  max-width: 1024px;
  ::after {
    content: ' ';
    padding-bottom: 24px;
  }
`;
