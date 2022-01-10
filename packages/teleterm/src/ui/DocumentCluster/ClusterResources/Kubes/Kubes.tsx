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
import { sortBy } from 'lodash';
import styled from 'styled-components';
import { Box } from 'design';
import { Danger } from 'design/Alert';
import useKubes from './useKubes';
import {
  Column,
  SortHeaderCell,
  Cell,
  TextCell,
  SortTypes,
} from 'design/DataTable';
import Table from 'design/DataTable/Paged';
import { Label, ButtonBorder } from 'design';
import * as types from 'teleterm/ui/services/clusters/types';

export default function Container() {
  const { kubes, syncStatus } = useKubes();
  return <Kubes syncStatus={syncStatus} kubes={kubes} />;
}

function Kubes(props: Props) {
  const { kubes = [], syncStatus, pageSize = 100 } = props;
  const [sortDir, setSortDir] = useState<Record<string, string>>({
    name: SortTypes.DESC,
  });

  function sortKubes() {
    const columnKey = Object.getOwnPropertyNames(sortDir)[0];
    const sorted = sortBy(kubes, columnKey);
    if (sortDir[columnKey] === SortTypes.ASC) {
      return sorted.reverse();
    }

    return sorted;
  }

  function onSortChange(columnKey: string, sortDir: string) {
    setSortDir({ [columnKey]: sortDir });
  }

  const data = sortKubes();

  return (
    <StyledKubes>
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
        <Column header={<Cell>Labels</Cell>} cell={<LabelCell />} />
        <Column
          header={<Cell />}
          cell={<ActionCell onViewConnect={(name: string) => {}} />}
        />
      </StyledTable>
    </StyledKubes>
  );
}

export const ActionCell = props => {
  const { rowIndex, onViewConnect, data } = props;
  const { name } = data[rowIndex];

  return (
    <Cell align="right">
      <ButtonBorder size="small" onClick={() => onViewConnect(name)}>
        Connect
      </ButtonBorder>
    </Cell>
  );
};

function LabelCell(props) {
  const { rowIndex, data } = props;
  const { labelsList } = data[rowIndex];
  const $labels = labelsList.map(label => (
    <Label mb="1" mr="1" key={label} kind="secondary">
      {`${label.name}:${label.value}`}
    </Label>
  ));

  return <Cell>{$labels}</Cell>;
}

type Props = {
  kubes: types.tsh.Kube[];
  pageSize?: number;
  syncStatus: types.SyncStatus;
};

const StyledTable = styled(Table)`
  & > tbody > tr > td {
    vertical-align: baseline;
  }
`;

const StyledKubes = styled(Box)`
  flex-direction: column;
  display: flex;
  flex: 1;
  max-width: 1024px;
  ::after {
    content: ' ';
    padding-bottom: 24px;
  }
`;
